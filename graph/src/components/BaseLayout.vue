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
      max-width: 1600px;
      margin: 0 auto;
    }

</style>