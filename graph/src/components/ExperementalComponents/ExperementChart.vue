<template>
  <div class="experement-chart">
    <BaseInputClickable v-for="radio in radiogroup"  :is-locked="isLockedRadio" :selected="radio.selected"  v-model:value="chartNode.type" :title="radio.title" :name="radio.radiotype">
      <div v-html="radio.component"></div>
    </BaseInputClickable>
    <div class="csss" >
      <div v-for="code in data">
        {{code.title}}
      </div>
    </div>

<!--    <vue-chart   :type="chartType.toLowerCase()"   :options-data="chartNodeList"   />-->
  </div>
</template>

<script setup>
import {radiogroup} from "@/utils/radiogroup.routes";
import VueChart from "@/components/vue-echarts/VueChart.vue";
import {useChartController} from "@/hooks/useChartController";
import {computed, shallowRef, watch} from "vue";
const {chartNode,chartType,isLockedRadio,tempData,chartNodeList,clearChartItem,appendChartItem,editChartItem,deleteChartItem,isChart}=useChartController();

const props=defineProps({
  data:{
    type:Array,
    required:false,
  },
  sortedData:{
    type:Array,
    required:false,
  }
})

const array=shallowRef(props.data);

const graphComp=computed({
  get(){

  },
  set(_val){

  }
})
watch(()=>props.data,(_ntf)=>{
  _ntf.map((item)=>{
    /*chartNode.value.title=item.result*/
    console.log("item: ",item);
    item.result.map((res,id)=>{
      console.log("dd: ",{title:id,value:res.counter})
    })
  })
},{deep:true})
</script>

<style lang="scss" scoped>
  .experement-chart{

  }
</style>