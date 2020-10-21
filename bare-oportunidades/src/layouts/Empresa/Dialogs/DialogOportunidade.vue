<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6" style="color: #e65100;font-weight:bold;">
          {{ this.editVagas ? "Editar Oportunidade" : "Nova Oportunidade" }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form>
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
          <q-toggle v-model="value" v-if="editVagas" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat style="color: red" label="Cancelar" @click="closeModal" />
        <q-btn
          flat
          label="Salvar"
          v-if="editVagas"
          @click="updateOportunidade"
        />
        <q-btn flat label="Salvar" v-else @click="novaOportunidade" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import SnackBarMixins from "../../../mixins/SnackBarMixins";
import EmpresaService from "../../../services/empresa/index";

export default {
  name: "DialogOportunidade",
  props: ["dialogVagas", "id", "vagaAtualizada", "editVagas"],
  mixins: [SnackBarMixins],
  data() {
    return {
      dialog: false,
      vagas: {
        titulo: "",
        atividades_responsabilidades: "",
        requisitos: ""
      },
      rule: [val => (val && val.length > 0) || "Campo obrigatório"],
      tituloRule: "",
      ativi_responRule: "",
      requisitoRule: "",
      id_empresa: "",
      value: false
    };
  },
  methods: {
    validateForm() {
      this.$refs.tituloRule.validate();
      this.$refs.ativi_responRule.validate();
      this.$refs.requisitoRule.validate();

      if (
        this.$refs.tituloRule.hasError ||
        this.$refs.ativi_responRule.hasError ||
        this.$refs.requisitoRule.hasError
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

      EmpresaService.insertOportunidade({
        id_empresa: this.id_empresa,
        ...this.vagas
      })
        .then(response => {
          console.log(response);

          if (response.data.success) {
            this.snackBarPositive("Oportunidade cadastrada com sucesso!");
            this.closeModal();
            this.$emit("loadingVagas", true);
          }
        })
        .catch(e => {
          console.log(e.response);
          this.snackBarNegative(
            "Não foi possivel realizar o cadastro! Tente novamente!"
          );
        });
    },
    updateOportunidade() {
      const validate = this.validateForm();

      if (validate) {
        return (this.formHasError = true);
      }
      const obj = {
        id: this.vagaAtualizada.id,
        status: this.value ? "A" : "I",
        id_empresa: this.id,
        atividades_responsabilidades: this.vagas.atividades_responsabilidades,
        titulo: this.vagas.titulo,
        requisitos: this.vagas.requisitos
      };

      EmpresaService.updateOportunidade(obj)
        .then(response => {
          this.snackBarPositive(response.data.msg);
          this.$emit("loadingVagas", true);
          this.closeModal();
        })
        .catch(e =>
          this.snackBarNegative("Não foi possivel realziar a atualização!")
        );
    },
    closeModal() {
      this.vagas = {};
      this.dialog = false;
      this.$emit("dialogOportunidade", false);
      this.$emit("editVagas", false);
    }
  },
  watch: {
    dialogVagas(e) {
      this.dialog = e;
    },
    id(e) {
      this.id_empresa = e;
    },
    editVagas(e) {
      if (e) {
        this.vagas.titulo = this.vagaAtualizada.titulo;
        this.vagas.atividades_responsabilidades = this.vagaAtualizada.atividades_responsabilidades;
        this.vagas.requisitos = this.vagaAtualizada.requisitos;
        this.value = this.vagaAtualizada.status == "A" ? true : false;
        this.dialog = e;
      }
    }
  }
};
</script>

<style>
.form_oportunidade {
  margin-bottom: 2%;
}
.q-icon,
.material-icons {
  display: contents;
}
</style>
