<script setup>

import {ref, computed, toRaw, onMounted, onBeforeMount} from "vue";
import PreviewCard from "@/components/previewCard/PreviewCard.vue";

import Header from "@/components/Header.vue";
import PreviewList from "@/components/PreviewList.vue";
import BaseLayout from "@/components/BaseLayout.vue";

import {languages} from "@/utils/higilight.routes";
import {useHighlight} from "@/hooks/useHighlight";
import VueSelect from "@/components/ui/VueSelect.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseForm from "@/components/ui/BaseForm.vue";
import {radiogroup} from "@/utils/radiogroup.routes";
const {highlightItem,selectedLanguage,hightlighting,setLanguage} =useHighlight();
const saveGraphEditor=()=>{
  isSaveGraph.value=true;
}
const hlCode=ref("");
const coloredCode=ref("");
const isSaveGraph=ref(false);
const selectSelectItem=ref({
  name:'default',
  title:'select'
})
computed(()=>{
  return selectSelectItem;
})
const onChangeLanguage=(value)=> {
  console.log("value: ",value);
  selectedLanguage.value =value;
  console.log("item: ",selectedLanguage.value);
}
const exportData=ref({
  production:true,
  language:{},
  rawCode:"",
})
const appendHighlighting=()=>{
  setLanguage(selectedLanguage.value);
  exportData.value.language=selectedLanguage.value;
  exportData.value.rawCode=hlCode.value;
  coloredCode.value=hightlighting(hlCode.value);
  const json=JSON.stringify(toRaw(exportData.value));
  let hiddenParent=document.querySelector('.chart-component-hljs');
  hiddenParent.querySelector('.chart-component-hljs-hidden').textContent=json;
}

const validateCheckbox=(value)=>{
  if(value===""||value==="Выбрать"){
    return 'Пожалуйста выберите язык'
  }
}

const validateTextArea=(value)=>{
  if (!value) {
    return 'Обязательное поле'
  }
}
//ссылка на select
const selectLanguageRef=ref(null);
const handleSubmit=()=>{
  if(hlCode.value&&selectLanguageRef.value){
    appendHighlighting();
    handleClear();
    selectLanguageRef.value.resetSelectedIndex();
  }
}
const loadData=ref({});
onBeforeMount(()=>{
  let hiddenParent=document.querySelector('.chart-component-hljs');
  let hiddenObject=hiddenParent.querySelector('.chart-component-hljs-hidden');
  if(hiddenObject.textContent!=""){
    loadData.value=JSON.parse(hiddenObject.textContent);
    for (let key in loadData.value) {
      if(key==='production'){
        isSaveGraph.value=loadData.value[key];
      }
      if(key==='language'){
        selectedLanguage.value=loadData.value[key];
        setLanguage(selectedLanguage.value);
      }
      if(key==='rawCode'){
        hlCode.value=loadData.value[key];
        coloredCode.value=hightlighting(hlCode.value);
      }
    }
  }
})
const handleClear=()=>{
  hlCode.value="";
  selectedLanguage.value={};
}
onMounted(()=>{
  selectedLanguage.value=languages[0].code;
})
</script>

<template>
  <BaseLayout>
    <div class="graph-editor">
      <div class="graph-editor__tabs" v-if="!isSaveGraph">
        <h3 class="tab-item__name">
          Подсветка кода
        </h3>
        <div class="tab-item-body">
          <base-form :handle-submit="handleSubmit">
            <template #form-field>
              <vue-select @v-selected="onChangeLanguage" ref="selectLanguageRef"  :selected="selectedLanguage?.name"  :data="languages" :validation="validateCheckbox" ></vue-select>
              <base-input :is-textarea="true" :is-required="true" v-model="hlCode" :validation="validateTextArea" />
            </template>
            <template #form-button>
              <base-button :classes="['button-red']" @click="handleClear">Очистить</base-button>
            </template>
          </base-form>
        </div>
      </div>
      <div class="graph-editor__draw" v-if="coloredCode">
        <div class="code-highlight">
          <pre><code v-html="coloredCode"></code></pre>
        </div>
      </div>
      <h1 v-else>Здесь должен быть код</h1>
    </div>
  </BaseLayout>
</template>

<style lang="scss" scoped>
.code-highlight{
  background: white;
  border: 1px solid #ddd;
  padding: 15px 10px;
  border-radius: 6px;
  max-height: 500px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background:#ddd;
    border-radius: 12px;
    cursor: pointer;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: var(--color-accent-2);
    border-radius: 12px;
    cursor: pointer;

  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #0073f7;
    cursor: pointer;

  }
}



.radio-group{
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.row{
  &>*+*{
    margin-top: 20px;
  }
}
.tab-item{
  &-form{
    &__controls{

      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
  }
  &__name{
    margin: 0;
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 15px;
  }
}
.graph-editor{
  margin-top: 80px;
  display: grid;
  grid-template-columns: 500px 1fr;
  grid-column-gap: 25px;
  padding: 25px 50px;
  @media screen and (max-width: 1279px){
    grid-template-columns: 300px 1fr;
  }
  @media screen and (max-width: 1024px){
    grid-template-columns: 1fr;
    grid-gap: 25px;
  }
  &__draw{
    display: flex;
    align-items: center;
    justify-content: center;
    & h1{
      font-size: 60px;
      line-height: 80px;
    }
  }
}
</style>
