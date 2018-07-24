<template>
  <v-container pa-0 class="font-weight_light">
    <v-layout ml-0 align-center justify-space-between>
      <v-flex >
        <v-textarea hide-details ref="chapitre" flat auto-grow rows="1" :readonly="!content.isModif" v-model="contentInternal">
        </v-textarea>
      </v-flex>
      <v-flex v-if="editable">
        <v-btn @click="content.isModif = !content.isModif" small icon flat>
          <v-icon>{{icon}}</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['content', 'editable'],
  computed: {
    icon () {
      return this.content.isModif ? 'save' : 'border_color'
    },
    contentInternal: {
      get () {
        return this.content.content
      },
      set (v) {
        this.$emit('update:content', v)
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
  },
  methods: {
  },
  watch: {
    content (newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  }
}
</script>
