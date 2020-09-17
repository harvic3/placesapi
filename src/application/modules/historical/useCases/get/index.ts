import { BaseUseCase, IResultT, ResultT } from "../../../../shared/useCase/BaseUseCase";
import { IHistoricalRepository } from "../../serviceContracts/IHistoricalRepository";
import { Historical } from "../../../../../domain/historical/Historical";
import { Session } from "../../../../../domain/session/Session";

export class GetUserHistoricalUseCase extends BaseUseCase {
  constructor(private historicalRepository: IHistoricalRepository) {
    super();
  }

  async Execute(userId: number, session: Session): Promise<IResultT<Historical[]>> {
    const result = new ResultT<Historical[]>();
    if (!this.validator.IsValidEntry(result, { User_Id: userId })) return result;
    const historical = await this.historicalRepository.Get(userId);
    result.SetData(historical, this.resultCodes.SUCCESS);
    return result;
  }
}
