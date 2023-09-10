<template>
  <v-container fluid>
    <v-snackbar
      v-model="snackbar"
      :timeout="tempo"
      :color="snackbarColor"
      fixed
      class="mb-5"
    >
      <span>{{ texto }}</span>
    </v-snackbar>

    <div class="coluna-usuario">
      <title-auth titulo="Login" />
      <input-auth v-model="email" placeholder="Email" />
      <input-auth v-model="password" placeholder="Senha" type="password" />

      <v-flex class="d-flex">
        <nuxt-link class="esqueceu-senha" to="/esqueci-a-senha">
          Esqueceu a senha?
        </nuxt-link>
      </v-flex>

      <div class="btn-entrar" @click="realizarLogin">
        Entrar
      </div>
      <div class="d-flex justify-center flex-column">
        <nuxt-link class="btn-voltar" to="/registro">
          Registrar
        </nuxt-link>
        <nuxt-link class="btn-voltar" to="/">
          Voltar para a Home
        </nuxt-link>
      </div>
    </div>
  </v-container>
</template>

<script>
import InputAuth from '~/components/inputs/InputAuth'
import TitleAuth from '~/components/sections/auth/TitleAuth'

export default {
  components: {
    TitleAuth,
    InputAuth,
  },
  data() {
    return {
      email: '',
      password: '',

      // SnackBar Variáveis
      snackbar: false,
      tempo: null,
      texto: null,
      snackbarColor: null,
    }
  },
  computed: {},
  methods: {
    loginError() {
      this.snackbar = true
      this.tempo = 2500
      this.texto = 'Senha ou E-mail inválidos'
      this.snackbarColor = 'error'
    },

    async realizarLogin() {
      this.$nuxt.$loading.start()
      await this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then(() => {
          this.$router.push('/dashboard')
        })
        .catch(({ response }) => {
          this.loginError()
          // const { mensagem, errosSecundarios: erros } = response.data
          // const listaErros = erros
          //   ? `\n ${Object.values(erros).join('\n')}`
          //   : ''
          // this.$toast.error(`${mensagem}${listaErros}`, { duration: 5000 })
        })
        .finally(() => {
          this.$nuxt.$loading.finish()
        })
    },
  },
  head() {
    return {
      title: 'Login',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Página para fazer login no sistema',
        },
      ],
    }
  },
  layout: 'auth',
  middleware: ['guest'],
}
</script>

<style scoped>
.coluna-usuario {
  padding: 20px 40px 40px 40px;
}
.esqueceu-senha {
  margin-top: 10px;
  font-weight: bold;
  text-decoration: none;
  color: rgb(94, 94, 94);
}

.btn-entrar {
  color: rgb(21, 68, 52);
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  text-transform: uppercase;
}

.btn-entrar:hover {
  color: rgb(47, 151, 116);
}

.btn-voltar {
  color: rgb(34, 34, 34);
  margin-top: 20px;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;
}

.btn-voltar:hover {
  color: rgb(88, 88, 88);
}
</style>
