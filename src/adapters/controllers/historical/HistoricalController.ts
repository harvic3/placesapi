import BaseController, { BaseRequest, Response, NextFunction } from "../BaseController";
import { Session } from "../../../application/modules/session/models/Session";
import authorization from "../../../infrastructure/middleware/authorization";
import { getUserHistoricalUseCase } from "./container/index";

class HistoricalController extends BaseController {
  public constructor() {
    super();
    this.InitializeRoutes();
  }

  private InitializeRoutes() {
    this.router.get("/v1/user/:userUid/historical", authorization(), this.Get);
  }

  Get = async (req: BaseRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const session: Session = req.session;
      const userUid = req.params?.userUid || null;
      const startDate = req.query?.start?.toString() || null;
      const endDate = req.query?.end?.toString() || null;
      this.HandleResult(
        res,
        await getUserHistoricalUseCase.Execute(userUid, startDate, endDate, session),
      );
    } catch (error) {
      next(error);
    }
  };
}

const instance = new HistoricalController();

export default instance;
