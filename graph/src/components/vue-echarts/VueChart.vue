<template>
  <div >
    <vue-echarts   class="chart chart-chart"   @setOption="optionUpdate"   ref="chartChart"  :option="optionChart" />
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
    optionChart,chartChart,optionUpdate
  }=useCharts(props);




</script>

<style lang="scss" scoped>
    .chart{
      width: 500px;
      height: 500px;
    }
</style>