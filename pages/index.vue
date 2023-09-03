<template>
  <v-container fluid class="pa-0 ma-0">
    <!--Fluid: usar todo o espaco do navegador-->
    <Banner />
    <Gallery />
    <Testimony :testimonies="testimonyRes" />
  </v-container>
</template>

<script>
import Gallery from '../components/sections/home/Gallery.vue'
import Banner from '../components/sections/home/Banner.vue'
import Testimony from '../components/sections/home/Testimony.vue'

export default {
  components: {
    Gallery,
    Banner,
    Testimony,
  },

  asyncData(context) {
    return context.app.$axios.get(`testimony`).then((res) => ({
      testimonyRes: res.data,
    }))
  },

  head() {
    return {
      title: 'Página Inicial',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Página inicial do Projeto de Vue 2023',
        },
      ],
    }
  },
}
</script>
