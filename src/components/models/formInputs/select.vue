<template>
  <select v-model="value">
    <option 
      value=""
    ></option>
  </select>
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
      setText(value){
        this.$emit('setText', value)
      }
    },
    mounted(){
      this.text = Boolean(this.value)
    }
  }
</script>

<style lang="scss" scoped>

</style>