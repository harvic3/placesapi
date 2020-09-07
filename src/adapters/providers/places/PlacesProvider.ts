import { IPlacesProvider } from "../../../application/modules/places/providerContracts/IPlaceProvider";
import { ApplicationError } from "../../../application/shared/errors/ApplicationError";
import * as resultCodes from "../../../application/shared/result/resultCodes.json";
import { SearchDto } from "../../../application/modules/places/dtos/SearchDto";
import { PlaceDto } from "../../../application/modules/places/dtos/PlaceDto";
import resources, { resourceKeys } from "../../../application/shared/locals";
import httpClient, { Headers } from "../../../infrastructure/httpClient/index";
import config from "../../../infrastructure/config/index";
import { PlaceResult } from "./models/PlaceResult";
import mapper from "mapper-tsk";

export class PlacesProvider implements IPlacesProvider {
  private serviceUrl: string;
  private serviceKey: string;
  private headers: Headers;
  constructor() {
    this.serviceUrl = config.placesApi.url;
    this.serviceKey = config.placesApi.key;
    this.headers = new Headers();
    this.headers.append("Accept", "application/json");
    if (!this.serviceUrl || !this.serviceKey) {
      throw new ApplicationError(
        resources.GetWithParams(resourceKeys.NON_CONFIGURED_PROVIDER, {
          providerName: "Places",
          params: "Key - Url",
        }),
        resultCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async Search(searchDto: SearchDto): Promise<[PlaceDto[], string]> {
    let endPoint = null;
    if (searchDto.city) {
      endPoint = `${this.serviceUrl}/textsearch/json?query=${searchDto.types}+in+${searchDto.city}&key=${this.serviceKey}`;
    } else {
      endPoint = `${this.serviceUrl}/nearbysearch/json?location=${searchDto.point.lat},${searchDto.point.lng}&radius=${searchDto.radius}&types=${searchDto.types}&key=${this.serviceKey}`;
    }
    const result = await httpClient.Send<PlaceResult, PlaceResult>(
      endPoint,
      httpClient.Methods.GET,
      { headers: this.headers },
    );
    const response = result.response as PlaceResult;
    if (!result.success) {
      return [null, response.status];
    }
    return [response.results as PlaceDto[], null];
  }
}
