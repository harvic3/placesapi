import { IHistoricalRepository } from "../../../application/modules/historical/serviceContracts/IHistoricalRepository";
import { Historical as HistoricalModel } from "../../../infrastructure/dataBase/entity/Historical.model";
import { SearchDto } from "../../../application/modules/places/dtos/SearchDto";
import { Historical } from "../../../domain/historical/Historical";
import dataBase from "../../../infrastructure/dataBase/index";
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
  async Create(searchDto: SearchDto, userId: number): Promise<void> {
    await dataBase.connection
      .getRepository(HistoricalModel)
      .createQueryBuilder()
      .insert()
      .values({
        userId,
        search: {
          city: searchDto?.city,
          point: {
            lat: searchDto?.point?.lat,
            lng: searchDto?.point?.lng,
          },
          radius: searchDto?.radius,
          language: searchDto.language,
        },
      })
      .execute();
  }
}
