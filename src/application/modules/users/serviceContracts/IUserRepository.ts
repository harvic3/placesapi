import { User } from "../../../../domain/user/User";

export interface IUserRepository {
  Get(email: string): Promise<User>;
  Create(user: User): Promise<User>;
  Update(user: User): Promise<User>;
  Delete(userUid: string): Promise<void>;
}
