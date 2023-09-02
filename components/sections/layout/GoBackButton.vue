<template>
  <div class="button-wrapper" fluid>
    <button class="button">
      <v-icon class="button-icon">
        mdi-arrow-up
      </v-icon>
    </button>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.button-wrapper {
  position: fixed;
  right: 25px;
  bottom: 25px;
}

.button {
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10%;
}

.button-icon {
  color: rgba(255, 255, 255, 0.75);
}
</style>
