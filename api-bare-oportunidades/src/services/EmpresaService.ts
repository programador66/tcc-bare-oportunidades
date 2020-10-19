import knex from "../database/connection";
import IModelEmpresa from "../interfaces/IModelEmpresa";
import IModelVagas from "../interfaces/IModelVagas";

class EmpresaService {
  async insert(empresa: IModelEmpresa) {
    const begintransaction = await knex.transaction();

    const newEmpresa = await begintransaction("empresa")
      .insert(empresa);

    if (!newEmpresa) {
      begintransaction.rollback();
      return { success: false, error: newEmpresa };
    }

    begintransaction.commit();
    return { success: true, empresa: newEmpresa[0] };
  }

  async insertNovaOportunidade(vagas:IModelVagas) {
     const beginTransaction = await knex.transaction();

     const newOportunidade = await beginTransaction("vagas")
      .insert(vagas);

    if (!newOportunidade)  {
      beginTransaction.rollback();
      return {success: false, error: "Não foi possivel cadastrar a vaga!"};

    }
      
    beginTransaction.commit();
     
    return { success: true, vaga: newOportunidade[0] };

  }

  async getOportunidadesByEmpresa(id: Number) {
    try {
      const oportunidades = await knex("vagas")
      .select("*")
      .where('id_empresa', "=", id);
      
      return oportunidades;
    } catch (err) {
      return false;
    }
  }

  async getEmpresaById_Usuario(id: Number) {
    try {
      const empresa = await knex("empresa")
      .select("*")
      .where('id_usuario', "=", id);
      
      return empresa;
    } catch (err) {
      return false;
    }
  }
}

export default EmpresaService;
