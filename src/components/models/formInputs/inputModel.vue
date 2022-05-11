<template>
  <b-form-input type="text" v-model="text" @blur="setValue($event.target.value)" :placeholder="placeholder" :required="required"/>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: false
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
      console.log('mounted', this.value)
    }
  }
</script>

<style lang="scss" scoped>

</style>