<script setup>

import {ref, computed, toRaw, onMounted} from "vue";
import BaseLayout from "@/components/BaseLayout.vue";
import Form from "@/components/ui/BaseForm.vue";
const formValid=ref({
  name:"",
  number:-1,
})
function validateName(value) {
  if (!value) {
    return 'Name is required'
  }
}
function validateNumber(value) {
  if (value<=0) {
    return 'Number > 0'
  }
}



const valid=()=>{
  console.log("123");
}


</script>

<template>
  <BaseLayout style="margin-top:200px;">
    <BaseForm :handle-submit="valid">
      <base-input :is-required="true" v-model="formValid.name" :validation="validateName">
        Название
      </base-input>
      <base-input :is-required="true" type="number" v-model="formValid.number" :validation="validateNumber" >
        x
      </base-input>
    </BaseForm>

  </BaseLayout>
</template>

<style lang="scss" scoped>

</style>
