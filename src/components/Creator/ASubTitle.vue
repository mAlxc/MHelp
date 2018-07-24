<template>
  <v-container pa-0>
    <v-layout ml-0 align-center justify-space-between>
      <v-flex >
        <v-text-field outline single-line class="subheading" :readonly="!editable" v-model="contentInternal">       </v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['text', 'editable'],
  computed: {
    contentInternal: {
      get () {
        return this.text
      },
      set (v) {
        this.$emit('update:text', v)
      }
    }
  },
  data () {
    return {
    }
  },
  created () {
    if (!this.editable) {
      this.editable = false
    }
  }
}
</script>
