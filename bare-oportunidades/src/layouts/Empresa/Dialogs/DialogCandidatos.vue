<template>
  <q-dialog v-model="open">
    <q-card style="width:200vh">
      <q-card-section>
        <div class="text-h6" style="color:#e65100">Desenvolvedor Android</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 200vh" class="scroll">
        <q-expansion-item
          switch-toggle-side
          expand-separator
          :header-style="{ color: '#e65100' }"
          icon="person"
          label="Caio Cesar Lacerda"
        >
          <q-card>
            <q-card-section>
              <article id="body-vagas-empresa">
                <section id="body-cont-vaga">
                  <strong>Email</strong>
                  <p>
                    kaio.cesr@gmail.com
                  </p>

                  <strong>Telefone</strong>
                  <p>
                    (92) 9262-3012
                  </p>
                </section>
              </article>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          switch-toggle-side
          expand-separator
          :header-style="{ color: '#e65100' }"
          icon="person"
          label="Caio Cesar Lacerda"
        >
          <q-card>
            <q-card-section>
              <article id="body-vagas-empresa">
                <section id="body-cont-vaga">
                  <strong>Email</strong>
                  <p>
                    kaio.cesr@gmail.com
                  </p>

                  <strong>Telefone</strong>
                  <p>
                    (92) 9262-3012
                  </p>
                </section>
              </article>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Decline" color="primary" v-close-popup />
        <q-btn flat label="Accept" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "DialogCandidatos",
  data() {
    return {
      open: true
    };
  }
};
</script>

<style></style>
