<template>
  <div :class="['tab-item',{'tab-hidden':!showed}]">
    <slot></slot>
  </div>
</template>

<script setup>
 const props=defineProps({
   showed:{
     type:Boolean,
     required:false,
     default:false,
   }
 })
</script>

<style lang="scss" >
    .tab-item{
      &__name{
          margin: 0;
       }
    }
    .tab-hidden{
      display: none;
    }
    .tab-item-form__controls{
      margin-top: 20px;
      gap: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
</style>