import api from "../rotas-api/api";

class usuario extends api {
  async realizarLogin(parametros) {
    const response = await this.api.post("/login", parametros);

    return response;
  }
  async criarNovoUsuario(parametros) {
    const response = await this.api.post('/user', parametros);
    return response;
  }
  // async getCurriculo(parametros) {
  //     let config = this.headerToken();
  //     const response = await this.api.post('candidato/getCurriculo', parametros, { ...config });
  //     return response;
  // }
}

export default new usuario();
