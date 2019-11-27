<template>
  <v-container fill-height class="home">
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-row justify="center">
          <v-btn
            to="/hashtags"
            x-large
            block
            class="mb-5"
          >
            <v-icon class="mr-1">mdi-pound</v-icon> Hashtags
          </v-btn>
          <v-btn
            to="/tweets"
            x-large
            block
            class="mb-5"
          >
            <v-icon class="mr-1">mdi-twitter</v-icon> Tweets
          </v-btn>
          <v-btn
              to="/users"
              x-large
              block
              class="mb-5"
              v-if="isAdmin"
          >
            <v-icon class="mr-1">mdi-account-group</v-icon> Usuarios
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'home',
    components: {},
    computed: {
      ...mapGetters(['isAdmin'])
    }
  }
</script>
