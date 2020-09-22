import { HistoricalRepository } from "../historical/HistoricalRepository";
import { UserRepository } from "../user/UserRepository";

const userRepository = new UserRepository();
const historicalRepository = new HistoricalRepository();

export { userRepository, historicalRepository };
