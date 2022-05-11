<template>
  <div v-if="forms.length">
    <p>Form present</p>
    <ul>
      <li 
        v-for="item in forms"
        :key="item.id"
      >
        <span @click="setForm(item)">{{ item.formName }}</span>
        <buttonRegular 
          @save="removeForm(item.id)" 
          :label="'x'"
          variant="danger"
          size="sm"
          class="m-4 mt-0 mb-0"
        />
      </li>
    </ul>
  </div>
</template>

<script>
  import buttonRegular from '@/components/manageItems/buttonRegular'
  import { onSnapshot, collection, doc, deleteDoc  } from "firebase/firestore"; 

  export default {
    components: {
      buttonRegular
    },
    data(){
      return{
        forms: [],
        unsubscribe: null,
      }
    },
    methods: {
      setForm(item){
        this.$emit('setForm', item)
      },
      async removeForm(id){
        await deleteDoc(doc(this.$db, "viewModels", id));
      },
    },
    mounted(){
      this.unsubscribe = onSnapshot(collection(this.$db, "viewModels"), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const data = change.doc.data()
          if (change.type === "added") this.forms.push({ ...data, id: change.doc.id})
          if (change.type === "modified") {
            this.forms = this.forms.map(elem => {
              if(elem.id == data.id) return data
              else return elem
            })
          }
          if (change.type === "removed") this.forms = this.forms.filter(elem => elem.id != data.id)
        });
      });
    },
    beforeDestroy(){
      this.unsubscribe()
    }
  }
</script>

<style lang="scss" scoped>

</style>