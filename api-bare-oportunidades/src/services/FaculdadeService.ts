import knex from "../database/connection";
import IModelFaculdade from "../interfaces/IModelFaculdade";

class FaculdadeService {
  async insert(faculdade: IModelFaculdade) {
    const begintransaction = await knex.transaction();

    const newFaculdade = await begintransaction("faculdade").insert(faculdade);

    if (!newFaculdade) {
      begintransaction.rollback();
      return { success: false, error: newFaculdade };
    }

    begintransaction.commit();
    return { success: true, faculdade: newFaculdade[0] };
  }
}

export default FaculdadeService;
