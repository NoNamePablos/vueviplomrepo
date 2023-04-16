<template>
  <div :class="['n-container',{'n-vertical':horizontal}]">
    <div class="n-controls">
      <slot name="n-button"></slot>
    </div>
    <div class="n-list">
      <slot name="n-list"></slot>
    </div>
  </div>
</template>

<script setup>
  const props=defineProps({
    horizontal:{
      type:Boolean,
      required:false,
      default:false,
    }
  })
</script>

<style lang="scss" scoped>
  .n-container{
    display: flex;
    flex-direction: column;
    gap: 15px;
    &.n-vertical{
      flex-direction: row;
      & .n-controls{
        flex-direction: column;
      }
    }
    & .n-controls{
      display: flex;
      gap: 10px;
    }
  }
</style>