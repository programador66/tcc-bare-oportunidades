interface ICadastro {
  cadastrar(request: any, id_usuario: Number): Promise<any>;
  render(): void;
}

export default ICadastro;
