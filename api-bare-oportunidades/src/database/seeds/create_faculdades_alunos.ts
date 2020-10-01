import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("usuario").insert([
    {
      email:"fucapi.edu@fucapi.com",
      senha: "12345678",
      tp_usuario: "F"
    },
    {
      email: "kaio.cesr@gmail.com",
      senha: "12345678",
      tp_usuario: "A",
    },
  ]);

  await knex("faculdade").insert([
    {
      nome: "Faculdade Fucapi",
      cnpj: "123.156.123/4501-36",
      endereco: "Avenida Danilo Areosa 255",
      telefone: "(92) 99464-3651",
      status: "A",
      id_usuario: 1
    },
  ]);

  await knex("aluno").insert([
    {
      cpf: "016.356.256-63",
      nome: "Caio César Lacerda",
      telefone: "92 9926-3012",
      endereco:"Av Constatino nery",
      sexo:"M",
      registro_academico: 125652,
      id_usuario: 2
    }
  ]);

  await knex("aprova_aluno").insert([
    {
      status:"I",
      id_aluno: 1,
      id_faculdade: 1,
      observacao: ""
    }
  ]);
}
