import { Request, Response } from "express";
import UserService from "../services/UserService";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  async create(request: Request, response: Response) {
    try {
      const { email, tp_usuario, senha } = request.body;

      const passwordHash = await bcrypt.hash(senha, 8);

      const usu = { email, tp_usuario, senha: passwordHash };
      const { usuario } = await new UserService().insert(usu);

      console.log(usuario);

      return response.status(200).json({
        msg: "Cadastro realizado com sucesso!",
        data: { ...usu, id: usuario },
      });
    } catch (err) {
      return response.status(406).json({
        msg: "Erro na inserção do Usuario, por favor contatar o ADM",
        error: err.message,
      });
    }
  }

  async index(request: Request, response: Response) {
    const res = await new UserService().getUser();

    return response.json(res);
  }

  async login(request: Request, response: Response) {
    const { email, senha } = request.body;

    const usuario = await new UserService().getUserByEmail(email);

    if (usuario.length === 1) {
      if (await bcrypt.compare(senha, usuario[0].senha)) {
        const token = jwt.sign(
          { id: usuario[0].id },
          process.env.APP_SECRET || "34f08ca07a8ee8dec0c07a844115c08e",
          {
            expiresIn: "1d",
          }
        );

        const data = {
          id: usuario[0].id,
          email: usuario[0].email,
          token,
        };

        return response.status(200).json(data);
      }
    }

    response.status(404).json({ message: "Usuario ou senha inválido!" });
  }
}

export default UserController;
