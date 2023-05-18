<template>
  <div class="experement-chart">
    <div class="experement-chart__row">
      <BaseInputClickable v-for="radio in radiogroup"  :is-locked="false" :selected="radio.selected"  v-model:value="chartNode.type" :title="radio.title" :name="radio.radiotype">
        <div v-html="radio.component"></div>
      </BaseInputClickable>
    </div>
    <vue-chart   :type="chartType.toLowerCase()"   :options-data="chartNodeList"   />
  </div>
</template>

<script setup>
import {radiogroup} from "@/utils/radiogroup.routes";
import VueChart from "@/components/vue-echarts/VueChart.vue";
import {useChartController} from "@/hooks/useChartController";
import {computed, onBeforeMount, shallowRef, watch} from "vue";
const {chartNode,chartType,isLockedRadio,tempData,chartNodeList,clearChartItem,appendChartItem,editChartItem,deleteChartItem,isChart,deleteAll}=useChartController();

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

const reInitGraphic=()=>{

  deleteAll();
  props.data.map((item)=>{
    chartNode.value.value=item.statistics.average;
    chartNode.value.title=item.title;
    console.log("chartMode: ",chartNode.value);
    appendChartItem();
  })
}
watch(()=>chartNode.value.type,(newValue,oldValue)=>{
  console.log("changed: ",newValue);
  /*chartNode.value.type=newValue;*/
  reInitGraphic();

})

onBeforeMount(()=>{
  props.data.map((item)=>{
    chartNode.value.value=item.statistics.average;
    chartNode.value.title=item.title;
    appendChartItem();
  })
})
</script>

<style lang="scss" scoped>
  .experement-chart{
    &__row{
      margin-top: 20px;
      display: flex;
      gap: 20px;
      @media screen and (max-width:1279px) {
        flex-direction: column;
      }
    }
  }
</style>