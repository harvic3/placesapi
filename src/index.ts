import BaseController from "./adapters/controllers/BaseController";
import App from "./infrastructure/server/App";
import "express-async-errors";
import "reflect-metadata";

// Region controllers
import healthController from "./adapters/controllers/health/HealthController";
import authController from "./adapters/controllers/auth/AuthController";
import userController from "./adapters/controllers/user/UserController";
import placeController from "./adapters/controllers/place/PlaceController";
// End controllers

const controllers: BaseController[] = [
  healthController,
  authController,
  userController,
  placeController,
];

const app = new App(controllers);

app.Start();
