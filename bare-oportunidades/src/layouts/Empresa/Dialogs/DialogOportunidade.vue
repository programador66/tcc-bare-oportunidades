<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6" style="color: #e65100;font-weight:bold;">
          Nova Oportunidade
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form >
        <q-input
          class="form_oportunidade"
          outlined
          label="Titulo da Vaga"
          label-color="orange"
          v-model="vagas.titulo"
          color="orange"
          :rules="rule"
          ref="tituloRule"
        />
        <q-input
          class="form_oportunidade"
          outlined
          label="Descrição da vaga"
          label-color="orange"
          v-model="vagas.descricao"
          color="orange"
          :rules="rule"
          ref="descricaoRule"
        />

        <q-input
         class="form_oportunidade"
          :rules="rule"
          ref="ativi_responRule"
          v-model="vagas.atividades_responsabilidades"
          filled
          type="textarea"
          label-color="orange"
          label="Atividades e Responsavbilidades"
          hint="Atividades que deverá ser executadas"
        />
        <q-input
         class="form_oportunidade"
          :rules="rule"
          ref="requisitoRule"
          v-model="vagas.requisitos"
          filled
          type="textarea"
          label-color="orange"
          label="Requisitos"
          hint="Requisitos para vaga (pelo menos um)"
        />
      </q-form>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat style="color: red" label="Cancelar" @click="closeModal" />
        <q-btn flat label="Salvar" @click="novaOportunidade" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import SnackBarMixins from '../../../mixins/SnackBarMixins'

export default {
  name: "DialogOportunidade",
  props: ["dialogVagas"],
  mixins: [SnackBarMixins],
  data() {
    return {
      dialog: false,
      vagas: { titulo: "", descricao: "", atividades_responsabilidades:"", requisitos:"" },
      rule: [val => (val && val.length > 0) || "Campo obrigatório"],
      tituloRule:"",
      descricaoRule:"",
      ativi_responRule:"",
      requisitoRule: ""

    };
  },
  methods: {
    validateForm() {
      this.$refs.tituloRule.validate();
      this.$refs.descricaoRule.validate();
      this.$refs.ativi_responRule.validate();
      this.$refs.requisitoRule.validate();

      if (
        this.$refs.tituloRule.hasError ||
        this.$refs.descricaoRule.hasError ||
        this.$refs.ativi_responRule.hasError ||
        this.$refs.requisitoRule 
      ) {
        return true;
      }

      return false;
    },
    novaOportunidade() {
     const validate = this.validateForm();

      if (validate) {
        return (this.formHasError = true);
      }

      this.snackBarPositive("so vai faltar o back!");
    },
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

<style >
.form_oportunidade {
  margin-bottom: 2%;
}
.q-icon, .material-icons{
  display: contents;
}

</style>
