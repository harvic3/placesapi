import BaseController, { Request, Response, NextFunction } from "../BaseController";
import { loginUseCase } from "./container/index";

class AuthController extends BaseController {
  public constructor() {
    super();
    this.InitializeRoutes();
  }

  private InitializeRoutes() {
    this.router.post("/v1/auth/login", this.Login);
    // this.router.post("/v1/auth/login", authorization(), this.LogOut);
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
}

const instance = new AuthController();

export default instance;
