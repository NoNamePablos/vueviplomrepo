<script setup>

import BaseTabWrapper from "@/components/BaseTab/BaseTabWrapper.vue";
import BaseTabItem from "@/components/BaseTab/BaseTabItem.vue";
import {ref, computed, defineAsyncComponent, reactive, markRaw, watch, onMounted, onBeforeMount} from "vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import PreviewCard from "@/components/previewCard/PreviewCard.vue";
import VueChart from "@/components/vue-echarts/VueChart.vue";
import BaseInputClickable from "@/components/ui/BaseInputClickable.vue";
import VueSelect from "@/components/ui/VueSelect.vue";
import {useCardGraph} from "@/hooks/useCardGraph";
import {useChartController} from "@/hooks/useChartController";
import {radiogroup} from "@/utils/radiogroup.routes";
import {tabs,tabGraph} from "@/utils/tabs.routes";
import VueGraph from "@/components/vue-echarts/VueGraph.vue";
import Header from "@/components/Header.vue";
import {loadEr, mockDataChart, mockDataGraph} from "@/mock/mock";

///graph import
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
  selectedFieldSource,
  selectedFieldTarget,isGraph}=useCardGraph();

///
///chart import
const {chartNode,chartType,isLockedRadio,tempData,chartNodeList,clearChartItem,appendChartItem,editChartItem,deleteChartItem,isChart}=useChartController();

///
const loadData=ref({});
const isLoaded=ref(false);
const globalSettings=ref({

})

onBeforeMount(()=>{
    loadData.value=mockDataGraph;
    console.log("Iterate into for mockadata");
    let isGraphLoading=false;
    for (let key in loadData.value) {
      if(key==='production'){
        isSaveGraph.value=loadData.value[key];
      }
      if(key==="type"){
        isGraphLoading=loadData.value[key]==='graph'?true:false;
        if(isGraphLoading){
          changeTab("Graph");
        }
      }
      if(key==='title'){
        if(isGraphLoading){
          globalSettings.value.title=loadData.value[key];
        }
      }
      if(key==='typeChart'){
        if(!isGraphLoading){
          chartType.value=radiogroup[radiogroup.findIndex((el)=>el.title.toLowerCase()===loadData.value[key].toLowerCase())].title;
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
        }else{
          for ( let {title,value,link} of loadData.value[key]){
            chartNode.value.type=chartType.value;
            chartNode.value.title=title;
            chartNode.value.value=value;
            appendChartItem();
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
  console.log("end iteration");
  console.log("append graph? ",isGraph.value)
})





computed(()=>{
  return radiogroup ;
})


//Блокировка выбора типа графика после добавления элемента;



const selectedTab=ref(tabs[0].name);

const selectedGraphTab=ref(tabGraph[0].name)

const changeTab=(value)=>{
  selectedTab.value=value;
  console.log("selected tab: ",selectedTab.value);

}
const changeGraphTab=(value)=>selectedGraphTab.value=value;


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
      <base-tab-wrapper :tabs="tabs" :selected-tab="selectedTab" @change-tab="changeTab">
        <base-tab-item v-if="selectedTab==='Create'">
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
            </form>
          </div>
        </base-tab-item>
        <!---GRAPH FORM-->
        <base-tab-item v-if="selectedTab==='Graph'">
          <base-tab-wrapper  :is-horizontal="true"  :tabs="tabGraph" :selected-tab="selectedGraphTab" @change-tab="changeGraphTab">
            <base-tab-item v-if="selectedGraphTab==='CreateGraph'">
              <h3 class="tab-item__name">
                Создание графиков
              </h3>
              <div class="todo">
                <ol>
                  <li style="color: green; text-decoration: line-through;">Сделать динамическую привязку данных(Граф)</li>
                  <li>Сделать динамическую привязку данных(Графики)</li>
                  <li>Сделать возможность клика по любому елементу и переходить по ссылке</li>
                </ol>
              </div>
              <div class="tab-item__preview" v-show="graphNodeList.length>0" >
                <div class="preview-list">
                  <preview-card  @change-data="editNode" @delete-data="deleteNode"  :data="card" :title="card.name" :value="card.value" v-for="card in graphNodeList" :key="card.name" />
                </div>
              </div>
              <div class="tab-item-body">
                <form @submit.prevent action="" class="tab-item-form">
                  <p><strong>todo</strong> </p>
                  <div>Схема добавления удаления узла для графа</div>
                  <div>Вынести логику</div>
                  <div>Сделать id,нормально отрисовать граф,вынести логику графиков,начать делать ноде граф едитор</div>
                  <base-input v-model="graphNode.name">
                    Название
                  </base-input>
                  <base-input :type="'number'" v-model="graphNode.x" >
                    x
                  </base-input>
                  <base-input :type="'number'" v-model="graphNode.y" >
                    y
                  </base-input>
                  <div class="tab-item-form__controls">
                    <base-button :classes="['button-green']" @click="appendItem">Добавить</base-button>
                    <base-button :classes="['button-red']" @click="clearGraphNode">Очистить</base-button>
                  </div>
                </form>
              </div>
            </base-tab-item>
            <base-tab-item v-if="selectedGraphTab==='SetLinks'">
              <h3 class="tab-item__name">
                Связи
              </h3>
              <div class="tab-item__preview" v-show="graphNodeList.length>0" >
                <!--                <div class="preview-list" v-if="selectedGraphTab!=='SetLinks'">
                                  <preview-card  @change-data="editData" @delete-data="deleteData"  :data="card" :title="card.title" :value="card.value" v-for="card in dataGraphic" :key="card.title" />
                                </div>-->
                <div class="preview-list" >
                  <div class="item" v-for="(item,idx) in graphLinkList" :key="idx">
                    <div>{{item?.source?.name}}</div>
                    <div>{{item?.target?.name}}</div>
                  </div>
                </div>
              </div>
              <div class="tab-item-body">
                <p>source</p>
                <vue-select @v-selected="selectedFieldSource"  :selected="graphLinkFields.source?.name"  :data="graphNodeList"></vue-select>
                <p>target</p>
                <vue-select @v-selected="selectedFieldTarget"  :selected="graphLinkFields.target?.name"  :data="graphNodeList"></vue-select>
              </div>
              <div class="tab-item-form__controls">
                <base-button :classes="['button-green']" @click="appendLink">Добавить</base-button>
                <base-button :classes="['button-red']" @click="">Очистить</base-button>
              </div>
            </base-tab-item>
          </base-tab-wrapper>
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
      <!----todo vue-echart set option and add dinamicly data  ---->
      <vue-chart v-if="isChart"  :type="chartType.toLowerCase()"   :options-data="chartNodeList"   />
      <vue-graph  v-else-if="isGraph" :global-settings="globalSettings" :type="'graph'" :links="graphLinkList" :options-data="graphNodeList"   />
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
