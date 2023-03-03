<template>
  <div class="preview-card">
    <div class="preview-card__body">
      <div class="preview-card__prop">
        <h3 class="preview-card__prop-title">Название</h3>
        <div class="preview-card__title">{{ data?.title }}</div>
      </div>

      <div class="preview-card__prop" v-if="(data?.x==null||data.x=='')">
        <h3 class="preview-card__prop-title">Значение</h3>
        <div class="preview-card__title">{{ data?.value }}</div>
      </div>
      <div v-else>
        <div class="preview-card__prop" >
          <h3 class="preview-card__prop-title">x</h3>
          <div class="preview-card__title">{{ data?.x }}</div>
        </div>
        <div class="preview-card__prop" >
          <h3 class="preview-card__prop-title">y</h3>
          <div class="preview-card__title">{{ data?.y }}</div>
        </div>
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
   data:{
     type:Object,
     required:false,
   }

 })
 const changeValue=()=>{

   emits('changeData',props.data);
 }
 const deleteValue=()=>{
   emits('deleteData',props.data);
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