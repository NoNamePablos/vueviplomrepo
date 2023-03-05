<template>
  <vue-echarts class="chart" :option="optionGraph" />
</template>
<script setup>
  import {VueEcharts} from "@/components/vue-echarts/index";
  import {useCharts} from "@/hooks/useCharts";
  import {useGraph} from "@/hooks/useGraph";
  import {computed} from "vue";
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
    }
  })
  const {optionChart}=useCharts(props)
  const {optionGraph}=useGraph(props);


</script>

<style lang="scss" scoped>
    .chart{
      width: 500px;
      height: 500px;
    }
</style>