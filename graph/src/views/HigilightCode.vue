<script setup>

import {ref, computed, toRaw, onMounted} from "vue";
import PreviewCard from "@/components/previewCard/PreviewCard.vue";

import Header from "@/components/Header.vue";
import PreviewList from "@/components/PreviewList.vue";
import BaseLayout from "@/components/BaseLayout.vue";

import {languages} from "@/utils/higilight.routes";
import {useHighlight} from "@/hooks/useHighlight";
import VueSelect from "@/components/ui/VueSelect.vue";
const {highlightItem,selectedLanguage,hightlighting,setLanguage} =useHighlight();
const saveGraphEditor=()=>{
  isSaveGraph.value=true;
}
const hlCode=ref("");
const coloredCode=ref("");
const isSaveGraph=ref(false);
const selectSelectItem=ref({
  name:'default',
  title:'select'
})
computed(()=>{
  return selectSelectItem;
})
const onChangeLanguage=(value)=> {
  console.log("value: ",value);
  selectedLanguage.value =value;
  console.log("item: ",selectedLanguage.value);
}
const appendHighlighting=()=>{
  console.log("13")
  setLanguage(selectedLanguage.value);
  coloredCode.value=hightlighting(hlCode.value);
}


onMounted(()=>{
  selectedLanguage.value=languages[0].code;
})
</script>

<template>
  <BaseLayout>
    <div class="graph-editor">
      <div class="graph-editor__tabs" v-if="!isSaveGraph">
        <h3 class="tab-item__name">
          Подсветка кода
        </h3>
        <div class="tab-item__preview" v-show="" >
          <preview-list>
<!--            <preview-card  @change-data="editChartItem" @delete-data="deleteChartItem"  :data="card"  v-for="card in chartNodeList" :key="card.title" />-->
          </preview-list>
        </div>
        <div class="tab-item-body">
          <form @submit.prevent action="" class="tab-item-form">
            <div class="row">
              <vue-select @v-selected="onChangeLanguage"  :selected="selectedLanguage?.name"  :data="languages"></vue-select>
              <div class="textarea">
                <textarea v-model="hlCode"></textarea>
              </div>
              <div class="tab-item-form__controls">
                <base-button :classes="['button-green']" @click="appendHighlighting">Добавить</base-button>
                <base-button :classes="['button-red']" @click="">Очистить</base-button>
              </div>
            </div>
          </form>
        </div>
        <!--      <div class="graph-editor__controls">
                <base-button :classes="['button-green']" @click="saveGraphEditor">Сохранить</base-button>
                <base-button :classes="['button-red']" @click="">Отменить</base-button>
              </div>-->
      </div>
      <div class="graph-editor__draw" v-if="coloredCode">
        <div class="code-highlight">
          <pre><code v-html="coloredCode"></code></pre>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<style lang="scss" scoped>
.textarea{
  max-height: 150px;
  height: 150px;
  textarea{
    font-family: Graphik LC Web,-apple-system,system-ui,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,Helvetica,Arial;
    font-size: 15px;
    line-height: 1.5;
    min-width: 140px;
    min-height: 44px;
    height: 100%;
    padding: 10px 12px;
    border-radius: 6px;
    display: block;
    width: 100%;
    border: 1px solid #c5d0db;
    margin: 0;
    background: #fff;
    -webkit-box-shadow: inset 0 0 0 1px transparent;
    box-shadow: inset 0 0 0 1px transparent;
    color: #00244d;
    overflow-x: hidden;
    overflow-y: auto;
    resize: none;
    text-overflow: ellipsis;
    -webkit-transition: background-color .1s ease-in-out,border-color .1s ease-in-out,-webkit-box-shadow .1s ease-in-out;
    transition: background-color .1s ease-in-out,border-color .1s ease-in-out,-webkit-box-shadow .1s ease-in-out;
    transition: background-color .1s ease-in-out,border-color .1s ease-in-out,box-shadow .1s ease-in-out;
    transition: background-color .1s ease-in-out,border-color .1s ease-in-out,box-shadow .1s ease-in-out,-webkit-box-shadow .1s ease-in-out;
    outline: none;
    &:hover{
      z-index: 1;
      background-color: #fff;
      border-color: #0073f7;
    }
    &:focus,&:focus-visible{
      -webkit-box-shadow: inset 0 0 0 1px #0073f7;
      box-shadow: inset 0 0 0 1px #0073f7;
    }
    &::-webkit-scrollbar {
      width: 7px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: var(--color-accent-3);
      border-radius: 12px;
      cursor: pointer;


    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: var(--color-accent-2);
      border-radius: 12px;
      cursor: pointer;

    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #0073f7;
      cursor: pointer;

    }
  }

}

.code-highlight{
  background: white;
  border: 1px solid #ddd;
  padding: 15px 10px;
  border-radius: 6px;
}



.radio-group{
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.row{
  &>*+*{
    margin-top: 20px;
  }
}
.tab-item{
  &-form{
    &__controls{

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
</style>
