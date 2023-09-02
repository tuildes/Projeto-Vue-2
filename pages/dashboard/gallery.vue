<template>
  <!--Fazer todos os campos estaticos aqui-->
  <v-main class="pa-10">
    <div>
      <v-snackbar
        v-model="snackbar"
        :timeout="tempo"
        :color="snackbarColor"
        top
        right
        fixed
      >
        <span class="snackbar-texto">{{ texto }}</span>
      </v-snackbar>
    </div>

    <!--Header-->

    <div class="d-flex justify-start">
      <span class="dashboard-title raleway"> Galeria </span>
    </div>

    <v-divider color="black" />

    <v-row
      class="d-flex flex-column-reverse flex-sm-row justify-space-between align-center"
    >
      <v-col cols="12" sm="12" md="6" lg="6">
        <v-btn class="mt-5 ml-5" color="#00897B" dark @click="openCreate()"
          >Adicionar</v-btn
        >
      </v-col>

      <v-col cols="12" sm="12" md="6" lg="6" class="d-flex justify-end">
        <div class="dashboard-search mr-5">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="pesquisar"
            single-line
            flat
            hide-details
          />
        </div>
      </v-col>
    </v-row>
    <!--Header-->
  </v-main>
</template>

<script>
export default {
  layout: 'dashboard',

  data() {
    return {
      snackbar: false,
      tempo: null,
      texto: null,
      snackbarColor: null,

      search: '',
    }
  },

  methods: {
    openCreate() {
      this.texto = 'teste 01'
      this.snackbarColor = 'success'
      this.tempo = 4000
      this.snackbar = true
    },
  },
}
</script>

<style scoped>
@import '@/assets/index.css';
.dashboard-title {
  font-size: 40px;
  font-weight: bold;
  color: rgb(49, 49, 49);
}

.dashboard-search {
  max-width: 500px;
  width: 100%;
}

.snackbar-texto {
  font-size: 16px;
  font-weight: bold;
}
</style>
