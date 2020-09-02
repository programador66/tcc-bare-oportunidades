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
}

export default FaculdadeService;