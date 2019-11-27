<template>
  <v-row class="pt-5">
    <v-col class="12" lg="8"></v-col>
    <v-col cols="12" lg="4">
      <v-text-field
        v-model="localValue"
        label="Buscar"
        class="mx-4"
        append-outer-icon="mdi-magnify"
        @click:append-outer="$emit('search')"
        @keyup.enter="$emit('search')"
        @click:clear="onClear"
        filled
        clearable
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    name: 'table-search',
    props: {
      value: {
        type: [String, Number],
        required: false
      }
    },
    data () {
      return {
        localValue: this.value
      }
    },
    methods: {
      onClear() {
        this.localValue = ''
        this.$emit('input', this.localValue)
        this.$emit('search')
      }
    },
    watch: {
      localValue(val) {
        this.$emit('input', val)
      },
      value (val) {
        this.localValue = val
      }
    }
  }
</script>
