<template>
  <q-card class="rounded-borders col-3 full-height">
    <q-card-section>
      <div id="cardt1">
        <q-avatar size="60px" color="primary" text-color="white" id="avatar">
          {{ nomeLogo }}
        </q-avatar>
        <label id="title">{{ empresa.razao_social }}</label>
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
  props: ["empresa"],
  data() {
    return {
      seguir: 0,
      nomeLogo: "BO"
    };
  },
  mounted() {
    const empresa = this.empresa.razao_social.split(" ");
    const arr1 = empresa[0].split("");
    const arr2 = empresa.length == 2 ? empresa[1].split("") : "";
    this.nomeLogo = arr2.length
      ? `${arr1[0]}${arr2[0]}`.toUpperCase()
      : `${arr1[0]}`.toUpperCase();
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
