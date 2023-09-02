<template>
  <div>
    <title-auth titulo="Registro" />
    <input-auth v-model="name" placeholder="Nome" />
    <input-auth v-model="email" placeholder="Email" />
    <input-auth v-model="password" placeholder="Senha" type="password" />
    <input-auth
      v-model="passwordC"
      placeholder="Confirmar senha"
      type="password"
    />

    <div @click="realizarRegistro">
      Registrar
    </div>
  </div>
</template>

<script>
import InputAuth from '../components/inputs/InputAuth'
import TitleAuth from '../components/sections/auth/TitleAuth'

export default {
  components: {
    TitleAuth,
    InputAuth,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordC: '',
    }
  },
  computed: {},
  methods: {
    realizarRegistro() {
      const params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordC,
      }

      this.$nuxt.$loading.start()
      this.$axios
        .post('registro', params)
        .then(({ data }) => {
          const { mensagem } = data
          this.$toast.success(`${mensagem}`, { duration: 5000 })
          this.$auth
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
              const { mensagem2, errosSecundarios: erros } = response.data
              const listaErros = erros
                ? `\n ${Object.values(erros).join('\n')}`
                : ''
              this.$toast.error(`${mensagem2}${listaErros}`, { duration: 5000 })
            })
            .finally(() => {
              this.$nuxt.$loading.finish()
            })
        })
        .catch(({ response }) => {
          const { mensagem, errosSecundarios: erros } = response.data
          const listaErros = erros
            ? `\n ${Object.values(erros).join('\n')}`
            : ''
          this.$toast.error(`${mensagem}${listaErros}`, { duration: 5000 })
        })
        .finally(() => {
          this.$nuxt.$loading.finish()
        })
    },
  },
  head() {
    return {
      title: 'Registro',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Página para realizar o registro no sistema',
        },
      ],
    }
  },
  layout: 'auth',
}
</script>

<style scoped></style>
