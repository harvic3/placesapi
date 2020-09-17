import BaseController, { BaseRequest, Response, NextFunction } from "../BaseController";
import authorization from "../../../infrastructure/middleware/authorization";
import { getUserHistoricalUseCase } from "./container/index";
import { Session } from "../../../domain/session/Session";

class HistoricalController extends BaseController {
  public constructor() {
    super();
    this.InitializeRoutes();
  }

  private InitializeRoutes() {
    this.router.get("/v1/user/:userId/historical", authorization(), this.Get);
  }

  Get = async (req: BaseRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const session: Session = req.session;
      const userId = Number(req.params.userId);
      this.HandleResult(res, await getUserHistoricalUseCase.Execute(userId, session));
    } catch (error) {
      next(error);
    }
  };
}

const instance = new HistoricalController();

export default instance;
