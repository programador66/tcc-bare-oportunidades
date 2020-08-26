import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("aluno", (table) => {
    table.increments("id").primary();
    table.string("cpf").notNullable().unique();
    table.string("nome").notNullable();
    table.string("endereco").notNullable();
    table.string("sexo", 1).notNullable();
    table.string("registro_academico").notNullable();
    table.string("telefone").notNullable();
    table
      .integer("id_usuario")
      .notNullable()
      .references("id")
      .inTable("usuario");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("aluno");
}
