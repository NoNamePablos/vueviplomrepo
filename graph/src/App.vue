<script setup>

import BaseTabWrapper from "@/components/BaseTab/BaseTabWrapper.vue";
import BaseTabItem from "@/components/BaseTab/BaseTabItem.vue";

import {ref, computed, defineAsyncComponent, reactive, markRaw, provide} from "vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import PreviewCard from "@/components/previewCard/PreviewCard.vue";
import VueChart from "@/components/vue-echarts/VueChart.vue";
import BaseInputClickable from "@/components/ui/BaseInputClickable.vue";
import BaseSelect from "@/components/ui/BaseSelect.vue";
import VueSelect from "@/components/ui/VueSelect.vue";
import {useCardGraph} from "./hooks/useCardGraph";
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
  selectedFieldTarget}=useCardGraph();

///




const tabs=[
  {name:"Create",
   label:"Создание графиков",
    icon:'',
  },
  {name:"Graph",
    label:"Создание Дерева",
    icon:'',
  },
  {name:"Node editor",
    label:"Редактор графа",
    icon:'',
  },

]

const tabGraph=[{
  name:"CreateGraph",
  label:"Создать родителя",
  icon:'',
},{
  name:"SetLinks",
  label:"Создание связей",
  icon:'',
}]

const radiogroup=reactive([
  {
    title:'Line',
    radiotype:'typeChart',
    component:markRaw(defineAsyncComponent(() =>
        import('@/components/icons/chart/IconLineChart.vue')
    )),
    selected:false,
  },
  {
    title:'Bar',
    radiotype:'typeChart',
    component:markRaw(defineAsyncComponent(() =>
        import('@/components/icons/chart/IconBarChart.vue')
    )),
    selected:true,
  },
  {
    title:'Pie',
    radiotype:'typeChart',
    component:markRaw(defineAsyncComponent(() =>
        import('@/components/icons/chart/IconPieChart.vue')
    )),
    selected:false,
  },
  {
    title:'Graph',
    radiotype:'typeChart',
    component:markRaw(defineAsyncComponent(() =>
        import('@/components/icons/chart/IconGraphChart.vue')
    )),
    selected:false,
  },
  {
    title:'Tree',
    radiotype:'typeChart',
    component:markRaw(defineAsyncComponent(() =>
        import('@/components/icons/chart/IconTreeChart.vue')
    )),
    selected:false,
  },
])

computed(()=>{
  return radiogroup;
})


//Блокировка выбора типа графика после добавления элемента;
const isLockedRadioButton=ref(false);
const isLockedRadio = computed(() => {
  isLockedRadioButton.value=dataGraphic.value.length>0?true:false;
  return isLockedRadioButton.value;
})
const isGraph=ref(false);
const isGraphFunc = computed(() => {
  const type=createGraphic.value?.type!==null?createGraphic.value?.type.toLowerCase():'';
  if(type!==''&&type==='graph'){
    isGraph.value=!isGraph.value;
  }
  else{
    isGraph.value=false;
  }
  return isGraph.value;
})


const provideLinks = ref({});


const selectedTab=ref(tabs[0].name);

const selectedGraphTab=ref(tabGraph[0].name)

const changeTab=(value)=>{
  selectedTab.value=value;
  isGraph.value=selectedTab.value.toLowerCase()==='graph'?true:false;
  console.log("selected tab: ",selectedTab.value);
  console.log("is graph: ",isGraph.value);

}
const changeGraphTab=(value)=>selectedGraphTab.value=value;

//todo type graphic into radiobutton


const createGraphic=ref({
  type:radiogroup[radiogroup.findIndex((el)=>el.selected===true)].title===''?'':radiogroup[radiogroup.findIndex((el)=>el.selected===true)].title,
  title:'',
  value:'',
  x:'',
  y:'',
})

const dataFinal=computed(()=>{
  return dataGraphic.value;
})

const dataGraphic=ref([]);

const links=ref([])
computed(()=>links.value);


const tempData=ref({});
const appendToGraphic=()=>{

  const data={
    type:createGraphic.value.type,
    title:createGraphic.value.title,
    value:createGraphic.value.value,
    x:createGraphic.value.x,
    y:createGraphic.value.y,
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
    console.log("before: ",radiogroup);
    let lockedRadio=data?.type.toLowerCase();
    if(dataGraphic.value.length<1){
        isLockedRadioButton.value=true;
    }
    if(lockedRadio==='graph'){
      console.log("graph added")
      console.log("test data:: ",data)
    }
    dataGraphic.value.push(data);
  }
  clearGraphicForm();
}
//todo Крайний срок 06.03.2023
//todo Добавить поддержку нескольких видов-графиков(Приоритет высокий) (Визуализатор-Графики,деревья)
//todo Оптимизировать базовый шаблон с опциями для графика (Приоритет средний)
//todo Отрефакторить код (Приоритет мелкий)


const clearGraphicForm=()=>{
  createGraphic.value.title="";
  createGraphic.value.value="";
  createGraphic.value.x="";
  createGraphic.value.y="";
}
const editData=(value)=>{
  tempData.value=value;
  createGraphic.value.type=tempData.value?.type;
  createGraphic.value.title=tempData.value?.title;
  createGraphic.value.value=tempData.value?.value;
  createGraphic.value.x=tempData.value?.x;
  createGraphic.value.y=tempData.value?.y;

}
const deleteData=(value)=>{
  let index=dataGraphic.value.findIndex(element => element?.title===value?.title);
  if (index > -1) {
    dataGraphic.value.splice(index, 1);
    console.log("dataaa: ",dataGraphic.value.length);
  }
}
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
const selectedSel=(val)=>{
  console.log("selected: ",val?.title);
  selectSelectItem.value=val;
  console.log(selectSelectItem.value);
}

provide("LINKS_UPDATE",provideLinks);
</script>

<template>
  <div class="graph-editor">
    <div class="graph-editor__tabs" v-if="!isSaveGraph">
      <base-tab-wrapper :tabs="tabs" :selected-tab="selectedTab" @change-tab="changeTab">
        <base-tab-item v-if="selectedTab==='Create'">
            <h3 class="tab-item__name">
                Создание графиков
            </h3>
            <div class="tab-item__preview" v-show="dataGraphic.length>0" >
              <div class="preview-list">
                <preview-card  @change-data="editData" @delete-data="deleteData"  :data="card"  v-for="card in dataGraphic" :key="card.title" />
              </div>
            </div>
            <div class="tab-item-body">
              <form @submit.prevent action="" class="tab-item-form">
                <div class="radio-group">
                  <BaseInputClickable v-for="radio in radiogroup"  :is-locked="isLockedRadio" :selected="radio.selected"  v-model:value="createGraphic.type" :title="radio.title" :name="radio.radiotype">
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
        <!---GRAPH FORM-->
        <base-tab-item v-if="selectedTab==='Graph'">
          <base-tab-wrapper  :is-horizontal="true"  :tabs="tabGraph" :selected-tab="selectedGraphTab" @change-tab="changeGraphTab">
            <base-tab-item v-if="selectedGraphTab==='CreateGraph'">
              <h3 class="tab-item__name">
                Создание графиков
              </h3>
              <div class="tab-item__preview" v-show="graphNodeList.length>0" >
                <div class="preview-list">
                  <preview-card  @change-data="editNode" @delete-data="deleteNode"  :data="card" :title="card.title" :value="card.value" v-for="card in graphNodeList" :key="card.title" />

                </div>
              </div>
              <div class="tab-item-body">
                <form @submit.prevent action="" class="tab-item-form">
                  <p><strong>todo</strong> </p>
                  <div>Схема добавления удаления узла для графа</div>
                  <div>Вынести логику</div>
                  <div>Сделать id,нормально отрисовать граф,вынести логику графиков,начать делать ноде граф едитор</div>
                  <base-input v-model="graphNode.title">
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
                      <div>{{item?.source?.title}}</div>
                      <div>{{item?.target?.title}}</div>
                    </div>
                </div>
              </div>
              <div class="tab-item-body">
                <p>source</p>
                <vue-select @v-selected="selectedFieldSource"  :selected="graphLinkFields.source?.title"  :data="graphNodeList"></vue-select>
                <p>target</p>
                <vue-select @v-selected="selectedFieldTarget"  :selected="graphLinkFields.target?.title"  :data="graphNodeList"></vue-select>
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


<!--      <vue-chart v-if="isSaveGraph&&!isGraph"  :type="dataFinal[0]?.type" :links="graphLinkList"  :options-data="dataFinal"/>-->
      <vue-chart v-if="isGraph"  :type="'graph'" :experement-data="graphLinkList" :update-data="dataGraphic" :links="graphLinkList" :options-data="dataGraphic"   />
<!--      <h1 v-else>Здесь должен быть граф/график</h1>-->
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
