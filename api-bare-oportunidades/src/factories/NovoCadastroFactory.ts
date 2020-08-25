import FaculdadeStrategy from "../strategies/FaculdadeStrategy";
import ICadastro from "../interfaces/ICadastro";
import AlunoStrategy from "../strategies/AlunoStrategy copy";

class NovoCadastroFactory {
  constructor(private tp_usuario: String) {
    this.tp_usuario = tp_usuario;
  }

  getClasse(): ICadastro {
    switch (this.tp_usuario) {
      case "F":
        return new FaculdadeStrategy();

        break;

      case "A":
        return new AlunoStrategy();

        break;

      default:
        throw new Error("Strategy Inválida!");
    }
  }
}

export default NovoCadastroFactory;
