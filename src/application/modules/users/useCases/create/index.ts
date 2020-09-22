import { BaseUseCase, IResult, Result } from "../../../../shared/useCase/BaseUseCase";
import { IUserRepository } from "../../serviceContracts/IUserRepository";
import { IUserProvider } from "../../providerContracts/IUserProvider";
import PhoneValidator from "../../../../shared/utils/PhoneValidator";
import EmailValidator from "../../../../shared/utils/EmailValidator";
import { Session } from "../../../session/models/Session";
import { UserDto } from "../../dtos/UserDto";

const phoneLength = 13;

export class CreateUserUseCase extends BaseUseCase {
  public constructor(private userRepository: IUserRepository, private userProvider: IUserProvider) {
    super();
  }

  async Execute(userDto: UserDto, password: string, session: Session): Promise<IResult> {
    const result = new Result();
    if (
      !this.validator.IsValidEntry(result, { Session: [() => Session.IsValidSession(session)] })
    ) {
      return result;
    }
    if (
      !this.validator.IsValidEntry(result, {
        User: userDto,
        Email: [() => EmailValidator.IsValid(userDto?.email)],
        Display_Name: userDto?.displayName,
        Phone: [() => PhoneValidator.IsValid(userDto.phoneNumber, phoneLength)],
        Password: userDto?.password,
      })
    ) {
      return result;
    }
    const exists = await this.userRepository.Get(userDto.email);
    if (exists) {
      result.SetError(
        this.resources.Get(this.resourceKeys.EMAIL_ALREADY_EXISTS),
        this.resultCodes.BAD_REQUEST,
      );
      return result;
    }
    const newUser = await this.userProvider.Create(userDto, password);
    if (!newUser) {
      result.SetError(
        this.resourceKeys.USER_PROVIDER_ERROR,
        this.resultCodes.INTERNAL_SERVER_ERROR,
      );
      return result;
    }
    const registerUser = await this.userRepository.Create(newUser);
    if (!registerUser) {
      result.SetError(
        this.resourceKeys.SOMETHING_WENT_WRONG,
        this.resultCodes.INTERNAL_SERVER_ERROR,
      );
      return result;
    }
    await this.userProvider.UpdateClaims(registerUser.uid, registerUser.userId);
    result.SetMessage(
      this.resources.GetWithParams(this.resourceKeys.ELEMENT_WAS_CREATED, {
        elementName: this.resources.Get(this.resourceKeys.USER),
      }),
      this.resultCodes.CREATED,
    );
    return result;
  }
}
