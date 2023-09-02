<template>
  <v-container fluid class="testimony-wrapper">
    <div class="testimony-header d-flex justify-center">
      <span class="testimony-title">Depoimentos</span>
    </div>
    <v-carousel
      hide-delimiter-background
      delimiter-icon="mdi-checkbox-blank-circle-outline"
      cycle
      continuous
      :show-arrows="false"
      height="400px"
      class="testtimony-carousel"
    >
      <v-carousel-item v-for="(item, index) in testimonies" :key="index">
        <div
          class="testimony-carousel-item d-flex flex-column justify-center align-center"
        >
          <img
            class="testimony-carousel-image"
            :alt="item.nome"
            :src="item.image_url"
          />

          <div class="testimony-apresentation py-4">
            <span> {{ item.nome }}, via </span>
            <span class="testimony-apresentation-ocupation">
              {{ item.ocupacao }}
            </span>
          </div>

          <span class="testimony-text">
            {{ item.frase }}
          </span>
        </div>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
export default {
  props: {
    testimonies: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
@import url('http://fonts.googleapis.com/css2?family=Raleway&display=swap');

.testimony-wrapper {
  background-color: #efefef;
}

.testimony-header {
  padding: 60px 0;
}

.testimony-title {
  font-size: 36px;
  margin-bottom: 10px;
  line-height: 1.5;
  font-weight: bold;
  font-family: 'Raleway', sans-serif;
}

.testimony-carousel-image {
  border-radius: 50%;
  width: 90px;
  height: 90px;
}

.testimony-apresentation {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  font-family: 'Raleway', Arial, sans-serif;
  margin-bottom: 10px;
}

.testtimony-carousel >>> .v-btn--active {
  color: #558b2f !important;
}

.testtimony-carousel >>> .v-btn--icon {
  color: #558b2f !important;
}

.testimony-apresentation-ocupation {
  color: #558b2f;
}

.testimony-text {
  text-align: center;
  font-size: 17px;
  font-family: 'Raleway', Arial, sans-serif;
  color: #828282;
  max-width: 800px;
}
</style>
