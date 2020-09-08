<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <Toolbar>
        <q-tab name="tab1" label="Faculdade Fucapi" />
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
        v-for="(c, index) in 8"
        :key="index"
      >
        <label><strong>Aluno:</strong> Caio César Lacerda</label>
        <label><strong>RA:</strong> 101280</label>
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

export default {
  name: "MainLayout",
  components: { Toolbar },
  data() {
    return {
      current: 1,
      max: 10
    };
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
