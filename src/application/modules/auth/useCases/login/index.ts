import { BaseUseCase, IResultT, ResultT } from "../../../../shared/useCase/BaseUseCase";
import { IAuthProvider } from "../../providerContracts/IAuthProvider";
import EmailValidator from "../../../../shared/utils/EmailValidator";
import { JwtDto } from "../../dtos/JwtDto";

export class LoginUseCase extends BaseUseCase {
  public constructor(private authProvider: IAuthProvider) {
    super();
  }

  async Execute(email: string, password: string): Promise<IResultT<JwtDto>> {
    const result = new ResultT<JwtDto>();
    if (
      !this.validator.IsValidEntry(result, {
        Email: [() => EmailValidator.IsValid(email)],
        Password: password,
      })
    ) {
      return result;
    }
    const authentication = await this.authProvider.Login(email, password);
    if (authentication[1]) {
      result.SetError(authentication[1].toString(), this.resultCodes.BAD_REQUEST);
      return result;
    }
    result.SetData(authentication[0] as JwtDto, this.resultCodes.SUCCESS);
    return result;
  }
}
