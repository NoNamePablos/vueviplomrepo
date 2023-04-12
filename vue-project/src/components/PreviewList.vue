<template>
  <div class="preview-list">
    <slot></slot>
  </div>
</template>

<script setup>

</script>

<style lang="scss" >
.preview-list{
  margin:15px 0;
  max-height: 350px;
  overflow-y: auto;
  height: auto;
  overflow-x: hidden;
  padding: 0 10px;
  &>*+*{
    margin-top: 15px;
  }
  &::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: var(--color-accent-3);

  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: var(--color-accent-2);
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-accent-1);
  }
}
</style>