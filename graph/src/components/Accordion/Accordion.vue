<template>
  <div class="accordion">
    <div class="accordion__header" @click="handleClick">
      <slot name="button"></slot>
    </div>
    <div class="accordion__content" :class="classObject" v-show="isVisible">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
const classObject = computed(() => ({active:isVisible.value,
}))

const isVisible=ref(false);
  const handleClick=()=>{
    isVisible.value=!isVisible.value;
  }
</script>

<style lang="scss" scoped>
  .accordion{
    margin-top: 10px;
    &__content{
      padding: 10px 0;
      &.active{
        display: block;
      }
      display: none;
    }
  }
</style>