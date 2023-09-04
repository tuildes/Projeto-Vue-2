<template>
  <v-container class="gallery-wrapper d-flex align-center flex-column" fluid>
    <!-- Linha superior, apenas textos-->
    <v-row class="gallery-header pa-0 ma-0">
      <v-col cols="12" class="d-flex justify-center">
        <span class="gallery-title d">
          A Nossa Galeria
        </span>
      </v-col>

      <v-col cols="12" class="d-flex justify-center">
        <span class="gallery-description">
          Aqui temos uma demonstração de tudo que podemos fazer e mostrar. A
          seguir temos uma coletânea de fotos que vão surpreender seus olhos.
        </span>
      </v-col>
    </v-row>

    <!--Linha inferior, apenas imagens-->
    <v-row class="gallery-imageBox justify-center">
      <v-col
        v-for="(img, index) in galleryimgs"
        :key="index"
        cols="12"
        lg="4"
        md="6"
        sm="12"
        class="d-flex justify-center"
      >
        <v-card class="gallery-card">
          <v-img class="gallery-img" :src="img.path" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    galleryimgs: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {}
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;600&display=swap');

.gallery-wrapper {
  background-color: #efefef;
  padding: 100px 0px;
}

.gallery-title {
  font-family: 'Raleway', sans-serif;
  font-size: 30px;
  margin-top: -40px;
  line-height: 1.5;
  font-weight: 600;
}

.gallery-description {
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  font-size: 18px;
  color: #828282;

  max-width: 800px;
  margin-bottom: 10px;
  line-height: 1.5;
  text-align: center;
}

.gallery-imageBox {
  width: 70vw;
}

.gallery-card {
  width: 360px;
  height: 250px;
  border-radius: 5%;
}

.gallery-img {
  height: 100%;
  width: 100%;
}

@media (max-width: 428px) {
  .gallery-card {
    width: 300px;
    height: 200px;
  }
}
</style>
