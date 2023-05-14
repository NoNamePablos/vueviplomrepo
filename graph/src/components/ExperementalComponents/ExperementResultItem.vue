<template>
  <div :class="['experement-result-item',{'experement-result-item--winner':winner}]" >
    <div class="experement-result-item__star">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
    </div>
    <div class="experement-result-item__title">
      {{block?.title}}
    </div>
    <div class="experement-result-item__stats">
      <div class="stat-item">
        avg: {{block?.statistics?.average}}
      </div>
    </div>
<!--    <progress-bar :count="percent" />-->
  </div>
</template>

<script setup>
import ProgressBar from "@/components/ProgressBar/ProgressBar.vue";
import {computed} from "vue";

const props=defineProps({
  block:{
    type:Object,
    required:true,
  },
  percent:{
    type:Number,
    required:false,
  },
  winner:{
    type:Boolean,
    required:false,
  }
})

/*const isWinner=computed(()=>)*/

</script>

<style lang="scss" scoped>
    .experement-result-item{
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding:10px;
      border-radius: 6px;
      border:2px solid transparent;
      position: relative;
      &__star{
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px 10px;
        border-bottom-left-radius: 6px;
        height: auto;
        display: none;
        background: #2d69e8;
        color: white;
        & svg{
          height: 12px;
          width: 12px;
          flex: 0 0 12px;
        }
      }
      &__title{
        font-size: 16px;
        line-height: 1.5;
      }
      &--winner{
        border: 2px solid #2d69e8;
        & .experement-result-item__star{
          display: flex;
        }
      }
    }
</style>