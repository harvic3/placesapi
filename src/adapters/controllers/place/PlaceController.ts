import BaseController, { BaseRequest, Response, NextFunction } from "../BaseController";
import { UserDto } from "../../../application/modules/users/dtos/UserDto";
import { searchPlacesUseCase } from "./container/index";
import { Session } from "../../../domain/session/Session";
import authorization from "../../../infrastructure/middleware/authorization";
import { SearchDto } from "../../../application/modules/places/dtos/SearchDto";
import { serialize } from "v8";

class PlaceController extends BaseController {
  public constructor() {
    super();
    this.InitializeRoutes();
  }

  private InitializeRoutes() {
    this.router.get("/v1/places", authorization(), this.Search);
  }

  Search = async (req: BaseRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const session: Session = req.session;
      const searchDto = new SearchDto();
      searchDto.city = req.query?.city?.toString() || null;
      searchDto.point.lat = req.query?.latitude?.toString() || null;
      searchDto.point.lng = req.query?.longitude?.toString() || null;
      searchDto.radius = req.query?.radius?.toString() || null;
      searchDto.language = req.query?.language?.toString() || null;
      this.HandleResult(res, await searchPlacesUseCase.Execute(searchDto, session));
    } catch (error) {
      next(error);
    }
  };
}

const instance = new PlaceController();

export default instance;
