import BaseController from "./adapters/controllers/BaseController";
import dataBase from "./infrastructure/dataBase/index";
import App from "./infrastructure/server/App";
import "express-async-errors";
import "reflect-metadata";

// Region controllers
import healthController from "./adapters/controllers/health/HealthController";
import authController from "./adapters/controllers/auth/AuthController";
import userController from "./adapters/controllers/user/UserController";
// End controllers

const controllers: BaseController[] = [healthController, authController, userController];

const app = new App(controllers);

dataBase
  .Initialize()
  .then((result) => {
    if (result) {
      app.Listen();
    }
  })
  .catch((error) => {
    console.log("DATABASE ERROR:", error);
  });
