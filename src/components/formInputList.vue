<template>
  <div>
    <p>Form inputs list</p>
    <ul class="p-0 d-flex flex-wrap align-items-start">
      <li class="d-flex flex-wrap mb-2 px-2"> 
        <inputFormModel
          @setValue="addInput"
          fieldType="input" 
          label="Text input"
        />
      </li>
      <li class="d-flex flex-wrap mb-2 px-2"> 
        <inputFormModel
          @setValue="addInput"
          fieldType="textarea" 
          label="Textarea input"
        />
      </li>
      <li class="d-flex flex-wrap mb-2 px-2"> 
        <checkboxFormModel 
          @setValue="addInput"
          fieldType="checkbox" 
          label="Checkbox input"
        />
      </li>
    </ul>
  </div>
</template>

<script>
  import inputFormModel from '@/components/models/inputFormModel'
  import checkboxFormModel from '@/components/models/checkboxFormModel'
  import buttonRegular from '@/components/manageItems/buttonRegular'

  export default {
    components: {
      buttonRegular,
      inputFormModel,
      checkboxFormModel
    },
    data(){
      return {
        fielTypes: ['input', 'textarea', 'checkbox']
      }
    },
    methods: {
      addInput(item){
        this.$emit('addInput', item)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>