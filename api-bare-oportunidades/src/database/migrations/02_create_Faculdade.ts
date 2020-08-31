import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("faculdade", (table) => {
    table.increments("id").primary();
    table.string("cnpj").notNullable().unique();
    table.string("nome").notNullable();
    table.string("endereco").notNullable();
    table.string("telefone").notNullable();
    table.string("status").notNullable();
    table
      .integer("id_usuario")
      .notNullable()
      .references("id")
      .inTable("usuario");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("faculdade");
}
