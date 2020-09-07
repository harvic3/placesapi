import { JwtDto } from "../dtos/JwtDto";

export interface IAuthProvider {
  Login(email: string, password: string): Promise<[JwtDto, string]>;
}
