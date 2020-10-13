<template>
  <q-dialog v-model="dialog" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6" style="color: #e65100;font-weight:bold;">
          {{ !updateModal ? "Novo Evento" : "Atualização de Evento" }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          class="form-qinput-faculdade"
          outlined
          label="Descrição do Evento"
          label-color="orange"
          v-model="descricao"
          hint="Evento"
          color="orange"
        />
        <div id="data-temp">
          <q-input
            class="form-qinput-faculdade"
            outlined
            label="Data Inicial"
            label-color="orange"
            v-model="data_inicial"
            mask="##/##/####"
            hint="DD/MM/AAAA"
            color="orange"
            style="width:48%"
          />
          <q-input
            class="form-qinput-faculdade"
            outlined
            label="Data Final"
            label-color="orange"
            v-model="data_final"
            mask="##/##/####"
            hint="DD/MM/AAAA"
            color="orange"
            style="width:48%"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat style="color: red" label="Cancelar" @click="closeModal" />
        <q-btn flat label="Salvar" @click="createEvent" v-if="!updateModal" />
        <q-btn flat label="Salvar" @click="updateEvent" v-else />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import faculdade from "../../../services/faculdade/index";
import SnackBarMixins from "../../../mixins/SnackBarMixins";

export default {
  name: "DialogEventos",
  props: ["modal", "update", "eventosAtualizar"],
  mixins: [SnackBarMixins],
  data() {
    return {
      dialog: false,
      descricao: "",
      data_inicial: "",
      data_final: "",
      updateModal: false,
      idEvento: ""
    };
  },
  methods: {
    closeModal() {
      this.dialog = false;
      this.descricao = "";
      this.data_inicial = "";
      this.data_final = "";
      this.$emit("evento", false);
      this.updateModal = false;
    },
    createEvent() {
      this.$q.loading.show({
        message: "Registrando Evento Aguarde..."
      });

      const id = JSON.parse(sessionStorage.getItem("usuario")).id;

      const obj = {
        id_faculdade: id,
        descricao: this.descricao,
        data_inicial: this.data_inicial,
        data_final: this.data_final
      };

      faculdade
        .createEvent(obj)
        .then(response => {
          if (response.data.data.success) {
            this.snackBarPositive("Evento cadastrado com sucesso!");
          }
          this.$emit("atualizaLista", true);
          this.$q.loading.hide();
          this.closeModal();
        })
        .catch(e => {
          console.log(e.response);
          this.snackBarNegative("Erro ao cadastrar evento!");
          this.$q.loading.hide();
        });
    },
    updateEvent() {
      this.$q.loading.show({
        message: "Atualizando Evento Aguarde..."
      });

      const id = JSON.parse(sessionStorage.getItem("usuario")).id;

      const obj = {
        id: this.idEvento,
        id_faculdade: id,
        descricao: this.descricao,
        data_inicial: this.data_inicial,
        data_final: this.data_final
      };

      faculdade
        .updateEvent(obj)
        .then(response => {
          if (response.data.data.success) {
            this.snackBarPositive("Evento Atualizado com sucesso!");
            this.$emit("atualizaLista", true);
          }

          this.$q.loading.hide();
          this.closeModal();
        })
        .catch(e => {
          console.log(e.response);
          this.snackBarNegative("Erro ao Atualizar evento!");
          this.$q.loading.hide();
        });
    }
  },
  watch: {
    modal(e) {
      this.dialog = e;
    },
    update(eventosAtualizar) {
      this.updateModal = true;
      this.dialog = true;
      this.idEvento = eventosAtualizar.id;
      this.descricao = eventosAtualizar.descricao;
      this.data_inicial = eventosAtualizar.data_inicial;
      this.data_final = eventosAtualizar.data_final;
    }
  }
};
</script>

<style>
#data-temp {
  margin-top: 2%;
  display: flex;
  justify-content: space-between;
}
</style>
