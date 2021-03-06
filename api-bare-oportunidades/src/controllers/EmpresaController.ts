import { Request, Response } from "express";
import EmpresaService from "../services/EmpresaService";
import moment from "moment";
import { separarArray } from "../helpers/index"
import AlunoService from "../services/AlunoService";
class EmpresaController {
  async insertNovaOportunidade(request: Request, response: Response) {
    try {
      const { atividades_responsabilidades, titulo, id_empresa, requisitos } = request.body;
      const data_post = moment().locale("pt-br").format("L");
      const hora_post = moment().locale("pt-br").format("HH:MM:SS");

      const vagas = {
        atividades_responsabilidades,
        titulo,
        id_empresa,
        requisitos,
        data_post,
        hora_post,
        status:"A"
      }

      const oportunidade = await new EmpresaService().insertNovaOportunidade(vagas); 
    
      return response.status(201).json(oportunidade);

    } catch (err) {
      return response.status(406).json({
        success: false,
        error: err.message
      });
    }

  }

  async getOportunidadesByEmpresa(request: Request, response: Response) {
  
    try {
      const res = await  new EmpresaService().getOportunidadesByEmpresa(Number(request.body.id_empresa));
    
      return response.status(200).json({
        data: res
      })

    }catch (err) {
      return response.status(406).json({
        error: err.message
      })
    }

  
  }

  async getEmpresaById_Usuario(request: Request, response: Response) {
    try {
      const res = await  new EmpresaService().getEmpresaById_Usuario(Number(request.body.id_usuario));
    
      return response.status(200).json({
        data: res
      })
      
    }catch (err) {
      return response.status(406).json({
        error: err.message
      })
    }

  
  }

  async updateOportunidade(request: Request, response: Response) {
    try {

      const { atividades_responsabilidades, titulo, id_empresa, requisitos,id,status } = request.body;
      const data_post = moment().locale("pt-br").format("L");
      const hora_post = moment().locale("pt-br").format("HH:MM:SS");

      const vagas = {
        atividades_responsabilidades,
        titulo,
        id_empresa,
        requisitos,
        data_post,
        hora_post,
        status
      }

      const oportunidade = await new EmpresaService().updateOportunidade(id,vagas); 
      
      return response.status(200).json(oportunidade);

    } catch (err) {
      return response.status(406).json({
        success: false,
        error: err.message
      });
    }

  }

  async getEmpresas(request: Request, response: Response) {
    try {
      const empresas = await   new EmpresaService().getEmpresas();
      return response.status(200).json(separarArray(empresas,4));
    } catch (error) {
     return response.status(406).json({
       success: false,
       error: error.message
     })
    }
    
  }
  async getVagas(request: Request, response : Response){
    try {
      const vagas = await new EmpresaService().getVagas();
      return response.status(200).json(separarArray(vagas,3))
    } catch (error) {
      return response.status(406).json({
        success: false,
        error: error.message
      })
    }
  }

  async getStudentsByVagas(request: Request, response:Response){
    try {
      const { id_vaga } = request.body;
      const students = await new EmpresaService().getStudentsByOportunity(id_vaga);
      if(students.length === 0) return response.status(200).json({message: 'sem resultados'})
      return response.status(200).json(students);
    } catch (error) {
      return response.status(406).json({
        success: false,
        error: error.message
      })
    }
  }
  async getStudentFavoriteEmpresa(request: Request, response: Response){

    try {
        const { id_usuario} = request.body;
        const aluno = await new AlunoService().getAlunoByIdUsuario(id_usuario)
        if(aluno.length == 0) {
          return  response.status(200).json({ success: false, error: "aluno não encontrado" });
        }
        const empresasFavoritas  = await new EmpresaService().getStudentFavoriteEmpresa(aluno[0].id);                
        return response.status(200).json(empresasFavoritas);
    } catch (error) {
      return response.status(406).json({
        success: false,
        error: error.message
      })
    }
   
       
  } 

    async getAllStudentsByIdVaga(request: Request, response: Response){

    try {
        const { id_vaga } = request.body;
        const alunosPorVaga = await new EmpresaService().getAllStudentsByIdVaga(id_vaga)
        if(alunosPorVaga.length == 0) {
          return  response.status(200).json({ success: true, data: [] });
        }
        
      return response.status(200).json({ success: true, data: alunosPorVaga});;
      
    } catch (error) {
      return response.status(406).json({
        success: false,
        error: error.message
      })
    }


  }
  async getRelatorio(request: Request, response : Response){
      try {
        const { id_empresa, id, candidatos} = request.body;
        const empresa = await new EmpresaService().getEmpresaByid(id_empresa);
        const vagas = await new EmpresaService().getVagasById(id);
        return  new EmpresaService().gerarPDF(candidatos, empresa, vagas, response);
      } catch (error) {
        return response.status(406).json({
          success: false,
          error: error.message
        })
      }
    }
}

export default EmpresaController;
