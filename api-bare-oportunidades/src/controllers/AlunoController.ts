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


    const candidatura  = await new AlunoService().getExistStudentForVaga(aluno.id, vaga.id);
    if(!candidatura){
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
        
    }else
      return response.status(404).json({message: 'usuário não encontrado'})
      
    }else
      return response.status(406).json({message: 'aluno já cadastrado nessa vaga!'})
    
  
  }

  async getAlunoByIdUsuario(request: Request, response : Response) {
    const { id_usuario } = request.body;
    
    const aluno = await new AlunoService().getAlunoByIdUsuario(Number(id_usuario));

    if (aluno.length == 0)
      return response.status(200).json({ msg: "Nenhum dado retornado do bd!" });
    
    const vagasByAluno = await new AlunoService().getOportunitiesByIdAluno(Number(aluno[0].id));

    const res = {
      aluno,
      vagasEscolhidas: vagasByAluno
    }
    return response.status(200).json({
      data: res,
    });
  }

  async favoriteEmpresa(request: Request, response: Response){
    const { id_empresa, id_usuario } = request.body;

    const aluno = await new AlunoService().getStudentById(id_usuario);
    const empresa = await new EmpresaService().getEmpresaByid(id_empresa);
    if(aluno && empresa){
        const empresaFavorita = {
          favorito: 'A',
          id_empresa: empresa.id,
          id_aluno: aluno.id
        }

        try {
          const res = await new AlunoService().applyFavoriteCompany(empresaFavorita);
          return response.status(200).json(res);
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

  async deleteFavorite(request: Request, response: Response) {
    const { id_empresa, id_usuario } = request.body;
    const msg = await new AlunoService().deleteFavoriteCompany(id_empresa,id_usuario);
    return response.status(200).json(msg);
  }
}

export default AlunoController;
