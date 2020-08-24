import axios from "axios";

class api {
  constructor() {
    const api = axios.create({
      baseURL: "http://localhost:3333"
    });

    this.api = api;
  }

  headerToken() {
    const token = JSON.parse(sessionStorage.getItem("usuario")).token;
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    };

    return config;
  }
}

export default api;
