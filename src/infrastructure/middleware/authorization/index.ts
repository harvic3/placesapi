import { ApplicationError } from "../../../application/shared/errors/ApplicationError";
import resources, { resourceKeys } from "../../../application/shared/locals/index";
import * as resultCodes from "../../../application/shared/result/resultCodes.json";
import { BaseRequest, Response, NextFunction } from "../../server/CoreModules";
import fireBaseAdmin from "../../../adapters/providers/firebaseAdmin/index";
import { Session } from "../../../domain/session/Session";

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
        req.session = (<unknown>decodedToken) as Session;
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
