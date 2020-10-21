<template>
  <q-banner dense inline-actions class="text-white  card" style="background:#e65100">
      Seu Cadastro ainda não foi ativado! favor verificar com sua instituição
      <template v-slot:action>
        <q-btn flat color="white" label="Entendido" />
      </template>
   </q-banner>
</template>

<script>
export default {
  name: "Alerta",
};
</script>
<style>
.card{
  margin-top:0.5%;
}
</style>