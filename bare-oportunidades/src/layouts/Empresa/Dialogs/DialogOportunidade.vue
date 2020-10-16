<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6" style="color: #e65100;font-weight:bold;">
          Nova Oportunidade
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          class="form-qinput-faculdade"
          outlined
          label="Titulo da Vaga"
          label-color="orange"
          v-model="vagas.titulo"
          hint="vaga"
          color="orange"
        />
        <q-input
          class="form-qinput-faculdade"
          outlined
          label="Descrição da vaga"
          label-color="orange"
          v-model="vagas.descricao"
          hint="descrição"
          color="orange"
        />
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat style="color: red" label="Cancelar" @click="closeModal" />
        <q-btn flat label="Salvar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "DialogOportunidade",
  props: ["dialogVagas"],
  data() {
    return {
      dialog: false,
      vagas: { titulo: "", descricao: "", data_post: "", hora_post: "" }
    };
  },
  methods: {
    closeModal() {
      console.log("alou");
      this.dialog = false;
      this.$emit("dialogOportunidade", false);
    }
  },
  watch: {
    dialogVagas(e) {
      this.dialog = e;
    }
  }
};
</script>

<style></style>
