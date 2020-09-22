import { IHistoricalRepository } from "../../../application/modules/historical/serviceContracts/IHistoricalRepository";
import { Historical as HistoricalModel } from "../../../infrastructure/dataBase/entity/Historical.model";
import { User as UserModel } from "../../../infrastructure/dataBase/entity/User.model";
import { SearchDto } from "../../../application/modules/places/dtos/SearchDto";
import { Historical } from "../../../domain/historical/Historical";
import dataBase from "../../../infrastructure/dataBase/index";
import * as moment from "moment";
import mapper from "mapper-tsk";

export class HistoricalRepository implements IHistoricalRepository {
  async Get(userUid: string, startDate: string, endDate: string): Promise<Historical[]> {
    if (!endDate) {
      endDate = moment().format("YYYY-MM-DD");
    }
    const entity = await dataBase.connection
      .createQueryBuilder(UserModel, "user")
      .innerJoinAndSelect("user.historical", "historical")
      .where("user.uid = :uid", { uid: userUid })
      .andWhere("DATE(historical.eventDate) >= :start", {
        start: moment(startDate).startOf("day").format("YYYY-MM-DD"),
      })
      .andWhere("DATE(historical.eventDate) <= :end", {
        end: moment(endDate).endOf("day").format("YYYY-MM-DD"),
      })
      .getOne();
    if (!entity) {
      return null;
    }
    return mapper.MapArray<HistoricalModel, Historical>(entity.historical, () =>
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
