import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("empresa_candidato_favorito", (table) => {
    table.increments("id").primary();
    table.string("favorito").notNullable();
    table.integer("id_vagas").notNullable().references("id").inTable("vagas");
    table.integer("id_aluno").notNullable().references("id").inTable("aluno");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("empresa_candidato_favorito");
}
