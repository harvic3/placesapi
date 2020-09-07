import { AuthProvider } from "../../../providers/auth/AuthProvider";
import { LoginUseCase } from "../../../../application/modules/auth/useCases/login";

const authProvider = new AuthProvider();

const loginUseCase = new LoginUseCase(authProvider);

export { loginUseCase };
