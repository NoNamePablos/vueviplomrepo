<template>
  <div class="tab-item">
    <slot></slot>
  </div>
</template>

<script setup>

</script>

<style lang="scss" >
    .tab-item{
      &__name{
          margin: 0;
       }
    }
    .tab-item-form__controls{
      margin-top: 20px;
      display: flex;
      gap: 20px;
    }
</style>