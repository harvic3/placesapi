import BaseController from "../../adapters/controllers/BaseController";
import resources from "../../application/shared/locals/index";
import { Server, Application } from "../server/CoreModules";
import localization from "../middleware/localization";
import handleError from "../middleware/handleError";
import * as helmet from "helmet";
import config from "../config";
import * as cors from "cors";

export default class App {
  public app: Application;

  constructor(controllers: BaseController[]) {
    this.app = Server();
    this.app.set("trust proxy", true);
    this.LoadMiddleware();
    this.LoadControllers(controllers);
    this.Setup();
    this.LoadHandleError();
  }

  public LoadMiddleware(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(Server.json({ limit: config.params.requestDataLimit }));
    this.app.use(localization());
  }

  private LoadControllers(controllers: BaseController[]) {
    controllers.forEach((controller) => {
      this.app.use(config.server.root, controller.router);
    });
  }

  private LoadHandleError(): void {
    this.app.use(handleError());
  }

  private Setup(): void {
    resources.SetDefaultLanguage(config.params.defaultLang);
  }

  public Listen(): void {
    this.app.listen(config.server.port, () => {
      console.log(
        `Server running on ${config.server.host}:${config.server.port}${config.server.root}`,
      );
    });
  }
}
