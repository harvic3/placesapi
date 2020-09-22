import { AuthProvider } from "../../../providers/auth/AuthProvider";
import { LoginUseCase } from "../../../../application/modules/auth/useCases/login";
import { LogoutUseCase } from "../../../../application/modules/auth/useCases/logout";

const authProvider = new AuthProvider();

const loginUseCase = new LoginUseCase(authProvider);
const logoutUseCase = new LogoutUseCase(authProvider);

export { loginUseCase, logoutUseCase };
