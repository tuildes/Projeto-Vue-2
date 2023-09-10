<template>
  <v-container fluid class="pa-0 ma-0">
    <Banner :title="'CONTATO'" />
    <ContactInfo />
  </v-container>
</template>

<script>
import Banner from '~/components/sections/contact/Banner.vue'
import ContactInfo from '~/components/sections/contact/ContactInfo.vue'
export default {
  components: { Banner, ContactInfo },
}
</script>

<style scoped></style>
