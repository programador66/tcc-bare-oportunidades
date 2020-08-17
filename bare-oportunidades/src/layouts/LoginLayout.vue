<template>
  <q-layout view="lHh Lpr lFf" id="container">
    <img
      alt="Quasar logo"
      src="~assets/img/imagens-bare-01.svg"
      width="400px"
    />

    <div id="form-container">
      <img alt="Baré logo" src="~assets/img/marca-bare.oportunidades-02.svg" />

      <q-tabs v-model="tab" id="tabs-menu">
        <q-tab name="alunos" label="Alunos" />
        <q-tab name="empresas" label="Empresa" />
        <q-tab name="faculdades" label="Faculdades" />
      </q-tabs>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg">
        <q-input
          outlined
          stack-label
          label-color="orange"
          filled
          v-model="name"
          label="Login"
          hint="Seu E-mail ou registro acadêmico"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Campo login não pode ser nulo'
          ]"
        />

        <q-input
          outlined
          :type="isPwd ? 'password' : 'text'"
          stack-label
          label-color="orange"
          filled
          v-model="age"
          label="Senha"
          hint="No mínimo 6 caractéres"
          lazy-rules
          :rules="[
            val =>
              (val !== null && val !== '') || 'Campo login não pode ser nulo',
            val => (val > 0 && val < 100) || 'Campo senha não pode ser nulo'
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div>
          <q-btn
            label="Entrar"
            type="submit"
            style="background: #e65100; color: white;width:340px"
          />
        </div>
      </q-form>
    </div>
    <img
      alt="Quasar logo"
      src="~assets/img/imagens-bare-02.svg"
      width="350px"
    />
    <span id="img-03">
      <img
        alt="Quasar logo"
        src="~assets/img/imagens-bare-03.svg"
        width="260px"
      />
    </span>
  </q-layout>
</template>

<script>
export default {
  name: "LoginLayout",
  data() {
    return {
      name: null,
      age: null,
      isPwd: true,
      tab: "alunos"
    };
  },

  methods: {
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first"
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted"
        });
      }
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    }
  }
};
</script>

<style>
#container {
  display: flex;
  justify-content: center;
  justify-items: center;
}
#container img {
  margin-right: 2%;
}
#form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 340px;
}

#img-03 {
  margin-top: 6%;
}

#tabs-menu {
  margin-bottom: 2%;
  color: #8b8b8b;
}
</style>
