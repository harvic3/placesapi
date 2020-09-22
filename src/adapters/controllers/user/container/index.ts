import { CreateUserUseCase } from "../../../../application/modules/users/useCases/create";
import { UpdateUserUseCase } from "../../../../application/modules/users/useCases/update";
import { userRepository } from "../../../repositories/container/index";
import { userProvider } from "../../../providers/container/index";

const createUserUseCase = new CreateUserUseCase(userRepository, userProvider);
const updateUserUserCase = new UpdateUserUseCase(userRepository, userProvider);

export { createUserUseCase, updateUserUserCase };
