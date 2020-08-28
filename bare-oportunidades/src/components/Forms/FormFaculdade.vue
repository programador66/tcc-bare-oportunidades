<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <h4>Registro de novo usuário</h4>
    <q-input
      outlined
      stack-label
      label-color="orange"
      filled
      v-model="name"
      label="Razão Social"
      lazy-rules
      :rules="[
        val => (val && val.length > 0) || 'Campo Razao Social não pode ser nulo'
      ]"
    />

    <q-input
      outlined
      stack-label
      label-color="orange"
      filled
      v-model="name"
      label="CNPJ"
      lazy-rules
      :rules="[
        val => (val && val.length > 0) || 'Campo CNPJ não pode ser nulo'
      ]"
    />

    <div id="btns">
      <q-btn
        label="Voltar"
        type="button"
        style="background: white; color:  #e65100;width:250px"
      />
      <q-btn
        label="Entrar"
        type="button"
        style="background: #e65100; color: white;width:250px"
      />
    </div>
  </q-form>
</template>

<script>
export default {
  name: "FormFaculdade",
  data() {
    return {
      name: null,
      age: null,
      accept: false
    };
  },

  methods: {
    onSubmit() {},

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    }
  }
};
</script>

<style>
h4 {
  color: #e65100;
  font-weight: bold;
}
#btns {
  display: flex;
  justify-content: flex-end;
}
</style>
