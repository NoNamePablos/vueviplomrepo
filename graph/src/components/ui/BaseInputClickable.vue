<template>
  <label class="input-clickable">
    <input type="radio" :name="name" class="input-clickable-input hidden">
    <div class="chart">
      <span class="chart-icon">
          <slot name="icon"></slot>
      </span>
      <span class="chart-name">{{ title }}</span>
    </div>
  </label>
</template>

<script setup>
const props=defineProps({
  name:{
    type:String,
    required:true,
  },
  title:{
    type:String,
    required:true,
  }
})
</script>

<style lang="scss" scoped>
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