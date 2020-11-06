import api from "../rotas-api/api";

class Aluno extends api {
  async getAlunoByCollege(id_faculdade) {
    const config = this.headerToken();
    const response = await this.api.post(`/alunos`, id_faculdade, {
      ...config
    });

    return response;
  }

  async applyOportunity(obj) {
    const config = this.headerToken();
    const response = await this.api.post(`/applyOportunity`, obj, {
      ...config
    });

    return response;
  }

  async getOportunityByIdAluno(obj) {
    const config = this.headerToken();
    const response = await this.api.post(`/getAlunoById`, obj, {
      ...config
    });

    return response;
  }
}

export default new Aluno();
