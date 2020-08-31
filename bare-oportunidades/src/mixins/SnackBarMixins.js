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
    }
  }
}

export default SnackBarMixins;
