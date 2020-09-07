export class SearchDto {
  types: string;
  language: string;
  city: string;
  point: {
    lat: string;
    lng: string;
  } = { lat: null, lng: null };
  radius: string;
  SetType(type: string): void {
    if (type) {
      this.types = type;
    }
  }
  SetLanguage(language: string): void {
    if (language) {
      this.language = language;
    }
  }
}
