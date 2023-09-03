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
        <v-btn class="mt-5" color="#00897B" dark @click="openCreate()"
          >Adicionar</v-btn
        >
      </v-col>

      <v-col cols="12" sm="12" md="6" lg="6" class="d-flex justify-end">
        <div class="dashboard-search">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar"
            single-line
            flat
            hide-details
          />
        </div>
      </v-col>
    </v-row>
    <!--Header-->

    <!--Table-->
    <v-data-table
      class="elevation-3 mt-5"
      :search="search"
      :items="galleryImages"
      :headers="headers"
      calculate-widths
    >
      <!--Escrever algo diferente dentro da tabela-->
      <template v-slot:[`item.categorie`]="{ item }">
        {{ formatArray(item.categorie) }}
      </template>
      <!--Imagem do item-->
      <template v-slot:[`item.path`]="{ item }">
        <v-img class="dashboard-image my-3" :src="formatImagePath(item.path)" />
      </template>
      <!--Botoes de ação-->
      <template v-slot:[`item.action`]="{ item }">
        <div class="d-flex justify-space-around">
          <v-icon
            color="#00695C"
            size="40px"
            class="dashboard-edit-icon"
            @click="updateImage(item)"
          >
            mdi-image-edit
          </v-icon>
          <v-icon
            color="#1565C0"
            size="40px"
            class="dashboard-edit-icon"
            @click="openEdit(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            color="#FF1744"
            size="40px"
            class="dashboard-edit-icon"
            @click="deleteImage(item)"
          >
            mdi-delete-circle
          </v-icon>
        </div>
      </template>
    </v-data-table>
    <!--Table-->
    <!--Dialog criação/edição-->
    <v-dialog
      v-model="DialogOpen"
      content-class="elevation-0"
      max-width="800px"
      no-click-animation
      persistent
    >
      <v-card class="dashboard-dialog">
        <v-card-title class="headline">
          {{ dialogTitle }}
        </v-card-title>

        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-if="!isUpdateImage"
              v-model="editedItem.name"
              :rules="[(v) => !!v || 'O nome da imagem é necessário']"
              label="Nome da Imagem"
            />
            <!-- <v-file-input
              v-if="!isEdit || isUpdateImage"
              v-model="editedItem.image"
              chips
              accept="image/"
              label="Imagem"
              :rules="[(v) => !!v || 'O upload da imagem é necessário']"
            /> -->
            <v-text-field
              v-if="!isEdit || isUpdateImage"
              v-model="editedItem.image"
              :rules="[(v) => !!v || 'O url da imagem é necessário']"
              label="Endereço da Imagem"
            />
            <v-select
              v-if="!isUpdateImage"
              v-model="editedItem.categorie"
              :items="categories"
              item-text="name"
              item-value="id"
              label="Categorias"
              multiple
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="pb-5 pr-5">
          <v-spacer />
          <v-btn color="black" text @click="closeDialog()">Cancelar</v-btn>
          <v-btn v-modal="enableSubmit" color="success" @click="onSubmit()"
            >Salvar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Dialog criação/edição-->
  </v-main>
</template>

<script>
export default {
  layout: 'dashboard',

  async asyncData({ $axios }) {
    const [galleryRes, categoriesRes] = await Promise.all([
      $axios.get('gallery'),
      $axios.get('categories'),
    ])
    return {
      galleryImages: galleryRes.data,
      categories: categoriesRes.data,
    }
  },

  data() {
    return {
      // SnackBar Variáveis
      snackbar: false,
      tempo: null,
      texto: null,
      snackbarColor: null,

      // Dialog
      DialogOpen: false,
      isEdit: false,
      isUpdateImage: false,
      dialogTitle: '',

      editedItem: {
        name: '',
        image: '',
        categorie: [],
      },

      enableSubmit: false,

      // Table Data Variáveis
      search: '',

      headers: [
        {
          text: 'Identificacao',
          align: 'left',
          sortable: true,
          value: 'id',
          width: '140px',
        },

        { text: 'Nome', align: 'left', sortable: true, value: 'name' },

        {
          text: 'Categorias',
          align: 'left',
          sortable: false,
          value: 'categorie',
        },

        {
          text: 'Imagem',
          align: 'left',
          sortable: false,
          value: 'path',
          width: '250px',
        },

        { text: '', align: 'right', sortable: false, value: 'action' },
      ],
    }
  },

  methods: {
    // No caso de imagens no proprio back-end Laravel, no meu caso nao faz diferenca
    formatImagePath(path) {
      return path.replace('public/', 'http://localhost:8000/storage')
    },

    formatArray(array) {
      let formatedArray = ''
      array.forEach((item, i) => {
        formatedArray += item
        if (i < array.length - 1) {
          formatedArray += ' | '
        }
      })
      return formatedArray
    },

    // Manipulacao do Dialog

    setState(updateImage, edit, dialog) {
      this.isUpdateImage = updateImage
      this.isEdit = edit
      this.DialogOpen = dialog
    },

    openCreate() {
      this.setState(false, false, true)
      this.dialogTitle = 'Criar uma nova imagem'
    },

    openEdit(objeto) {
      this.editedItem.id = objeto.id
      this.editedItem.name = objeto.name
      this.editedItem.image = objeto.path
      this.editedItem.categorie = objeto.categorie

      this.setState(false, true, true)
      this.dialogTitle = 'Alterar nome e categorias'
    },

    updateImage(objeto) {
      this.editedItem.id = objeto.id
      this.editedItem.name = objeto.name
      this.editedItem.image = objeto.path
      this.editedItem.categorie = objeto.categorie

      this.setState(true, true, true)
      this.dialogTitle = 'Editar uma imagem'
    },

    closeDialog() {
      this.setState(false, false, false)
      this.dialogTitle = ''
      this.editedItem.name = ''
      this.editedItem.image = ''
      this.editedItem.categorie = []
    },

    // Funcao de submit, update e edit

    onSubmit() {
      this.isEdit ? this.updateImageContent() : this.createImage()
      this.closeDialog()
    },

    createImage() {
      if (this.editedItem.name !== '' && this.editedItem.image !== '') {
        this.$axios
          .post('gallery', {
            name: this.editedItem.name,
            path: this.editedItem.image,
            categorie: this.editedItem.categorie,
          })
          .then(() => {
            this.snackbar = true
            this.tempo = 3000
            this.texto = 'Sucesso ao criar a imagem!'
            this.snackbarColor = '#1B5E20'
            this.$nuxt.refresh()
          })
          .catch(() => {
            this.snackbar = true
            this.tempo = 3000
            this.texto = 'Erro ao criar a imagem!'
            this.snackbarColor = '#FF1744'
          })
      } else {
        this.snackbar = true
        this.tempo = 3000
        this.texto = 'Preenchimento inadequado dos campos'
        this.snackbarColor = '#FF1744'
      }
    },

    updateImageContent() {
      const id = this.editedItem.id
      delete this.editedItem.id

      if (this.editedItem.name !== '' && this.editedItem.image !== '') {
        this.$axios
          .put(`gallery/${id}`, {
            name: this.editedItem.name,
            path: this.editedItem.image,
            categorie: this.editedItem.categorie,
            apiId: '@',
          })
          .then(() => {
            this.snackbar = true
            this.tempo = 3000
            this.texto = 'Sucesso na atualização da imagem!'
            this.snackbarColor = '#1B5E20'
            this.$nuxt.refresh()
          })
          .catch(() => {
            this.snackbar = true
            this.tempo = 3000
            this.texto = 'Erro ao atualizar a imagem!'
            this.snackbarColor = '#FF1744'
          })
      } else {
        this.snackbar = true
        this.tempo = 3000
        this.texto = 'Preenchimento inadequado dos campos'
        this.snackbarColor = '#FF1744'
      }
    },

    deleteImage(objeto) {
      const ok = window.confirm('Você quer mesmo deletar esta imagem?')
      if (ok) {
        this.$axios
          .delete(`gallery/${objeto.id}`)
          .then(() => {
            this.snackbar = true
            this.tempo = 3000
            this.texto = 'A imagem foi deletada com sucesso!'
            this.snackbarColor = '#1B5E20'
            this.$nuxt.refresh()
          })
          .catch(() => {
            this.snackbar = true
            this.tempo = 3000
            this.texto = 'Erro ao deletar a imagem!'
            this.snackbarColor = '#FF1744'
          })
      }
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

.dashboard-image {
  width: 250px;
  border-radius: 5px;
}

.dashboard-dialog {
  border-radius: 30px !important;
}
</style>
