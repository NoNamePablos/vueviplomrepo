<template>
  <div class="v-select" >
    <div class="v-select-group">
      <base-button :classes="['is-full','button-active']" @click.prevent="open">
        {{buttonLabel}}
      </base-button>
      <span v-if="error" class="error">{{ error }}</span>
    </div>
    <div class="v-select-container" v-show="isOpened">
      <div class="option-container">
        <div class="search-container">
          <base-input v-model="searchInput" class="search-input" :is-required="false"  label="Начните вводить..."/>
          <base-button class="clear-button button-active" @click="clearInput">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </base-button>
        </div>
      </div>
      <ul class="v-select-list"     >
        <li :class="['v-select-list__item',{'active':config.activeId===listItem.localId}]" v-if="searchAndLoadList.length!==0" @click="selectedItem(listItem,idx)"   v-for="(listItem,idx) in searchAndLoadList">{{listItem?.name}}</li>
        <li class="v-select-list__item " v-else>Пусто(</li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
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
      default: "Выбрать"
    },
    validation:{
      type:Function,
      required:false,
      default:()=>null,
    }
  })

const buttonLabel=computed(()=>{
  return props.selected!==""?props.selected:"Выбрать";
})
const lastSelected=ref({});
const errors=ref({});
const error=computed(()=>props.validation(props.selected));
const searchInput=ref("");
const config=ref({
  globalModel: {},
  selectedList:[],
  activeId:-1
})

const searchAndLoadList=computed(()=>{
  return config.value.selectedList.filter((item)=>item?.name.toLowerCase().includes(searchInput.value.toLowerCase()))
})


  const diselectAll=()=>{
        config.value.globalModel= {};
  }
  const selectedItem=(option,id)=>{
      diselectAll();
      lastSelected.value=option;
      config.value.globalModel=option;
      config.value.activeId=option?.localId;
      emits('v-selected',option);
      diselectAll();

  }
  const clearInput=()=>{
    searchInput.value="";
  }
  const isOpened=ref(false);
  const open=()=>isOpened.value=!isOpened.value;
  const close=()=>{
    isOpened.value=false;
  }
  const externalClick=(event)=> {
    if (isOpened.value && !event.target.closest('.v-select')) {
      close();
    }
  }
  function resetSelectedIndex(){
    config.value.activeId=-1;
  }
  defineExpose({
    resetSelectedIndex
  });
  onMounted(()=>{
    config.value.selectedList=props.data.map((item,idx)=>{
      item.localId=idx;
      return item;
    });
    document.addEventListener('click',externalClick)
  })
    onBeforeUnmount(()=>{
      document.removeEventListener('click',externalClick)
    })

</script>

<style lang="scss" scoped>
button.is-full{
  width: 100%;
  transition: all 0.3s cubic-bezier(.26,.88,.82,.19);

}
button.color-lightblue{
  background-color: #2d69e8;
  color: white;
  transition: all 0.3s cubic-bezier(.26,.88,.82,.19);
  &:hover{
    background-color: #0d3383;
  }
  &:focus,&:focus-visible{
    background-color: #0d3383;
    -webkit-box-shadow: inset 0 0 0 1px #0d3383;
    box-shadow: inset 0 0 0 2px #0d3383;
  }
}
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
.search-input{
  width: calc(100% - 48px);
}
.clear-button{
  box-sizing: inherit;
  position: absolute;
  cursor: pointer;
  right: 6px;
  top: 0;
  height: 47px;
  width: 46px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 5px;
  & svg{
    width: 100%;
    height: 100%;

  }
}

.v-select{
  position: relative;
  & .option-container{
    padding: 8px 8px 0 8px;
  }
  & .search-container{
    width: 100%;
    height: 46px;
    position: relative;
  }
  &-container{
    background-color: #fff;
    position: absolute;
    z-index: 999;
    top: 40px;
    border: solid lightgrey;
    border-width: 1px 1px 1px 1px;
    border-radius: 4px;
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    min-width: 278px;
    width: 100%;
    margin-top: 10px;
  }
  &-error{
    color: #181818;
  }
  &-list{
    padding: 0;
    padding-top: 20px;
    padding-bottom: 10px;
    &__item{
      list-style: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
      padding: 0 10px;
      &:hover{
        background-color: #2d69e8;
        color: #fff;
        transition: all 0.3s ease-in;
      }
      &.active{
        background-color: #2d69e8;
        color: #fff;
        transition: all 0.3s ease-in;
        &:hover{
          background-color: #0d3383;
          -webkit-box-shadow: inset 0 0 0 1px #0d3383;
          box-shadow: inset 0 0 0 2px #0d3383;
        }
      }
    }
  }
  &-item{
    list-style: none;
    padding: 0;
    margin: 0;

  }
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
.error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}
</style>