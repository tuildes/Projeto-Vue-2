<template>
  <v-snackbar
    v-model="showSnack"
    top
    right
    fixed
    :color="snackbarColor"
    timeout="4000"
  >
    {{ message }}
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      showSnack: false,
      snackbarColor: null,
      message: null,
    }
  },

  methods: {
    showSnackbar(message) {
      this.message = message.text
      this.snackbarColor = message.color
      this.showSnack = true
    },
  },
}
</script>
