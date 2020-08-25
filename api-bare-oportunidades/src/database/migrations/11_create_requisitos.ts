import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("requisitos", (table) => {
    table.increments("id").primary();
    table.string("descricao").notNullable();
    table.string("titulo").notNullable();
    table.integer("id_vagas").notNullable().references("id").inTable("vagas");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("requisitos");
}
