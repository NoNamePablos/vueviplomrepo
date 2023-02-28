<template>
  <div class="input">
    <h3  class="input-title"><slot></slot></h3>
    <label >
      <input :type="type" class="" :value="modelValue"   @input="$emit('update:modelValue', $event.target.value)">
    </label>
  </div>

</template>

<script setup>
import {ref,defineEmits,defineProps} from 'vue';
const inputValue=ref('');
const emit=defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: { type: String, required: true },
  type:{
    type:String,
    required:false,
    default:'text'
  }
})
</script>

<style lang="scss" scoped>
.input {
  &-title{
    font-size: 30px;
    line-height: 36px;
    font-weight: 500;
    color: #181818;
    margin-bottom: 5px;
  }
  & input{
    outline: none;
    appearance: none;
    border-radius: 6px;
    width: 100%;
    padding: 5px 15px;
    font-size: 24px;
    line-height: 34px;
  }
}
</style>