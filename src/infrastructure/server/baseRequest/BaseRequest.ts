import { Session } from "../../../domain/session/Session";
import { Request } from "../CoreModules";

export interface BaseRequest extends Request {
  session: Session;
}
