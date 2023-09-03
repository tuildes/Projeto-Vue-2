<template>
  <v-container fluid class="pa-0 ma-0">
    <!--Fluid: usar todo o espaco do navegador-->
    <Banner />
    <v-divider />
    <Gallery :galleryImgs="galleryRes" />
    <v-divider />
    <Testimony :testimonies="testimonyRes" />
    <v-divider />
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

  async asyncData({ $axios }) {
    const [testimony, gallery] = await Promise.all([
      $axios.get(`testimony`),
      $axios.get(`gallery`),
    ])
    return {
      testimonyRes: testimony.data,
      galleryRes: gallery.data,
    }
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
