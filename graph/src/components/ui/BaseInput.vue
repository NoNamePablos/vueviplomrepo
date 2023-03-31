<template>
  <div :class="['input',{'input-textarea':isTextarea}]">
    <h3  class="input-title"><slot></slot></h3>
    <label v-if="!isTextarea" >
      <input :type="type" :class="['input-base',{'input-error':error}]" :disabled="disabled"    :required="isRequired"  :placeholder="label"  :value="disabled?defaultValue:modelValue" @blur="handleBlur"   @input="$emit('update:modelValue', $event.target.value)">
    </label>
    <label v-else >
      <textarea :class="['textarea',{'input-error':error}]" :disabled="disabled"    :required="isRequired" :value="modelValue" :placeholder="label" @blur="handleBlur" @input="$emit('update:modelValue', $event.target.value)"></textarea>
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
  isTextarea:{
    type:Boolean,
    required:false,
    default:false,
  },
  label:{
    type:String,
    required:false,
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
  &-textarea{

    textarea{
      max-height: 150px;
      height: 150px;
      font-family: Graphik LC Web,-apple-system,system-ui,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,BlinkMacSystemFont,Helvetica,Arial;
      font-size: 15px;
      line-height: 1.5;
      min-width: 140px;
      min-height: 44px;
      padding: 10px 12px;
      border-radius: 6px;
      display: block;
      width: 100%;
      border: 1px solid #c5d0db;
      margin: 0;
      background: #fff;
      -webkit-box-shadow: inset 0 0 0 1px transparent;
      box-shadow: inset 0 0 0 1px transparent;
      color: #00244d;
      overflow-x: hidden;
      overflow-y: auto;
      resize: none;
      text-overflow: ellipsis;
      -webkit-transition: background-color .1s ease-in-out,border-color .1s ease-in-out,-webkit-box-shadow .1s ease-in-out;
      transition: background-color .1s ease-in-out,border-color .1s ease-in-out,-webkit-box-shadow .1s ease-in-out;
      transition: background-color .1s ease-in-out,border-color .1s ease-in-out,box-shadow .1s ease-in-out;
      transition: background-color .1s ease-in-out,border-color .1s ease-in-out,box-shadow .1s ease-in-out,-webkit-box-shadow .1s ease-in-out;
      outline: none;
      &:hover{
        z-index: 1;
        background-color: #fff;
        border-color: #0073f7;
      }
      &:focus,&:focus-visible{
        -webkit-box-shadow: inset 0 0 0 1px #0073f7;
        box-shadow: inset 0 0 0 1px #0073f7;
      }
      &::-webkit-scrollbar {
        width: 7px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: var(--color-accent-3);
        border-radius: 12px;
        cursor: pointer;


      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: var(--color-accent-2);
        border-radius: 12px;
        cursor: pointer;

      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: #0073f7;
        cursor: pointer;

      }
    }
  }
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
    &::placeholder,&:placeholder-shown{
      color:#c7c7c7;
    }
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