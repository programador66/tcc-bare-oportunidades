import { Request, Response } from "express";
import FaculdadeService from "../services/FaculdadeService";

class FaculdadeController {
  async index(request: Request, response: Response) {
    try {
      const faculdade = await new FaculdadeService().getFaculdades();

      return response.status(200).json({
        data: faculdade,
      });
    } catch (error) {
      return response.status(406).json({
        error: error.getMessage,
      });
    }
  }

  async getFaculdadeByIdUser(request: Request, response: Response) {
    try {
      const { id } = request.body;
     
      const faculdade = await new FaculdadeService().getFaculdadesByIdUser(
        Number(id)
      );

      if (!faculdade) {
        return response.status(406).json({
          msg: "Faculdade Não encontrada!",
        });
      }

      return response.status(200).json({
        data: faculdade,
      });
    } catch (error) {
      return response.status(406).json({
        error: error.getMessage,
      });
    }
  }

  async createEvent(request: Request, response: Response) {
    try {
      const { descricao, data_inicial, data_final, id_faculdade } = request.body;

      const event = await new FaculdadeService().createEvent({ descricao, data_inicial, data_final, id_faculdade });

      return response.status(200).json({
        data: event,
      });
    } catch (error) {
      return response.status(406).json({
        success: false,
        error: error.getMessage,
      });
    }
  }

  async aproveStudents(request: Request, response: Response) {
    try {
      
      const { status, id_aluno, observacao, id_faculdade } = request.body;
      const faculdadeService =  new FaculdadeService();
      const aprovados = await faculdadeService.getAprovacoesById(id_faculdade, id_aluno);
      console.log(aprovados);
      // const aprov = await new FaculdadeService().aproveStudents({ status, id_aluno, observacao, id_faculdade });

      // return response.status(200).json({
      //   data: aprov,
      // });
    } catch (error) {
      return response.status(406).json({
        success: false,
        error: error.getMessage,
      });
    }
  }
}

export default FaculdadeController;
