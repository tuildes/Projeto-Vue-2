<template>
  <v-container
    fluid
    class="historic-wrapper d-flex justify-center align-center"
  >
    <img
      alt="Pintura de floresta com Blur"
      :src="BannerImage"
      class="historic-banner"
    />
    <v-row class="historic-content">
      <v-col
        v-for="(item, index) in historicTypes"
        :key="index"
        class="historic-card raleway d-flex flex-column justify-center align-center"
        cols="12"
        md="6"
        lg="3"
      >
        <v-icon color="#F6FF00" size="50"> {{ item.icon }} </v-icon>
        <span class="historic-card-number"> {{ item.number }}</span>
        <span class="historic-card-title"> {{ item.name }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      BannerImage: require('@/assets/historicBanner.jpg'),
      historicTypes: [
        {
          icon: 'mdi-eye-outline',
          number: '22070',
          name: 'Creativity Fuel',
        },
        {
          icon: 'mdi-anchor',
          number: '97',
          name: 'Happy Clients',
        },
        {
          icon: 'mdi-briefcase-outline',
          number: '402',
          name: 'Projects Done',
        },
        {
          icon: 'mdi-clock-time-five-outline',
          number: '212023',
          name: 'Hours Spent',
        },
      ],
    }
  },
}
</script>

<style scoped>
@import '@/assets/index.css';
@media (max-width: 962px) {
  .historic-content {
    row-gap: 40px !important;
  }

  .historic-card {
    gap: 5px !important;
  }
}
@media (max-width: 1262px) {
  .historic-banner {
    height: 1000px !important;
  }

  .historic-wrapper {
    height: 1000px !important;
  }
}
.historic-wrapper {
  margin: 0;
  padding: 0;
  height: 500px;
}

.historic-banner {
  position: absolute;
  width: 100vw;
  object-fit: cover;
  height: 500px;
  object-position: 0 66%;
  z-index: 0;
  filter: grayscale(0.25);
}

.historic-content {
  width: 90vw;
  max-width: 1200px;
  row-gap: 100px;
}

.historic-card {
  z-index: 100;
  gap: 20px;
}

.historic-card-number {
  color: #fff;
  font-size: 60px;
  font-weight: 500;
}

.historic-card-title {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  opacity: 0.85;
  text-transform: uppercase;
}
</style>
