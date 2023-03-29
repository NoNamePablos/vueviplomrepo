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
      gap: 20px;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
</style>