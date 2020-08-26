import ICadastro from "../interfaces/ICadastro";
import { Request } from "express";
import AlunoService from "../services/AlunoService";
class AlunoStrategy implements ICadastro {
  async cadastrar(request: Request, id_usuario: Number): Promise<any> {
    
    const {cpf, sexo, telefone, endereco, registro_academico, nome } = request.body;

    const aluno = new AlunoService().insert({cpf, sexo, telefone, endereco, registro_academico, nome, id_usuario});

    return aluno;

  }
  render(): void {
    console.log("renderizando... aluno");
  }
}

export default AlunoStrategy;
