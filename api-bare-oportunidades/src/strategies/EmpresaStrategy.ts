import ICadastro from "../interfaces/ICadastro";
import { Request } from "express";
import EmpresaService from "../services/EmpresaService";

class EmpresaStrategy implements ICadastro {
  async cadastrar(request: Request, id_usuario: Number): Promise<any> {
    const {
      cnpj,
      cep,
      razao_social,
      nome_fantasia,
      fone,
      descricao_empresa
    } = request.body;

    const empresa = new EmpresaService().insert({
      cnpj,
      cep,
      razao_social,
      nome_fantasia,
      fone,
      id_usuario,
      descricao_empresa
    });

    return empresa;
  }
  render(): void {
    console.log("renderizando... aluno");
  }
}

export default EmpresaStrategy;
