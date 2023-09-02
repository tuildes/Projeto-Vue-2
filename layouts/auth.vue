<template>
  <v-app class="auth-wrapper">
    <!--Imagem de fundo-->
    <v-img class="auth-image" :src="BackgroundImage" />

    <global-toast />
    <v-container fluid fill-height>
      <v-layout align-center justify-center mb-4>
        <v-flex xs12>
          <v-layout column justify-center align-center fill-height>
            <v-card
              width="100%"
              max-width="500"
              color="rgba(255, 255, 255, 0.9)"
              style="border-radius: 50px;"
            >
              <nuxt />
            </v-card>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
import GlobalToast from '~/components/globals/GlobalToast'

export default {
  components: { GlobalToast },

  data() {
    return {
      BackgroundImage: require('@/assets/authBackground.jpeg'),
    }
  },
}
</script>
<style scoped>
.auth-image {
  position: absolute;
  height: 100vh;
  width: 100vw;
}
</style>
