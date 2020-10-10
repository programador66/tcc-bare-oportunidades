import express from "express";

import { auth } from "./middleware/auth";
import { UserControllerValidate } from "./RequestValidate/ControllerValidate";

import FaculdadeController from "./controllers/FaculdadeController";
import UserController from "./controllers/UserController";
import AlunoController from "./controllers/AlunoController";

const routes = express.Router();

const userController = new UserController();
const faculdadeController = new FaculdadeController();
const alunoController = new AlunoController();

/** Route:Users */
routes.post("/user", UserControllerValidate.validations, userController.create);
routes.post("/login", userController.login);

/** Route:Faculdade */
routes.get("/faculdades", faculdadeController.index);

routes.use(auth);
routes.post("/getEventsByIdFaculdade", faculdadeController.getEventByIdFaculdade);
routes.post("/getInfoFaculdades", faculdadeController.getFaculdadeByIdUser);
routes.post("/createEvent", faculdadeController.createEvent);
routes.post("/aproveStudents", faculdadeController.aproveStudents);

/** Route:Aluno */
routes.post("/alunos", alunoController.getStudentByCollege);

export default routes;
