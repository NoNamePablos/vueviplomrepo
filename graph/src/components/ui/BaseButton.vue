<template>
  <button class="button" :disabled="isDisabled||false"  :class="classes">
    <slot></slot>
  </button>
</template>

<script setup>
import {defineProps} from 'vue';
const props=defineProps({
  classes: { type:Array },
  btype:{
    type:String,
    required:false,
    default:'button'
  },
  isDisabled:{
    type:Boolean,
    required:false,
    default:false
  }
})

</script>

<style lang="scss" >
button{
  appearance: none;
  outline: none;
  border:none;
}
.button{
  padding: 5px 15px;
  border-radius: 6px;
  font-size: 26px;
  line-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  white-space: nowrap;
}
.button-primary{
  color: var(--color-white);
  background-color: var(--color-grey);
}
.button-green{
  background-color: var(--color-green);
  color: var(--color-white);
}
.button-green:hover{
  background-color: var(--color-green-hover);
  color: var(--color-white-hover);
  transition: all 0.3s ease-in-out;
}
.button-red{
  background-color: var(--color-red);
  color: var(--color-white);
}
.button-red:hover{
  background-color: var(--color-red-hover);
  color: var(--color-white-hover);
  transition: all 0.3s ease-in-out;
}
.button-primary:hover{
  background-color: var(--color-grey-hover);
  color: var(--color-white-hover);
  transition: all 0.3s ease-in-out;
}


</style>