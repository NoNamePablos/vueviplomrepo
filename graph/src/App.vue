<script setup>

import BaseTabWrapper from "@/components/BaseTab/BaseTabWrapper.vue";
import BaseTabItem from "@/components/BaseTab/BaseTabItem.vue";

import {ref, computed, defineAsyncComponent} from "vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import PreviewCard from "@/components/previewCard/PreviewCard.vue";
import VueChart from "@/components/vue-echarts/VueChart.vue";
import IconLineChart from "@/components/icons/chart/IconLineChart.vue";
import IconBarChart from "@/components/icons/chart/IconBarChart.vue";
import IconPieChart from "@/components/icons/chart/IconPieChart.vue";
import IconGraphChart from "@/components/icons/chart/IconGraphChart.vue";
import IconTreeChart from "@/components/icons/chart/IconTreeChart.vue";
import BaseInputClickable from "@/components/ui/BaseInputClickable.vue";

const tabs=[
  {name:"Create",
   label:"Создание графиков",
    icon:'',
  },
  {name:"Tree",
    label:"Создание Дерева",
    icon:'',
  },
  {name:"Node editor",
    label:"Редактор графа",
    icon:'',
  },

]
const selectedTab=ref(tabs[0].name);
const changeTab=(value)=>{
  selectedTab.value=value;
}

//todo type graphic into radiobutton

const createGraphic=ref({
  type:'',
  title:'',
  value:'',
})

computed(()=>{
  return dataGraphic.value;
})

const dataGraphic=ref([]);

const tempData=ref({});
const appendToGraphic=()=>{
  const data={
    type:createGraphic.value.type,
    title:createGraphic.value.title,
    value:createGraphic.value.value,
  }
  console.log("add: ",data);
  //Проверка на редактирование если tempData не !=Null;
  //Кастомное событие change-data;
  if(Object.keys(tempData.value).length != 0){
    let index=dataGraphic.value.findIndex(element => element?.title===tempData.value?.title);
    console.log("under update: ",dataGraphic.value[index]);
    dataGraphic.value[index]=data;
    console.log("after update: ",dataGraphic.value[index]);
    tempData.value={};
    console.log("tempData: ",tempData.value);
  }else{
    dataGraphic.value.push(data);
  }
  clearGraphicForm();
}


const clearGraphicForm=()=>{
  createGraphic.value.title="";
  createGraphic.value.value="";
}
const editData=(value)=>{
  tempData.value=value;
  createGraphic.value.type=tempData.value?.type;
  createGraphic.value.title=tempData.value?.title;
  createGraphic.value.value=tempData.value?.value;
}
const deleteData=(value)=>{
  let index=dataGraphic.value.findIndex(element => element?.title===value?.title);
  if (index > -1) {
    dataGraphic.value.splice(index, 1);
  }
}
const saveGraphEditor=()=>{
  isSaveGraph.value=true;

}
const radiogroup=[
  {
    title:'line',
    radiotype:'typeChart',
    component:defineAsyncComponent(() =>
        import('@/components/icons/chart/IconLineChart.vue')
    ),
    selected:false
  },
  {
    title:'Bar',
    radiotype:'typeChart',
    component:defineAsyncComponent(() =>
        import('@/components/icons/chart/IconBarChart.vue')
    ),
    selected:true,
  },
  {
    title:'Pie',
    radiotype:'typeChart',
    component:defineAsyncComponent(() =>
        import('@/components/icons/chart/IconPieChart.vue')
    ),
    selected:false,

  },
  {
    title:'Graph',
    radiotype:'typeChart',
    component:defineAsyncComponent(() =>
        import('@/components/icons/chart/IconGraphChart.vue')
    ),
    selected:false,

  },
  {
    title:'Tree',
    radiotype:'typeChart',
    component:defineAsyncComponent(() =>
        import('@/components/icons/chart/IconTreeChart.vue')
    ),
    selected:false,

  },

];

const isSaveGraph=ref(false);
</script>

<template>
  <div class="graph-editor">
    <div class="graph-editor__tabs" v-if="!isSaveGraph">
      <span>Табы типо</span>
      <base-tab-wrapper :tabs="tabs" :selected-tab="selectedTab" @change-tab="changeTab">
        <base-tab-item v-if="selectedTab==='Create'">
            <h3 class="tab-item__name">
                Создание графиков
            </h3>
            <div class="tab-item__preview" v-show="dataGraphic.length>0" >
              <div class="preview-list">
                <preview-card  @change-data="editData" @delete-data="deleteData"  :title="card.title" :value="card.value" v-for="card in dataGraphic" :key="card.title" />
              </div>
            </div>
            <div class="tab-item-body">
              <form @submit.prevent action="" class="tab-item-form">
                <div class="radio-group">
                  <BaseInputClickable v-for="radio in radiogroup" :selected="radio.selected"  v-model:value="createGraphic.type" :title="radio.title" :name="radio.radiotype">
                    <component :is=" radio.component"></component>
                  </BaseInputClickable>
                </div>
                <base-input v-model="createGraphic.title">
                  Название
                </base-input>
                <base-input :type="'number'" v-model="createGraphic.value">
                  Количество
                </base-input>
                <div class="tab-item-form__controls">
                  <base-button :classes="['button-green']" @click="appendToGraphic">Добавить</base-button>
                  <base-button :classes="['button-red']" @click="clearGraphicForm">Очистить</base-button>
                </div>
              </form>
            </div>
        </base-tab-item>
        <base-tab-item v-if="selectedTab==='Tree'">
          <p>Tab2</p>
        </base-tab-item>
        <base-tab-item v-if="selectedTab==='Node editor'">
          <p>Tab3</p>
        </base-tab-item>
      </base-tab-wrapper>
      <div class="graph-editor__controls">
        <base-button :classes="['button-green']" @click="saveGraphEditor">Сохранить</base-button>
        <base-button :classes="['button-red']" @click="">Отменить</base-button>
      </div>
    </div>
    <div class="graph-editor__draw">
      <vue-chart v-if="isSaveGraph" :options-data="dataGraphic"/>
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
