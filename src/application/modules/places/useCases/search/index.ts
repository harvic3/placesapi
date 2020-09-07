import { BaseUseCase, IResult, Result } from "../../../../shared/useCase/BaseUseCase";
import { Session } from "../../../../../domain/session/Session";
import { SearchDto } from "../../dtos/SearchDto";
import { IPlacesProvider } from "../../providerContracts/IPlaceProvider";

export class SearchPlacesUseCase extends BaseUseCase {
  public constructor(private placesProvider: IPlacesProvider) {
    super();
  }

  async Execute(search: SearchDto, session: Session): Promise<IResult> {
    const result = new Result();
    this.resources.Init(session.language);

    return result;
  }
}
