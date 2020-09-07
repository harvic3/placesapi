import BaseController, { BaseRequest, Response, NextFunction } from "../BaseController";
import { UserDto } from "../../../application/modules/users/dtos/UserDto";
import { searchPlacesUseCase } from "./container/index";
import { Session } from "../../../domain/session/Session";
import authorization from "../../../infrastructure/middleware/authorization";
import { SearchDto } from "../../../application/modules/places/dtos/SearchDto";

class PlaceController extends BaseController {
  public constructor() {
    super();
    this.InitializeRoutes();
  }

  private InitializeRoutes() {
    this.router.post("/v1/places", authorization(), this.Search);
  }

  Search = async (req: BaseRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const session: Session = req.session;
      const searchDto: SearchDto = req.body;
      this.HandleResult(res, await searchPlacesUseCase.Execute(searchDto, session));
    } catch (error) {
      next(error);
    }
  };
}

const instance = new PlaceController();

export default instance;
