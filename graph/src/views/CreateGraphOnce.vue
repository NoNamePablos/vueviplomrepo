<template>
  <BaseLayout :add-class="['is-full']">
 <div class="wrapper">
   <base-tab-wrapper   :tabs="tabGraph" :selected-tab="selectedGraphTab" @change-tab="changeGraphTab">
     <base-tab-item v-if="selectedGraphTab==='CreateGraph'">
       <h3 class="tab-item__name">
         Создание графиков
       </h3>
       <div class="tab-item__preview" v-show="graphNodeList.length>0" >
         <preview-list>
           <PreviewCardGraph  @change-data="editNode" @delete-data="deleteNode"  :data="card" :title="card.name" :value="card.value" v-for="card in graphNodeList" :key="card.name" />
         </preview-list>
       </div>
       <div class="tab-item-body">
         <base-input :is-required="false" v-model="graphGlobSettings.title"  >
           Глобальное название графа
         </base-input>
         <base-form :handle-submit="handleSubmit">
           <template #form-field>
             <base-input :is-required="true" v-model="graphNode.name" :validation="validateName">
               Название
             </base-input>
             <base-input :is-required="false" v-model="graphNode.link"  >
               Ссылка
             </base-input>
             <base-input :is-required="true" type="number" v-model="graphNode.x" :validation="validateNumber" >
               x
             </base-input>
             <base-input :is-required="true"  type="number" v-model="graphNode.y"  :validation="validateNumber" >
               y
             </base-input>
           </template>
          <template #form-button>
            <base-button :classes="['button-red']" @click="">Очистить</base-button>
          </template>
         </base-form>
       </div>
     </base-tab-item>
     <base-tab-item v-if="selectedGraphTab==='SetLinks'">
       <h3 class="tab-item__name">
         Связи
       </h3>
       <div class="tab-item__preview" v-show="graphNodeList.length>0" >
         <preview-list>
           <PreviewCard :is-selected-type="true"  @change-data="editLink" @delete-data="deleteLink"  :data="card" :title="card.name" :value="card.value" v-for="card in graphLinkList" :key="card.name" />
         </preview-list>
       </div>
       <div class="tab-item-body">
         <p>Откуда</p>
         <vue-select @v-selected="selectedFieldSource"  :selected="graphLinkFields.source?.name"  :data="graphNodeList"></vue-select>
         <p>Куда</p>
         <vue-select @v-selected="selectedFieldTarget"  :selected="graphLinkFields.target?.name"  :data="graphNodeList"></vue-select>
       </div>
       <div class="tab-item-form__controls">
         <base-button :classes="['button-active']" @click="appendLink">Добавить</base-button>
         <base-button :classes="['button-red']" @click="">Очистить</base-button>
       </div>

     </base-tab-item>
     <div class="tab-item-form__controls">
       <base-button :classes="['button-green']" @click="exportGraphData">Экспорт</base-button>
     </div>
   </base-tab-wrapper>
   <vue-graph  v-if="isGraph" :global-settings="{title:graphGlobSettings.title}" :type="'graph'" :links="graphLinkList" :options-data="graphNodeList"   />
 </div>
  </BaseLayout>
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
import PreviewList from "@/components/PreviewList.vue";
import BaseLayout from "@/components/BaseLayout.vue";
import PreviewCard from "@/components/previewCard/PreviewCard.vue";
import BaseForm from "@/components/ui/BaseForm.vue";

const selectedGraphTab=ref(tabGraph[0].name)
const exportData=ref({
  production:false,//Отключает форму с добавлеением элементов
  title:"",
  type:"graph",//chart
  typeChart:"graph",
  optionData:[],
  links:[]
})

const handleSubmit=()=>{
  appendItem();
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
    grid-template-columns: 600px 1fr;
  }
  .is-full{
    max-width: 100%;
  }


</style>