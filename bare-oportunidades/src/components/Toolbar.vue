<template>
  <div>
    <q-toolbar id="toolbar">
      <img
        id="logo"
        src="~assets/img/marca-bare.oportunidades-02.svg"
        alt="Bare Oportunidades"
        width="150px"
      />
      <q-space />
      <q-tabs v-model="tab" shrink>
        <q-tab name="tab1" label="Vagas Disponíveis" />
        <q-tab name="tab2" label="Minhas Oportunidades" />
      </q-tabs>
      <q-avatar size="60px">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
      </q-avatar>
    </q-toolbar>
  </div>
</template>

<script>
export default {
  name: "Tollbar",
  data() {
    return {
      tab: ""
    };
  }
};
</script>
<style>
#logo {
  align-self: center;
  margin-left: 5%;
}
.q-toolbar {
  height: 80px;
  background: #fbfbfb;
  border-bottom: solid 2px #e65100;
  opacity: 5;
}

.q-tab__label {
  color: #e65100;
}

.items-center {
  align-items: flex-end;
}

.q-avatar {
  margin-bottom: 0.5%;
  margin-right: 6%;
}
</style>
