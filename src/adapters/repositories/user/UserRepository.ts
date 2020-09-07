import { IUserRepository } from "../../../application/modules/users/serviceContracts/IUserRepository";
import { User as UserModel } from "../../../infrastructure/dataBase/entity/User.model";
import dataBase from "../../../infrastructure/dataBase/index";
import config from "../../../infrastructure/config/index";
import { User } from "../../../domain/user/User";

export class UserRepository implements IUserRepository {
  async Get(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async Create(user: User): Promise<User> {
    const language = user?.language ? user.language : config.params.defaultLang;
    const result = await dataBase.connection
      .getRepository(UserModel)
      .createQueryBuilder()
      .insert()
      .values({
        uid: user.uid,
        email: user.email,
        disPlayName: user.displayName,
        phoneNumber: user.phoneNumber,
        language: language,
      })
      .execute();
    if (!result.generatedMaps) {
      return null;
    }
    user.SetUserId(Number(result.identifiers[0].userId));
    if (!user.language) {
      user.SetLanguage(language);
    }
    return user;
  }
  async Update(user: User): Promise<User> {
    const language = user?.language ? user.language : config.params.defaultLang;
    const entityManager = dataBase.connection.manager;
    await entityManager
      .createQueryBuilder()
      .update(UserModel)
      .set({
        email: user.email,
        disPlayName: user.displayName,
        phoneNumber: user.phoneNumber,
        language: language,
      })
      .where("uid = :userUid", { userUid: user.uid })
      .execute();
    if (!user.language) {
      user.SetLanguage(language);
    }
    return user;
  }
  async Delete(userUid: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
