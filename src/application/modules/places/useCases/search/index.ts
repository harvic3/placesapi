import { BaseUseCase, IResult, IResultT, ResultT } from "../../../../shared/useCase/BaseUseCase";
import { Session } from "../../../../../domain/session/Session";
import { SearchDto } from "../../dtos/SearchDto";
import { IPlacesProvider } from "../../providerContracts/IPlaceProvider";
import { IHistoricalRepository } from "../../../historical/serviceContracts/IHistoricalRepository";
import { PlaceDto } from "../../dtos/PlaceDto";

const defaultType = "restaurants";
const defaultLanguage = "es";

export class SearchPlacesUseCase extends BaseUseCase {
  public constructor(
    private placesProvider: IPlacesProvider,
    private historicalRepository: IHistoricalRepository,
  ) {
    super();
  }

  async Execute(searchDto: SearchDto, session: Session): Promise<IResultT<PlaceDto[]>> {
    const result = new ResultT<PlaceDto[]>();
    this.resources.Init(session.language);
    searchDto.SetType(defaultType);
    if (!this.IsValidRequestData(result, searchDto)) return result;
    await this.historicalRepository.Create(searchDto, session.localId);
    const response = await this.placesProvider.Search(searchDto);
    if (response[1]) {
      result.SetError(response[1].toString(), this.resultCodes.BAD_REQUEST);
      return result;
    }
    result.SetData(response[0] as PlaceDto[], this.resultCodes.SUCCESS);
    return result;
  }

  private IsValidRequestData(result: IResult, searchDto: SearchDto): boolean {
    const acceptedLanguages = ["es", "en"];
    if (
      !searchDto.city &&
      (!searchDto?.point?.lat || !searchDto?.point?.lng || !searchDto?.radius)
    ) {
      result.SetError(
        this.resources.Get(this.resourceKeys.NOT_VALID_SEARCH),
        this.resultCodes.BAD_REQUEST,
      );
      return false;
    }
    if (!searchDto.language || acceptedLanguages.indexOf(searchDto.language) < 0) {
      searchDto.SetLanguage(defaultLanguage);
    }
    if (searchDto.city) {
      return true;
    }
    if (searchDto?.point?.lat && searchDto?.point?.lng && searchDto?.radius) {
      return true;
    }
  }
}
