<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <Toolbar>
        <q-tab name="tab1" label="Vagas Disponíveis" />
        <q-tab name="tab2" label="Minhas Oportunidades" />
      </Toolbar>
    </q-header>

    <q-page-container v-if="!cadastro">
      <Alerta />
      <div id="container-aluno">
        <img
          alt="Quasar logo"
          src="~assets/img/marca-bare.oportunidades-02.svg"
          width="400px"
        />
      </div>
    </q-page-container>

    <q-page-container v-else id="container-aluno-body">
      <span id="buscar"
        ><q-input rounded outlined label="BUSQUE SUA OPORTUNIDADE">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </span>
      <q-carousel
        id="carrosel-1"
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        control-color="black"
        navigation
        padding
        arrows
        height="200px"
        class="bg-grey-1"
      >
        <q-carousel-slide :name="1" class="">
          <div
            class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
          >
            <card-vagas />
            <card-vagas />
            <card-vagas />
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap">
          <div
            class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
          >
            <card-vagas />
            <card-vagas />
            <card-vagas />
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-page-container>
  </q-layout>
</template>

<script>
import Toolbar from "components/Toolbar.vue";
import Alerta from "./Alerta";
import CardVagas from "./Cards/CardVagas";

export default {
  name: "MainLayout",
  components: { Toolbar, Alerta, CardVagas },
  data() {
    return {
      inscrever: true,
      cadastro: true,
      slide: 1,
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam."
    };
  }
};
</script>
<style>
#container-aluno-body {
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#buscar {
  width: 60%;
}

#container-aluno {
  margin-top: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#carrosel-1 {
  margin-top: 2%;
  width: 100%;
}

.q-carousel__navigation--bottom {
  bottom: 0px;
}
.q-carousel--navigation-bottom.q-carousel--with-padding .q-carousel__slide,
.q-carousel--navigation-bottom .q-carousel--padding,
.q-carousel--arrows-vertical.q-carousel--with-padding .q-carousel__slide,
.q-carousel--arrows-vertical .q-carousel--padding {
  padding-bottom: 37px;
}
.q-carousel__slide,
.q-carousel .q-carousel--padding {
  padding: 45px;
}

.q-field--outlined .q-field__control {
  border-radius: 4px;
  padding: 4px 65px;
}
.q-field__marginal {
  height: 40px;
}
</style>
