import knex from "../database/connection";
import IModelFaculdade from "../interfaces/IModelFaculdade";
import IModelEventos from "../interfaces/IModelEventos";
import IModelAprovaAluno from "../interfaces/IModelAprovaAluno";
class FaculdadeService {
  async insert(faculdade: IModelFaculdade) {
    const newFaculdade = await knex("faculdade").insert(faculdade);

    if (!newFaculdade) {
      return { success: false, error: newFaculdade };
    }

    return { success: true, faculdade: newFaculdade[0] };
  }

  async getFaculdades() {
    const faculdade = await knex("faculdade").select("nome", "id");

    return faculdade;
  }

  async getFaculdadesByIdUser(id: Number) {
    try {
      const faculdade = await knex
        .select("faculdade.id", "faculdade.nome", "usuario.email")
        .from("faculdade")
        .innerJoin("usuario", "faculdade.id_usuario", "usuario.id")
        .where("usuario.id", "=", id);

      return faculdade;
    } catch (err) {
      return false;
    }
  }

  async createEvent(eventos: IModelEventos) {
    const newEvent = await knex("eventos").insert(eventos);

    if (!newEvent) {
      return { success: false, error: newEvent };
    }

    return { success: true, evento: newEvent[0] };
  }

  async deleteEvent(id: Number) {
    const event = await knex("eventos").where("id", '=', id).del();

    return { success: true, data: event == 1 ? "Evento excluido!": "nenhum evento foi excluído!" };
  }

  async updateEvent(id:Number, eventos: IModelEventos) {
    
    const event = await knex("eventos").where("id", "=", id).update(eventos);

    return { success: true, data: event == 1 ? "Evento atualizado!": "nenhum evento foi atualizado!" };

  }

  async getEventByIdFaculdade(id_faculdade: Number) {

    const eventos = await knex("eventos").select("*").where("id_faculdade",'=', id_faculdade);

    return eventos;
  }

  async aproveStudents(aprovacao: IModelAprovaAluno) {
    const newAprov = await knex("aprova_aluno")
      .where("id_faculdade",'=', aprovacao.id_faculdade)
      .andWhere("id_aluno",'=', aprovacao.id_aluno)
      .update(aprovacao);

    if (!newAprov) {
      return { success: false, error: newAprov };
    }

    return { success: true, msg: "Aprovação Realizada!" };
  }

  async getEvents(){
    try {
      const eventos =  await knex.select("faculdade.nome",'eventos.descricao').from('faculdade').innerJoin('eventos','faculdade.id','eventos.id_faculdade');                            
      return eventos;
    } catch (error) {
      throw new Error(error.message)
    }
   
  }

}

export default FaculdadeService;
