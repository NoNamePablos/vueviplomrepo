<template>
  <div class="preview-card">
    <div class="preview-card__body">
      <div class="preview-card__title">{{ title }}</div>
      <div class="preview-card__значение">{{ value }}</div>
    </div>
    <div class="preview-card__controls">
        <base-button :classes="['button-green']">Р</base-button>
        <base-button :classes="['button-red']">X</base-button>
    </div>
  </div>
</template>

<script setup>
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
//todo Привести карточки в порядок (Красивый визуап)
 // todo Сделать генератор JSON 1 версию
</script>

<style lang="scss" scoped>
  .preview-card{
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: space-between;
    &__body{

    }
    &__controls{
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
</style>