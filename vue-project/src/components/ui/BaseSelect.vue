<template>
  <div class="select">
      <div @click="isVisible=!isVisible">{{baseValue}}</div>
      <div class="select-body" v-show="isVisible">
        <div class="select-item" v-for="option in options" @click="selected(option)">
          {{option?.title}}
        </div>
      </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";

  const props=defineProps({
    options:{
      type:Array,
      required:true,
    },
    select:{
      type:Object,
      required:false,
    }

  })
  const baseValue=ref(props.select?.title);
  computed(()=>baseValue.value)
  const emits=defineEmits(['selectedItem'])
  const selected=(option)=>{
    emits('selectedItem',option);
  }
  const isVisible=ref(false);

</script>

<style lang="scss" scoped>
  .select{
    display: flex;
    flex-direction: column;
    border:1px solid black;
  }
  .select-body{
    display: grid;
    grid-template-columns: 1fr;
  }
  .select-item{
    &:hover{
      background-color: #f3f3f3;
    }
  }
</style>