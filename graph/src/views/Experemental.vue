<!--
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
      &lt;!&ndash; Сделать подгрузку и визуал табов        &ndash;&gt;
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

<script setup>
import BaseLayout from "@/components/BaseLayout.vue";
import {computed, ref} from "vue";
const blockAmount=computed(()=>{ return codeBlocks.value.length});
const codeBlocks=ref([{
  id:1,
  title:"code block 1",
  code_block: "",
  result:{
    runtime:0,
    amountOfRounds:0,
    percent:0,
  }
},{
  id:2,
  title:"code block 2",
  code_block: "",
  result:{
    runtime:0,
    amountOfRounds:0,
    percent:0,
  }
}])
const addCodeBlock=()=>{
  let lastIndex=codeBlocks.value[codeBlocks.value.length - 1]
  const obj = {
    id: lastIndex + 1,
    title: "code block " + (codeBlocks.value.length + 1),
    code_block: "",
    result: {
      runTime: 0,
      amountOfRounds: 0,
      percent: 0
    }
  };
  codeBlocks.value.push(obj);
}
const removeCodeBlock=(id)=>{
  if(codeBlocks.value.length<=1){
    //не разрешаем удалять,только очищаем
  }else{
    codeBlocks.value=codeBlocks.value.filter(codeBlock=>codeBlock.id!=id);
  }
}
const handleSubmit=()=>{
  runTests();
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
const runTestForAmountOfTime=(item,timing)=>{
  let functionCall="benchmark_"+item.id;
  let start=performance.now();
  let finish=performance.now();
  let rounds=0;
  //todo Работает добавление кода и его выполнения.Добавление код-блоков пока не реализовано!!!!
  do{
    rounds++;
    iframe.value.contentWindow[functionCall](arguments);
    finish=performance.now();
    console.log("Start: ",start);
    console.log("finish: ",finish);
    console.log("dfd: ",finish-start);
  }while (finish-start<timing)
  /*do {
    iframe.value.contentWindow[o](arguments),
        r++,
        s = performance.now()
  } while (s - a < t && !this.model.errorMessage);*/
  console.log({
    counter: rounds,
    runTime: start - finish,
    timer: finish
  })
}
const runTests=()=>{
  iframe.value=window.document.createElement('iframe');
  iframe.value.style.display="none";
  iframe.value.id="iframe";
  document.body.appendChild(iframe.value);
  const content=iframe.value.contentWindow;
  console.log("Cnt: ",content);
  loadScripts();
  const sctiptBlock=document.createElement('script');
  let s="";
  //item_id id code blcok
  for (let item of codeBlocks.value) {
    /*var i = "function benchmark_" + item.id + "() {" + e.model.boilerplateBlock.code + r.code_block + "}";*/
    let i = "function benchmark_" + item.id + "() {"  + hlCode.value + "}";
    s += i
  }
  sctiptBlock.type = "text/javascript";
  sctiptBlock.text = s;
  sctiptBlock.dataset.benchmark = "true";
  content.document.body.appendChild(sctiptBlock);
  /*runTestForAmountOfTime*/
  runTestForAmountOfTime(codeBlocks.value[1],100);
}


const iframe=ref(null);




</script>

<style lang="scss" scoped>
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
</style>-->
