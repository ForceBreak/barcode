<template>
  <div class="container">
    <router-link to="/">Home</router-link>
    <formPresets @setForm="setForm"/>
    <hr>
    <formInputList @addInput="addInput"/>
    <hr>
    <div v-if="formObj.form.length">
      <b-form>
        <b-form-input
          v-model="formObj.formName" 
          type="text" 
          placeholder="Form name"
          class="mb-4"
        />
        <b-form-group
          v-for="(item, index) in formObj.form"
          :key="`${item.key}${index}`"
          :id="`input-group-${index}`"
          class="mb-4"
        >
          <div class="d-flex align-items-center">
            <component 
              :is="`${item.type}Model`"
              :placeholder="item.placeholder"
              :label="item.label"
            />
            <buttonRegular @save="removeField(index)" label="x" size="sm" variant="danger" class="m-4 mt-0 mb-0"/>
          </div>
        </b-form-group>
      </b-form>
      <buttonRegular v-if="formObj.form.length" @save="saveForm" :label="'Save form'" variant="success"/>
    </div>
  </div>
</template>

<script>
  import { collection, addDoc, doc, setDoc} from "firebase/firestore"; 
  import buttonRegular from '@/components/manageItems/buttonRegular'
  import formPresets from '@/components/formPresets'
  import formInputList from '@/components/formInputList'
  import inputModel from '@/components/models/formInputs/inputModel'
  import checkboxModel from '@/components/models/formInputs/checkboxModel'
  import textareaModel from '@/components/models/formInputs/textareaModel'

  export default {
    components: {
      checkboxModel,
      inputModel,
      textareaModel,
      buttonRegular,
      formPresets,
      formInputList
    },
    data(){
      return{
        formObj: {
          form: [],
          formName: '',
        },
      }
    },
    methods: {
      addInput(item){
        this.formObj.form.push(item)
      },
      async saveForm(){
        if(this.formObj.id){
          await setDoc(doc(this.$db, "viewModels", this.formObj.id), this.formObj);
        }else{
          const docRef = await addDoc(collection(this.$db, "viewModels"), this.formObj)
          await setDoc(doc(this.$db, "viewModels", docRef.id), { ...this.formObj, id: docRef.id});
        }
      },
      setForm(form){
        this.formObj = JSON.parse(JSON.stringify(form))
      },
      async removeField(index){
        this.formObj.form.splice(index, 1)
        // await setDoc(doc(this.$db, "viewModels", this.formObj.id), this.formObj);
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>