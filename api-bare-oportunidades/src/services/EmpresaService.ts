import knex from "../database/connection";
import IModelEmpresa from "../interfaces/IModelEmpresa";
import IModelVagas from "../interfaces/IModelVagas";
import { separarArray } from "../helpers/index"

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

  async updateOportunidade(id: Number,vagas: IModelVagas) {
    const response = await knex("vagas")
      .where("id_empresa", '=', vagas.id_empresa)
      .where("id", '=', id)
      .update(vagas);
    
    if (!response) {
      return {success:false, error:response}
    }

    return {success: true, msg: "Atualização realizada!"}
  }

  async getEmpresas(){
    const empresa = await knex('empresa').select('*');
    return separarArray(empresa,4)
  }
}

export default EmpresaService;
