import api from "../rotas-api/api";

class Faculdade extends api {
  async getFaculdades() {
    const response = await this.api.get("/faculdades");

    return response;
  }
}

export default new Faculdade();
