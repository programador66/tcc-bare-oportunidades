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
}

export default FaculdadeController;
