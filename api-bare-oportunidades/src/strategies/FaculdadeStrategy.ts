import { Request } from "express";
import ICadastro from "../interfaces/ICadastro";
import FaculdadeService from "../services/FaculdadeService";
class FaculdadeStrategy implements ICadastro {
  async cadastrar(request: Request, id_usuario: Number): Promise<any> {
    const { nome, endereco, cnpj, telefone } = request.body;

    if (nome === "" || cnpj === "" || endereco === "" || telefone === "") {
      return { success: false, error: "Existem campos Nulos" };
    }

    const faculdade = new FaculdadeService().insert({
      nome,
      endereco,
      cnpj,
      telefone,
      id_usuario,
    });

    return faculdade;
  }

  render(): void {
    console.log("renderizando... faculdade");
  }
}

export default FaculdadeStrategy;
