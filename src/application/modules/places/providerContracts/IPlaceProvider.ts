import { SearchDto } from "../dtos/SearchDto";
import { PlaceDto } from "../dtos/PlaceDto";

export interface IPlacesProvider {
  Search(searchDto: SearchDto): Promise<[PlaceDto[], string]>;
}
