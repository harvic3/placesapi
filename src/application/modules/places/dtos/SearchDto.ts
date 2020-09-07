export class SearchDto {
  language: string;
  city: string;
  point: {
    lat: string;
    lng: string;
  };
  types: "food";
  radius: number;
}
