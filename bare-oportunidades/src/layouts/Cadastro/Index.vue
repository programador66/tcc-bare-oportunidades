<template>
  <div class="container">
    <div id="aside1">
      <form-faculdade />
    </div>
    <div id="aside2">
      <img
        alt="Students logo"
        src="~assets/img/imagens-bare-01.svg"
        width="400px"
      />
    </div>
  </div>
</template>

<script>
import FormFaculdade from "../../components/Forms/FormFaculdade";

export default {
  name: "Cadastro",
  components: { FormFaculdade },
  data() {
    return {};
  }
};
</script>
<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
#aside1 {
  padding: 2%;
  width: 500px;
}

#aside2 {
  margin: 5% 2%;
}
</style>
