import usuario from '../services/usuario/login';

const SnackBarMixins = {
  methods: {
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
    },
    login(email, senha, tp_usuario) {
      this.$q.loading.show({
        message: "Realizando Login aguarde ..."
      });

      const user = {
        email,
        senha,
        tp_usuario
      };

      usuario
        .realizarLogin(user)
        .then(response => {
          this.snackBarPositive("Bem vindo ao Baré Oportunidades!");
          sessionStorage.setItem("usuario", JSON.stringify(response.data));

          this.timer = setTimeout(() => {
            this.$q.loading.hide();
            this.timer = void 0;
            if (tp_usuario === "A") {
              this.$router.push("/home-students");
            } else if (tp_usuario === "F") {
              this.$router.push("/home-college");
            } else {
              this.$router.push("/home-company");
            }
           
          }, 2000);
        })
        .catch(e => {
          this.snackBarNegative(e.response.data.message);

          this.timer = setTimeout(() => {
            this.$q.loading.hide();
            this.timer = void 0;
          }, 2000);
        });
    },
  }
}

export default SnackBarMixins;
