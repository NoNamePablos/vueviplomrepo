<template>
  <div class="preview-card" >
    <div class="preview-card__body" v-if="!isSelectedType">
      <div class="preview-card__prop">
        <h3 class="preview-card__prop-title">Название</h3>
        <div class="preview-card__title">{{ data?.title }}</div>
      </div>

      <div class="preview-card__prop">
        <h3 class="preview-card__prop-title">Значение</h3>
        <div class="preview-card__title">{{ data?.value }}</div>
      </div>
    </div>
    <div class="preview-card__body" v-else>

      <div class="preview-card__prop">
        <h3 class="preview-card__prop-title">От:</h3>
        <div class="preview-card__title">{{ data?.source?.name}}</div>
      </div>
      <div class="preview-card__prop">
        <h3 class="preview-card__prop-title">К:</h3>
        <div class="preview-card__title">{{ data?.target?.name }}</div>
      </div>
    </div>
    <div class="preview-card__controls">
        <base-button :classes="['button-transparent']" @click="changeValue">
         <svg @click.prevent xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
        </base-button>
        <base-button :classes="['button-transparent']" @click="deleteValue">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
          </svg>
        </base-button>
    </div>
  </div>
</template>

<script setup>

const emits=defineEmits(['changeData','deleteData'])
 const props=defineProps({
   data:{
     type:Object,
     required:false,
   },
   title:{
    type:String,
    required: false,
  },
   isSelectedType:{
     type:Boolean,
     required:false,
     default:false,
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
    transition: all 0.3s ease-in;
    &:hover{
      transition: all 0.3s ease-in;
      & .preview-card__controls{
        display: flex;
        color:#2d69e8;
      }
    }
    &__prop{
      &-title{
        font-weight: 700;
      }
    }
    &__controls{
      display: none;
      flex-direction: column;
      gap: 10px;
    }
  }
</style>