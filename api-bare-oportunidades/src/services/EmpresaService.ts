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
    try {
      const empresas = await knex('empresa').select('*');
      return empresas;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getVagas(){
    try {
      const vagas = await knex('vagas')
        .select('empresa.*',"vagas.titulo", "vagas.id as id_vaga","vagas.atividades_responsabilidades","vagas.data_post", "vagas.requisitos","vagas.hora_post", "vagas.status")
        .innerJoin('empresa', 'empresa.id', 'vagas.id_empresa')
        .orderBy([{column: 'vagas.data_post',order:'desc'},{ column: 'vagas.hora_post',order: 'desc'}]);                               
      return vagas;
    } catch (error) {
      throw new Error(error.message)
    }
   
  }
  async getVagasById(id: number){
    try {
      const vagas = await knex('vagas')
        .select('*').where({id}) .first()                              
      return vagas;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getStudentsByOportunity(id: number){
      const vaga = await this.getVagasById(id);
      
      const candidaturas = await knex('aluno').select('aluno.nome', 'aluno.telefone','aluno.sexo','aluno.registro_academico','usuario.email')
        .innerJoin('usuario','aluno.id_usuario','usuario.id')
        .join('selecoes_candidato', 'aluno.id','selecoes_candidato.id_aluno')
        .join('vagas','selecoes_candidato.id_vagas','vagas.id').where('vagas.id',id)
      
      return candidaturas;
  }

  async getEmpresaByid (id: number){
   
     try {
      const empresa =  await knex('empresa').select('*').where( { id } ).first();
      return empresa;
     } catch (error) {
      throw new Error(error.message)
     }
  }
}

export default EmpresaService;
