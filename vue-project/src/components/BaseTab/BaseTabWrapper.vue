<template>
    <div :class="['tab',{'tab-horizontal':isHorizontal}]">
      <div class="tab-nav">
        <button v-for="tab in tabs"  :class="['tab-nav__item',{'selected':tab.name===selectedTab},{'is-blocked':tab?.isBlocked}]" :key="tab.name" @click="changeTab(tab.name)">
          <div v-html="tab.icon"></div>
          {{tab.label}}</button>
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
      grid-template-columns: 220px 1fr;
      gap: 10px;
      padding: 0 10px;
      &-nav{
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        border-right: 3px solid #f1f1f1;
        &__item{
          position: relative;
          pointer-events: all !important;
          height: 60px;
          background-color: white;
          border:transparent;
          color:#181818;
          text-align: center;
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: left;
          gap: 10px;
          font-size: 18px;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(.26,.88,.82,.19);
          padding: 0 10px;
          white-space: nowrap;
          & svg {
            width: 20px;
            height: 20px;
          }
          &:hover,&:focus,&:focus-visible,&.selected{
            font-weight: 600;
            transition: all 0.3s cubic-bezier(.26,.88,.82,.19);
            &::before{
              content: "";
              width: 2px;
              height: 100%;
              display: block;
              background: #2d69e8;
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
            }
          }
          &:hover{
            background-color: white;
            color:#2d69e8;
            transition: all 0.3s cubic-bezier(.26,.88,.82,.19);
          }
          &:focus,&:focus-visible{
            background-color: white;
            color:#2d69e8;
          }
          &.selected{
            background-color: white;
            color:#2d69e8;
            transition: all 0.3s cubic-bezier(.26,.88,.82,.19);
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