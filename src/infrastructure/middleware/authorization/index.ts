import { ApplicationError } from "../../../application/shared/errors/ApplicationError";
import resources, { resourceKeys } from "../../../application/shared/locals/index";
import * as resultCodes from "../../../application/shared/errors/codes.json";
import { BaseRequest, Response, NextFunction } from "../../server/core/CoreModules";
import fireBaseAdmin from "../../../adapters/providers/firebaseAdmin/index";
import { Session } from "../../../application/modules/session/models/Session";
import config from "../../config/index";

export default function () {
  return async function (req: BaseRequest, res: Response, next: NextFunction): Promise<void> {
    if (!req.headers.authorization) {
      throw new ApplicationError(
        resources.Get(resourceKeys.AUTHORIZATION_REQUIRED),
        resultCodes.UNAUTHORIZED,
      );
    }

    const parts = req.headers.authorization.split(/\s+/);

    if (parts[0].toLowerCase() !== "bearer") {
      throw new ApplicationError(
        resources.Get(resourceKeys.AUTHORIZATION_REQUIRED),
        resultCodes.UNAUTHORIZED,
      );
    }

    if (parts.length !== 2) {
      throw new ApplicationError(
        resources.Get(resourceKeys.AUTHORIZATION_REQUIRED),
        resultCodes.UNAUTHORIZED,
      );
    }

    const bearerToken = parts[1];

    try {
      const decodedToken = await fireBaseAdmin.auth().verifyIdToken(bearerToken);
      if (decodedToken.email) {
        const session = (<unknown>decodedToken) as Session;
        session.language = req.headers["accept-language"] || config.params.defaultLang;
        req.session = session;
      }
    } catch (error) {
      throw new ApplicationError(
        resources.Get(resourceKeys.AUTHORIZATION_REQUIRED),
        resultCodes.UNAUTHORIZED,
      );
    }

    next();
  };
}
