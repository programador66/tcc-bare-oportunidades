<template>
  <q-form class="form-faculdade" ref="formEmpresa">
    <q-input
      class="form-qinput-faculdade"
      outlined
      v-model="empresa.razao_social"
      label="Razão Social"
      label-color="orange"
      ref="razao_social"
      lazy-rules
      :rules="rule"
      hint="razão social"
    />
    <q-input
      class="form-qinput-faculdade"
      outlined
      v-model="empresa.nome_fantasia"
      label="Nome Fantasia"
      label-color="orange"
      ref="nome_fantasia"
      lazy-rules
      :rules="rule"
      hint="razão social"
    />
    <q-input
      class="form-qinput-faculdade"
      outlined
      v-model="empresa.cnpj"
      label="CNPJ"
      label-color="orange"
      ref="cnpj"
      lazy-rules
      :rules="rule"
      mask="##.###.###/####-##"
      hint="Exemplo: 00.000.000/0000-00"
    />
    <q-input
      class="form-qinput-faculdade"
      outlined
      v-model="empresa.email"
      label="E-Mail"
      label-color="orange"
      ref="email"
      lazy-rules
      :rules="rule"
      hint="email@mail.com"
    />
    <q-input
      class="form-qinput-faculdade"
      outlined
      v-model="empresa.cep"
      mask="########"
      label="CEP"
      label-color="orange"
      ref="cep"
      lazy-rules
      :rules="rule"
      hint="somente numeros"
    />
    <q-input
      class="form-qinput-faculdade"
      outlined
      v-model="empresa.fone"
      label="Telefone"
      label-color="orange"
      ref="fone"
      lazy-rules
      :rules="rule"
      mask="(##) ####-####"
      hint="(00) 0000-0000"
    />
    <q-input
      :rules="rule"
      ref="descricao_empresa"
      v-model="empresa.descricao_empresa"
      filled
      type="textarea"
      label-color="orange"
      label="Descricao da Empresa"
      hint="Breve descrição sobre a empresa"
    />
    <q-input
      class="form-qinput-faculdade"
      outlined
      v-model="empresa.senha"
      label="Senha"
      label-color="orange"
      ref="senha"
      lazy-rules
      :rules="ruleSenha"
      :type="isPwd1 ? 'password' : 'text'"
      hint="min 8 caracteres"
      style="margin-top:4px"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd1 ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd1 = !isPwd1"
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
import usuario from "../../services/usuario/login";
import SnackBarMixins from "../../mixins/SnackBarMixins";

export default {
  name: "FormEmpresa",
  mixins: [SnackBarMixins],
  data() {
    return {
      isPwd1: true,
      razao_social: "",
      nome_fantasia: "",
      cnpj: "",
      email: "",
      fone: "",
      senha: "",
      cep: "",
      descricao_empresa: "",
      rule: [val => (val && val.length > 0) || "Campo obrigatório"],
      ruleSenha: [
        val =>
          (val && val.length > 7) ||
          "Campo senha deve conter no Mínimo 8 caracteres"
      ],
      empresa: {
        razao_social: "",
        nome_fantasia: "",
        cnpj: "",
        email: "",
        fone: "",
        senha: "",
        cep: "",
        tp_usuario: "E",
        descricao_empresa: ""
      }
    };
  },

  methods: {
    validateForm() {
      this.$refs.razao_social.validate();
      this.$refs.nome_fantasia.validate();
      this.$refs.cnpj.validate();
      this.$refs.email.validate();
      this.$refs.fone.validate();
      this.$refs.senha.validate();
      this.$refs.cep.validate();
      this.$refs.descricao_empresa.validate();

      if (
        this.$refs.razao_social.hasError ||
        this.$refs.cnpj.hasError ||
        this.$refs.email.hasError ||
        this.$refs.fone.hasError ||
        this.$refs.senha.hasError ||
        this.$refs.cep.hasError ||
        this.$refs.nome_fantasia.hasError ||
        this.$refs.descricao_empresa.hasError
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
      this.$q.loading.show({
        message: "Validando dados Aguarde ..."
      });

      usuario
        .criarNovoUsuario(this.empresa)
        .then(response => {
          this.snackBarPositive(response.data.msg);

          this.timer = setTimeout(() => {
            this.$q.loading.hide();
            this.timer = void 0;
            this.login(this.empresa.email, this.empresa.senha, "E");
          }, 2000);
        })
        .catch(e => {
          this.$q.loading.hide();
          this.snackBarNegative(
            e.response.msg ? e.response.msg : "Favor Verificar seus dados!"
          );
        });
    }
  }
};
</script>

<style>
.form-faculdade {
  width: 100%;
  max-width: 450px;
  margin-left: 4%;
}

.form-qinput-faculdade {
  margin-bottom: 6px;
}
</style>
