<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <Toolbar @tabHeader="tab = $event">
        <q-tab name="tab1" label="Vagas Disponíveis" />
        <q-tab name="tab2" label="Minhas Oportunidades" />
      </Toolbar>
    </q-header>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="tab1">
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
          <div id="container-carrossel1">
            <label class="title-carrosel">AS MELHORES VAGAS</label>
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
              <q-carousel-slide
                v-for="(vaga, index) in vagas"
                :key="index"
                :name="index + 1"
                class=""
              >
                <div
                  class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
                >
                  <card-vagas
                    v-for="(vag, index) in vaga"
                    :key="index"
                    :vaga="vag"
                  />
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>

          <div id="container-carrossel1">
            <label class="title-carrosel">CURSOS E EVENTOS</label>
            <q-carousel
              id="carrosel-1"
              v-model="slide2"
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
              <q-carousel-slide
                v-for="(evento, index) in eventos"
                :key="index"
                :name="index + 1"
                class=""
              >
                <div
                  class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
                >
                  <card-eventos
                    v-for="(even, index) in evento"
                    :key="index"
                    :evento="even"
                  />
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>

          <div id="container-carrossel1">
            <label class="title-carrosel">EMPRESAS PARA SEGUIR</label>
            <q-carousel
              id="carrosel-1"
              v-model="slide3"
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
              <q-carousel-slide
                v-for="(empresa, index) in empresas"
                :key="index"
                :name="index + 1"
                class=""
              >
                <div
                  class="row fit justify-start items-center q-gutter-xs q-col-gutter no-wrap"
                >
                  <card-seguir
                    v-for="(emp, index) in empresa"
                    :key="index"
                    :empresa="emp"
                  />
                </div>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </q-page-container>
      </q-tab-panel>
      <q-tab-panel name="tab2">
        teste
      </q-tab-panel>
    </q-tab-panels>
  </q-layout>
</template>

<script>
import Toolbar from "components/Toolbar.vue";
import Alerta from "./Alerta";
import CardVagas from "./Cards/CardVagas";
import CardEventos from "./Cards/CardEventos";
import CardSeguir from "./Cards/CardSeguir";
import EmpresaService from "../../services/empresa/index";
import FaculdadeService from "../../services/faculdade";

export default {
  name: "MainLayoutaluno",
  components: { Toolbar, Alerta, CardVagas, CardEventos, CardSeguir },
  data() {
    return {
      tab: "tab1",
      inscrever: true,
      cadastro: true,
      slide: 1,
      slide2: 1,
      slide3: 1,
      empresas: [],
      vagas: [],
      eventos: []
    };
  },
  mounted() {
    this.getAllVagas();
  },
  methods: {
    getAllVagas() {
      this.$q.loading.show({
        message: "Carregando informações aguarde..."
      });

      EmpresaService.getAllVagas()
        .then(response => {
          this.vagas = response.data;
          this.getAllEmpresas();
        })
        .catch(e => {
          this.$q.loading.hide();
          if (e.response == undefined) console.log("Sem internet");
          console.log(e.response);
        });
    },
    getAllEmpresas() {
      EmpresaService.getAllEmpresas()
        .then(response => {
          this.empresas = response.data;
          this.getAllEventos();
        })
        .catch(e => {
          this.$q.loading.hide();
          if (e.response == undefined) console.log("Sem internet");
          console.log(e.response);
        });
    },
    getAllEventos() {
      FaculdadeService.getAllEventos()
        .then(response => {
          this.eventos = response.data;
          this.$q.loading.hide();
        })
        .catch(e => {
          this.$q.loading.hide();
          if (e.response == undefined) console.log("Sem internet");
          console.log(e.response);
        });
    }
  }
};
</script>

<style>
#container-carrossel1 {
  width: 100%;
}
.title-carrosel {
  color: #676767;
  margin-bottom: 0;
  margin-left: 4%;
}
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
