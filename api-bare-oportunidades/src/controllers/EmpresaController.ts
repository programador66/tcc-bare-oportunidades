import { Request, Response } from "express";
import EmpresaService from "../services/EmpresaService";
import moment from "moment";

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

}

export default EmpresaController;
