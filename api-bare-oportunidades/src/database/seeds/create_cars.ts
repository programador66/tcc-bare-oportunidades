import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("doctors").insert([
    {
      nome: "Caio Lacerda",
      especialidade: "Ortodontia",
      crm: "3345-7",
    },
    {
      nome: "Laura Lacerda",
      especialidade: "Pediatria",
      crm: "4585-7",
    },
  ]);

  await knex("clients").insert([
    {
      nome: "Eduardo Jhonson",
      telefone: "99262-3012",
      plano_de_saude: "AMIL",
    },
    {
      nome: "Afonso jhonson",
      telefone: "99262-3012",
      plano_de_saude: "HappyVida",
    },
  ]);
}
