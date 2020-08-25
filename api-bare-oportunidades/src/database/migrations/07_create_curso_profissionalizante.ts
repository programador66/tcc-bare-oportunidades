import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("curso_profissionalizante", (table) => {
    table.increments("id").primary();
    table.string("curso").notNullable();
    table.string("instituicao").notNullable();
    table.date("data_inicio");
    table.date("data_fim");
    table.integer("id_aluno").notNullable().references("id").inTable("aluno");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("curso_profissionalizante");
}
