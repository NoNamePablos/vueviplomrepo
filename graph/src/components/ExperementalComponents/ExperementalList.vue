<template>
  <div  class="experemental-list">
    <experement-result-item :block="block" v-for="block in sortedArray" :looser="block.id===results.looserId" :winner="block.id===results.winnerId" :percent="block.statistics.percent"/>
    <experement-chart :data="blocks" />
  </div>
</template>

<script setup>
import ExperementResultItem from "@/components/ExperementalComponents/ExperementResultItem.vue";
import {computed, onBeforeMount, onBeforeUpdate, onMounted, ref, shallowRef, watch} from "vue";
import {converterGarphLinks} from "@/components/vue-echarts/chart.helper";
import ExperementChart from "@/components/ExperementalComponents/ExperementChart.vue";

const props=defineProps({
  blocks:{
    type:Array,
    required:true,
  },
  resultBlock:{
    type:Object,
    required: true,
  }
})
const results=shallowRef(props.resultBlock);
const reformateArray=shallowRef(props.blocks);

watch(() => props.resultBlock, (newValue, oldValue) => {
  results.value=newValue;
},{deep:true})

watch(() => props.blocks, (newValue, oldValue) => {
  reformateArray.value=newValue;

},{deep:true})


const sortedArray=computed(()=>{
    return [...props.blocks].sort((a, b) => {
      if (a.id === results.value.winnerId) {
        return -1; // a будет в начале массива
      } else if (b.id === results.value.winnerId) {
        return 1; // b будет в начале массива
      } else {
        return 0; // a и b сохраняют свои текущие позиции
      }
    });
})

const graphData=ref([]);

onBeforeMount(()=>{

})
</script>

<style lang="scss" scoped>
.experemental-list{
  &>*+*{
    margin-top: 10px;
  }
}
</style>