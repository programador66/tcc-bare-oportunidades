import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("selecoes_candidato", (table) => {
    table.increments("id").primary();
    table.string("status_selecao").notNullable();
    table.date("data_selecao").notNullable();
    table.integer("id_vagas").notNullable().references("id").inTable("vagas");
    table.integer("id_aluno").notNullable().references("id").inTable("aluno");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("selecoes_candidato");
}
