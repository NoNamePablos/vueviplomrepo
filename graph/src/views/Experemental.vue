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
import ProgressBar from "@/components/ProgressBar/ProgressBar.vue";
import Overlay from "@/components/Overlay/Overlay.vue";
import Layout from "@/components/Layout/Layout.vue";
import {useExperement} from "@/hooks/useExperement";


// Status is available at all times via Codemirror EditorView

const {highlightItem,selectedLanguage,hightlighting,setLanguage} =useHighlight();
const {state,codeBlocks, showTestInProgress,testsRounds,runTests,runTests2,addCodeBlock,removeCodeBlock}=useExperement();



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

const exportData=ref({
  production:true,
  hlarray:[],
})
const exportDataItem=ref({
  language:{},
  rawCode:"",
})

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




const loadData=ref({});

const handleClear=()=>{
  hlCode.value="";
  selectedLanguage.value={};
}
const configHighlight= reactive({
  disabled: false,
  indentWithTab: true,
  tabSize: 2,
  autofocus: true,
  height: '200px',
  language: 'javascript',
  theme:'default',
})
const isLockedLanguage=ref(true);

const loading = shallowRef(false)
const langCodeMap = reactive(new Map())
const currentTheme = computed(() => {
  return configHighlight.theme !== 'default' ? themes[configHighlight.theme] : void 0
})
const currentLangCode = computed(() => langCodeMap.get(configHighlight.language))
const ensureLanguageCode=async (targetLanguage)=>{
  configHighlight.language=targetLanguage;
  loading.value = true;

  const delayPromise = () => new Promise((resolve) => window.setTimeout(resolve, 260))
  if (langCodeMap.has(targetLanguage)) {
    await delayPromise()
  } else {
    console.log(languagesEditor);
    console.log("aa: ",languagesEditor.languages['javascript']());
    console.log("tl: ",targetLanguage);
    const [result] = await Promise.all([languagesEditor.languages[targetLanguage](), delayPromise()])
    console.log([result]);
    langCodeMap.set(targetLanguage, result.default);
    console.log("langCodeMap ",langCodeMap);
  }
  loading.value = false
}

onBeforeMount(() => {
  // init default language & code
  ensureLanguageCode(configHighlight.language)
})
const codeToAdding=ref("");
const handleSubmit=(codeBlockID)=>{
  console.log(123);
  console.log(codeBlocks.value[codeBlockID]);
}

///





function validateNumber(value) {
  if (value<=0) {
    return 'Значение должно быть больше 0'
  }
}







//компонент для замера времени + отрисовка графиков и тп.
const handleTests=()=>{
  /*runTests();*/
  runTests2();
}



</script>

<template>
  <BaseLayout>
      <Layout class="graph-editor-hljs">
        <Overlay :is-visible="showTestInProgress" >
          <div class="rocket"> 🚀</div>
          <progress-bar :count="state.app.testProgress"/>
        </Overlay>
        <div class="graph-editor__tabs" v-if="!isSaveGraph">
          <h3 class="tab-item__name">
            Подсветка кода
          </h3>
          <base-input  type="number" v-model="state.app.countRounds"  :validation="validateNumber" :label="'Количество раундов'" />
          <div class="tab-item-body" v-for="(codeBlcokItem,idx) in codeBlocks" :key="codeBlcokItem.id">
            <div class="code-editor">
              <base-input  class="code-editor-input" v-model="codeBlcokItem.title" :label="codeBlcokItem.title" />
              <div class="code-editor-wrapper">
                <div class="loader" v-if="loading">Loading...</div>
                <Editor
                    :is-preview="false"
                    v-if="currentLangCode"
                    :config="configHighlight"
                    :theme="currentTheme"
                    :language="currentLangCode.language"
                    @code-editing="(text)=>codeBlcokItem.code_block=text"
                    :code="codeBlcokItem.code_block"
                />
              </div>
              <div class="code-editor-controls" v-if="idx!==0">
                <base-button :classes="['button-circle']" @click="removeCodeBlock(codeBlcokItem.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z"/>
                  </svg>
                </base-button>
              </div>
            </div>
          </div>
          <div class="tab-item-controller">
            <base-button :classes="['button-circle']" @click="addCodeBlock">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
            </base-button>
          </div>
          <div class="tab-item-controller">
            <base-button :classes="['button-active']" @click="handleTests()">Запустить тесты</base-button>
          </div>
        </div>
        <h1 class="default-text" v-else>Здесь должен быть код</h1>
      </Layout>
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

.code-editor{
  padding: 15px;
  background-color: #f3f3f3;
  border-radius: 9px;
  &-controls{
    margin-top: 10px;
  }
  &-input{
    padding-bottom: 10px;
  }
  &__wrapper{
    padding-bottom: 10px;
  }
}


.highlight{
  position: relative;
  &-wrapper{
    padding-bottom: 10px;
  }
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

.rocket{
  font-size: 90px;
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
  &-controller{
    margin-top: 20px;
  }
  &-body+&-body{
    margin-top: 20px;
  }
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

.graph-editor-hljs{
  .form-group{
    @media screen and (max-width: 1279px) {
      grid-template-columns: 1fr;
      gap: 15px;
    }
  }
}
</style>
