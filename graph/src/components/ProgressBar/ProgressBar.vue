<template>
  <div class="progress-bar">
    <div class="progress-bar-text">{{count}}%</div>
    <div class="progress-bar-upper" :style="{width:`${count}%`}"></div>
  </div>
</template>

<script setup>
  const props=defineProps({
    count:{
      type:Number,
      required:true,
    }
  })
</script>

<style lang="scss" scoped>
.progress-bar{
  width: 100%;
  background: rgb(238, 238, 238);
  position: relative;
  min-height: 3px;
  border-radius: 5px;
  overflow: hidden;
  z-index: -2;
  &-text{
    color: rgb(34, 34, 34);
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    padding-bottom: 4px;
    padding-top: 4px;
  }
  &-upper{
    background: rgb(33, 150, 243);
    width: 50%;
    height: 100%;
    transition: all 0.5s ease 0s;
    position: absolute;
    top: 0px;
    min-height: 3px;
    z-index: -1;
  }
}
</style>