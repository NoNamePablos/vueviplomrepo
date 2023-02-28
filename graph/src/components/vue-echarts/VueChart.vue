<template>
  <vue-echarts class="chart" :option="option" />
</template>
<script setup>
  import {VueEcharts} from "@/components/vue-echarts/index";

  import { ref} from "vue";
  import {ParseOption} from "@/components/vue-echarts/chart.helper";
  const props=defineProps({
    optionsData:{
      type:Object,
      required:true,
    }
  })
  const parsedData=ParseOption(props.optionsData);
  const option=ref({
    xAxis: {
      type: 'category',
      data: parsedData.xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: parsedData.yAxis,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ],
    legend: {
      data: ['category',]
    },
  })
</script>

<style lang="scss" scoped>
    .chart{
      width: 500px;
      height: 500px;
    }
</style>