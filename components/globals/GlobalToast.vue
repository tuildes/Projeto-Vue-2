<template>
  <v-snackbar
    v-model="toast.visible"
    bottom
    left
    :timeout="toast.timeout"
    :color="toast.color"
  >
    {{ toast.text }}
    <v-btn
      v-show="toast.dismissable"
      color="white"
      @click="toast.visible = false"
    >
      Fechar
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'GlobalToast',
  data() {
    return {
      toast: {
        timeout: 0,
        text: null,
        color: null,
        visible: false,
        dismissable: false,
      },
    }
  },
  watch: {
    '$store.state.toasts.toast': {
      handler(newVal) {
        this.toast = { ...newVal }
      },
      immediate: false,
    },
    'toast.visible': {
      handler(newVal) {
        if (newVal === false) {
          this.$store.commit('toasts/remove')
        }
      },
      immediate: false,
    },
  },
}
</script>

<style scoped></style>
