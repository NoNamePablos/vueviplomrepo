<template>
  <div class="input">
    <h3  class="input-title"><slot></slot></h3>
    <label >
      <input :type="type" :class="['input-base',{'input-error':error}]" :disabled="disabled"   :required="isRequired" :value="disabled?defaultValue:modelValue" @blur="handleBlur"   @input="$emit('update:modelValue', $event.target.value)">
    </label>
    <span v-if="error" class="error">{{ error }}</span>
  </div>

</template>

<script setup>
import {ref, defineEmits, defineProps, onMounted, watch, computed} from 'vue';

const emit=defineEmits(['update:modelValue','disabled-emit'])
const props = defineProps({
  modelValue: { type: [String,Number], required: true },
  type:{
    type:String,
    required:false,
    default:'text'
  },
  defaultValue:{
    type:String,
    required:false,
    default:'test'
  },
  disabled:{
    type:Boolean,
    required:false,
    default:false,
  },
  isRequired:{
    type:Boolean,
    required:false,
  },
  validation:{
    type:Function,
    default:()=>null,
  }
})
const errors=ref({});
const error=computed(()=>props.validation(props.modelValue));

const handleBlur=()=>{
  const error=props.validation(props.modelValue);
  errors.value=error;
}
onMounted(()=>{
  if(props?.disabled!=null&&props.disabled){
    emit('disabled-emit',props.defaultValue);
  }
})
</script>

<style lang="scss" scoped>
.input {
  padding-bottom: 20px;
  position: relative;

  &-title{
    font-size: 30px;
    line-height: 36px;
    font-weight: 500;
    color: #181818;
    margin-bottom: 5px;
  }
  &-base{
    outline: none;
    appearance: none;
    border-radius: 6px;
    width: 100%;
    padding: 5px 15px;
    font-size: 24px;
    line-height: 34px;
    background: #ffffff;
    border: 1px solid #2d69e8;
    &:focus,&:focus-visible{
      -webkit-box-shadow: inset 0 0 0 2px #0073f7;
      box-shadow: inset 0 0 0 2px #0073f7;
    }

  }
  &-error{
    border: 1px solid #dc3545;
    &:focus,&:focus-visible{
      -webkit-box-shadow: inset 0 0 0 2px #dc3545;
      box-shadow: inset 0 0 0 2px #dc3545;
    }

  }
  .error {
    position: absolute;
    bottom: 0;
    left: 0;
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }
}
</style>