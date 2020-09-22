import { BaseUseCase, IResultT, ResultT } from "../../../../shared/useCase/BaseUseCase";
import { IHistoricalRepository } from "../../serviceContracts/IHistoricalRepository";
import { Historical } from "../../../../../domain/historical/Historical";
import { Session } from "../../../session/models/Session";

export class GetUserHistoricalUseCase extends BaseUseCase {
  constructor(private historicalRepository: IHistoricalRepository) {
    super();
  }

  async Execute(
    userUid: string,
    startDate: string,
    endDate: string,
    session: Session,
  ): Promise<IResultT<Historical[]>> {
    const result = new ResultT<Historical[]>();
    if (
      !this.validator.IsValidEntry(result, { Session: [() => Session.IsValidSession(session)] })
    ) {
      return result;
    }
    if (!this.validator.IsValidEntry(result, { User_Uid: userUid, Start_Date: startDate })) {
      return result;
    }
    const historical = await this.historicalRepository.Get(userUid, startDate, endDate);
    result.SetData(historical, this.resultCodes.SUCCESS);
    return result;
  }
}
