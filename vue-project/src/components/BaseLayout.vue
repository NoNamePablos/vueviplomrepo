<template>
  <div :class="['layout',addClass]">
      <slot></slot>
  </div>
</template>

<script setup>
  const props=defineProps({
    addClass:{
      type:Array,
      required:false,
    }
  })
</script>

<style lang="scss">
      .layout{
        width: 100%;
      }
</style>