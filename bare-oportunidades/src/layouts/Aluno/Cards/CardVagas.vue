<template>
  <q-card class="rounded-borders col-4 full-height">
    <q-card-section>
      <div id="cardt1">
        <q-avatar size="60px" id="avatar">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <label id="title">Desenvolvedor PHP</label>
        <q-toggle v-model="inscrever" />
      </div>
      <label id="empresa">Grupo PMZ Manaus - Amazonas</label>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "CardVagas",
  data() {
    return {
      inscrever: true
    };
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
</style>
