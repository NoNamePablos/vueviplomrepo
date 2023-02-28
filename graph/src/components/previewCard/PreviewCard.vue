<template>
  <div class="preview-card">
    <div class="preview-card__body">
      <div class="preview-card__prop">
        <h3 class="preview-card__prop-title">Название</h3>
        <div class="preview-card__title">{{ title }}</div>
      </div>
      <div class="preview-card__prop">
        <h3 class="preview-card__prop-title">Значение</h3>
        <div class="preview-card__title">{{ value }}</div>
      </div>
    </div>
    <div class="preview-card__controls">
        <base-button :classes="['button-green']" @click="changeValue">Р</base-button>
        <base-button :classes="['button-red']" @click="deleteValue">X</base-button>
    </div>
  </div>
</template>

<script setup>
const emits=defineEmits(['changeData','deleteData'])
 const props=defineProps({
   title:{
     type:String,
     required:true,
   },
   value:{
     type:String,
     required:true,
   }

 })
 const changeValue=()=>{
  const data={title:props.title,value:props.value}
   emits('changeData',data);
 }
 const deleteValue=()=>{
   const data={title:props.title,value:props.value}
   emits('deleteData',data);
 }

//todo Привести карточки в порядок (Красивый визуап)
 // todo Сделать генератор JSON 1 версию
</script>

<style lang="scss" scoped>
  .preview-card{
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: space-between;
    background-color: #f3f3f3;
    padding: 10px 15px;
    border-radius: 12px;
    &__body{

    }
    &__prop{
      &-title{
        font-weight: 700;
      }
    }
    &__controls{
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
</style>