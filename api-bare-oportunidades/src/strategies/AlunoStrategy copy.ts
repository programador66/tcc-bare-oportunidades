import ICadastro from "../interfaces/ICadastro";

class AlunoStrategy implements ICadastro {
  async cadastrar(): Promise<any> {
    console.log("cadastrando aluno");
  }
  render(): void {
    console.log("renderizando... aluno");
  }
}

export default AlunoStrategy;
