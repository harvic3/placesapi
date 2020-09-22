import { BaseUseCase, IResultT, ResultT } from "../../../../shared/useCase/BaseUseCase";
import { IAuthProvider } from "../../providerContracts/IAuthProvider";
import { Session } from "../../../session/models/Session";
import { JwtDto } from "../../dtos/JwtDto";

export class LogoutUseCase extends BaseUseCase {
  public constructor(private authProvider: IAuthProvider) {
    super();
  }

  async Execute(session: Session): Promise<IResultT<JwtDto>> {
    const result = new ResultT<JwtDto>();
    result.SetError("Use case not implemented", this.resultCodes.NOT_IMPLEMENTED);
    return result;
  }
}
