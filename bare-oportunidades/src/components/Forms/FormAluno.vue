<template>
  <q-form class="form-faculdade" ref="formAluno">
    <q-input
      outlined
      label="Nome Completo"
      label-color="orange"
      ref="nome"
      :rules="rule"
      v-model="aluno.nome"
    />
    <q-input
      outlined
      label="Cpf"
      label-color="orange"
      ref="nome"
      :rules="rule"
      v-model="aluno.cpf"
    />
    <q-input
      outlined
      label="E-Mail"
      label-color="orange"
      ref="nome"
      :rules="rule"
      v-model="aluno.email"
    />
    <q-input
      outlined
      label="Telefone"
      label-color="orange"
      ref="nome"
      :rules="rule"
      v-model="aluno.telefone"
    />
    <q-input
      outlined
      label="Registro Acadêmico"
      label-color="orange"
      ref="nome"
      :rules="rule"
      v-model="aluno.ra"
    />
    <q-select
      outlined
      v-model="model"
      use-input
      hide-selected
      fill-input
      label-color="orange"
      input-debounce="0"
      label="Faculdade"
      :options="options"
      @filter="filterFn"
      hint="no min 2 caracteres"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <q-input
      class="form-qinput-faculdade"
      outlined
      v-model="aluno.senha"
      label="Senha"
      label-color="orange"
      ref="senha"
      lazy-rules
      :rules="ruleSenha"
      :type="isPwd ? 'password' : 'text'"
      hint="min 8 caracteres"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <q-btn
      label="Entrar"
      type="button"
      style="background: #e65100; color: white; width: 100%;height: 50px;border-radius: 8px;  text-decoration: none;margin-top:2px;"
    />
  </q-form>
</template>

<script>
const stringOptions = [
  "Faculdade Fucapi",
  "Fametro",
  "Ufam",
  "Unip",
  "Estacio"
];

export default {
  name: "FormAluno",
  data() {
    return {
      model: null,
      options: stringOptions,
      isPwd: true,
      nome: "",
      rule: [val => (val && val.length > 0) || "Campo obrigatório"],
      ruleSenha: [
        val =>
          (val && val.length > 7) ||
          "Campo senha deve conter no Mínimo 8 caracteres"
      ],
      aluno: {
        nome: "",
        cpf: "",
        telefone: "",
        endereco: "",
        ra: "",
        email: "",
        senha: ""
      }
    };
  },
  methods: {
    filterFn(val, update, abort) {
      if (val.length < 2) {
        abort();
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = stringOptions.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    }
  }
};
</script>

<style></style>
