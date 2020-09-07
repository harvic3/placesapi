import { SearchPlacesUseCase } from "../../../../application/modules/places/useCases/search";
import { PlacesProvider } from "../../../providers/places/PlacesProvider";
import { HistoricalRepository } from "../../../repositories/historical/HistoricalRepository";

const placesProvider = new PlacesProvider();
const historicalRepository = new HistoricalRepository();

const searchPlacesUseCase = new SearchPlacesUseCase(placesProvider, historicalRepository);

export { searchPlacesUseCase };
