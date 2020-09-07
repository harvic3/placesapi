import { User } from "../../../../domain/user/User";
import { UserDto } from "../dtos/UserDto";

export interface IUserProvider {
  Get(email: string): Promise<User>;
  Create(userDto: UserDto, password: string): Promise<User>;
  Update(userDto: UserDto): Promise<User>;
  Delete(userUid: string): Promise<void>;
  UpdateClaims(userUid: string, userId: number): Promise<void>;
}
