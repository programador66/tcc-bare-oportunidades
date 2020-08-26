import knex from "../database/connection";
import IModelAluno from "../interfaces/IModelAluno";

class AlunoService {
  async insert(aluno: IModelAluno) {
    const begintransaction = await knex.transaction();

    const newAluno = await begintransaction("aluno").insert(aluno);

    if (!newAluno) {
      begintransaction.rollback();
      return { success: false, error: newAluno };
    }

    begintransaction.commit();
    return { success: true, aluno: newAluno[0] };
  }
}

export default AlunoService;
