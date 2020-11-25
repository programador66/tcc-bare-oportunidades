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

  async insertOportunidade(obj ){
    const config = this.headerToken();
    const response = await this.api.post(`/oportunity`, obj, {
      ...config
    });

    return response;
  }

  async updateOportunidade(obj ){
    const config = this.headerToken();
    const response = await this.api.put(`/oportunity`, obj, {
      ...config
    });

    return response;
  }

  async getAllEmpresas() {
    const response = await this.api.get("/empresas");
    return response;
  }

  async getAllVagas() {
    const response = await this.api.get("/vagas");
    return response;
  }
  async getVagasByTitulo(obj) {
    const config = this.headerToken();
    const response = await this.api.post("/vagasByTitulo", obj, {
      ...config
    });
    return response;
  }

  async getAllOportunidadesByIdVaga(obj ){
    const config = this.headerToken();
    const response = await this.api.post(`/get-candidatos-por-vaga`, obj, {
      ...config
    });

    return response;
  }

  async getGerarRelatorio(obj){
    const config = this.headerToken();
    const response = await this.api.post(`/get-relatorio`, obj, {
      ...config
    });

    return response;
  }
}

export default new Empresa();
