<template>
  <label :class="['input-clickable',{'is-locked':isLocked}]"  >
    <input type="radio" :name="name" :disabled="isLocked"  :checked="selected" :value="title" @change="changeValue(title)" class="input-clickable-input hidden">
    <div class="chart">
      <span class="chart-icon" v-if="withIcon">
<!--       title -->
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
  },
  isLocked:{
    type:Boolean,
    required:false,
    default:false,
  },
  withIcon:{
    type:Boolean,
    required:false,
    default:true,
  }
})
</script>

<style lang="scss" >

.input-clickable{
  cursor: pointer;
  & img{
    width: 20px;
  }
  &.is-locked{
    &:hover{
      cursor: not-allowed !important;
    }
    & .input-clickable-input{
      &:not(:checked)~.chart{
        &:after{
          position: absolute;
          content: "";
          background: #f3f3f3;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0.3;
          border-radius: 8px;
        }
      }
    }

  }
  &-input{
    &:checked~.chart{
      border-radius: 8px;
      border: 1px solid #5470c6;
      color:#5470c6;

      & .chart-name{
        color: inherit;
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
  display: flex;
  align-items: center;
  position: relative;
  border:1px solid rgba(1,1,1,0);
  &>*+*{
    margin-left: 10px;
  }
  &-name{
    display: inline-block;
    position: relative;
    vertical-align: middle;
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