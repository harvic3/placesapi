import { SearchDto } from "../modules/places/dtos/SearchDto";

const searchByCity = new SearchDto();

searchByCity.city = "Medellín";
searchByCity.language = "en";

export { searchByCity };
