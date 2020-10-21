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

    <q-page-container v-else>
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
            <q-card class="rounded-borders col-4 full-height">
              <q-card-section>
                {{ lorem }}
              </q-card-section>
            </q-card>
            <q-card class="rounded-borders col-4 full-height">
              <q-card-section>
                {{ lorem }}
              </q-card-section>
            </q-card>
            <q-card class="rounded-borders col-4 full-height">
              <q-card-section>
                <q-avatar size="60px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
                <label>Desenvolvedor PHP</label>
                <q-toggle v-model="inscrever" />
                <label>Grupo PMZ Manaus - Amazonas</label>
              </q-card-section>
            </q-card>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap">
          <div
            class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
          >
            <q-card class="rounded-borders col-4 full-height">
              <q-card-section>
                {{ lorem }}
              </q-card-section>
            </q-card>
            <q-card class="rounded-borders col-4 full-height">
              <q-card-section>
                {{ lorem }}
              </q-card-section>
            </q-card>
            <q-card class="rounded-borders col-4 full-height">
              <q-card-section>
                {{ lorem }}
              </q-card-section>
            </q-card>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-page-container>
  </q-layout>
</template>

<script>
import Toolbar from "components/Toolbar.vue";
import Alerta from "./Alerta";

export default {
  name: "MainLayout",
  components: { Toolbar, Alerta },
  data() {
    return {
      inscrever: false,
      cadastro: true,
      slide: 1,
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam."
    };
  }
};
</script>
<style>
#container-aluno {
  margin-top: 12%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#carrosel-1 {
  margin-top: 2%;
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
  padding: 40px;
}
</style>
