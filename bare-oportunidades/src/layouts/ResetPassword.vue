<template>
  <q-layout view="lHh Lpr lFf" id="container-reset">
    <section id="form-container-reset">
      <img
        alt="Baré logo"
        src="~assets/img/marca-bare.oportunidades-02.svg"
        width="300px"
      />
      <div id="form-container">
        <q-input
          v-model="email"
          class="inp"
          ref="emailValidate"
          outlined
          stack-label
          label-color="orange"
          filled
          label="E-mail"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || 'Campo senha não pode ser nulo'
          ]"
        />

        <q-input
          v-model="novaSenha"
          class="inp"
          ref="novaSenhaValidate"
          outlined
          stack-label
          label-color="orange"
          filled
          label="Nova Senha"
          lazy-rules
          :type="isPwd ? 'password' : 'text'"
          :rules="[
            val => (val && val.length > 0) || 'Campo senha não pode ser nulo'
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
        <q-input
          v-model="confimaNovaSenha"
          class="inp"
          ref="confimaNovaSenhaValidate"
          outlined
          stack-label
          label-color="orange"
          filled
          label="Confirme a nova Senha"
          lazy-rules
          :type="isPwd2 ? 'password' : 'text'"
          :rules="[
            val => (val && val.length > 0) || 'Campo senha não pode ser nulo'
          ]"
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
          label="Enviar"
          type="button"
          style="background: #e65100; color: white;width:340px"
          @click="resetPassword"
        />
      </div>
    </section>
  </q-layout>
</template>

<script>
import UsuarioService from "../services/usuario/login";

export default {
  name: "ResetPassword",
  data() {
    return {
      isPwd: true,
      isPwd2: true,
      email: "",
      novaSenha: "",
      confimaNovaSenha: "",
      emailValidate: "",
      novaSenhaValidate: "",
      confimaNovaSenhaValidate: ""
    };
  },
  methods: {
    validateForm() {
      this.$refs.emailValidate.validate();
      this.$refs.novaSenhaValidate.validate();
      this.$refs.confimaNovaSenhaValidate.validate();
      if (
        this.$refs.emailValidate.hasError ||
        this.$refs.novaSenhaValidate.hasError ||
        this.$refs.confimaNovaSenhaValidate.hasError
      ) {
        return true;
      }

      return false;
    },
    resetPassword() {
      
      const validate = this.validateForm();

      if (validate) return (this.formHasError = true);

      if (this.novaSenha !== this.confimaNovaSenha)
        return this.messageAlert("Senhas Digitadas não conferem!");
        
      this.$q.loading.show({
              message: "Validando dados Aguarde ..."
            });
      const obj = {
        email: this.email,
        senha: this.novaSenha,
        token: this.$route.params.token
      };
      UsuarioService.resetPassword(obj)
        .then(response => {
          this.$q.loading.hide();
          this.snackBarPositive(response.data.message);
          setTimeout(() => {
            window.location = "http://localhost:8080";
          }, 3000);
        })
        .catch(e => {
          this.$q.loading.hide();
          this.snackBarNegative(e.response.data.message);
        });
    },
    messageAlert(msg) {
      this.$q
        .dialog({
          title: "Baré Alerta",
          message: `${msg}`
        })
        .onOk(() => {
          // console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    snackBarPositive(params) {
      this.$q.notify({
        type: "positive",
        message: `${params}`,
        timeout: 1000
      });
    },
    snackBarNegative(params) {
      this.$q.notify({
        type: "negative",
        message: `${params}`,
        timeout: 1500
      });
    }
  }
};
</script>
<style>
#container-reset {
  display: flex;
  justify-content: center;
  justify-items: center;
}
#form-container-reset {
  display: flex-start;
  flex-direction: column;
  justify-content: start;
  width: 340px;
}

#form-container-reset img {
  margin-top: 20%;
  margin-bottom: 2%;
}
</style>
