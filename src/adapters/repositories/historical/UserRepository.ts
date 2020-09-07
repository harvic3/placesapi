import { User as UserModel } from "../../../infrastructure/dataBase/entity/User.model";
import { IHistoricalRepository } from "../../../application/modules/historical/serviceContracts/IHistoricalRepository";
import { Historical as HistoricalModel } from "../../../infrastructure/dataBase/entity/Historical.model";
import dataBase from "../../../infrastructure/dataBase/index";
import { Historical } from "../../../domain/historical/Historical";
import mapper from "mapper-tsk";

export class HistoricalRepository implements IHistoricalRepository {
  async Get(userId: number): Promise<Historical[]> {
    const entities = await dataBase.connection
      .getRepository(HistoricalModel)
      .createQueryBuilder("historical")
      .where("historical.usrId = :id", { id: userId })
      .getMany();
    if (!entities) {
      return null;
    }
    return mapper.MapArray<HistoricalModel, Historical>(entities, () =>
      mapper.Activator(Historical),
    );
  }
}
