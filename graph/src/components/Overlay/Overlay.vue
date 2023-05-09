<template>
  <div class="overlay" v-if="isVisible" >
    <div class="overlay-container">
      <div class="overlay-result">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props=defineProps({
    isVisible:{
      type:Boolean,
      required:true,
    }
  })
</script>

<style lang="scss" scoped>
.overlay{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle,rgba(0,0,0,.45) 0,rgba(87,110,136,0) 100%);
  z-index: 100;
  &-result{
    max-width: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}
</style>