import { IAuthProvider } from "../../../application/modules/auth/providerContracts/IAuthProvider";
import httpClient, { Headers } from "../../../infrastructure/httpClient/index";
import { JwtDto } from "../../../application/modules/auth/dtos/JwtDto";
import config from "../../../infrastructure/config/index";
import { AuthError } from "./models/AuthError";
import { JwtModel } from "./models/JwtModel";
import mapper from "mapper-tsk";

export class AuthProvider implements IAuthProvider {
  async Login(email: string, password: string): Promise<[JwtDto, string]> {
    const endPoint = `${config.firebase.Auth_Url}/accounts:signInWithPassword?key=${config.firebase.Auth_Key}`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const payload = {
      email,
      password,
      returnSecureToken: true,
    };
    const result = await httpClient.Send<JwtModel, AuthError>(endPoint, httpClient.Methods.POST, {
      body: JSON.stringify(payload),
      headers: headers,
    });
    if (!result.success) {
      const response = result.response as AuthError;
      return [null, response.error.message];
    }
    const jwt = mapper.MapObject(result.response as JwtModel, new JwtDto());
    return [jwt, null];
  }
}
