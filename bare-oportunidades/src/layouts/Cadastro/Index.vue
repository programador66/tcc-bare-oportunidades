<template>
  <div class="container">
    <div class="content">
      <section>
        <h4>{{ getterTp_usuario.title }}</h4>
        <p>
          {{ getterTp_usuario.paragrafo }}
        </p>
        <img
          alt="Students logo"
          src="~assets/img/imagens-bare-01.svg"
          width="380px"
        />

        <q-btn
          style="background:white; color:  #e65100;"
          icon="keyboard_backspace"
          label="Voltar Para Home"
          outline
          @click="home"
        />
      </section>
      <FormFaculdade v-if="getterTp_usuario.tipo == 'F'" />
      <FormAluno v-if="getterTp_usuario.tipo == 'A'" />
    </div>
  </div>
</template>

<script>
import FormFaculdade from "../../components/Forms/FormFaculdade";
import FormAluno from "../../components/Forms/FormAluno";
import { mapGetters } from "vuex";

export default {
  name: "Cadastro",
  components: { FormFaculdade, FormAluno },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("usuario", ["getterTp_usuario"])
  },
  methods: {
    home() {
      this.$router.push("/");
    }
  }
};
</script>
<style>
.container {
  width: 100%;
  max-width: 1120px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container .content {
  width: 100%;
  padding: 96px;
  background: #f0f0f5;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content .content section {
  width: 100%;
  max-width: 380px;
}

.container .content section h4 {
  margin: 4px 0 40px;
  font-size: 30px;
  color: #e65100;
  font-weight: bold;
}
.container .content section p {
  font-size: 18px;
  color: #737380;
  line-height: 32px;
}
</style>
