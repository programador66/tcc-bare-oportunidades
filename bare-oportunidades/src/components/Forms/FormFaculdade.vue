<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <h4>Registro de novo usuário</h4>
    <div id="position1">
      <q-input
        outlined
        stack-label
        label-color="orange"
        filled
        v-model="name"
        label="Razão Social"
        lazy-rules
        :rules="[
          val =>
            (val && val.length > 0) || 'Campo Razao Social não pode ser nulo'
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
    </div>

    <q-input
      outlined
      stack-label
      label-color="orange"
      filled
      v-model="name"
      label="Endereço"
      lazy-rules
      :rules="[
        val => (val && val.length > 0) || 'Campo CNPJ não pode ser nulo'
      ]"
    />

    <q-input
      outlined
      stack-label
      label-color="orange"
      filled
      v-model="name"
      label="Telefone"
      lazy-rules
      :rules="[
        val => (val && val.length > 0) || 'Campo CNPJ não pode ser nulo'
      ]"
    />
    <q-input
      outlined
      stack-label
      label-color="orange"
      filled
      v-model="name"
      label="Email"
      lazy-rules
      :rules="[
        val => (val && val.length > 0) || 'Campo CNPJ não pode ser nulo'
      ]"
    />
    <q-input
      outlined
      stack-label
      label-color="orange"
      filled
      v-model="name"
      label="Senha"
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

#position1 {
  display: flex;
  justify-content: space-between;
}
#position1 q-input {
  max-width: 100%;
}
</style>
