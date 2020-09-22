import { BaseUseCase, IResult, Result } from "../../../../shared/useCase/BaseUseCase";
import { IUserRepository } from "../../serviceContracts/IUserRepository";
import { IUserProvider } from "../../providerContracts/IUserProvider";
import EmailValidator from "../../../../shared/utils/EmailValidator";
import PhoneValidator from "../../../../shared/utils/PhoneValidator";
import { Session } from "../../../session/models/Session";
import { UserDto } from "../../dtos/UserDto";

const phoneLength = 13;

export class UpdateUserUseCase extends BaseUseCase {
  public constructor(private userRepository: IUserRepository, private userProvider: IUserProvider) {
    super();
  }

  async Execute(userDto: UserDto, session: Session): Promise<IResult> {
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
      })
    ) {
      return result;
    }
    const user = await this.userProvider.Update(userDto);
    if (!user) {
      result.SetError(
        this.resourceKeys.USER_PROVIDER_ERROR,
        this.resultCodes.INTERNAL_SERVER_ERROR,
      );
      return result;
    }
    const updatedUser = await this.userRepository.Update(user);
    if (!updatedUser) {
      result.SetError(
        this.resourceKeys.SOMETHING_WENT_WRONG,
        this.resultCodes.INTERNAL_SERVER_ERROR,
      );
      return result;
    }
    result.SetMessage(
      this.resources.GetWithParams(this.resourceKeys.ELEMENT_WAS_UPDATED, {
        elementName: this.resources.Get(this.resourceKeys.USER),
      }),
      this.resultCodes.SUCCESS,
    );
    return result;
  }
}
