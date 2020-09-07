import BaseController, { BaseRequest, Response, NextFunction } from "../BaseController";
import * as resultCodes from "../../../application/shared/result/resultCodes.json";
import config from "../../../infrastructure/config/index";
import * as moment from "moment";

class HealthController extends BaseController {
  public constructor() {
    super();
    this.InitializeRoutes();
  }

  private InitializeRoutes() {
    this.router.get(config.server.healthPath, this.Pong);
  }

  Pong = async (req: BaseRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      res
        .status(resultCodes.SUCCESS)
        .send(`<div><h2>API online at ${moment().format()}</h2></div>`);
    } catch (error) {
      next(error);
    }
  };
}

const instance = new HealthController();

export default instance;
