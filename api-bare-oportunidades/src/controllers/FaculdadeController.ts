import { Request, Response } from "express";
import FaculdadeService from "../services/FaculdadeService";

class FaculdadeController {
  async index(request: Request, response: Response) {
    const faculdade = await new FaculdadeService().getFaculdades();

    return response.status(200).json({
      data: faculdade,
    });
  }
}

export default FaculdadeController;
