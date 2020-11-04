import { Request, Response } from "express";
import moment from "moment";
import AlunoService from "../services/AlunoService";
import EmpresaService from "../services/EmpresaService";

class AlunoController {
  async getStudentByCollege(request: Request, response: Response) {
    const { id_faculdade } = request.body;

    const alunos = await new AlunoService().getStudentByCollege(
      Number(id_faculdade)
    );

    return response.status(200).json({
      data: alunos,
    });
  }

  async applyOportunity(request: Request, response: Response){
    const { id_usuario , id_vaga  } = request.body;

    const aluno = await new AlunoService().getStudentById(id_usuario);
    const vaga = await new EmpresaService().getVagasById(id_vaga);
    if(aluno && vaga){
        const selecaoCandidato = {
          status_selecao: 'A',
          data_selecao: moment().locale("pt-br").format("L"),
          id_vagas: vaga.id,
          id_aluno: aluno.id
        }

        try {
          const res = await new AlunoService().applyOportinity(selecaoCandidato);
          return response.status(200).json(res)
        } catch (error) {
          return response.status(406).json({
            success: false,
            error: error.getMessage,
          });
        }
        
    }else{
      return response.status(404).json({message: 'usuário não encontrado'})
    }

  }
}

export default AlunoController;
