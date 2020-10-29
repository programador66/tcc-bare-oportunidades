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

  async getEventByIdFaculdade(obj) {
    const config = this.headerToken();
    const response = await this.api.post(`/getEventsByIdFaculdade`, obj, {
      ...config
    });

    return response;
  }

  async updateEvent(obj) {
    const config = this.headerToken();
    const response = await this.api.post(`/updateEvent`, obj, {
      ...config
    });

    return response;
  }

  async deleteEvent(obj) {
    const config = this.headerToken();
    const response = await this.api.post(`/deleteEvent`, obj, {
      ...config
    });

    return response;
  }

  async aproveStudents(obj) {
  const config = this.headerToken();
  const response = await this.api.post(`/aproveStudents`, obj, {
    ...config
  });

  return response;
  }
  
  async getAllEventos() {
    const response = await this.api.get("/eventos");

    return response;
  }
}

export default new Faculdade();
