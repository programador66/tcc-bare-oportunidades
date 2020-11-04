import knex from "../database/connection";
import IModelUser from "../interfaces/IModelUser";
class UserService {
  async insert(user: IModelUser) {
    const begintransaction = await knex.transaction();

    const newUser = await begintransaction("usuario").insert(user);

    if (!newUser) {
      begintransaction.rollback();
      return { success: false, error: newUser };
    }

    begintransaction.commit();
    return { success: true, usuario: newUser[0] };
  }

  async getUser() {
    const client = await knex("usuario").select("*");
    return client;
  }

  async getUserByEmail(email: String, tp_usuario: String) {
    const client = await knex("usuario")
      .select("*")
      .where("email", email)
      .where("tp_usuario", tp_usuario);

    return client;
  }

  async getUserEmail(email: String){
    const client = await knex('usuario')
      .select("*")
      .where("email", email).first();
    return client;
  }

  async findByIdAndUpdate(id: Number, token: any, date: Date){
      const user = await knex('usuario').where({id}).update( { passwordResetToken: token, passwordResetExpires: date } );
      return user;
  }

  async updateUserId(id: Number, user: IModelUser){
    const usuario = await knex('usuario').where({id}).update( { senha: user.senha } )
    return usuario;
  }

  async deleteUserById(id: Number) {
    const response = await knex("usuario").where("id", id).del();

    return response;
  }
}

export default UserService;
