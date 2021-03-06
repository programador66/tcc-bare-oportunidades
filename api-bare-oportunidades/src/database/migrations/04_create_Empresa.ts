import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("empresa", (table) => {
    table.increments("id").primary();
    table.string("cnpj").notNullable().unique();
    table.string("razao_social").notNullable();
    table.string("cep").notNullable();
    table.string("nome_fantasia");
    table.string("descricao_empresa");
    table.string("fone").notNullable();
    table
      .integer("id_usuario")
      .notNullable()
      .references("id")
      .inTable("usuario");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("empresa");
}
