<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <Toolbar>
        <q-tab name="tab1" label="Vagas Disponíveis" />
        <q-tab name="tab2" label="Minhas Oportunidades" />
      </Toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Toolbar from "components/Toolbar.vue";

export default {
  name: "MainLayout",
  components: { Toolbar }
};
</script>
