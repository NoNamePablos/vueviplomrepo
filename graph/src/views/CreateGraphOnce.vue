<template>
  <BaseLayout :add-class="['is-full']">
    <div :class="['wrapper',{'wrapper-centered':isSaveGraph}]" >
      <base-tab-wrapper  v-show="!isSaveGraph" :tabs="tabGraph" :selected-tab="selectedGraphTab" @change-tab="changeGraphTab">
        <base-tab-item v-if="selectedGraphTab==='CreateGraph'" :showed="selectedGraphTab==='CreateGraph'">
          <h3 class="tab-item__name">
            Создание графиков
          </h3>
          <div class="tab-item__preview" v-show="graphNodeList.length>0" >
            <preview-list>
              <PreviewCardGraph  @change-data="editNode" @delete-data="deleteNode"  :data="card" :title="card.name"  :value="card.value" v-for="card in graphNodeList" :key="card.name" />
            </preview-list>
          </div>
          <div class="tab-item-body">
            <base-input :is-required="false" v-model="graphGlobSettings.title"  >
              Глобальное название графа
            </base-input>
            <base-form :handle-submit="handleSubmit">
              <template #form-field>
                <base-input  v-model="graphNode.name" :validation="validateName">
                  Название
                </base-input>
                <base-input :is-required="false" v-model="graphNode.link"  >
                  Ссылка
                </base-input>
                <base-input  type="number" v-model="graphNode.x" :validation="validateNumber" >
                  x
                </base-input>
                <base-input  type="number" v-model="graphNode.y"  :validation="validateNumber" >
                  y
                </base-input>
              </template>
              <template #form-button>
                <base-button :classes="['button-red']" @click="clearGraphNode">Очистить</base-button>
              </template>
            </base-form>
          </div>
        </base-tab-item>
        <base-tab-item v-if="selectedGraphTab==='SetLinks'" :showed="selectedGraphTab==='SetLinks'">
          <h3 class="tab-item__name">
            Связи
          </h3>
          <div class="tab-item__preview" v-show="graphNodeList.length>0" >
            <preview-list>
              <PreviewCard :is-selected-type="true"  @change-data="editLink" @delete-data="deleteLink"  :data="card" :title="card.name" :value="card.value" v-for="card in graphLinkList" :key="card.name" />
            </preview-list>
          </div>
          <div class="tab-item-body">
            <base-form :handle-submit="handleSubmitLink" class="tab-item-form">
              <template #form-field>
                <p>Откуда</p>
                <vue-select @v-selected="selectedFieldSource"  :validation="validateCheckbox"  ref="selectFiledSourceRef"  :selected="graphLinkFields.source?.name"  :data="graphNodeList"></vue-select>
                <p>Куда</p>
                <vue-select @v-selected="selectedFieldTarget"  :validation="validateCheckbox"  ref="selectFiledTargetRef" :selected="graphLinkFields.target?.name"  :data="graphNodeList"></vue-select>
              </template>
              <template #form-button>
                <base-button :classes="['button-red']" @click="clearLink">Очистить</base-button>
              </template>
            </base-form>
          </div>

        </base-tab-item>
        <div class="tab-item-form__controls">
          <base-button :classes="['button-green',{'button-blocked':graphNodeList.length===0}]" @click="exportGraphData">Экспорт</base-button>
        </div>
      </base-tab-wrapper>
      <vue-graph  v-if="isGraph" :global-settings="{title:graphGlobSettings.title}" :type="'graph'" :links="graphLinkList" :options-data="graphNodeList"   />
      <h1 v-else>Здесь должен быть граф</h1>
    </div>
  </BaseLayout>
</template>

<script setup>

//Блокировка выбора типа графика после добавления элемента;


import {ref, toRaw,onBeforeMount} from "vue";
import {tabGraph} from "@/utils/tabs.routes";
import {useCardGraph} from "@/hooks/useCardGraph";
import VueGraph from "@/components/vue-echarts/VueGraph.vue";
import BaseTabItem from "@/components/BaseTab/BaseTabItem.vue";
import BaseTabWrapper from "@/components/BaseTab/BaseTabWrapper.vue";
import PreviewCardGraph from "@/components/previewCard/PreviewCardGraph.vue";
import PreviewList from "@/components/PreviewList.vue";
import BaseLayout from "@/components/BaseLayout.vue";
import PreviewCard from "@/components/previewCard/PreviewCard.vue";

const selectedGraphTab=ref(tabGraph[0].name)
const exportData=ref({
  production:true,//Отключает форму с добавлеением элементов
  type:"graph",//chart
  typeChart:"graph",
  title:"",
  optionData:[],
  links:[]
})

const handleSubmit=()=>{
  if(graphNode.value.name&&graphNode.value.x>0&&graphNode.value.y>0){
    appendItem();
  }
}
function validateName(value) {
  if (!value) {
    return 'Обязательное поле'
  }
}
function validateNumber(value) {
  if (value<=0) {
    return 'значение должно быть больше 0'
  }
}
const validateCheckbox=(value)=>{
  if(value===""||value==="Выбрать"){
    return 'Пожалуйста выберите элемент';
  }
}
const exportGraphData=()=>{
  exportData.value.title=graphGlobSettings.value.title;
  exportData.value.optionData=graphNodeList.value;
  exportData.value.links=graphLinkList.value;
  const json=JSON.stringify(toRaw(exportData.value));
  const parentEl=document.querySelector('.chart-component-graph');
  const hiddenData=parentEl.querySelector('.chart-component-graph-hidden').textContent=json;

}
const loadData=ref({});
const isSaveGraph=ref(false);
/*onBeforeMount(()=>{
  let hiddenParent=document.querySelector('.chart-component-graph');
  let hiddenObject=hiddenParent.querySelector('.chart-component-graph-hidden');
  if(hiddenObject.textContent!=""){
    loadData.value=JSON.parse(hiddenObject.textContent);
    let isGraphLoading=false;
    for (let key in loadData.value) {
      if(key==='production'){
        isSaveGraph.value=loadData.value[key];
      }
      if(key==="type"){
        isGraphLoading=loadData.value[key]==='graph'?true:false;
      }
      if(key==='title'){
        if(isGraphLoading){
          graphGlobSettings.value.title=loadData.value[key];
        }
      }
      if(key==='optionData'){
        if(isGraphLoading){
          for ( let {name,x,y,link} of loadData.value[key]){
            graphNode.value.name=name;
            graphNode.value.x=x;
            graphNode.value.y=y;
            graphNode.value.link=link;
            appendItem();
          }
        }
      }
      if(key==='links'&&isGraphLoading){
        for ( let {source,target} of loadData.value[key]){
          graphLinkFields.value.source=source;
          graphLinkFields.value.target=target;
          appendLink();
        }
      }
    }
  }
})*/

//Ссылки на селекты
const selectFiledSourceRef=ref(null);
const selectFiledTargetRef=ref(null);
///
const changeGraphTab=(value)=>selectedGraphTab.value=value;
const {
  graphNode,
  graphLinkFields,
  graphLinkList,
  graphNodeList,
  appendItem,
  editNode,
  deleteNode,
  clearGraphNode,
  appendLink,
  editLink,
  deleteLink,
  clearLink,
  graphGlobSettings,
  selectedFieldSource,
  selectedFieldTarget,isGraph}=useCardGraph();

const handleSubmitLink=()=>{
  appendLink();
  clearLink();
  selectFiledSourceRef.value.resetSelectedIndex();
  selectFiledTargetRef.value.resetSelectedIndex();
}
</script>

<style lang="scss" scoped>
.wrapper{
  margin-top: 100px;
  display: grid;
  grid-template-columns: 600px 1fr;
  @media screen and (max-width:1600px) {
    grid-template-columns: 600px 1fr;
  }
  @media screen and (max-width:1280px) {
    grid-template-columns: 400px 1fr;
  }
  @media screen and (max-width:1024px) {
    grid-template-columns:1fr;
  }
}
.wrapper-centered{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  margin-top: 0;
}
.is-full{
  max-width: 100%;
}
</style>