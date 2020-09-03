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
      color="orange"
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
      color="orange"
    />
    <q-input
      class="form-qinput-faculdade"
      outlined
      label="E-Mail"
      label-color="orange"
      ref="email"
      :rules="rule"
      v-model="aluno.email"
      color="orange"
    />

    <div style="display:flex;justify-content:space-between;align-items:center">
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
        color="orange"
        style="width:48%"
      />
      <q-select
        class="form-qinput-faculdade"
        outlined
        clearable
        label-color="orange"
        color="orange"
        v-model="aluno.sexo"
        :options="optSexo"
        label="Sexo"
        style="width:48%"
        hint="Selecione uma opção"
        ref="sexo"
        :rules="rule"
      />
    </div>
    <q-input
      class="form-qinput-faculdade"
      outlined
      label="Endereço"
      label-color="orange"
      ref="endereco"
      :rules="rule"
      v-model="aluno.endereco"
      hint="Av/Rua número"
      color="orange"
    />
    <q-input
      class="form-qinput-faculdade"
      outlined
      label="Registro Acadêmico"
      label-color="orange"
      ref="registro_academico"
      :rules="rule"
      v-model="aluno.registro_academico"
      hint="Somente Números"
      color="orange"
    />
    <q-select
      class="form-qinput-faculdade"
      outlined
      v-model="facul"
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
      color="orange"
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
import usuario from "../../services/usuario/login";
import SnackBarMixins from "../../mixins/SnackBarMixins";

export default {
  name: "FormAluno",
  mixins: [SnackBarMixins],
  data() {
    return {
      facul: null,
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
        registro_academico: "",
        email: "",
        senha: "",
        sexo: ""
      },
      faculdades: [],
      dadosFaculdades: [],
      optSexo: ["Masculino", "Feminino"]
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
      this.$refs.registro_academico.validate();
      this.$refs.faculdade.validate();
      this.$refs.sexo.validate();

      if (
        this.$refs.nome.hasError ||
        this.$refs.cpf.hasError ||
        this.$refs.email.hasError ||
        this.$refs.telefone.hasError ||
        this.$refs.senha.hasError ||
        this.$refs.registro_academico.hasError ||
        this.$refs.endereco.hasError ||
        this.$refs.faculdade.hasError ||
        this.$refs.sexo.hasError
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

      const index = this.dadosFaculdades.findIndex(
        facul => facul.nome === this.facul
      );

      const id_faculdade = this.dadosFaculdades[index].id;

      this.aluno.sexo = this.aluno.sexo === "Masculino" ? "M" : "F";

      const request = { ...this.aluno, id_faculdade, tp_usuario: "A" };

      this.$q.loading.show({
        message: "Validando dados Aguarde ..."
      });

      usuario
        .criarNovoUsuario(request)
        .then(response => {
          console.log(response.data);
          this.snackBarPositive(response.data.msg);

          this.timer = setTimeout(() => {
            this.$q.loading.hide();
            this.timer = void 0;
            this.login(this.aluno.email, this.aluno.senha, "A");
          }, 2000);
        })
        .catch(e => {
          this.$q.loading.hide();
          this.snackBarNegative(
            e.response.msg ? e.response.msg : "Favor Verificar seus dados!"
          );
        });
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
          this.dadosFaculdades = response.data.data;
        })
        .catch(e => {
          console.log(e.resonse);
        });
    }
  }
};
</script>

<style></style>
