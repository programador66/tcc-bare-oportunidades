<template>
  <q-card class="rounded-borders col-4 full-height">
    <q-card-section>
      <div id="cardt1">
        <q-avatar size="60px" color="primary" text-color="white" id="avatar">
          {{nomeLogo}}
        </q-avatar>
        <label id="title">{{ vaga.titulo }}</label>
        <label>Ativo</label
        ><q-toggle :value="vaga.status == 'A' ? true : false" disable />
      </div>
      <div id="card1-bottom">
        <label id="empresa">{{ vaga.razao_social }} - Amazonas</label>
        <q-btn
          size="sm"
          color="primary"
          label="Detalhes"
          @click="detalhesVaga(vaga)"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "CardVagas",
  props: ["vaga"],
  data() {
    return {
      inscrever: true,
      nomeLogo: ""
    };
  },
  mounted() {
    const vaga = this.vaga.titulo.split(" ");
    const arr1 = vaga[0].split("");
    const arr2 = vaga.length == 2 ? vaga[1].split("") : "";

    this.nomeLogo = arr2 .length ? `${arr1[0]}${arr2[0]}`.toUpperCase()
      : `${arr1[0]}`.toUpperCase();

  },
  methods: {
    ...mapMutations("vaga", { setVaga: "setVagaSelected" }),
    detalhesVaga(vaga) {
      this.setVaga(vaga);
      this.$router.push("/details");
    }
  }
};
</script>

<style>
#empresa {
  margin-left: 17%;
  color: #000000;
  font: normal normal medium 16px/19px Roboto;
  letter-spacing: 0.54px;
  color: #000000;
  opacity: 1;
}
#cardt1 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

#cardt1 {
  flex-grow: 0;
}

#title {
  flex-grow: 1;
  color: #e65100;
  font-weight: bold;
}
#card1-bottom {
  display: flex;
  justify-content: space-between;
}
</style>
