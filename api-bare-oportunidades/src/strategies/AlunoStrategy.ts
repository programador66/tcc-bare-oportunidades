import ICadastro from "../interfaces/ICadastro";
import { Request } from "express";
import AlunoService from "../services/AlunoService";
class AlunoStrategy implements ICadastro {
  async cadastrar(request: Request, id_usuario: Number): Promise<any> {
    
    const {cpf, sexo, telefone, endereco, registro_academico, nome,id_faculdade } = request.body;

    if (nome === "" || cpf === "" || endereco === "" || telefone === "" || registro_academico === "" || id_faculdade === "") {
      return { success: false, error: "Atenção! campos não podem ser enviados em branco." };
    }
    const sexoform = sexo == 'Masculino' ? 'M' : 'F';
    const aluno = await new AlunoService().insert({cpf, sexo:sexoform, telefone, endereco, registro_academico, nome, id_usuario},id_faculdade);

    return aluno;

  }
  render(): void {
    console.log("renderizando... aluno");
  }
}

export default AlunoStrategy;
