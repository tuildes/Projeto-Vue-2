<template>
  <div class="my-5">
    <span class="contact-title raleway">
      Get In Touch
    </span>
    <v-form ref="form" class="mt-5">
      <v-row>
        <v-col cols="12" md="6" lg="6">
          <span class="forms-title">First Name</span>
          <v-text-field
            v-model="message.firstName"
            :rules="rules.firstName"
            class="mt-2"
            placeholder="Seu primeiro nome"
            outlined
            clearable
            single-line
            color="#04aa6d"
          />
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <span class="forms-title">Last Name</span>
          <v-text-field
            v-model="message.lastName"
            :rules="rules.lastName"
            class="mt-2"
            placeholder="Seu último nome"
            outlined
            clearable
            single-line
            color="#04aa6d"
          />
        </v-col>
      </v-row>

      <div class="forms-content-extra">
        <span class="forms-title">Email</span>
        <v-text-field
          v-model="message.email"
          :rules="rules.email"
          class="mt-2"
          placeholder="Seu email de contato"
          outlined
          clearable
          single-line
          color="#04aa6d"
        />
      </div>

      <div class="forms-content">
        <span class="forms-title">Subject</span>
        <v-text-field
          v-model="message.subject"
          :rules="rules.subject"
          class="mt-2"
          placeholder="Sobre o que quer conversar?"
          outlined
          clearable
          single-line
          color="#04aa6d"
        />
      </div>

      <div class="forms-content">
        <span class="forms-title">Message</span>
        <v-textarea
          v-model="message.content"
          :rules="rules.content"
          class="mt-2"
          placeholder="Sua mensagem"
          outlined
          clearable
          auto-grow
          color="#04aa6d"
          density="comfortable"
        />
      </div>
    </v-form>
    <v-btn
      width="180"
      height="45"
      depression
      color="#04aa6d"
      class="form-button"
      @click="sendMessage()"
    >
      Send Message
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        content: '',
      },
      rules: {
        firstName: [(v) => !!v || 'Primeiro nome é obrigatório!'],
        lastName: [(v) => !!v || 'Último nome é obrigatório!'],
        email: [
          (v) => !!v || 'O e-mail é obrigatório!',
          (v) =>
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
              v
            ) || 'E-mail inválido',
        ],
        subject: [(v) => !!v || 'Assunto é obrigatório!'],
        content: [(v) => !!v || 'Mensagem é obrigatória!'],
      },
    }
  },

  methods: {
    sendMessage() {
      const message = new FormData()
      message.append('nome', this.treatedName())
      message.append('email', this.message.email)
      message.append('assunto', this.message.subject)
      message.append('messagem', this.message.content)

      // Transformar esse formdata em um objeto para post
      const content = {}

      message.forEach((valor, chave) => {
        content[chave] = valor
      })

      if (this.$refs.form.validate()) {
        this.$axios
          .post('messages', content)
          .then(() => {
            this.$refs.form.reset()
            window.alert('Mesagem Enviada')
          })
          .catch(() => {
            window.alert('Não enviado')
          })
      }
    },

    // Junta os dois
    treatedName() {
      return this.message.firstName + ' ' + this.message.lastName
    },
  },
}
</script>

<style scoped>
.contact-title {
  font-size: 25px;
}

.forms-title {
  font-family: 'Raleway';
  color: #9b9b9b;
  font-size: 18px;
}

.forms-content-extra {
  width: 100%;
  margin-top: -15px;
}

.forms-content {
  width: 100%;
  margin-top: -5px;
}

.form-button {
  font-family: Raleway;
  font-weight: 400;
  font-size: 16px;
  text-transform: capitalize;
}
</style>
