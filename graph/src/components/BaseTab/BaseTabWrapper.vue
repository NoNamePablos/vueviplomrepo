<template>
    <div :class="['tab',{'tab-horizontal':isHorizontal}]">
      <div class="tab-nav">
        <button v-for="tab in tabs"  :class="['tab-nav__item',{'selected':tab.name===selectedTab},{'is-blocked':tab?.isBlocked}]" :key="tab.name" @click="changeTab(tab.name)">{{tab.name}}</button>
      </div>
      <div class="tab-content">
        <slot></slot>
      </div>
    </div>
</template>

<script setup>
    const emits=defineEmits(['changeTab'])
    const changeTab=(tabName)=>{
      emits('changeTab',tabName);
    };
    const props=defineProps({
      tabs:{
        type:Array,
        required:true,
      },
      selectedTab:{
        type:String,
        required:false,
      },
      isHorizontal:{
        type:Boolean,
        required:false,
      }
    })

</script>

<style lang="scss" scoped>
.is-blocked{
  pointer-events: none;
  cursor: not-allowed !important;
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
    .tab{
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 10px;
      &-nav{
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        border-right: 1px solid;
        &__item{
          position: relative;
          width: 60px;
          height: 60px;
          padding: 3px;
          background-color: white;
          border:transparent;
          color:#181818;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          cursor: pointer;
          &:hover{
            background-color: #5181b4;
            color:#fff;
            transition: all 0.3s ease-in;
          }
          &:focus,&:focus-visible{
            background-color: #38597c;
            color:#fff;
          }
          &.selected{
            background-color: #5181b4;
            color:#fff;
            transition: all 0.3s ease-in;
          }
        }
      }
      &-content{
        padding: 10px 5px;
        flex-grow: 1;
      }
    }
    .tab-horizontal{
      grid-template-columns:1fr;
      & .tab-nav{
        flex-direction: row;
        border-right: none;
        &__item{
          width: auto;
        }
      }
    }
</style>