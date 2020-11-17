<template>
  <q-layout view="lHh Lpr lFf" id="container">
    <img
      id="logo-bare"
      alt="Quasar logo"
      src="~assets/img/imagens-bare-01.svg"
      width="400px"
    />

    <div id="form-container">
      <img alt="Baré logo" src="~assets/img/marca-bare.oportunidades-02.svg" />

      <q-tabs v-model="tab" id="tabs-menu">
        <q-tab name="A" label="Alunos" @click="onReset()" />
        <q-tab name="E" label="Empresa" @click="onReset()" />
        <q-tab name="F" label="Faculdades" @click="onReset()" />
      </q-tabs>

      <q-form ref="formLogin" class="q-gutter-lg">
        <q-input
          outlined
          stack-label
          label-color="orange"
          filled
          v-model="email"
          label="Login"
          hint="Seu E-mail"
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
          v-model="senha"
          label="Senha"
          lazy-rules
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

        <div>
          <q-btn
            label="Entrar"
            type="button"
            style="background: #e65100; color: white;width:340px"
            @click="onSubmit"
          />
        </div>
        <div id="ntc">
          <label @click="escolha = true">Não Tem Cadastro?</label>
        </div>

        <div id="ntc">
          <label @click="esqueciMinhaSenha">Esqueci minha senha</label>
        </div>
      </q-form>
    </div>
    <span id="img-02">
      <img
        alt="Quasar logo"
        src="~assets/img/imagens-bare-02.svg"
        width="350px"
      />
    </span>

    <span id="img-03">
      <img
        alt="Quasar logo"
        src="~assets/img/imagens-bare-03.svg"
        width="260px"
      />
    </span>
    <dialog-escolha
      :escolha="escolha"
      @escolha="escolha = $event"
    ></dialog-escolha>
  </q-layout>
</template>

<script>
import usuario from "../services/usuario/login";
import DialogEscolha from "../components/Dialogs/DialogEscolha";
import SnackBarMixins from "../mixins/SnackBarMixins";

export default {
  name: "LoginLayout",
  mixins: [SnackBarMixins],
  components: { DialogEscolha },
  data() {
    return {
      email: null,
      senha: null,
      isPwd: true,
      tab: "A",
      escolha: false
    };
  },

  methods: {
    onSubmit() {
      this.login(this.email, this.senha, this.tab);
    },

    onReset() {
      this.name = null;
      this.password = null;
      this.$refs.formLogin.resetValidation();
    },
    esqueciMinhaSenha() {
      this.$q
        .dialog({
          title: "Esqueci minha Senha",
          message: "Digite seu e-mail?",
          prompt: {
            model: "",
            type: "text" // optional
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => {
          this.snackBarPositive("Verifique sua caixa de entrada!");

          usuario
            .forgotPassword({ email: data })
            .then(response => {
              //this.snackBarPositive(response.data.message);
            })
            .catch(e => {
              this.snackBarNegative(e.response.data.message);
            });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
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

#form-container img {
  margin-bottom: 2%;
}

#img-02 {
  margin-top: 6%;
  margin-left: 2%;
}

#img-03 {
  margin-top: 6%;
}

#tabs-menu {
  margin-bottom: 4%;
  color: #8b8b8b;
}
#ntc {
  display: flex;
  justify-content: center;
  color: #e65100;
  font-size: 1rem;
  text-decoration: underline;
}

#ntc label:hover {
  cursor: pointer;
}

@media only screen and (max-width: 1200px) {
  #container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #img-02,
  #img-03,
  #logo-bare {
    display: none;
  }
}
</style>
