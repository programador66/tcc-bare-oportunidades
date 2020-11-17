<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <Toolbar>
        <q-tab name="tab1" :label="empresa.razao_social" />
      </Toolbar>
    </q-header>

    <main id="body-empresa">
      <div id="header-empresa">
        <h5>Lista de Vagas Oferecidas</h5>
        <q-btn
          style="background:white; color: #e65100;"
          label="Nova Oportunidade"
          outline
          icon="work_outline"
          @click="dialogVagas = true"
        />
      </div>
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          switch-toggle-side
          expand-separator
          :header-style="{ color: '#e65100' }"
          icon="work"
          :label="oportunidade.titulo"
          v-for="oportunidade in oportunidades"
          :key="oportunidade.id"
        >
          <q-card>
            <q-card-section>
              <article id="body-vagas-empresa">
                <section id="body-cont-vaga">
                  <strong>Atividades e Responsabilidades</strong>
                  <p>
                    {{ oportunidade.atividades_responsabilidades }}
                  </p>

                  <strong>Requisitos</strong>
                  <p>
                    {{ oportunidade.requisitos }}
                  </p>
                </section>
                <section id="body-cont-candidatos">
                  <q-btn
                    style="background:white; color: #e65100; margin-right:2px"
                    label="Avaliar Candidatos"
                    outline
                    icon="person_add"
                    @click="candidatosPorVaga(oportunidade)"
                  />

                  <q-btn
                    style="background:white; color: #e65100;"
                    label="Editar Oportunidade"
                    outline
                    icon="edit"
                    @click="editarOportunidade(oportunidade)"
                  />
                </section>
              </article>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </main>
    <DialogOportunidade
      :dialogVagas="dialogVagas"
      @dialogOportunidade="dialogVagas = $event"
      :id="empresa.id"
      @loadingVagas="loadingVagas = $event"
      :editVagas="editVagas"
      @editVagas="editVagas = $event"
      :vagaAtualizada="vagaAtualizada"
    />

    <DialogCandidatos />
  </q-layout>
</template>

<script>
import Toolbar from "components/Toolbar.vue";
import DialogOportunidade from "./Dialogs/DialogOportunidade";
import EmpresaService from "../../services/empresa/index";
import DialogCandidatos from "./Dialogs/DialogCandidatos";
import { mapMutations } from "vuex";

export default {
  name: "MainLayout",
  components: { Toolbar, DialogOportunidade, DialogCandidatos },
  data() {
    return {
      dialogVagas: false,
      empresa: {},
      oportunidades: [],
      loadingVagas: false,
      editVagas: false,
      vagaAtualizada: {}
    };
  },
  mounted() {
    this.getEmpresaByUsuario();
  },
  methods: {
    ...mapMutations("empresa", ["setModalCandidato", "setCandidatosAndVaga"]),
    getEmpresaByUsuario() {
      const id_usuario = JSON.parse(sessionStorage.getItem("usuario")).id;

      EmpresaService.getEmpresaByUsuario({ id_usuario })
        .then(response => {
          this.empresa = response.data.data[0] ?? [];

          if (Object.keys(this.empresa).length) {
            EmpresaService.getOportunidades({ id_empresa: this.empresa.id })
              .then(response => {
                this.oportunidades = response.data.data;
                this.loadingVagas = false;
              })
              .catch(e => {
                console.log(e.response);
              });
          }
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    editarOportunidade(vaga) {
      this.editVagas = true;
      this.vagaAtualizada = vaga;
    },
    candidatosPorVaga(oportunidade) {
      console.log(oportunidade);
      EmpresaService.getAllOportunidadesByIdVaga({ id_vaga: oportunidade.id })
        .then(response => {
          const candidatos = response.data.data;
          const obj = {
            ...oportunidade,
            candidatos
          };

          if (candidatos.length) {
            this.setCandidatosAndVaga(obj);
            this.setModalCandidato(true);
          } else {
            this.$q
              .dialog({
                title: "Baré Alerta",
                message:
                  "Não há candidatos cadastrados para esta oportunidade no momento!"
              })
              .onOk(() => {
                // console.log('OK')
              })
              .onCancel(() => {
                // console.log('Cancel')
              })
              .onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
              });
          }
        })
        .catch(e => {
          console.log(e.response);
        });
    }
  },
  watch: {
    loadingVagas(val) {
      if (val) {
        this.getEmpresaByUsuario();
      }
    }
  }
};
</script>
<style scoped>
#body-empresa {
  margin-top: 6%;
  margin-left: 5%;
  margin-right: 5%;
}
#body-empresa h5 {
  color: #e65100;
  font-weight: bold;
}
#header-empresa {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#body-vagas-empresa {
  padding: 1.5%;
  display: flex;
  align-items: flex-start;
  justify-items: center;
  flex-direction: column;
}
</style>
