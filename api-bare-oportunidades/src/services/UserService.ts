import knex from "../database/connection";

interface IUser {
  email: String;
  tp_usuario: String;
  senha: String;
}

class UserService {
  async insert(user: IUser) {
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
}

export default UserService;
