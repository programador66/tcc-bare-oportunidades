import api from "../rotas-api/api";

class Faculdade extends api {
  async getFaculdades() {
    const response = await this.api.get("/faculdades");

    return response;
  }

  async getInfoFaculdades(id) {
    const config = this.headerToken();
    const response = await this.api.post(`/getInfoFaculdades`, id, {
      ...config
    });

    return response;
  }

  async createEvent(obj) {
    const config = this.headerToken();
    const response = await this.api.post(`/createEvent`, obj, {
      ...config
    });

    return response;
  }

}

export default new Faculdade();
