<template>
  <v-navigation-drawer
    v-model="localValue"
    app
    :clipped="$vuetify.breakpoint.lgAndUp"
  >
    <template v-slot:prepend>
      <v-list>
        <v-list-item>
          <v-list-item-avatar color="primary">
            <span style="color: white !important">{{ username.substr(0,1).toUpperCase() }}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>
              {{ username }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
            v-for="item in menu"
            :key="item.title"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content @click="$router.push({ path: item.route})">
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content @click="logout">
            <v-list-item-title>
              Salir
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </template>



  </v-navigation-drawer>
</template>
<script>
  export default {
    name: 'main-drawer',
    props: {
      value: {
        default: false
      }
    },
    computed: {
      username () {
        return this.$store.state.auth.username
      }
    },
    data() {
      return {
        localValue: this.value,
        menu: [
          {
            title: 'Inicio',
              route: '/',
            icon: 'mdi-home'
          },
          {
            title: 'Hashtags',
            route: '/hashtags',
            icon: 'mdi-pound'
          },
          {
            title: 'Tweets',
            route: '/tweets',
            icon: 'mdi-twitter'
          },
          {
            title: 'Usuarios',
            route: '/users',
            icon: 'mdi-account-group'
          }

        ],
      }
    },
    watch: {
      localValue(val) {
        this.$emit('input', val)
      },
      value(val) {
        this.localValue = val
      }
    },
    methods: {
      logout () {
        this.$confirm(
          '¿Estas seguro?',
          { 'title': 'Cerrar sesión' }
        ).then(res => {
          if (res) {
            this.$store.commit('logout');
            this.$router.push({name: 'login'})
          }
        })
      }
    }
  }
</script>
