<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form-fields">
      <slot name="form-field"></slot>
    </div>
    <div class="form-group">
      <span class="form-group__label">Действия</span>
      <base-button :classes="['button-green']" type="submit" >Добавить</base-button>
      <slot name="form-button"></slot>
    </div>
  </form>
</template>

<script setup>
  const props=defineProps({
    handleSubmit:{
      type:Function,
      default:()=>null,
      required:true,
    }
  })

</script>

<style lang="scss" scoped>
  .form{
    &-group{
      position: relative;
      margin-top: 10px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      padding: 20px 10px;
      border: 1px solid #2d69e8;
      border-radius: 6px;
      &__label{
        position: absolute;
        top: -15px;
        background-color: white;
        color:#2d69e8;
        padding: 3px 5px;
        left: 7px;
      }
    }
  }
</style>