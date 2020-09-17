import { GetUserHistoricalUseCase } from "../../../../application/modules/historical/useCases/get";
import { HistoricalRepository } from "../../../repositories/historical/HistoricalRepository";

const historicalRepository = new HistoricalRepository();

const getUserHistoricalUseCase = new GetUserHistoricalUseCase(historicalRepository);

export { getUserHistoricalUseCase };
