import api from "../rotas-api/api";

class Empresa extends api {

  async getEmpresaByUsuario(id) {
    const config = this.headerToken();
    const response = await this.api.post(`/get-empresa-by-id-usuario`, id, {
      ...config
    });

    return response;
  }

  async getOportunidades(id) {
    const config = this.headerToken();
    const response = await this.api.post(`/get-oportunity-by-empresa`, id, {
      ...config
    });

    return response;
  }

}

export default new Empresa();
