import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("certificado", (table) => {
    table.increments("id").primary();
    table.string("emissor").notNullable();
    table.string("descricao").notNullable();
    table.date("data");
    table.integer("id_aluno").notNullable().references("id").inTable("aluno");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("certificado");
}
