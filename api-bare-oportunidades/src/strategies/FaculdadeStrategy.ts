import ICadastro from "../interfaces/ICadastro";
import FaculdadeService from "../services/FaculdadeService";
import IModelFaculdade from "../interfaces/IModelFaculdade";

class FaculdadeStrategy implements ICadastro {
  async cadastrar(request: IModelFaculdade): Promise<any> {
    const faculdade = new FaculdadeService().insert(request);

    return faculdade;
  }

  render(): void {
    console.log("renderizando... faculdade");
  }
}

export default FaculdadeStrategy;
