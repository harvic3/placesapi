import { IPlacesProvider } from "../../../application/modules/places/providerContracts/IPlaceProvider";
import { SearchDto } from "../../../application/modules/places/dtos/SearchDto";
import { PlaceDto } from "../../../application/modules/places/dtos/PlaceDto";

export class PlacesProvider implements IPlacesProvider {
  Search(searchDto: SearchDto): Promise<PlaceDto[]> {
    throw new Error("Method not implemented.");
  }
}
