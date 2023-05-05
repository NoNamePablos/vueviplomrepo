<script setup>

import {ref, computed, toRaw, onMounted, onBeforeMount, watch, shallowRef, reactive} from "vue";
import BaseLayout from "@/components/BaseLayout.vue";

import {languages} from "@/utils/higilight.routes";
import {useHighlight} from "@/hooks/useHighlight";
import VueSelect from "@/components/ui/VueSelect.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseForm from "@/components/ui/BaseForm.vue";
import TabContainer from "@/components/Tabs2.0/TabContainer.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import Toolbar from "@/components/BaseEditor/Toolbar.vue";
import themes from "@/components/BaseEditor/themes";
import languagesEditor  from "@/components/BaseEditor/languages";
import Editor from "@/components/BaseEditor/Editor.vue";


// Status is available at all times via Codemirror EditorView

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
//new component




/*runTestForAmountOfTime(e, t) {
  var o = "benchmark_" + e.id
      , a = performance.now()
      , s = performance.now()
      , r = 0;
  do {
    this.iframe.contentWindow[o](arguments),
        r++,
        s = performance.now()
  } while (s - a < t && !this.model.errorMessage);
  return {
    counter: r,
    runTime: a - s,
    timer: s
  }
},*/


const doc=ref(null);





const loadData=ref({});

const handleClear=()=>{
  hlCode.value="";
  selectedLanguage.value={};
}
const config = reactive({
  disabled: false,
  indentWithTab: true,
  tabSize: 2,
  autofocus: true,
  height: 'auto',
  language: 'javascript',
  theme:'default',
})
const loading = shallowRef(false)
const langCodeMap = reactive(new Map())
const currentTheme = computed(() => {
  return config.theme !== 'default' ? themes[config.theme] : void 0
})
const currentLangCode = computed(() => langCodeMap.get(config.language))
const ensureLanguageCode=async (targetLanguage)=>{
  config.language=targetLanguage;
  loading.value = true;
  const delayPromise = () => new Promise((resolve) => window.setTimeout(resolve, 260))
  if (langCodeMap.has(targetLanguage)) {
    await delayPromise()
  } else {
    console.log("1: ",languagesEditor[targetLanguage]());
    const [result] = await Promise.all([languagesEditor[targetLanguage](), delayPromise()])
    console.log([result]);
    langCodeMap.set(targetLanguage, result.default);
    console.log("langCodeMap ",langCodeMap);
    console.log("item: ",langCodeMap.get(config.language));
  }
  loading.value = false
}

onBeforeMount(() => {
  // init default language & code
  ensureLanguageCode(config.language)
  console.log(langCodeMap);
  console.log(currentLangCode);
})
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
      <h1 class="default-text" v-else>Здесь должен быть код</h1>
      <div class="complex-editor" :style="{marginTop:'100px'}">
        <Toolbar :languages="Object.keys(languagesEditor)"
                 :themes="Object.keys(themes)"
                 :config="config"
                 :disabled="loading"
                 @language-mirror="ensureLanguageCode" />
        <div class="loader" v-if="loading">1</div>
        <Editor v-else-if="currentLangCode"   :config="config" :theme="currentTheme"  :language="currentLangCode.language" :code="currentLangCode.code" />

      </div>
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
