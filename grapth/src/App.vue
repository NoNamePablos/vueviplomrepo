<script setup>

import BaseTabWrapper from "@/components/BaseTab/BaseTabWrapper.vue";
import BaseTabItem from "@/components/BaseTab/BaseTabItem.vue";

import {ref,computed} from "vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import PreviewCard from "@/components/previewCard/PreviewCard.vue";

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
const appendToGraphic=()=>{
  const data={
    title:createGraphic.value.title,
    value:createGraphic.value.value,
  }
  dataGraphic.value.push(data);
  clearGraphicForm();
}
const clearGraphicForm=()=>{
  createGraphic.value.title="";
  createGraphic.value.value="";

}
const val=ref("");
</script>

<template>
  <div class="graph-editor">
    <div class="graph-editor__tabs">
      <span>Табы типо</span>
      <base-tab-wrapper :tabs="tabs" :selected-tab="selectedTab" @change-tab="changeTab">
        <base-tab-item v-if="selectedTab==='Create'">
            <h3 class="tab-item__name">
                Создание графиков
            </h3>
            <div class="tab-item__preview" v-show="dataGraphic.length>0" >
              <preview-card :title="card.title" :value="card.value" v-for="card in dataGraphic" :key="card.title" />
            </div>
            <div class="tab-item-body">
              <form @submit.prevent action="" class="tab-item-form">
                <base-input v-model="createGraphic.title">
                  Название
                </base-input>
                <base-input v-model="createGraphic.value">
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
    </div>
    <div class="graph-editor__draw">
      <span>авыпывапыв</span>
    </div>
  </div>

</template>

<style lang="scss" scoped>

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
  }
</style>
