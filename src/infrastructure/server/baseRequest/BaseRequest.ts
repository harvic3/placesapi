import { Session } from "../../../domain/session/Session";
import { Request } from "../core/CoreModules";

export interface BaseRequest extends Request {
  session: Session;
}
