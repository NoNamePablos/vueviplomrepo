<template>
  <div :class="['experement-result-item',{'experement-result-item--winner':winner}]" >
    <div class="experement-result-item__title">
      {{title}}
    </div>
    <progress-bar :count="percent" />
  </div>
</template>

<script setup>
import ProgressBar from "@/components/ProgressBar/ProgressBar.vue";

const props=defineProps({
  title:{
    type:String,
    required:true,
  },
  percent:{
    type:Number,
    required:false,
    default:0,
  },
  winner:{
    type:Boolean,
    required:false,
  }
})
</script>

<style lang="scss" scoped>
    .experement-result-item{
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding:15px;
      border-radius: 6px;
      &--winner{
        border:1px solid red;
      }
    }
</style>