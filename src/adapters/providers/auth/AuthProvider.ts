import { IAuthProvider } from "../../../application/modules/auth/providerContracts/IAuthProvider";
import { ApplicationError } from "../../../application/shared/errors/ApplicationError";
import * as resultCodes from "../../../application/shared/errors/codes.json";
import httpClient, { Headers } from "../../../infrastructure/httpClient/index";
import resources, { resourceKeys } from "../../../application/shared/locals";
import { JwtDto } from "../../../application/modules/auth/dtos/JwtDto";
import config from "../../../infrastructure/config/index";
import { AuthError } from "./models/AuthError";
import { JwtModel } from "./models/JwtModel";
import mapper from "mapper-tsk";

export class AuthProvider implements IAuthProvider {
  private serviceUrl: string;
  private serviceKey: string;
  private headers: Headers;
  constructor() {
    this.serviceUrl = config.firebase.Auth_Url;
    this.serviceKey = config.firebase.Auth_Key;
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
    if (!this.serviceUrl || !this.serviceKey) {
      throw new ApplicationError(
        resources.GetWithParams(resourceKeys.NON_CONFIGURED_PROVIDER, {
          providerName: "Authentication",
          parms: "Key - Url",
        }),
        resultCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async Login(email: string, password: string): Promise<[JwtDto, string]> {
    const endPoint = `${this.serviceUrl}/accounts:signInWithPassword?key=${this.serviceKey}`;
    const payload = {
      email,
      password,
      returnSecureToken: true,
    };
    const result = await httpClient.Send<JwtModel, AuthError>(endPoint, httpClient.Methods.POST, {
      body: JSON.stringify(payload),
      headers: this.headers,
    });
    if (!result.success) {
      const response = result.response as AuthError;
      return [null, response.error.message];
    }
    const jwt = mapper.MapObject(result.response as JwtModel, new JwtDto());
    return [jwt, null];
  }
}
