<template>
  <q-form class="form-faculdade" ref="formAluno">
    <q-input
      class="form-qinput-faculdade"
      outlined
      label="Nome Completo"
      label-color="orange"
      ref="nome"
      :rules="rule"
      v-model="aluno.nome"
    />
    <q-input
      class="form-qinput-faculdade"
      outlined
      label="Cpf"
      label-color="orange"
      ref="cpf"
      :rules="rule"
      v-model="aluno.cpf"
      mask="###.###.###-##"
      hint="somente números"
    />
    <q-input
      class="form-qinput-faculdade"
      outlined
      label="E-Mail"
      label-color="orange"
      ref="email"
      :rules="rule"
      v-model="aluno.email"
    />
    <q-input
      class="form-qinput-faculdade"
      outlined
      label="Telefone"
      label-color="orange"
      ref="telefone"
      :rules="rule"
      v-model="aluno.telefone"
      mask="(##) ####-####"
      hint="Somente Números"
    />
    <q-input
      class="form-qinput-faculdade"
      outlined
      label="Endereço"
      label-color="orange"
      ref="endereco"
      :rules="rule"
      v-model="aluno.endereco"
      hint="Av/Rua número"
    />
    <q-input
      class="form-qinput-faculdade"
      outlined
      label="Registro Acadêmico"
      label-color="orange"
      ref="ra"
      :rules="rule"
      v-model="aluno.ra"
      hint="Somente Números"
    />
    <q-select
      class="form-qinput-faculdade"
      outlined
      v-model="model"
      use-input
      hide-selected
      fill-input
      label-color="orange"
      input-debounce="0"
      label="Faculdade"
      ref="faculdade"
      :rules="rule"
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
      @click="novoCadastro"
    />
  </q-form>
</template>

<script>
import FaculdadeService from "../../services/faculdade/index";

export default {
  name: "FormAluno",
  data() {
    return {
      model: null,
      options: [],
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
      },
      faculdades: []
    };
  },
  mounted() {
    this.getFaculdades();
  },
  methods: {
    validateForm() {
      this.$refs.nome.validate();
      this.$refs.cpf.validate();
      this.$refs.email.validate();
      this.$refs.telefone.validate();
      this.$refs.endereco.validate();
      this.$refs.senha.validate();
      this.$refs.ra.validate();
      this.$refs.faculdade.validate();

      if (
        this.$refs.nome.hasError ||
        this.$refs.cpf.hasError ||
        this.$refs.email.hasError ||
        this.$refs.telefone.hasError ||
        this.$refs.senha.hasError ||
        this.$refs.ra.hasError ||
        this.$refs.endereco.hasError ||
        this.$refs.faculdade.hasError
      ) {
        return true;
      }

      return false;
    },
    novoCadastro() {
      const validate = this.validateForm();

      if (validate) {
        return (this.formHasError = true);
      }
      const faculdade = this.options.length === 1 ? this.options : "";
      console.log(faculdade);
    },
    filterFn(val, update, abort) {
      if (val.length < 2) {
        abort();
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = this.faculdades.filter(
          v => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },
    getFaculdades() {
      FaculdadeService.getFaculdades()
        .then(response => {
          this.faculdades = response.data.data.map(f => f.nome);
        })
        .catch(e => {
          console.log(e.resonse);
        });
    }
  }
};
</script>

<style></style>
