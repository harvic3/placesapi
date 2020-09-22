import { Session } from "../../../application/modules/session/models/Session";
import { Request } from "../core/CoreModules";

export interface BaseRequest extends Request {
  session: Session;
}
