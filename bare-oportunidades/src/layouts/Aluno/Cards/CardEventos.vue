<template>
  <q-card class="rounded-borders col-3 full-height">
    <q-card-section>
      <div id="cardt2">
        <img src="~assets/img/card-image.png" width="130" />

        <div id="lb">
          <div><label id="title-evento">Curso Desenvolvedor PHP</label></div>
          <div><label id="subtitle">Aplicaçoes com laravel</label></div>
        </div>
        <div>
          <q-icon name="today" class="text-grey" style="font-size: 2em;" />
          <label style="color:#e65100;font-weight:bold;">22/09</label>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "CardEventos",
  data() {
    return {};
  }
};
</script>

<style>
#subtitle {
  color: #000000;
  font: normal normal medium 16px/19px Roboto;
  letter-spacing: 0.54px;
  color: #000000;
  opacity: 1;
  margin-left: 2%;
  font-weight: bold;
}
#cardt2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
}
#cardt2 img {
  padding: 0;
}
#lb {
  margin: 0;
  padding: 0;
  flex-grow: 2;
}

#title-evento {
  color: #e65100;
  font-weight: bold;
  margin-left: 2%;
}
</style>
