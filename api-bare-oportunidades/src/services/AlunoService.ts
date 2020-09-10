import knex from "../database/connection";
import IModelAluno from "../interfaces/IModelAluno";

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
    const begintransaction = await knex.transaction();

    const aluno = begintransaction
      .from("aprova_aluno")
      .innerJoin("aluno", "aprova_aluno.id_aluno", "aluno.id")
      .where("aprova_aluno.id_faculdade", "=", id_faculdade);

    return aluno;
  }
}

export default AlunoService;
