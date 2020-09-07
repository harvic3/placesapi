import { Router, Response, RouterType } from "../../infrastructure/server/CoreModules";
export {
  Request,
  Response,
  NextFunction,
  BaseRequest,
} from "../../infrastructure/server/CoreModules";
import { IResult } from "result-tsk";

export default class BaseController {
  router: RouterType;
  constructor() {
    this.router = Router();
  }
  HandleResult(res: Response, result: IResult): void {
    if (result.success) {
      res
        .status(result.statusCode)
        .json(result.message ? result.ToResultDto() : result.ToResultDto().data);
    } else {
      res.status(result.statusCode).json(result.ToResultDto());
    }
  }
}
