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
}

export default FaculdadeService;
