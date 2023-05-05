<script setup>

import {ref, computed, toRaw, onMounted, onBeforeMount, watch, shallowRef} from "vue";
import BaseLayout from "@/components/BaseLayout.vue";

import {languages} from "@/utils/higilight.routes";
import {useHighlight} from "@/hooks/useHighlight";
import VueSelect from "@/components/ui/VueSelect.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseForm from "@/components/ui/BaseForm.vue";
import TabContainer from "@/components/Tabs2.0/TabContainer.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import Notify from "@/components/Notify/Notify.vue";
import Highlight from "@/components/Highlight/Highlight.vue";
import {useNotify} from "@/hooks/useNotify";
const {highlightItem,selectedLanguage,hightlighting,setLanguage} =useHighlight();
const saveGraphEditor=()=>{
  isSaveGraph.value=true;
}

const {notification,handleCopied}=useNotify();


const hlcodeList=ref([])

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
  hlarray:[],
})
const exportDataItem=ref({
  language:{},
  rawCode:"",
})
const appendHighlighting=()=>{
  setLanguage(selectedLanguage.value);
  exportDataItem.value.language=selectedLanguage.value;
  exportDataItem.value.rawCode=hlCode.value;
  exportData.value.hlarray.push(exportDataItem.value);
  hlcodeList.value.push({name:selectedLanguage.value.name,label:selectedLanguage.value.name,code:hightlighting(hlCode.value),codeRaw:hlCode.value});
  if(hlcodeList.value.length==1){
    selectedGraphTab.value=hlcodeList.value[0].label;
  }
  console.log(hlcodeList.value);
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
const sss=shallowRef(hlcodeList.value);
const selectedGraphTab=ref(null);
const changeTab=(tabId)=>{
  const tabIndex=hlcodeList.value.find((item)=>item?.label===tabId);
  selectedGraphTab.value=tabIndex?.label;
}
/*
const copyClickboard=(code)=>{
  navigator.clipboard.writeText(code);
 /!* appendNotify(Text);*!/
}
*/


const changeGraphTab=(value)=>selectedGraphTab.value=value;



</script>

<template>
  <BaseLayout>
    <div class="graph-editor graph-editor-hljs">
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
      <!-- Сделать подгрузку и визуал табов        -->
      <div class="graph-editor__draw"  v-if="hlcodeList.length>0">
<!--        -->
        <Notify :timing="3500" :notification="notification"/>
        <TabContainer>
          <template #n-button>
            <base-button :classes="['button-select',{'active':selectedGraphTab===tab.label}]" v-for="tab in hlcodeList" :key="tab.name" @click="changeTab(tab.label)">{{tab.label}}</base-button>
          </template>
          <template #n-list>
            <Highlight
                v-for="(hlcodeItem,idx) in hlcodeList" :key="hlcodeItem.label"
                v-show="hlcodeItem.label===selectedGraphTab"
                @copied="handleCopied"
                :code-raw="hlcodeItem.codeRaw"
                :code="hlcodeItem.code"
                :text="'Э-э-э ты чо бро?'"
            />
          </template>
        </TabContainer>
      </div>
      <h1 class="default-text" v-else>Здесь должен быть код</h1>
    </div>
  </BaseLayout>
</template>

<style lang="scss" scoped>
.graph-editor__draw{
  position: relative;
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
  margin-top: 40px;
  display: grid;
  grid-template-columns: 500px 1fr;
  grid-column-gap: 25px;
  padding: 25px 50px;
  @media screen and (max-width: 1279px){
    grid-template-columns: 300px 1fr;
    padding: 25px;
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
.graph-editor-hljs{
  .form-group{
    @media screen and (max-width: 1279px) {
      grid-template-columns: 1fr;
      gap: 15px;
    }
  }
}
</style>
