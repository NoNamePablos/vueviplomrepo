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
const {highlightItem,selectedLanguage,hightlighting,setLanguage} =useHighlight();
const saveGraphEditor=()=>{
  isSaveGraph.value=true;
}

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
const copyClickboard=(item)=>{
  navigator.clipboard.writeText(item.codeRaw);
  appendNotify("Код скопирован!");
}
const changeGraphTab=(value)=>selectedGraphTab.value=value;

const notification=ref([]);
const appendNotify=(str)=>{
  notification.value.push(str);
  setTimeout(()=>{
    notification.value.pop();
  },3000)
}


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

        <div class="notify-container">
          <transition-group name="notify" tag="div">
            <div class="notify-item" v-for="(ntf,idx) in notification" :key="idx">
              {{ntf}}
            </div>
          </transition-group>
        </div>
        <TabContainer>
          <template #n-button>
            <base-button :classes="['button-select',{'active':selectedGraphTab===tab.label}]" v-for="tab in hlcodeList" :key="tab.name" @click="changeTab(tab.label)">{{tab.label}}</base-button>
          </template>
          <template #n-list>
            <div class="highlight" v-for="(hlcodeItem,idx) in hlcodeList" :key="hlcodeItem.label" v-show="hlcodeItem.label===selectedGraphTab">
              <div class="highlight-control">
                <base-button :classes="['button-select']" @click="copyClickboard(hlcodeItem)"><svg xmlns="http://www.w3.org/2000/svg"  height="22px" version="1.1" viewBox="0 0 21 22" width="21px"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#000000" id="Core" transform="translate(-86.000000, -127.000000)"><g id="content-copy" transform="translate(86.500000, 127.000000)"><path d="M14,0 L2,0 C0.9,0 0,0.9 0,2 L0,16 L2,16 L2,2 L14,2 L14,0 L14,0 Z M17,4 L6,4 C4.9,4 4,4.9 4,6 L4,20 C4,21.1 4.9,22 6,22 L17,22 C18.1,22 19,21.1 19,20 L19,6 C19,4.9 18.1,4 17,4 L17,4 Z M17,20 L6,20 L6,6 L17,6 L17,20 L17,20 Z" id="Shape"/></g></g></g></svg></base-button>
              </div>
              <div class="code-highlight">
                <pre><code v-html="hlcodeItem.code"></code></pre>
              </div>
            </div>
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
.notify-container{
  position:  absolute;
  right: 0;
  z-index: 10;
  top: 0;
}
.notify-item{
  padding: 15px 20px;
  background-color: #5470c6;
  color: white;
  border-radius: 8px;
  margin-bottom: 10px;
  white-space: nowrap;
}

.notify-enter-active,
.notify-leave-active {
  transition: all 0.5s ease;
}
.notify-enter-from,
.notify-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.highlight{
  position: relative;
  &:hover{
    & .highlight-control{
      display: block;
    }
  }
  &-control{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 52px;
    width: calc(100% - 8px);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    display: none;
    padding: 10px 20px;
    background-color: rgb(36 35 35 / 25%);

  }
}
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
