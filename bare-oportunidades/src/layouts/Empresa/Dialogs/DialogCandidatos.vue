<template>
  <q-dialog v-model="getModalCandidato" persistent>
    <q-card style="width:200vh">
      <q-card-section>
        <div class="text-h6" style="color:#e65100">
          {{ getCandidatosAndVaga.titulo }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 200vh" class="scroll">
        <q-expansion-item
          switch-toggle-side
          expand-separator
          :header-style="{ color: '#e65100' }"
          icon="person"
          :label="candidatos.nome"
          v-for="(candidatos, index) in getCandidatosAndVaga.candidatos"
          :key="index"
        >
          <q-card>
            <q-card-section>
              <article id="body-vagas-empresa">
                <section id="body-cont-vaga">
                  <strong>Email</strong>
                  <p>
                    {{ candidatos.email }}
                  </p>

                  <strong>Telefone</strong>
                  <p>
                    {{ candidatos.telefone }}
                  </p>
                  <strong>RA</strong>
                  <p>
                    {{ candidatos.registro_academico }}
                  </p>
                  <strong>Faculdade</strong>
                  <p>
                    {{ candidatos.faculdade }}
                  </p>
                </section>
              </article>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Relatorio PDF" color="primary" @click="gerarRelatorio" />
        <q-btn flat label="Fechar" color="primary" @click="closeModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import EmpresaService from "../../../services/empresa/index";

export default {
  props: ["openModal"],
  name: "DialogCandidatos",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("empresa", ["getModalCandidato", "getCandidatosAndVaga", "getGerarRelatorio"])
  },
  methods: {
    ...mapMutations("empresa", ["setModalCandidato"]),
    closeModal() {
      this.setModalCandidato(false);
    },
    gerarRelatorio() {
      const candidatosAndVaga = this.getCandidatosAndVaga;

     const obj = {
        id: candidatosAndVaga.id,
        id_empresa: candidatosAndVaga.id_empresa,
        candidatos: this.getCandidatosAndVaga.candidatos
      };

      console.log(obj);

      EmpresaService.getGerarRelatorio(obj)
        .then(response => {
          let pdfWindow = window.open("")
          pdfWindow.document.write(
            "<iframe width='100%' height='100%' src='data:application/pdf;base64, " + response.data + "' name='teste' title='teste2'></iframe>"
          )
        })
        .catch(e => {
          console.log(e.response);
        });
    },


  }
};
</script>

<style></style>
