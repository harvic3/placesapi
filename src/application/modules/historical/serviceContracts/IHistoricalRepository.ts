import { Historical } from "../../../../domain/historical/Historical";

export interface IHistoricalRepository {
  Get(userId: number): Promise<Historical[]>;
}
