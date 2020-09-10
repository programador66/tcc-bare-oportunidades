import { Request, Response } from "express";
import AlunoService from "../services/AlunoService";

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
}

export default AlunoController;
