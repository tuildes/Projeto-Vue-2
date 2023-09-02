<template>
  <v-app>
    <NavBar />
    <!--Renderizacao antes dos outros itens-->
    <nuxt class="nuxt" />
    <!--Rendereizao depois dos outros itens-->
    <VFooter />
    <GoBackButton />
  </v-app>
</template>

<!--Tudo aqui vai ser feito em TODAS as paginas-->

<script>
import NavBar from '../components/sections/layout/NavBar.vue'
import VFooter from '../components/sections/layout/VFooter.vue'
import GoBackButton from '../components/sections/layout/GoBackButton.vue'
export default {
  components: {
    VFooter,
    GoBackButton,
    NavBar,
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.nuxt {
  height: 100%;
}
</style>
