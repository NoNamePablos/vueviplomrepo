<template>
  <div class="v-select" @click.prevent>
    <button @click="open">{{buttonLabel}}</button>
    <div class="v-select-container"  v-show="isOpened">
      <div class="option-container">
        <div class="search-container">
          <input type="text" class="inputFilter" v-model="searchInput" >
          <button class="clear-button" @click="clearInput">x</button>
        </div>
      </div>
      <ul class="v-select-list"     >
        <li :class="['v-select-list__item',{'active':config.activeId===listItem.localId}]" v-if="searchAndLoadList.length!==0" @click="selectedItem(listItem,idx)"   v-for="(listItem,idx) in searchAndLoadList">{{listItem?.title}}</li>
        <div class="v-select-error" v-else>Пусто(</div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
  const emits=defineEmits(['v-selected'])
  const props=defineProps({
    search: {
      type: Boolean,
      default: false,
    },
    data:{
      type:Array,
      required:true,
    },
    selected:{
      type:String,
      required: false,
      default: "Показать"
    }
  })

const buttonLabel=computed(()=>{
  return props.selected!==""?props.selected:"Показать";
})
const searchInput=ref("");
const config=ref({
  globalModel:[],
  selectedList:[],
  activeId:-1
})

const searchAndLoadList=computed(()=>{
  return config.value.selectedList.filter((item)=>item?.title.toLowerCase().includes(searchInput.value.toLowerCase()))
})


  const diselectAll=()=>{
        config.value.globalModel=[];
  }
  const selectedItem=(option,id)=>{
      diselectAll();
      config.value.globalModel.push(option);
      config.value.activeId=option?.localId;
      emits('v-selected',option);
  }
  const clearInput=()=>{
    searchInput.value="";
  }
  const isOpened=ref(false);
  const open=()=>isOpened.value=!isOpened.value;
  const close=()=>{
    isOpened.value=false;
  }
  const externalClick=(event)=>{
    if(!event.target.closest('.v-select')){
      close();
    }
  }


  onMounted(()=>{
    config.value.selectedList=props.data.map((item,idx)=>{
      item.localId=idx;
      return item;
    });
    document.addEventListener('click',externalClick,true)
  })
  onBeforeUnmount(()=>{
    document.removeEventListener('click',externalClick)
  })

</script>

<style lang="scss" scoped>
.tab-container{
  display: flex;
}
.tab-button{
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid grey;
  text-align: center;
  cursor: pointer;
  &.active{
    border-bottom-width: 2px;
    border-bottom-color: #6E7991;
    color: #6E7991;
  }

}
.clear-button{
  box-sizing: inherit;
  position: absolute;
  display: inline;
  text-align: center;
  cursor: pointer;
  border: 1px solid #ccc;
  height: 26px;
  width: 26px;
  font-size: 13px;
  border-radius: 2px;
  color: #666;
  background-color: #ffffff;
  line-height: 1.4;
  right: 0;
  top: 0;
  &:hover{
      border: 1px solid #ccc;
      color: #999;
      background-color: #f1f1f1;
  }
  &:focus{
    border: 1px solid #999;
    outline: 0;
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, .065), 0 0 5px rgba(102, 175, 233, .6);
    box-shadow: inset 0 0 1px rgba(0, 0, 0, .065), 0 0 5px rgba(102, 175, 233, .6);
  }

}

.v-select{
  position: relative;
  & .option-container{
    padding: 8px 8px 0 8px;
  }
  & .search-container{
    position: relative;
  }
  &-container{
    background-color: #fff;
    position: absolute;
    z-index: 999;
    border: solid lightgrey;
    border-width: 1px 1px 1px 1px;
    border-radius: 4px;
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    min-width: 278px;
  }
  &-error{
    color: #181818;
  }
  &-list{
    padding: 0;
    &__item{
      list-style: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
      &.active{
        background-color: #5181b4;
        color: #fff;
        transition: all 0.3s ease-in;
      }
    }
  }
  &-item{
    list-style: none;
    padding: 0;
    margin: 0;
  }
}

.inputFilter {
  border-radius: 2px;
  border: 1px solid #ccc;
  height: 26px;
  font-size: 14px;
  width: 100%;
  min-width: 320px;
  padding-left: 7px;
  padding-right: 26px;
  -webkit-box-sizing: border-box;
  /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;
  /* Firefox, other Gecko */
  box-sizing: border-box;
  /* Opera/IE 8+ */
  color: #888;
  margin: 0 0 8px 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
}
.select {
  & .checkBoxContainer {
    display: block;
    padding-top: 5px;
    overflow: hidden;
    max-height: 300px;
    min-height: 80px;
    overflow-y: auto;

  }
}
</style>