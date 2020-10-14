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
                v-if="al.status == 'A'"
                disabled
                label="Aprovar"
                type="button"
                style="background: #e65100; color: white;width:140px"
                @click="aprovarAluno(al)"
              />
              <q-btn
                v-else
                label="Aprovar"
                type="button"
                style="background: #e65100; color: white;width:140px"
                @click="aprovarAluno(al)"
              />
            </div>
          </div>
          <!--  <div class="q-pa-lg flex flex-center">
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
            v-for="(event, index) in eventos"
            :key="index"
          >
            <div id="td1">
              <label><strong>Evento:</strong> {{ event.descricao }}</label>
            </div>

            <div id="td2">
              <label>
                <strong>Data Inicial</strong> {{ event.data_inicial }}</label
              >
            </div>

            <div id="td2">
              <label> <strong>Data Final</strong> {{ event.data_final }}</label>
            </div>

            <div id="btn-aprova-reprova">
              <q-btn
                label="Editar"
                type="button"
                style="background: white; color: #e65100;width:140px;margin-right:2%;"
                @click="changeDialogForUpdate(event)"
              />
              <q-btn
                label="Excluir"
                type="button"
                style="background: #e65100; color: white;width:140px"
                @click="confirmDelete(event)"
              />
            </div>
          </div>
          <dialogEventos
            :modal="dialog"
            @evento="dialog = $event"
            @atualizaLista="atualiza = $event"
            :update="eventosAtualizar"
          />
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
  props: ["tabHeader"],
  data() {
    return {
      tab: "tab1",
      current: 1,
      max: 10,
      nome: "",
      alunos: [],
      dialog: false,
      eventos: [],
      atualiza: false, //variavel responsavel por camar o endPoint caso for inserido um novo evento
      eventosAtualizar: []
    };
  },
  mounted() {
    this.buscarDadosFaculdade();
    this.buscarAlunos();
    this.buscarEventos();
  },
  watch: {
    atualiza(e) {
      if (e) {
        this.buscarEventos();
      }
    }
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
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    async buscarEventos() {
      const id_faculdade = await JSON.parse(sessionStorage.getItem("usuario"))
        .id;

      await faculdade
        .getEventByIdFaculdade({ id_faculdade })
        .then(response => {
          this.eventos = response.data.data;
          this.atualiza = false;
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    changeDialogForUpdate(evento) {
      this.eventosAtualizar = evento;
    },
    confirmDelete(evento) {
      this.$q
        .dialog({
          title: "Confirmar Exclusão",
          message: "Tem certeza que deseja excluir o evento?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.delete(evento.id);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        });
    },
    async delete(id) {
      await faculdade
        .deleteEvent({ id })
        .then(response => {
          const params = response.data.data.data;
          this.$q.notify({
            type: "positive",
            message: `${params}`,
            timeout: 1500
          });

          this.buscarEventos();
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    aprovarAluno(alun) {
      const obj = {
        status: "A",
        observacao: "",
        id_aluno: alun.id,
        id_faculdade: alun.id_faculdade
      };

      faculdade
        .aproveStudents(obj)
        .then(response => {
          this.$q.notify({
            type: "positive",
            message: response.data.data.msg,
            timeout: 1500
          });
        })
        .catch(e => {
          console.log(e.response);
          this.$q.notify({
            type: "negative",
            message: "Não foi possível realizar a aprovação!",
            timeout: 1500
          });
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
