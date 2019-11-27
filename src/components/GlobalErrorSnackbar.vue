<template>
  <v-snackbar
    multi-line
    bottom
    v-model="localValue"
    v-if="errorMessage"
    color="error"
    :timeout="timeout"
  >
    <v-icon dark>mdi-alert-circle-outline</v-icon>
    {{ errorMessage }}
    <v-btn
      color="white"
      icon
      @click="localValue = false"
    >
      <v-icon>mdi-close-circle</v-icon>
    </v-btn>
  </v-snackbar>
</template>
<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      errorMessage: {
        type: [String, Boolean],
        default: false
      },
      timeout: {
        type: Number,
        default: 10000
      }
    },
    data () {
      return {
        localValue: this.value,
      }
    },
    watch: {
      localValue (val) {
        this.$emit('input', val)
      },
      value (val) {
        this.localValue = val
      }
    }
  }
</script>
