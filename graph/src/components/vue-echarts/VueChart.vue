<template>
  <vue-echarts class="chart" :option="option" />
</template>
<script setup>
  import {VueEcharts} from "@/components/vue-echarts/index";

  import { ref} from "vue";
  import {ParseOption} from "@/components/vue-echarts/chart.helper";
  const props=defineProps({
    optionsData:{
      type:Array,
      required:true,
    }
  })
  const parsedData=ParseOption(props.optionsData);
  const option=ref({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    xAxis: {
      type: 'category',
      data: parsedData?.xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: parsedData.yAxis,
        links:parsedData?.links,
        type: parsedData.typeChart,
        edgeSymbol: ()=>{
          if(parsedData.typeChart==='graph'){
            return ['circle', 'arrow'];
          }
          return [];
        },
        edgeSymbolSize:()=>{
          if(parsedData.typeChart==='graph'){
            return [4, 10];
          }
          return [];
        } ,
        edgeLabel: {
          fontSize: 20
        },
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 5
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ],
  })
</script>

<style lang="scss" scoped>
    .chart{
      width: 500px;
      height: 500px;
    }
</style>