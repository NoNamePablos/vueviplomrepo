<template>
  <label class="input-clickable">
    <input type="radio" :name="name"  :checked="selected" :value="title" @change="changeValue(title)" class="input-clickable-input hidden">
    <div class="chart">
      <span class="chart-icon">
          <slot></slot>
      </span>
      <span class="chart-name">{{ title }}</span>
    </div>
  </label>
</template>

<script setup>
const emit = defineEmits(['update:value'])
const changeValue=(val)=>emit('update:value',val)
const props=defineProps({
  name:{
    type:String,
    required:true,
  },
  title:{
    type:String,
    required:true,
  },
  selected:{
    type:Boolean,
    required:false,
    default:false,
  }
})
</script>

<style lang="scss" >
.input-clickable{
  &-input{
    &:checked~.chart{
      background-color: #5470c6;
      color: #fff;
      border-radius: 8px;
      & .chart-name{
        color: inherit;
      }
      & .chart-icon *{
        fill: #fff;
      }
    }
  }
  & .hidden{
    appearance: none;
    opacity: 0;
    width: 1px;
    height: 1px;
    position: fixed;
    right: -9999px;
    z-index: -100;
  }
}
.chart{
  height: 45px;
  padding: 10px;
  display: block;
  &-name{
    display: inline-block;
    position: relative;
    vertical-align: middle;
    margin-left: 10px;
    color: #6e7079;
  }
  &-icon{
    content: '';
    width: 20px;
    display: inline-block;
    border-radius: 50%;
    vertical-align: middle;
    & svg{
      width: 100% !important;
      height: auto !important;
    }

  }

}

</style>