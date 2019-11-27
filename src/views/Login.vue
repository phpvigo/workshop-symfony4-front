<template>
  <v-container fill-height class="login">
    <v-row>
      <v-col cols="12">
        <v-row justify="center">
          <v-col
              cols="12"
              sm="6"
              md="3"
              lg="3"
          >

            <login-form @login="onLogin"></login-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import LoginForm from '@/components/LoginForm'
  export default {
    name: 'login',
    components: {
      LoginForm
    },
    methods: {
      onLogin() {
        this.$router.push(this.$route.query.redirect || '/')
      }
    }
  }
</script>
