<template>
  <vue-echarts class="chart" :option="typeChart!=='graph'?optionChart:optionGraph" />
</template>
<script setup>
  import {VueEcharts} from "@/components/vue-echarts/index";
  import {useCharts} from "@/hooks/useCharts";
  import {useGraph} from "@/hooks/useGraph";
  const {optionChart,typeChart}=useCharts(props)
  const {optionGraph}=useGraph(props);

  const props=defineProps({
    optionsData:{
      type:Array,
      required:true,
    },
    links:{
      type:Array,
      required:false,
    }
  })
</script>

<style lang="scss" scoped>
    .chart{
      width: 500px;
      height: 500px;
    }
</style>