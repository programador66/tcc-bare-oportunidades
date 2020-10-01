import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("aprova_aluno", (table) => {
    table.string("status", 1).notNullable();
    table.string("observacao");
    table
      .integer("id_faculdade")
      .notNullable()
      .references("id")
      .inTable("faculdade").primary();
    table.integer("id_aluno").notNullable().references("id").inTable("aluno").primary();
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("aprova_aluno");
}
