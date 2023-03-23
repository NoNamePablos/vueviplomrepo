<template>
 <div class="wrapper">
   <base-tab-wrapper   :tabs="tabGraph" :selected-tab="selectedGraphTab" @change-tab="changeGraphTab">
     <base-tab-item v-if="selectedGraphTab==='CreateGraph'">
       <h3 class="tab-item__name">
         Создание графиков
       </h3>
       <div class="tab-item__preview" v-show="graphNodeList.length>0" >
         <div class="preview-list">
           <PreviewCardGraph  @change-data="editNode" @delete-data="deleteNode"  :data="card" :title="card.name" :value="card.value" v-for="card in graphNodeList" :key="card.name" />
         </div>
       </div>
       <div class="tab-item-body">
         <form @submit.prevent action="" class="tab-item-form">
           <base-input v-model="graphGlobSettings.title">
             Глобальное название графа
           </base-input>
           <base-input v-model="graphNode.name">
             Название
           </base-input>
           <base-input v-model="graphNode.link" >
             Ссылка
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
     <div class="tab-item-form__controls">
       <base-button :classes="['button-green']" @click="exportGraphData">Экспорт</base-button>
     </div>
   </base-tab-wrapper>
   <vue-graph  v-if="isGraph" :global-settings="{title:graphGlobSettings.title}" :type="'graph'" :links="graphLinkList" :options-data="graphNodeList"   />
 </div>
</template>

<script setup>

//Блокировка выбора типа графика после добавления элемента;


import {ref, toRaw} from "vue";
import {tabGraph} from "@/utils/tabs.routes";
import {useCardGraph} from "@/hooks/useCardGraph";
import VueGraph from "@/components/vue-echarts/VueGraph.vue";
import BaseTabItem from "@/components/BaseTab/BaseTabItem.vue";
import BaseTabWrapper from "@/components/BaseTab/BaseTabWrapper.vue";
import PreviewCardGraph from "@/components/previewCard/PreviewCardGraph.vue";

const selectedGraphTab=ref(tabGraph[0].name)
const exportData=ref({
  production:false,//Отключает форму с добавлеением элементов
  title:"",
  type:"graph",//chart
  typeChart:"graph",
  optionData:[],
  links:[]
})


const exportGraphData=()=>{
  exportData.value.title=graphGlobSettings.value.title;
  exportData.value.optionData=graphNodeList.value;
  exportData.value.links=graphLinkList.value;
  const json=JSON.stringify(toRaw(exportData.value));
  console.log("json ",json);
}

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
  graphGlobSettings,
  selectedFieldSource,
  selectedFieldTarget,isGraph}=useCardGraph();
</script>

<style lang="scss" scoped>
  .wrapper{
    margin-top: 100px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }


</style>