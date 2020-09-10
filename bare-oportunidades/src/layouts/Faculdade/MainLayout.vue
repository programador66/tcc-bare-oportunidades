<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <Toolbar>
        <q-tab name="tab1" :label="nome" />
      </Toolbar>
    </q-header>

    <main id="body-faculdade">
      <div id="header-faculdade">
        <h5>Aprovar Alunos</h5>
        <q-btn
          style="background:white; color: #e65100;"
          label="Novo Evento/Curso"
          outline
        />
      </div>
      <div
        class=" bg-grey-3 rounded-borders card-lis-aluno"
        v-for="(al, index) in alunos"
        :key="index"
      >
        <label><strong>Aluno:</strong> {{ al.nome }}</label>
        <label><strong>RA:</strong> {{ al.registro_academico }}</label>
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
      <div class="q-pa-lg flex flex-center">
        <q-pagination v-model="current" :max="max" color="deep-orange">
        </q-pagination>
      </div>
    </main>
  </q-layout>
</template>

<script>
import Toolbar from "components/Toolbar.vue";
import faculdade from "../../services/faculdade/index";
import aluno from "../../services/aluno/index";

export default {
  name: "MainLayout",
  components: { Toolbar },
  data() {
    return {
      current: 1,
      max: 10,
      nome: "",
      alunos: []
    };
  },
  mounted() {
    this.buscarDadosFaculdade();
  },
  methods: {
    async buscarDadosFaculdade() {
      const id = await JSON.parse(sessionStorage.getItem("usuario")).id;

      await faculdade
        .getInfoFaculdades({ id })
        .then(response => {
          this.nome = response.data.data[0].nome;
          const id_faculdade = response.data.data[0].id;
          this.buscarAlunos(id_faculdade);
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    async buscarAlunos(id_faculdade) {
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
  justify-content: space-between;
}
#header-faculdade {
  width: 90%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
