<template>
  <div class="d-flex flex-column align-center">
    <v-responsive>
      <img
        src="~/static/imagens/logo.png"
        alt="Logo da Ecomp"
        class="logo disable-select"
      />
    </v-responsive>
    <div class="titulo display-2 pb-4 mt-2">
      {{ titulo }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'TitleAuth',
  props: {
    titulo: {
      type: String,
      required: true,
      default: '',
    },
  },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
.logo {
  width: 100px;
  margin-top: 50px;
}
.titulo {
  font-family: Poppins !important;
  font-weight: bold;
  color: rgb(61, 129, 91);
  text-transform: capitalize;
}
</style>
