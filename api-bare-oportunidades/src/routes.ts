import express from "express";

import UserController from "./controllers/UserController";

import { auth } from "./middleware/auth";

//import { celebrate, Segments, Joi } from "celebrate";

const routes = express.Router();

const userController = new UserController();

routes.post("/user", userController.create);
routes.post("/login", userController.login);

routes.use(auth);
routes.get("/user", userController.index);

//fiz o exemplo de validação com celebrate apenas na rota dos doctors para exemplificar
// routes.post(
//   "/doctors",
//   celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       nome: Joi.string().required(),
//       especialidade: Joi.string().required(),
//       crm: Joi.string().required(),
//     }),
//   }),
//   doctorsController.create
// );

export default routes;
