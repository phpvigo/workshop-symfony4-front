<template>
  <v-dialog
    eager
    @input="change"
    value="dialog"
    :max-width="width"
    :persistent="persistent"
    @keydown.esc="choose(false)"
  >
    <v-toolbar v-if="Boolean(title)" dark :color="color">
      <v-icon v-if="Boolean(icon)" class="mr-2">{{ icon }}</v-icon>
      <v-toolbar-title class="white--text" v-text="title"/>
    </v-toolbar>
    <v-card tile>
      <v-card-text class="pt-4" v-html="message"/>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          v-if="Boolean(buttonFalseText)"
          :color="buttonFalseColor"
          outlined
          large
          @click="choose(false)"
        >
          {{ buttonFalseText }}
        </v-btn>
        <v-btn
          v-if="Boolean(buttonTrueText)"
          :color="buttonTrueColor"
          large
          @click="choose(true)"
        >
          {{ buttonTrueText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { VCard, VCardActions, VCardText, VDialog, VIcon, VToolbar, VToolbarTitle, VSpacer, VBtn } from 'vuetify/lib'

export default {
  components: {
    VCard,
    VCardActions,
    VCardText,
    VDialog,
    VIcon,
    VToolbar,
    VToolbarTitle,
    VSpacer,
    VBtn
  },
  props: {
    buttonTrueText: {
      type: String,
      default: 'Yes'
    },
    buttonFalseText: {
      type: String,
      default: 'No'
    },
    buttonTrueColor: {
      type: String,
      default: 'primary'
    },
    buttonFalseColor: {
      type: String,
      default: 'grey'
    },
    color: {
      type: String,
      default: 'warning'
    },
    icon: {
      type: String,
      default () {
        return this.$vuetify.icons.values.warning
      }
    },
    message: {
      type: String,
      required: true
    },
    persistent: Boolean,
    title: {
      type: String
    },
    width: {
      type: Number,
      default: 400
    }
  },
  data () {
    return {
      value: false,
      dialog: true
    }
  },
  methods: {
    choose (value) {
      this.$emit('result', value)
      this.value = value
      this.$destroy()
    },
    change () {
      this.$nextTick(() => this.$destroy())
    }
  },
  mounted () {
    this.$nextTick(() => this.dialog = true)
  }
}
</script>
