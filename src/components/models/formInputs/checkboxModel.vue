<template>
  <p-check color="info" v-model="checked" @change="setValue">
    <i class="icon mdi mdi-check" slot="extra"></i>
    {{ label }}
  </p-check>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: 'Lorem ipsum'
      }
    },
    data(){
      return {
        checked: false
      }
    },
    methods: {
      setValue(value){
        this.$emit('setValue', value)
      }
    },
    mounted(){
      this.checked = Boolean(this.value)
    }
  }
</script>

<style lang="scss" scoped>
.custom-control {
  position: relative;
  z-index: 1;
  display: block;
  min-height: 1.5rem;
  padding-left: 1.5rem;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
}
.custom-control-input {
  position: absolute;
  left: 0;
  z-index: -1;
  width: 1rem;
  height: 1.25rem;
  opacity: 0;
}
.custom-control-label {
    position: relative;
    margin-bottom: 0;
    vertical-align: top;
}
.custom-checkbox .custom-control-label:before {
    border-radius: 0.25rem;
}
.custom-control-label:before, .custom-file-label, .custom-select {
    transition: background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.custom-control-label:after, .custom-control-label:before {
    position: absolute;
    top: 0.25rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    content: "";
}
.custom-control-label:before {
    pointer-events: none;
    background-color: #fff;
    border: 1px solid #adb5bd;
}
.custom-control-label:after {
    background: 50%/50% 50% no-repeat;
}
.custom-control-label:after, .custom-control-label:before {
    position: absolute;
    top: 0.25rem;
    left: -1.5rem;
    display: block;
    width: 1rem;
    height: 1rem;
    content: "";
}

</style>