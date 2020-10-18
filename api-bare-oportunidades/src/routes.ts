import express from "express";

import { auth } from "./middleware/auth";
import { UserControllerValidate } from "./RequestValidate/ControllerValidate";

import FaculdadeController from "./controllers/FaculdadeController";
import UserController from "./controllers/UserController";
import AlunoController from "./controllers/AlunoController";
import EmpresaController from "./controllers/EmpresaController";

const routes = express.Router();

const userController = new UserController();
const faculdadeController = new FaculdadeController();
const alunoController = new AlunoController();
const empresaController = new EmpresaController();

/** Route:Users */
routes.post("/user", UserControllerValidate.validations, userController.create);
routes.post("/login", userController.login);

/** Route:Faculdade */
routes.get("/faculdades", faculdadeController.index);

routes.use(auth);
routes.post("/getEventsByIdFaculdade", faculdadeController.getEventByIdFaculdade);
routes.post("/createEvent", faculdadeController.createEvent);
routes.post("/deleteEvent", faculdadeController.deleteEvent);
routes.post("/updateEvent", faculdadeController.updateEvent);
routes.post("/getInfoFaculdades", faculdadeController.getFaculdadeByIdUser);
routes.post("/aproveStudents", faculdadeController.aproveStudents);

/** Route:Aluno */
routes.post("/alunos", alunoController.getStudentByCollege);

/** Route:Empresa */
routes.post("/oportunity",empresaController.insertNovaOportunidade);
routes.post("/get-oportunity-by-empresa",empresaController.getOportunidadesByEmpresa);
routes.post("/get-empresa-by-id-usuario",empresaController.getEmpresaById_Usuario);


export default routes;
