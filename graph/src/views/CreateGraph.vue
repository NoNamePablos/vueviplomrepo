<script setup>

import {ref, computed,toRaw,onBeforeMount} from "vue";
import PreviewCard from "@/components/previewCard/PreviewCard.vue";
import VueChart from "@/components/vue-echarts/VueChart.vue";
import BaseInputClickable from "@/components/ui/BaseInputClickable.vue";
import {useChartController} from "@/hooks/useChartController";
import {radiogroup} from "@/utils/radiogroup.routes";

import Header from "@/components/Header.vue";
import PreviewList from "@/components/PreviewList.vue";
import BaseLayout from "@/components/BaseLayout.vue";
import BaseForm from "@/components/ui/BaseForm.vue";

///graph import


///
///chart import
const {chartNode,chartType,isLockedRadio,tempData,chartNodeList,clearChartItem,appendChartItem,editChartItem,deleteChartItem,isChart}=useChartController();

///

const exportData=ref({
  production:true,
  type:"chart",
  typeChart:chartType.value.toLowerCase(),
  optionData:[]
})


computed(()=>{
  return radiogroup ;
})


const saveGraphEditor=()=>{
  isSaveGraph.value=true;
}

const isSaveGraph=ref(false);
const selectSelectItem=ref({
  name:'default',
  title:'select'
})
computed(()=>{
  return selectSelectItem;
})
function validateName(value) {
  if (!value) {
    return 'Обязательное поле'
  }
}
function validateNumber(value) {
  if (value<=0) {
    return 'Значение должно быть больше 0'
  }
}
const exportChartData=()=>{
  //Запрос на серв со всеми данными
  exportData.value.typeChart=chartType.value.toLowerCase();
  exportData.value.optionData=chartNodeList.value;
  const json=JSON.stringify(toRaw(exportData.value));
  let hiddenParent=document.querySelector('.chart-component');
  hiddenParent.querySelector('.chart-component-hidden').textContent=json;
}
const loadData=ref({});
onBeforeMount(()=>{
  let hiddenParent=document.querySelector('.chart-component');
  let hiddenObject=hiddenParent.querySelector('.chart-component-hidden');
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
      if(key==='typeChart'){
        if(!isGraphLoading){
          chartType.value=radiogroup[radiogroup.findIndex((el)=>el.title.toLowerCase()===loadData.value[key].toLowerCase())].title;
        }
      }
      if(key==='optionData'){
        if(!isGraphLoading){
          for ( let {title,value,link} of loadData.value[key]){
            chartNode.value.type=chartType.value;
            chartNode.value.title=title;
            chartNode.value.value=value;
            appendChartItem();
          }
        }
      }
    }
  }
})
const handleSubmit=()=>{
  if(chartNode.value.title&&chartNode.value.value){
    appendChartItem();
  }
}
</script>

<template>
  <BaseLayout>
    <div :class="['graph-editor',{'graph-centered':isSaveGraph}]">
      <div class="graph-editor__tabs" v-if="!isSaveGraph">
        <h3 class="tab-item__name">
          Создание графиков
        </h3>
        <div class="tab-item__preview" v-show="chartNodeList.length>0" >
          <preview-list>
            <preview-card  @change-data="editChartItem" @delete-data="deleteChartItem"  :data="card"  v-for="card in chartNodeList" :key="card.title" />
          </preview-list>
        </div>
        <div class="tab-item-body">
          <base-form :handle-submit="handleSubmit" class="tab-item-form">
            <template #form-field>
              <div class="radio-group">
                <BaseInputClickable v-for="radio in radiogroup"  :is-locked="isLockedRadio" :selected="radio.selected"  v-model:value="chartNode.type" :title="radio.title" :name="radio.radiotype">
                  <div v-html="radio.component"></div>
                </BaseInputClickable>
              </div>
              <base-input v-model="chartNode.title"   :validation="validateName">
                Название
              </base-input>
              <base-input  type="number" v-model="chartNode.value" :validation="validateNumber">
                Значение
              </base-input>

            </template>
            <template #form-button>
              <base-button :classes="['button-red']" @click="clearChartItem">Очистить</base-button>
              <base-button :classes="['button-green',{'button-blocked':chartNodeList.length===0}]" @click="exportChartData">Экспорт</base-button>
            </template>
          </base-form>
        </div>
      </div>
      <div class="graph-editor__draw">
        <vue-chart v-if="isChart"  :type="chartType.toLowerCase()"   :options-data="chartNodeList"   />
        <h1 v-else>Здесь должен быть график</h1>
      </div>
    </div>
  </BaseLayout>
</template>

<style lang="scss" scoped>
.radio-group{
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tab-item{
  &-form{
    &__controls{
      margin-top: 20px;
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
.graph-centered{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0;
}
</style>
