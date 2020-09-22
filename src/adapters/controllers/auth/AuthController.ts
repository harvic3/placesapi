import BaseController, { Request, BaseRequest, Response, NextFunction } from "../BaseController";
import authorization from "../../../infrastructure/middleware/authorization/index";
import { Session } from "../../../application/modules/session/models/Session";
import { loginUseCase, logoutUseCase } from "./container/index";

class AuthController extends BaseController {
  public constructor() {
    super();
    this.InitializeRoutes();
  }

  private InitializeRoutes() {
    this.router.post("/v1/auth/login", this.Login);
    this.router.post("/v1/auth/logout", authorization(), this.Logout);
  }

  Login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      this.HandleResult(res, await loginUseCase.Execute(email, password));
    } catch (error) {
      next(error);
    }
  };
  Logout = async (req: BaseRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const session: Session = req.session;
      this.HandleResult(res, await logoutUseCase.Execute(session));
    } catch (error) {
      next(error);
    }
  };
}

const instance = new AuthController();

export default instance;
