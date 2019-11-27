<template>
  <v-dialog v-model="localValue" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-text-field
              filled
              v-model="localItem.oldPassword"
              label="Contraseña actual"
              :rules="passwordRules"
              :error-messages="errors.oldPassword"
              prepend-inner-icon="mdi-key-outline"
              counter
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye-off': 'mdi-eye'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              filled
              v-model="localItem.newPassword"
              label="Nueva contraseña"
              persistent-hint
              :rules="passwordRules"
              :error-messages="errors.newPassword"
              prepend-inner-icon="mdi-key"
              counter
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye-off': 'mdi-eye'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              filled
              v-model="localItem.retypedPassword"
              label="Repetir nueva contraseña"
              :rules="passwordRules"
              :error-messages="errors.retypedPassword"
              prepend-inner-icon="mdi-key-change"
              counter
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye-off': 'mdi-eye'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-form>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" outlined @click="cancel">Cancelar</v-btn>
        <v-btn color="primary" @click="save">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    name: 'user-form-dialog',
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      item: {
        type: Object,
        required: true,
        default: () => ({})
      },
      errors: {
        type: Object,
        default: () => ({})
      },
    },
    data () {
      return {
        localValue: this.value,
        localItem: JSON.parse(JSON.stringify(this.item)),
        showPassword: false,
        rules: {
          required: v => !!v || 'Este campo es obligatorio',
          emailValid:  v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || '',
          minLength: v => (!v || v.length >= 5) || 'La contraseña debe tener al menos 5 caracteres'
        },
        roles: [
          {
            key: 'ROLE_USER',
            name: 'Usuario'
          },
          {
            key: 'ROLE_ADMIN',
            name: 'Administrador'
          }
        ]
      }
    },
    methods: {
      close () {
        this.localValue = false
        this.localItem = {}
      },
      cancel () {
        this.close()
      },
      save () {
        this.localItem.roles = Array.isArray(this.localItem.roles) ? this.localItem.roles : [this.localItem.roles]
        this.$emit('save', this.localItem)
      }
    },
    computed: {
      passwordRules() {
        const rules = [this.rules.minLength]
        if (this.isNew) {
          rules.push(this.rules.required)
        }
        return rules
      },
      formTitle () {
        return `Cambiar contraseña de ${this.localItem.username}`
      }

    },
    watch: {
      localValue (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.localValue = val
      },
      item (val) {
        try {
          this.$refs.form.reset()
        } catch (e) {
          console.log(e)
        }
        this.localItem = JSON.parse(JSON.stringify(val))
        this.localItem.password = ''
      }
    }
  }
</script>
