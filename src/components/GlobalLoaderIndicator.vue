<template>
  <v-overlay :value="value" opacity="0.8">
    <v-progress-circular size="100" color="primary" indeterminate></v-progress-circular>
    <div class="text-center mt-2 text-uppercase">
      Cargando
    </div>
  </v-overlay>
</template>
<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: true
      }
    }
  }
</script>
