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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
              eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
              dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
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
</style>
