<script setup>

import {ref, computed,toRaw} from "vue";
import PreviewCard from "@/components/previewCard/PreviewCard.vue";
import VueChart from "@/components/vue-echarts/VueChart.vue";
import BaseInputClickable from "@/components/ui/BaseInputClickable.vue";
import {useChartController} from "@/hooks/useChartController";
import {radiogroup} from "@/utils/radiogroup.routes";

import Header from "@/components/Header.vue";
///graph import


///
///chart import
const {chartNode,chartType,isLockedRadio,tempData,chartNodeList,clearChartItem,appendChartItem,editChartItem,deleteChartItem,isChart}=useChartController();

///

const exportData=ref({
  production:false,
  type:"chart",
  typeChart:chartType.value.toLowerCase(),
  optionData:[]
})

const exportChartData=()=>{
  //Запрос на серв со всеми данными
  exportData.value.typeChart=chartType.value.toLowerCase();
  exportData.value.optionData=chartNodeList.value;
  const json=JSON.stringify(toRaw(exportData.value));
  console.log("json ",json);
}



computed(()=>{
  return radiogroup ;
})



//todo Крайний срок 06.03.2023
//todo Оптимизировать базовый шаблон с опциями для графика (Приоритет средний)

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

</script>

<template>
  <div class="graph-editor">
    <div class="graph-editor__tabs" v-if="!isSaveGraph">
          <h3 class="tab-item__name">
            Создание графиков
          </h3>
          <div class="tab-item__preview" v-show="chartNodeList.length>0" >
            <div class="preview-list">
              <preview-card  @change-data="editChartItem" @delete-data="deleteChartItem"  :data="card"  v-for="card in chartNodeList" :key="card.title" />
            </div>
          </div>
          <div class="tab-item-body">
            <form @submit.prevent action="" class="tab-item-form">
              <div class="radio-group">
                <BaseInputClickable v-for="radio in radiogroup"  :is-locked="isLockedRadio" :selected="radio.selected"  v-model:value="chartNode.type" :title="radio.title" :name="radio.radiotype">
                  <component :is=" radio.component"></component>
                </BaseInputClickable>
              </div>
              <base-input v-model="chartNode.title">
                Название
              </base-input>
              <base-input :type="'number'" v-model="chartNode.value">
                Количество
              </base-input>
              <div class="tab-item-form__controls">
                <base-button :classes="['button-green']" @click="appendChartItem">Добавить</base-button>
                <base-button :classes="['button-red']" @click="clearChartItem">Очистить</base-button>
              </div>
              <div class="tab-item-form__controls">
                <base-button :classes="['button-green']" @click="exportChartData">Экспорт</base-button>
              </div>
            </form>
          </div>
<!--      <div class="graph-editor__controls">
        <base-button :classes="['button-green']" @click="saveGraphEditor">Сохранить</base-button>
        <base-button :classes="['button-red']" @click="">Отменить</base-button>
      </div>-->
    </div>
    <div class="graph-editor__draw">
      <!----todo vue-echart set option and add dinamicly data  ---->
      <vue-chart v-if="isChart"  :type="chartType.toLowerCase()"   :options-data="chartNodeList"   />
      <h1 v-else>Здесь должен быть граф/график</h1>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.radio-group{
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.preview-list{
  margin:15px 0;
  max-height: 350px;
  overflow-y: auto;
  height: auto;
  overflow-x: hidden;
  padding: 0 10px;
  &>*+*{
    margin-top: 15px;
  }
  &::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: var(--color-accent-3);

  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: var(--color-accent-2);
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-accent-1);
  }
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
