import { IUserProvider } from "../../../application/modules/users/providerContracts/IUserProvider";
import fireBaseAdmin from "../firebaseAdmin/index";
import { UserDto } from "../../../application/modules/users/dtos/UserDto";
import { User } from "../../../domain/user/User";
import { FbUser } from "./models/FbUser";

export class UserProvider implements IUserProvider {
  async Get(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async Create(userDto: UserDto, password: string): Promise<User> {
    const user = new FbUser(null, userDto.email, userDto.displayName, userDto.phoneNumber);
    user.SetPassword(password);
    delete user.uid;
    const created = await fireBaseAdmin.auth().createUser(user);
    const result = new User(created.uid, created.email, created.displayName, created.phoneNumber);
    return result;
  }
  async Update(userDto: UserDto): Promise<User> {
    const user = new FbUser(userDto.uid, userDto.email, userDto.displayName, userDto.phoneNumber);
    const updated = await fireBaseAdmin.auth().updateUser(user.uid, user);
    const result = new User(updated.uid, updated.email, updated.displayName, updated.phoneNumber);
    return result;
  }
  async Delete(uid: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async UpdateClaims(userUid: string, userId: number): Promise<void> {
    const claims = {
      localId: userId,
    };
    await fireBaseAdmin.auth().setCustomUserClaims(userUid, claims);
  }
}
