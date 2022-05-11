<template>
  <b-button 
    @click="save"
    :variant="variant"
    :size="size"
  >
    {{ label }}
  </b-button>
</template>

<script>
  export default {
    props:{
      label: {
        type: String,
        default: 'Save'
      },
      variant: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: ''
      },
    },
    methods: {
      save(){
        this.$emit('save')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>