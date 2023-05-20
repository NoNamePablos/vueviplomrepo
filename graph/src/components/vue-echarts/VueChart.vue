<template>
  <div >
    <vue-echarts @click="logger"  class="chart chart-chart"   ref="chartChart"  :option="optionChart" />
  </div>

</template>
<script setup>

  import {VueEcharts} from "@/components/vue-echarts/index";
  import {useCharts} from "../../hooks/useCharts";
  const props=defineProps({
    optionsData:{
      type:Array,
      required:true,
    },
    links:{
      type:Array,
      required:false,
    },
    type:{
      type:String,
      required:false,
    },
  })
  const {
    optionChart,chartChart,logger
  }=useCharts(props);




</script>

<style lang="scss" scoped >
    .chart{
      width: 500px;
      height: 500px;
      @media screen and (max-width: 600px) {
        width: 300px;
        height: 500px;
      }
    }
</style>