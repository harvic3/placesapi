import { SearchPlacesUseCase } from "../../../../application/modules/places/useCases/search";
import { PlacesProvider } from "../../../providers/places/PlacesProvider";

const placesProvider = new PlacesProvider();

const searchPlacesUseCase = new SearchPlacesUseCase(placesProvider);

export { searchPlacesUseCase };
