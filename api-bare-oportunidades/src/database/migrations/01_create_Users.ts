import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("usuario", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("senha").notNullable();
    table.string("tp_usuario").notNullable();
    table.string('passwordResetToken');
    table.date('passwordResetExpires');
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("usuario");
}
