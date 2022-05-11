<template>
  <div class="container">
    <router-link to="/editViewModels">Edit view models</router-link>
    <button @click="checkingBarcodeVisibility(true)">Start</button>
    <ImageBarcodeReader @decode="onDecode" @error="onError"></ImageBarcodeReader>
    <StreamBarcodeReader v-if="isShowStream" @decode="onDecodeStream" @loaded="onLoaded"></StreamBarcodeReader>
    <!-- {{ nomenclature }} -->
    <table v-if="nomenclature.length">
      <th v-for="th in Object.keys(nomenclature[0])" :key="th">{{ th }}</th>
      <tr v-for="tr in nomenclature" :key="tr.id">
        <th v-for="th in Object.values(tr)" :key="th">{{ th }}</th>
      </tr>
    </table>
    <hr>
    <div v-if="processingItems.length">
      <formPresets @setForm="setForm"/>
      <hr>
      <formInputList @addInput="addInput"/>
      <hr>
      <b-form>
        <b-form-group
          v-for="(item, index) in processingItems"
          :key="`${item.order}${index}`"
          :id="`input-group-${index}`"
          class="mb-4"
        >
          <div class="d-flex align-items-center">
            <component :is="`${item.type}Model`"></component>
            <inputModel @setText="item.value == $event" placeholder="Field name"/>
            <buttonRegular @save="removeField(item.order)" label="x" size="sm" variant="danger" class="m-4 mt-0 mb-0"/>
          </div>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ImageBarcodeReader } from "vue-barcode-reader";
import { StreamBarcodeReader } from "vue-barcode-reader";
import { collection, addDoc, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore"; 
import checkboxModel from '@/components/models/formInputs/checkboxModel'
import inputModel from '@/components/models/formInputs/inputModel'
import formPresets from '@/components/formPresets'
import formInputList from '@/components/formInputList'
import buttonRegular from '@/components/manageItems/buttonRegular'

export default {
  name: 'Home',
  components: {
    ImageBarcodeReader,
    StreamBarcodeReader,
    checkboxModel,
    inputModel,
    formPresets,
    formInputList,
    buttonRegular
  },
  data(){
    return{
      isShowStream: false,
      nomenclature: [],
      unsubscribe: null,
      processingBarcode: null,
      processingItems: []
    }
  },
  methods: {
    async onDecode(result) {
      try {
        const docRef = await setDoc(doc(this.$db, "nomenclature", result), {
          id: result,
          name: 'Product 1'
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      alert('onDecode')
    },
    checkingBarcodeVisibility(arg){
      // this.isShowStream = arg
      this.processingItems.push({
        type: 'input',
        placeholder: 'Barcode',
        key: 'barcode',
        value: '4820031462990',
        order: 0
      })
    },
    async onDecodeStream(result) {
      await setDoc(doc(this.$db, "logger", 'GiZddh5Aj9QJeNmExD9P'), {result});
    },
    async nomenclarureActions(result){
      try {
        const docRef = doc(this.$db, "nomenclature", result);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data()
          let isPresent = this.nomenclature.find(elem => elem.id == data.id)
          if(!isPresent) this.nomenclature.push(data)

          this.checkingBarcodeVisibility(false)
        } else {
          this.processingItems.push({
            type: 'input',
            placeholder: 'Barcode',
            key: 'barcode',
            value: result,
            order: 0
          })
          // await setDoc(doc(this.$db, "nomenclature", result), {
          //   id: result,
          //   name: 'Product 1'
          // });
        }
      } catch (e) {
        alert(`Error adding document: ${e}`);
      } finally{
        this.checkingBarcodeVisibility(false)
      }
    },
    onError(error) {
      console.log(error)
    },
    onLoaded(result) {
      console.log(result)
    },
    setForm(){

    },
    addInput(input){
      this.processingItems.push({
        type: input,
        placeholder: 'Lorem ipsum',
        key: 'barcode',
        value: null,
        order: this.processingItems.length
      })
    },
    removeField(item){
      this.processingItems = this.processingItems.filter(elem => elem.order != item.order)
    }
  },
  mounted(){
    this.unsubscribe = onSnapshot(collection(this.$db, "logger"), (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const data = change.doc.data()
        if (change.type === "modified") {
          await this.nomenclarureActions(data.result)
          console.log('modified', data)
        }
      });
    });
  }
}
</script>
<style lang="scss">
  .scanner-container{
    video{
      width: 100%;
    }
  }
</style>
