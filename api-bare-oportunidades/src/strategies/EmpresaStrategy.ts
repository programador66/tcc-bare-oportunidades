import ICadastro from "../interfaces/ICadastro";
import { Request } from "express";
import EmpresaService from "../services/EmpresaService";

class EmpresaStrategy implements ICadastro {
  async cadastrar(request: Request, id_usuario: Number): Promise<any> {
    const {
      cnpj,
      logradouro,
      razao_social,
      nome_fantasia,
      fone,
    } = request.body;

    const empresa = new EmpresaService().insert({
      cnpj,
      logradouro,
      razao_social,
      nome_fantasia,
      fone,
      id_usuario,
    });

    return empresa;
  }
  render(): void {
    console.log("renderizando... aluno");
  }
}

export default EmpresaStrategy;
