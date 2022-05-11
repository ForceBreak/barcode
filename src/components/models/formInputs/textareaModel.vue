<template>
  <b-form-textarea v-model="text" @blur="setValue"/>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        text: ''
      }
    },
    methods: {
      setValue(value){
        this.$emit('setValue', value)
      }
    },
    mounted(){
      this.text = this.value
    }
  }
</script>

<style lang="scss" scoped>

</style>