import knex from "../database/connection";
import IModelAluno from "../interfaces/IModelAluno";
import IModelSelecoesCandidato  from "../interfaces/IModelSelecoesCandidato"
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

    selecaoVaga = await this.getApplyOportiny(selecaoVaga[0])
    return { success: true, data: selecaoVaga };
  }

  async getApplyOportiny(data: any){
    const candidatura = await knex('selecoes_candidato').select('*').where({id:data}).first();
    return candidatura;
  }
}

export default AlunoService;
