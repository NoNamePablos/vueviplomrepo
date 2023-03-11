<template>
  <div >
    <vue-echarts   class="chart" @setOption="appendObject"  ref="chart"  :option="option" />
  </div>
  <div>Props res: {{experementData}}</div>
  <div>Option: {{optionsData}}</div>
  <div>append object: {{appendObject}}</div>
  <div style="background-color: #1D9FE7;color:black">
    {{beforeUpdateLinks}}
  </div>
</template>
<script setup>

  import {VueEcharts} from "@/components/vue-echarts/index";
  import {converterGarphLinks} from "@/components/vue-echarts/chart.helper";
 /* import {useCharts} from "@/hooks/useCharts";*/
  import {useGraph} from "@/hooks/useGraph";
  import {computed, inject, onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref} from "vue";
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
  const beforeUpdateLinks=ref([]);
  const chart = ref(null)
  //теоретически тут можно ускорить и обернуть пропсы в computed
  onBeforeUpdate(()=>{
    if(props.type.toLowerCase()==='graph'){
      beforeUpdateLinks.value=converterGarphLinks(props.links);
      appendObject.value.series[0].links=beforeUpdateLinks.value;
    }else{

    }
    chart.value.refreshChart();
  })
  onUpdated(()=>{
    if(props.type.toLowerCase()==='graph'){
      chart.value.setOption(computedArray.value);
    }
  })
  onBeforeMount(()=>{
    if(props.type.toLowerCase()==='graph'){
      beforeUpdateLinks.value=converterGarphLinks(props.links);
    }
  })
  onMounted(()=>{
    if(props.type.toLowerCase()==='graph'){
      appendObject.value.series[0].links=beforeUpdateLinks.value;
      chart.value.setOption(appendObject.value);
    }
  })
  const computedArray=computed(()=>{
    return appendObject.value;
  },{},{cache:false})
  const appendObject=ref({
    series:[{
      data:props.optionsData,
      links:beforeUpdateLinks.value,
    }]
  })
  computed(()=>{
    return appendObject.value;
  })
  /*const {optionChart}=useCharts(props)*/
  const {option}=useGraph();




</script>

<style lang="scss" scoped>
    .chart{
      width: 500px;
      height: 500px;
    }
</style>