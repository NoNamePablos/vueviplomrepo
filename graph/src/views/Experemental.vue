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

const testsRounds=ref(0);

const codeBlocks=ref([{
  id:1,
  title:"code block 1",
  code_block: "",
  benchmarks:{
    startIndex:0,
    endIndex:0,
  },
  result:[]
},{
  id:2,
  title:"code block 2",
  code_block: "",
  benchmarks:{
    startIndex:0,
    endIndex:0,
  },
  result:[]
}])

const resetResults=()=> {
  codeBlocks.value.forEach((item)=>{
    item.result.amountOfRounds=0;
    item.result.percent=0;
  })
}
const doc=ref(null);
const autoStartTimer=reactive(null);
const autoStartCounter=reactive(null);
const iframe=ref(null);

const blockAmount=computed(()=>{ return codeBlocks.value.length});
function validateNumber(value) {
  if (value<=0) {
    return 'Значение должно быть больше 0'
  }
}

const startAutoStart=() =>{
  state.ui.showAutoStart = true;
  let timing = 5900;
  autoStartTimer.value= setInterval(()=>{
    timing -= 100;
    autoStartCounter.value = parseInt(timing / 1e3),
        autoStartCounter.value <= 0 && this.runTests()
      }, 100)
}
const releaseAutostart=()=> {
  if(autoStartTimer.value && clearInterval(autoStartTimer.value)){
    state.ui.showAutoStart = false;
  }
}
const removeBenchmarkScripts=()=> {
  if(iframe.value&&(iframe.value.parentNode.removeChild(iframe.value))){
          iframe.value = null;
  }
};
const sleep=(ms)=>{
  return new Promise(resolve => setTimeout(resolve, ms))
}

 const runTests=async ()=>{
  console.log("Zero");
  state.app.testProgress=0;
  removeBenchmarkScripts();
  resetResults();
   showTestInProgress.value=true;
   console.log(state.ui);
  iframe.value=window.document.createElement('iframe');
  iframe.value.style.display="none";
  iframe.value.id="iframe";
  document.body.appendChild(iframe.value);
  const content=iframe.value.contentWindow;
  console.log("Cnt: ",content);
  loadScripts();
  const sctiptBlock=document.createElement('script');
  let s="";
  let roundId=0;
  //item_id id code blcok
  for (let item of codeBlocks.value) {
    item.benchmarks.startIndex=roundId;
   for (let round=0;round<state.app.countRounds;round++){

     /*var i = "function benchmark_" + item.id + "() {" + e.model.boilerplateBlock.code + r.code_block + "}";*/
     let i = "function benchmark_" + roundId + "() {"  + item.code_block + "}";
     s += i
     roundId++;
   }
   item.benchmarks.endIndex=roundId-1;
  }
  sctiptBlock.type = "text/javascript";
  sctiptBlock.text = s;
  sctiptBlock.dataset.benchmark = "true";
  content.document.body.appendChild(sctiptBlock);
  console.log("start");
  /*runTestForAmountOfTime*/
   let fullTimings = (state.model.timeToRun + 2 * state.model.pausePerBlock*state.app.countRounds) * codeBlocks.value.length - state.model.pausePerBlock;
   console.log("full: ",fullTimings);
   let localTiming= performance.now();

   console.log("flocal: ",localTiming);
   codeBlocks.value.forEach((codeBlock)=>{
     codeBlock.result=[];
      for (let i=codeBlock.benchmarks.startIndex;i<codeBlock.benchmarks.endIndex;i++){
        codeBlock.result.percent=0;
        sleep(state.model.pausePerBlock);
        let test = runTestForAmountOfTime(i,state.model.timeToRun,true);
        codeBlock.result.push(test);
        let timing = test.timer - localTiming;
        state.app.testProgress = Math.round(100 / fullTimings * timing);
        console.log("testProgress",state.app.testProgress);
        if(state.app.testProgress > 100&& (state.app.testProgress = 100)){
          console.log("end");
        }
      }
     console.log(codeBlock);
   })
   showTestInProgress.value=false;
}

const calcResult=()=>{
  for (var o of (this.model.winnerBlockId = e.id,
      this.model.codeBlocks))
    o.result.percent = Math.round(100 / t * o.result.amountOfRounds * 100) / 100
}
const runTestForAmountOfTime=(idx,timing,isRoundBenchmark=false)=>{
  let rounds=0;
  //todo Работает добавление кода и его выполнения.Добавление код-блоков пока не реализовано!!!!
  let arr=[];
  let start=performance.now();
  let finish=performance.now();
  let functionCall="benchmark_"+idx;
    if(!isRoundBenchmark){
      start=performance.now();
      iframe.value.contentWindow[functionCall](arguments);
      finish=performance.now();
    }else{
        do{
        rounds++;
        iframe.value.contentWindow[functionCall](arguments);
        finish=performance.now();
      }while (finish-start<timing)
    }
    return {
      isRoundBenchmark:isRoundBenchmark,
      counter: rounds,
      runTime: finish - start,
      timer: finish
    }
}

const loadScripts=()=>{
  loadLibraryIntoIframe("https://code.jquery.com/jquery-3.4.1.min.js");
  loadLibraryIntoIframe("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.8/angular.min.js");
  loadLibraryIntoIframe("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js");
  console.log("scripts is loaded");
}

const loadLibraryIntoIframe=(path)=>{
  const iframeComp=iframe.value.contentWindow;
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = path;
  iframeComp.document.body.appendChild(script);
}
const addCodeBlock=()=>{
  let lastIndex=codeBlocks.value.length;
  const obj = {
    id: lastIndex + 1,
    title: "code block " + (codeBlocks.value.length + 1),
    code_block: "",
    benchmarks:{
      startIndex:0,
      endIndex:0,
    },
    result: []
  };
  codeBlocks.value.push(obj);
}
const removeCodeBlock=(id)=>{
  console.log(id);
  if(codeBlocks.value.length>1){
    console.log("id: ",id);
    codeBlocks.value=codeBlocks.value.filter(codeBlock=>codeBlock.id!=id);
  }
}

//компонент для замера времени + отрисовка графиков и тп.
const handleTests=()=>{
  runTests();
}

const showTestInProgress=ref(false);
const loader = computed(() => {
  return showTestInProgress;
})

const state=reactive({
  ui:{

    showAutoStart:false,
  },
  app:{
    testProgress:0,
    countRounds:1,
  },
  model:{
    timeToRun: 2e3,
    pausePerBlock: 700,
    title: "",
    errorMessage: null,
  }
})



</script>

<template>
  <BaseLayout>
    <div class="graph-editor graph-editor-hljs">
<!--  loader not work -->
      <div class="overlay" v-if="loader" >
        <img src="../assets/Ракета.gif" width="64" alt="">
      </div>
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

.overlay{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(1,1,1,0.4);
  z-index: 20;
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
