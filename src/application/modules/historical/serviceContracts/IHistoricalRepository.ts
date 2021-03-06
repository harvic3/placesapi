import { Historical } from "../../../../domain/historical/Historical";
import { SearchDto } from "../../places/dtos/SearchDto";

export interface IHistoricalRepository {
  Get(userUid: string, startDate: string, endDate: string): Promise<Historical[]>;
  Create(searchDto: SearchDto, userId: number): Promise<void>;
}
