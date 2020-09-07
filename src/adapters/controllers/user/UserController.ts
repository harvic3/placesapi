import BaseController, { BaseRequest, Response, NextFunction } from "../BaseController";
import { UserDto } from "../../../application/modules/users/dtos/UserDto";
import { createUserUseCase, updateUserUserCase } from "./container/index";
import { Session } from "../../../domain/session/Session";
import authorization from "../../../infrastructure/middleware/authorization";

class UserController extends BaseController {
  public constructor() {
    super();
    this.InitializeRoutes();
  }

  private InitializeRoutes() {
    this.router.post("/v1/user", authorization(), this.Create);
    this.router.put("/v1/user", authorization(), this.Update);
  }

  Create = async (req: BaseRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const session: Session = req.session;
      const userDto: UserDto = req.body;
      const password = req.body.password;
      this.HandleResult(res, await createUserUseCase.Execute(userDto, password, session));
    } catch (error) {
      next(error);
    }
  };
  Update = async (req: BaseRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const session: Session = req.session;
      const userDto: UserDto = req.body;
      this.HandleResult(res, await updateUserUserCase.Execute(userDto, session));
    } catch (error) {
      next(error);
    }
  };
}

const instance = new UserController();

export default instance;
