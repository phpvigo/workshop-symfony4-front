<template>
  <v-app>
    <main-drawer
        v-if="isAuthenticated"
        v-model="drawer"
    ></main-drawer>
    <v-app-bar
        app
        color="primary"
        class="white--text"
        :clipped-left="$vuetify.breakpoint.lgAndUp"
    >
      <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          dark
          v-if="isAuthenticated"
      ></v-app-bar-nav-icon>
      <v-toolbar-title @click="$router.push({name:'home'})">
        <v-img
            src="https://phpvigo.com/sites/phpvigo/themes/phpvigo/logo.png"
            alt="PHPVigo"
            class="shrink mr-2"
            contain
            transition="scale-transition"
            width="130"
        />
      </v-toolbar-title>
    </v-app-bar>
    <v-content class="grey">
      <router-view ref="routerView"></router-view>
    </v-content>
    <global-loader-indicator v-model="loading"></global-loader-indicator>
    <global-error-snackbar
      v-model="snackbar"
      :error-message="error"
    ></global-error-snackbar>
  </v-app>
</template>

<script>
  import {mapGetters, mapState} from 'vuex'
  import MainDrawer from '@/components/MainDrawer'
  import GlobalLoaderIndicator from '@/components/GlobalLoaderIndicator'
  import GlobalErrorSnackbar from '@/components/GlobalErrorSnackbar'

  export default {
    name: 'App',
    components: {
      MainDrawer,
      GlobalLoaderIndicator,
      GlobalErrorSnackbar
    },
    data: () => ({
      drawer: true,
      seasons: [],
      snackbar: false
    }),
    computed: {
      ...mapGetters([
        'isAuthenticated'
      ]),
      ...mapState([
        'loading',
        'error'
      ]),
    },
    watch: {
      error (val) {
        if (val) {
          console.log(12)
          this.snackbar = true
        }
      }
    },
    mounted() {
      this.$store.commit('loading', false)
      this.$store.commit('error', false)
    }
  }
</script>
