<template>
  <form @submit.prevent="submit" class="d-flex flex-wrap align-items-center w-100">
    <b-card
      :title="label"
      style="max-width: 20rem;"
    >
      <b-card-text>
        <div class="d-flex flex-wrap align-items-center w-100">
          <inputModel 
            :required="true"
            placeholder="Label"
            @setValue="setValue($event, 'label')"
            class="mb-2"
          />
          <inputModel 
            :required="true"
            placeholder="Key"
            @setValue="setValue($event, 'key')"
            class="mb-2"
          />
        </div>
      </b-card-text>

      <b-button 
        type="submit"
        variant="success"
      >
        Add
      </b-button>
    </b-card>
  </form>
</template>

<script>
  import inputModel from '@/components/models/formInputs/inputModel'

  export default {
    components: {
      inputModel,
    },
    props: {
      fieldType: {
        type: String,
        default: 'input'
      },
      label: {
        type: String,
        default: 'Text input'
      },
    },
    data(){
      return{
        obj: {
          label: null,
          key: null
        }
      }
    },
    methods: {
      setValue($event, key){
        this.obj[key] = $event
      },
      submit(){
        this.$emit('setValue', { ...this.obj, type: this.fieldType })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>