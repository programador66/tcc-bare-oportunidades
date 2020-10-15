<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <Toolbar>
        <q-tab name="tab1" label="Pemaza Peças e Pneus" />
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
        />
      </div>
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          switch-toggle-side
          expand-separator
          :header-style="{ color: '#e65100' }"
          icon="work"
          label="Desenvolvedor PHP"
        >
          <q-card>
            <q-card-section>
              <article id="body-vagas-empresa">
                <section id="body-cont-vaga">
                  <strong>Descrição da vaga</strong>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quidem, eius reprehenderit eos corrupti commodi magni
                    quaerat ex numquam, dolorum officiis modi facere maiores
                    architecto suscipit iste eveniet doloribus ullam aliquid.
                  </p>

                  <strong>Atributos</strong>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quidem, eius reprehenderit eos corrupti commodi magni
                    quaerat ex numquam, dolorum officiis modi facere maiores
                    architecto suscipit iste eveniet doloribus ullam aliquid.
                  </p>
                  <strong>Atributos</strong>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quidem, eius reprehenderit eos corrupti commodi magni
                    quaerat ex numquam, dolorum officiis modi facere maiores
                    architecto suscipit iste eveniet doloribus ullam aliquid.
                  </p>
                  <strong>Atributos</strong>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quidem, eius reprehenderit eos corrupti commodi magni
                    quaerat ex numquam, dolorum officiis modi facere maiores
                    architecto suscipit iste eveniet doloribus ullam aliquid.
                  </p>
                </section>
                <section id="body-cont-candidatos">
                  <q-btn
                    style="background:white; color: #e65100; margin-right:2px"
                    label="Avaliar Cadidatos"
                    outline
                    icon="person_add"
                  />

                  <q-btn
                    style="background:white; color: #e65100;"
                    label="Editar Oportunidade"
                    outline
                    icon="edit"
                  />
                </section>
              </article>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          switch-toggle-side
          expand-separator
          :header-style="{ color: '#e65100' }"
          icon="work"
          label="Desenvolvedor SPRINGBOOT"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
              eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
              dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </main>
  </q-layout>
</template>

<script>
import Toolbar from "components/Toolbar.vue";

export default {
  name: "MainLayout",
  components: { Toolbar }
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
