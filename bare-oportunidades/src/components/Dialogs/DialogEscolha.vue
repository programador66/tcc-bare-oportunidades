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
export default {
  props: ["escolha"],
  name: "DialogEscolha",
  data() {
    return {
      opcao: false,
      usuario: "Aluno"
    };
  },
  methods: {
    fechaModal() {
      this.opcao = false;
      this.$emit("escolha", false);
    },
    cadastro() {
      this.fechaModal();

      console.log("==========");
      console.log(this.usuario);
    }
  },
  watch: {
    escolha(e) {
      this.opcao = e;
    }
  }
};
</script>
