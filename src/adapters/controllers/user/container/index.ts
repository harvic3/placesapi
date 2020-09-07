import { CreateUserUseCase } from "../../../../application/modules/users/useCases/create";
import { UpdateUserUseCase } from "../../../../application/modules/users/useCases/update";
import { UserRepository } from "../../../repositories/user/UserRepository";
import { UserProvider } from "../../../providers/users/UserProvider";

const userProvider = new UserProvider();
const userRepository = new UserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository, userProvider);
const updateUserUserCase = new UpdateUserUseCase(userRepository, userProvider);

export { createUserUseCase, updateUserUserCase };
