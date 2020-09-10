import knex from "../database/connection";
import IModelFaculdade from "../interfaces/IModelFaculdade";

class FaculdadeService {
  async insert(faculdade: IModelFaculdade) {
    const newFaculdade = await knex("faculdade").insert(faculdade);

    if (!newFaculdade) {
      return { success: false, error: newFaculdade };
    }

    return { success: true, faculdade: newFaculdade[0] };
  }

  async getFaculdades() {
    const faculdade = await knex("faculdade").select("nome", "id");

    return faculdade;
  }

  async getFaculdadesByIdUser(id: Number) {
    const faculdade = await knex
      .select("faculdade.id", "faculdade.nome", "usuario.email")
      .from("faculdade")
      .innerJoin("usuario", "faculdade.id_usuario", "usuario.id")
      .where("usuario.id", "=", id);

    return faculdade;
  }
}

export default FaculdadeService;
