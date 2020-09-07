import { PlaceModel } from "./PlaceModel";

export class PlaceResult {
  next_page_token: string;
  results: PlaceModel[];
  status: string;
}
