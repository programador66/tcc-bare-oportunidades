import Knex from "knex";

export async function up(knex: Knex) {
  return await knex.schema.createTable("eventos", (table) => {
    table.increments("id").primary();
    table.string("descricao").notNullable();
    table.date("data_inicial").notNullable();
    table.date("data_final").notNullable();
    table
      .integer("id_faculdade")
      .notNullable()
      .references("id")
      .inTable("faculdade");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable("eventos");
}
