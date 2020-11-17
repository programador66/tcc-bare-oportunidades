import { Request, Response } from "express";
import UserService from "../services/UserService";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import NovoCadastroFactory from "../factories/NovoCadastroFactory";
import crypto from 'crypto'
import mailer from '../modules/mailer'

class UserController {
  async create(request: Request, response: Response) {
    try {
      const schemaErrors = validationResult(request);
      const userService = new UserService();

      if (!schemaErrors.isEmpty()) {
        return response.status(403).send(schemaErrors.array());
      }
      const { email, tp_usuario, senha } = request.body;

      const passwordHash = await bcrypt.hash(senha, 8);

      const usu = { email, tp_usuario, senha: passwordHash };

      const { usuario } = await userService.insert(usu);

      const novoCadastro = new NovoCadastroFactory(tp_usuario).getClasse();

      const resNovoCadastro = await novoCadastro.cadastrar(
        request,
        Number(usuario)
      );

      if (!resNovoCadastro.success) {
        const del = await userService.deleteUserById(Number(usuario));
   
        throw new Error("Erro na inserção de um novo cadastro!");
      }

      return response.status(201).json({
        msg: "Cadastro realizado com sucesso!",
      });
    } catch (err) {
      return response.status(406).json({
        msg: "Erro na inserção do registro, por favor contatar o ADM",
        error: err.message,
      });
    }
  }

  async index(request: Request, response: Response) {
    const res = await new UserService().getUser();

    return response.json(res);
  }

  async login(request: Request, response: Response) {
    const { email, senha, tp_usuario } = request.body;

    const usuario = await new UserService().getUserByEmail(email, tp_usuario);
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

  async forgotPassword(request: Request, response: Response){
    
    try {
      const { email } = request.body
      const usuario = await new UserService().getUserEmail(email);
    
        if(!usuario)
          return response.status(404).json({ message: 'Usuário não encontrado'})

        const token = crypto.randomBytes(20).toString('hex')

        const now = new Date()
        now.setHours(now.getHours() + 1)
        
        await new UserService().findByIdAndUpdate(usuario.id,token,now);
        
      await mailer.sendMail({
          to: email,
          from: 'bareoportunidades.suport@outlook.com',
          html: `<p>Para realizar a troca da senha Utilize este token: <a href='http://localhost:8080/token/${token}'>${token}</a> </p>
          <p>Atenciosamente: Baré Oportunidades.</p>  
          `,
        }, (err: any) => {
          if(err){
            return response.status(400).send( {message: 'Erro ao enviar email'})
          }
          return response.status(200).send( { message: 'confira sua caixa de entrada' } )
        })

    } catch (error) {
      response.status(400).json( { message: "Erro em esqueci a senha, tente novamente" })
    }
  }

  async reset_password(request: Request, response: Response){
              
    try{
        const { email, token, senha } = request.body;
        const usuario = await new UserService().getUserEmail(email);

        if(!usuario){
          return response.status(400).send( { error: "usuário não encontrado" });
        }

        if(token !== usuario.passwordResetToken)
          return response.status(400).send( { error: "token inválido" })
        
        const now  = new Date();

        if(now > usuario.passwordResetExpires)
          return response.status(400).send( { error: "token expirado" })
          
        const passwordHash = await bcrypt.hash(senha, 8);
        usuario.senha = passwordHash

        await new UserService().updateUserId(usuario.id, usuario).then(() =>{
          return response.status(204).send( { message: "Senha alterada com sucesso"} ) 
        })

      }catch(e){
      response.status(400).json({message: "resetar senha deu erro!!"})
      }
  }
}

export default UserController;
