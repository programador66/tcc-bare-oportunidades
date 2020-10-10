<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <Toolbar @tabHeader="tab = $event">
        <q-tab name="tab1" :label="nome" />
         <q-tab name="tab2" label="Eventos" />
      </Toolbar>
    </q-header>


    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="tab1">
        <main id="body-faculdade">
          <div id="header-faculdade">
            <h5>Aprovar Alunos</h5>
            <q-btn
              style="background:white; color: #e65100;"
              label="Novo Evento/Curso"
              outline
              @click="dialog = true"
            />
          </div>
          <div
            class=" bg-grey-3 rounded-borders card-lis-aluno"
            v-for="(al, index) in alunos"
            :key="index"
          >
            <div id="td1">
              <label><strong>Aluno:</strong> {{ al.nome }}</label>
            </div>

            <div id="td2">
              <label> <strong>RA:</strong> {{ al.registro_academico }}</label>
            </div>

            <div id="btn-aprova-reprova">
              <q-btn
                label="Reprovar"
                type="button"
                style="background: white; color: #e65100;width:140px;margin-right:2%;"
              />
              <q-btn
                label="Aprovar"
                type="button"
                style="background: #e65100; color: white;width:140px"
              />
            </div>
          </div>
    <!--      <div class="q-pa-lg flex flex-center">
            <q-pagination v-model="current" :max="max" color="deep-orange">
            </q-pagination>      
          </div>
    -->        
          <dialogEventos :modal="dialog" @evento="dialog = $event" />
        </main>
      </q-tab-panel>
      <q-tab-panel name="tab2">
         <main id="body-faculdade">
          <div id="header-faculdade">
            <h5>Lista de Eventos</h5>
            <q-btn
              style="background:white; color: #e65100;"
              label="Novo Evento/Curso"
              outline
              @click="dialog = true"
            />
          </div>
          <div
            class=" bg-grey-3 rounded-borders card-lis-aluno"
            v-for="(al, index) in alunos"
            :key="index"
          >
            <div id="td1">
              <label><strong>Evento:</strong> Teste</label>
            </div>

            <div id="td2">
              <label> <strong>Data Inicial</strong> 01/02/2020</label>
            </div>

            <div id="btn-aprova-reprova">
              <q-btn
                label="Editar"
                type="button"
                style="background: white; color: #e65100;width:140px;margin-right:2%;"
              />
              <q-btn
                label="Excluir"
                type="button"
                style="background: #e65100; color: white;width:140px"
              />
            </div>
          </div>
    <!--      <div class="q-pa-lg flex flex-center">
            <q-pagination v-model="current" :max="max" color="deep-orange">
            </q-pagination>      
          </div>
    -->        
          <dialogEventos :modal="dialog" @evento="dialog = $event" />
        </main>
      </q-tab-panel>
    </q-tab-panels>

    
  </q-layout>
</template>

<script>
import Toolbar from "components/Toolbar.vue";
import faculdade from "../../services/faculdade/index";
import aluno from "../../services/aluno/index";
import dialogEventos from "./Dialogs/DialogEventos";

export default {
  name: "MainLayout",
  components: { Toolbar, dialogEventos },
  props:['tabHeader'],
  data() {
    return {
      tab:"tab1",
      current: 1,
      max: 10,
      nome: "",
      alunos: [],
      dialog: false
    };
  },
  mounted() {
    this.buscarDadosFaculdade();
    this.buscarAlunos();
  
  },
  methods: {
    async buscarDadosFaculdade() {
      const id = JSON.parse(sessionStorage.getItem("usuario")).id;

      await faculdade
        .getInfoFaculdades({ id })
        .then(response => {
          this.nome = response.data.data[0].nome;
          const id_faculdade = response.data.data[0].id;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    async buscarAlunos() {
      const id_faculdade = await JSON.parse(sessionStorage.getItem("usuario"))
        .id;

      await aluno
        .getAlunoByCollege({ id_faculdade })
        .then(response => {
          this.alunos = response.data.data;
          console.log(this.alunos);
        })
        .catch(e => {
          console.log(e.response);
        });
    }
  }
};
</script>

<style>
#body-faculdade {
  margin-top: 6%;
  margin-left: 5%;
}
.card-lis-aluno {
  height: 80px;
  width: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#body-faculdade h5 {
  color: #e65100;
  font-weight: bold;
}
#btn-aprova-reprova {
  display: flex;
  justify-content: center;
  flex-grow: 1;
}
#header-faculdade {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#td1 {
  margin-left: 2%;
  flex-grow: 2;
  width: 100px;
}
#td2 {
  flex-grow: 1;
}
</style>
