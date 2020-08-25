import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("vagas", (table) => {
    table.increments("id").primary();
    table.string("descricao").notNullable();
    table.string("titulo").notNullable();
    table.string("status");
    table.date("data_post");
    table.time("hora_post");
    table
      .integer("id_empresa")
      .notNullable()
      .references("id")
      .inTable("empresa");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("vagas");
}
