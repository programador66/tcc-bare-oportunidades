<template>
  <q-dialog v-model="opcao" persistent>
    <q-card style="width: 400px">
      <q-toolbar>
        <q-toolbar-title> </q-toolbar-title>

        <q-btn flat round dense icon="close" @click="fechaModal" />
      </q-toolbar>

      <q-card-section>
        <q-card-section>
          <strong style="font-size:1.1rem;color:#676767">Quem sou eu?</strong>
        </q-card-section>
        <q-list>
          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="usuario" val="aluno" color="teal" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Aluno</q-item-label>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section avatar>
              <q-radio v-model="usuario" val="empresa" color="orange" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Empresa</q-item-label>
            </q-item-section>
          </q-item>

          <q-item tag="label" v-ripple>
            <q-item-section avatar top>
              <q-radio v-model="usuario" val="faculdade" color="red" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Faculdade</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="fechaModal" color="red" />
        <q-btn flat label="Continuar" color="teal" @click="cadastro" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  props: ["escolha"],
  name: "DialogEscolha",
  data() {
    return {
      opcao: false,
      usuario: "Aluno",
      tp_usuario: [
        {
          title: "Nova Instituiçao",
          tipo: "F",
          paragrafo: `Faça o cadastro da instituição, entre na plataforma e ajude os alunos
          a encontrarem oportunidades.`
        },
        {
          title: "Novo(a) Aluno(a)",
          tipo: "A",
          paragrafo: `Faça o seu cadastro, entre na plataforma e encontre mais oportunidades.`
        },
        {
          title: "Nova Empresa",
          tipo: "E",
          paragrafo: `Faça o Cadastro da empresa, entre na plataforma e ajude alunos a encontrarem uma boa oportunidade na vida profissional.`
        }
      ]
    };
  },
  methods: {
    ...mapMutations("usuario", ["setTipoUsuarioForm"]),
    fechaModal() {
      this.opcao = false;
      this.$emit("escolha", false);
    },
    cadastro() {
      this.fechaModal();

      if (this.usuario === "faculdade") {
        this.setTipoUsuarioForm(this.tp_usuario[0]);
      } else if (this.usuario === "aluno") {
        this.setTipoUsuarioForm(this.tp_usuario[1]);
      } else if (this.usuario === "empresa") {
        this.setTipoUsuarioForm(this.tp_usuario[2]);
      }

      this.$router.push("/register");
    }
  },
  watch: {
    escolha(e) {
      this.opcao = e;
    }
  }
};
</script>
