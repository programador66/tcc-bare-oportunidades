<template>
  <q-form class="form-faculdade" ref="formFaculdade">
    <q-input
      class="form-qinput-faculdade"
      outlined
      v-model="faculdade.nome"
      label="Faculdade"
      label-color="orange"
      ref="nome"
      lazy-rules
      :rules="rule"
      hint="razão social"
    />
    <q-input
      class="form-qinput-faculdade"
      outlined
      v-model="faculdade.cnpj"
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
      v-model="faculdade.email"
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
      v-model="faculdade.endereco"
      label="Endereço"
      label-color="orange"
      ref="endereco"
      lazy-rules
      :rules="rule"
      hint="Rua/Av n°"
    />
    <q-input
      class="form-qinput-faculdade"
      outlined
      v-model="faculdade.telefone"
      label="Telefone"
      label-color="orange"
      ref="telefone"
      lazy-rules
      :rules="rule"
      mask="(##) ####-####"
      hint="(00) 0000-0000"
    />
    <q-input
      class="form-qinput-faculdade"
      outlined
      v-model="faculdade.senha"
      label="Senha"
      label-color="orange"
      ref="senha"
      lazy-rules
      :rules="rule"
      :type="isPwd1 ? 'password' : 'text'"
      hint="min 6 caracteres"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd1 ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd1 = !isPwd1"
        />
      </template>
    </q-input>
    <q-input
      class="form-qinput-faculdade"
      outlined
      v-model="faculdade.confirmar_senha"
      label="confirmar Senha"
      label-color="orange"
      ref="confirmar_senha"
      lazy-rules
      :rules="rule"
      :type="isPwd2 ? 'password' : 'text'"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd2 ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd2 = !isPwd2"
        />
      </template>
    </q-input>
    <q-btn
      label="Entrar"
      type="button"
      style="background: #e65100; color: white; width: 100%;height: 50px;border-radius: 8px;  text-decoration: none;"
      @click="novoCadastro"
    />
  </q-form>
</template>

<script>
import usuario from "../../services/usuario/login";
import SnackBarMixins from "../../mixins/SnackBarMixins";

export default {
  name: "FormFaculdade",
  mixins: [SnackBarMixins],
  data() {
    return {
      isPwd1: true,
      isPwd2: true,
      nome: "",
      cnpj: "",
      email: "",
      telefone: "",
      senha: "",
      endereco: "",
      confirmar_senha: "",
      rule: [val => (val && val.length > 0) || "Campo obrigatório"],
      faculdade: {
        nome: "",
        cnpj: "",
        email: "",
        telefone: "",
        senha: "",
        endereco: "",
        confirmar_senha: "",
        tp_usuario: "F"
      }
    };
  },

  methods: {
    validateForm() {
      this.$refs.nome.validate();
      this.$refs.cnpj.validate();
      this.$refs.email.validate();
      this.$refs.telefone.validate();
      this.$refs.senha.validate();
      this.$refs.confirmar_senha.validate();
      this.$refs.endereco.validate();

      if (
        this.$refs.nome.hasError ||
        this.$refs.cnpj.hasError ||
        this.$refs.email.hasError ||
        this.$refs.telefone.hasError ||
        this.$refs.senha.hasError ||
        this.$refs.confirmar_senha.hasError ||
        this.$refs.endereco.hasError
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
        message: "Realizando Login Aguarde ..."
      });

      usuario
        .criarNovoUsuario(this.faculdade)
        .then(response => {
          this.snackBarPositive(response.data.msg);

          this.timer = setTimeout(() => {
            this.$q.loading.hide();
            this.timer = void 0;
            this.login(this.faculdade.email, this.faculdade.senha, "F");
          }, 2000);
        })
        .catch(e => {
          this.snackBarNegative(
            e.response.msg ? e.response.msg : "Favor Verificar seus dados!"
          );
          this.$q.loading.hide();
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
  margin-bottom: 2px;
}
</style>
