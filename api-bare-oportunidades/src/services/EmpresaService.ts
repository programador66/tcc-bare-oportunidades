import knex from "../database/connection";
import IModelEmpresa from "../interfaces/IModelEmpresa";

class EmpresaService {
  async insert(empresa: IModelEmpresa) {
    const begintransaction = await knex.transaction();

    const newEmpresa = await begintransaction("empresa").insert(empresa);

    if (!newEmpresa) {
      begintransaction.rollback();
      return { success: false, error: newEmpresa };
    }

    begintransaction.commit();
    return { success: true, empresa: newEmpresa[0] };
  }
}

export default EmpresaService;
