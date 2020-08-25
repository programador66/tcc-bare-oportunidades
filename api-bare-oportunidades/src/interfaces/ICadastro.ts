interface ICadastro {
  cadastrar(request: any): Promise<any>;
  render(): void;
}

export default ICadastro;
