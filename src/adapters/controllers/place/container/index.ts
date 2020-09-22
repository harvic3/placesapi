import { SearchPlacesUseCase } from "../../../../application/modules/places/useCases/search";
import { historicalRepository } from "../../../repositories/container/index";
import { placesProvider } from "../../../providers/container/index";

const searchPlacesUseCase = new SearchPlacesUseCase(placesProvider, historicalRepository);

export { searchPlacesUseCase };
