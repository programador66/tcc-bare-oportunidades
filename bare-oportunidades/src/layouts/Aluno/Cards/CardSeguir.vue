<template>
  <q-card class="rounded-borders col-3 full-height">
    <q-card-section>
      <div id="cardt1">
        <q-avatar size="60px" color="primary" text-color="white" id="avatar">
          GP
        </q-avatar>
        <label id="title">Grupo PMZ</label>
        <q-rating
          v-model="seguir"
          max="1"
          size="2em"
          color="primary"
          color-selected="primary"
          icon="favorite_border"
          icon-selected="favorite"
          icon-half="favorite"
          no-dimming
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "CardSeguir",
  data() {
    return {
      seguir: false
    };
  }
};
</script>

<style>
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
