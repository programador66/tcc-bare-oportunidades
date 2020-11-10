import knex from "../database/connection";
import IModelAluno from "../interfaces/IModelAluno";
import IModelSelecoesCandidato  from "../interfaces/IModelSelecoesCandidato"
import IModelVagaFavorita  from "../interfaces/IModelVagaFavorita"
class AlunoService {
  async insert(aluno: IModelAluno, id_faculdade: Number) {
    const begintransaction = await knex.transaction();

    const newAluno = await begintransaction("aluno").insert(aluno);

    const aprova_aluno = await begintransaction("aprova_aluno").insert({
      status: "I",
      id_aluno: newAluno[0],
      id_faculdade,
    });

    if (!newAluno || !aprova_aluno) {
      begintransaction.rollback();
      return { success: false, error: "Erro na inserção do aluno" };
    }

    begintransaction.commit();
    return { success: true, aluno: newAluno[0] };
  }

  async getStudentByCollege(id_faculdade: Number) {

    const aluno = await  knex
      .from("aprova_aluno")
      .innerJoin("aluno", "aprova_aluno.id_aluno", "aluno.id")
      .where("aprova_aluno.id_faculdade", "=", id_faculdade);

    return aluno;
  }

  async getStudentById(id: number) {
    const aluno = await knex('aluno').select('*').where({id_usuario:id}).first();
    return aluno;
  }

  async applyOportinity(selecao: IModelSelecoesCandidato){
    const begintransaction = await knex.transaction();

    let selecaoVaga = await begintransaction('selecoes_candidato').insert(selecao)

    if(!selecaoVaga){
      begintransaction.rollback();
      return { success: false, error: "Erro na inserção da candidatura" };
    }
    begintransaction.commit();

    return { success: true, msg: "Candidatura enviada favor aguardar o contanto da empresa!" };
  }

  async getOportunitiesByIdAluno(id_aluno: Number) {
    const vagasByAluno = await  knex.select("selecoes_candidato.*","vagas.titulo","vagas.id as id__vagas","empresa.razao_social","empresa.descricao_empresa","empresa.fone","empresa.cep","empresa.id as idemp")
      .from("selecoes_candidato")
      .innerJoin("vagas", "selecoes_candidato.id_vagas", "vagas.id")
      .innerJoin("empresa","empresa.id","vagas.id_empresa")
      .where("selecoes_candidato.id_aluno", "=", id_aluno);

    return vagasByAluno;
  }

  async getExistStudentForVaga(id_aluno: Number, id_vaga: Number) {
    const vagasByAluno = await  knex.select("selecoes_candidato.*","vagas.titulo","vagas.id as id__vagas","empresa.razao_social","empresa.descricao_empresa","empresa.fone","empresa.cep","empresa.id as idemp")
      .from("selecoes_candidato")
      .innerJoin("vagas", "selecoes_candidato.id_vagas", "vagas.id")
      .innerJoin("empresa","empresa.id","vagas.id_empresa")
      .where("selecoes_candidato.id_aluno", "=", id_aluno).and.where("selecoes_candidato.id_vagas", "=", id_vaga);

    return vagasByAluno;
  }

  /**
   * params  - obj  { IModelVagaFavorita }
   * salvar favorito
   */ 
  async  applyFavoriteCompany(favorite :  IModelVagaFavorita){
      

      const aluno = await knex('empresa_candidato_favorito').where({'id_empresa':favorite.id_empresa,'id_aluno':favorite.id_aluno}).first();
      if(!aluno){
        const begintransaction = await knex.transaction();
        const favoriteEmpresa = await begintransaction('empresa_candidato_favorito').insert(favorite);
        if(!favoriteEmpresa){
          begintransaction.rollback();
          return { success: false, error: "Erro na inserção do favorito" };
        }

        begintransaction.commit();

        return { success: true, msg: "sucesso ao seguir Empresa!" };

      }else{
        return { success: false, error: "favorito já cadastrado!" }
      }
  }
    /**
   * params  - obj  { IModelVagaFavorita }
   * deletar favorito
   */ 
  async deleteFavoriteCompany(id_empresa: any, id_usuario: any){

      const aluno = await this.getAlunoByIdUsuario(id_usuario);
      if(aluno.length == 0) {
        return { success: false, error: "aluno não encontrado" }
      }
      const aux = await knex('empresa_candidato_favorito').where({'id_empresa':id_empresa,'id_aluno':aluno[0].id}).first()
      
       if(aux){
        await knex('empresa_candidato_favorito').where({'id':aux.id}).delete() 
          return { success: true, msg: "favorito excluído com sucesso" };;
       } else{
        return { success: false, error: "Erro ao excluir favorito" };
       }
      
  }

  async getAlunoByIdUsuario(id_usuario: Number) {
    const aluno = await  knex.select("aluno.*")
      .from("aluno")
      .innerJoin("usuario", "aluno.id_usuario", "usuario.id")
      .where("aluno.id_usuario", "=", id_usuario);

    return aluno;
  }

  async desistirVaga(id:any){
      await knex('selecoes_candidato').where({id}).delete();
      return { success: true, msg: "favorito excluído com sucesso" };;
  }
}

export default AlunoService;
