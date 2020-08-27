import express from "express";

import UserController from "./controllers/UserController";

import { auth } from "./middleware/auth";
import  {UserControllerValidate} from './RequestValidate/ControllerValidate';

const routes = express.Router();

const userController = new UserController();

routes.post("/user", UserControllerValidate.validations,userController.create);
routes.post("/login", userController.login);

routes.use(auth);
routes.get("/user", userController.index);

export default routes;
