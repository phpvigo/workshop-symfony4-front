<template>
  <v-card @keyup.enter="submit">
    <v-form v-model="valid" ref="form">
      <v-card-text>
        <div class="mb-4">
          <v-text-field
              label="Nombre de usuario"
              v-model="username"
              :rules="usernameRules"
              required
          ></v-text-field>
          <v-text-field
              label="Contraseña"
              v-model="password"
              min="8"
              :rules="passwordRules"
              counter
              required
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye-off': 'mdi-eye'"
              @click:append="showPassword = !showPassword"
          ></v-text-field>
        </div>

        <v-alert
            type="error"
            v-if="error"
            transition="fade-transition"
            dismissible
        >
          {{ error }}
        </v-alert>
        <v-card-actions>
          <v-layout justify-space-between>
            <v-spacer />
            <v-btn
                @click="submit"
                color="primary"
                large
                :class=" { 'white--text': valid, disabled: !valid }"
            >
              Acceder
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card-text>
    </v-form>
  </v-card>
</template>
<script>
export default {
  name: 'login-form',
  data () {
    return {
      valid: false,
      password: '',
      passwordRules: [
        (v) => !!v || 'La contraseña es obligatoria'
      ],
      showPassword: false,
      username: '',
      usernameRules: [
        (v) => !!v || 'El nombre de usuario es obligatorio',
      ],
      error: null
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        this.error = null
        this.$api.user.login(this.username, this.password)
          .then(() => {
            this.$router.push({name: 'home'})
          })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
