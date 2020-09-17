import { Request, Response, NextFunction } from "../../server/core/CoreModules";
import resources from "../../../application/shared/locals/index";
import config from "../../config";

export default function () {
  return function (req: Request, res: Response, next: NextFunction): void {
    resources.Init(req.headers["accept-language"] || config.params.defaultLang);
    next();
  };
}
