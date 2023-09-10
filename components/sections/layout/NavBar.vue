<template>
  <section class="navbar-wrapper d-flex justify-center">
    <div class="navbar-content d-flex justify-space-between align-center">
      <span class="navbar-title pl-5 pl-lg-0">GREATNESS.</span>

      <!--Links para pc-->
      <div class="hidden-md-and-down">
        <nuxt-link
          v-for="(item, index) in navbarItems"
          :key="index"
          :to="item.link"
          class="navbar-button px-3"
        >
          <v-menu
            v-if="item.menu"
            open-on-hover
            offset-y
            bottom
            flat
            transition="scroll-y-reverse-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">
                {{ item.label }}
              </span>
            </template>

            <v-list class="navbar-list d-flex flex-column pa-4">
              <span
                v-for="(link, subIndex) in item.items"
                :key="subIndex"
                class="navbar-list-item pb-1"
              >
                {{ link }}
              </span>
            </v-list>
          </v-menu>

          <span v-else> {{ item.label }}</span>
        </nuxt-link>
      </div>

      <!--Links para mobile-->
      <v-app-bar-nav-icon
        class="hidden-lg-and-up mr-6"
        color="white"
        @click="openDrawer()"
      />
    </div>
    <!--drawerOpen diz se esta aberto ou fechado-->
    <v-navigation-drawer
      v-model="drawerOpen"
      absolute
      app
      right
      color="#121212"
      disable-resize-watcher
      disable-route-watcher
      class="navbar-drawer"
    >
      <div class="d-flex flex-column">
        <div class="d-flex justify-end pr-6 pt-6">
          <v-icon color="white" size="40px" @click="openDrawer()">
            mdi-close
          </v-icon>
        </div>

        <nuxt-link
          v-for="(item, index) in navbarItems"
          :key="index"
          :to="item.link"
          class="navbar-panel-button px-3 mb-3 ml-6"
        >
          <v-expansion-panels
            v-if="item.menu"
            class="navbar-panel"
            acoordion
            flat
            tile
          >
            <v-expansion-panel class="mb-2 mt-1">
              <v-expansion-panel-header class="navbar-panel-button">
                {{ item.label }}
                <template v-slot:actions>
                  <v-icon color="#969696" class="mr-6">
                    $expand
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="d-flex flex-column">
                  <span
                    v-for="(link, subIndex) in item.items"
                    :key="subIndex"
                    class="navbar-panel-hover mt-2"
                  >
                    {{ link }}
                  </span>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <span v-else> {{ item.label }} </span>
        </nuxt-link>
      </div>
    </v-navigation-drawer>
  </section>
</template>

<script>
export default {
  data() {
    return {
      drawerOpen: false,
      navbarItems: [
        { link: '/dashboard', label: 'Dashboard', menu: false },
        { link: '/', label: 'Home', menu: false },
        { link: '#', label: 'Sobre', menu: false },
        {
          link: '#',
          label: 'Serviços',
          menu: true,
          items: ['WebDesign', 'eCommerce', 'Branding', 'API'],
        },
        {
          link: '#',
          label: 'Dropdown',
          menu: true,
          items: ['HTML5', 'CSS3', 'Sass', 'JQuery'],
        },
        { link: '/contact', label: 'Contato', menu: false },
      ],
    }
  },
  methods: {
    openDrawer() {
      this.drawerOpen = !this.drawerOpen
    },
  },
}
</script>

<style scoped>
@import url('http://fonts.googleapis.com/css2?family=Raleway&display=swap');
.navbar-content {
  max-width: 1100px;
  width: 100%;
  position: absolute;
  z-index: 10;
  padding: 30px 0;
}

.navbar-title {
  color: #ffffff;
  font-family: 'Raleway', Arial, sans-serif;
  font-size: 20px;
  line-height: 1.7;
  font-weight: bold;
  text-shadow: 0px 0px 50px #000000;
}

.navbar-button {
  font-family: 'Raleway', Arial, sans-serif;
  color: #fff;
  font-size: 14px;
  font-weight: thin;
  text-decoration: none;
  text-shadow: 0px 0px 25px #000000;
  text-transform: uppercase;

  transition: opacity 1s;
  opacity: 0.75;
}

.navbar-button:hover {
  opacity: 1;
}

.navbar-list {
  background: #ffffff;
}

.navbar-list-item {
  color: #777;
  transition: color 0.5s;
}

.navbar-list-item:hover {
  color: #000;
  cursor: pointer;
}

.navbar-drawer {
  z-index: 100;
}

.navbar-panel-button {
  font-family: 'Raleway', Arial, sans-serif;
  color: #969696;
  font-size: 16px;
  font-weight: thin;
  text-decoration: none;
}

.navbar-panel >>> .v-expansion-panel-header {
  color: #969696;
  background-color: #121212 !important;
  border: none !important;
  padding: 0 !important;
  height: 10px !important;
  min-height: min-content !important;
}

.navbar-panel >>> .v-expansion-panel-content {
  padding-top: 5px;
  color: #969696;
  background-color: #121212 !important;
}

.navbar-panel >>> .v-expansion-panels {
  height: 10px !important;
  min-height: none !important;
}
</style>
