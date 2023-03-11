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
    //update OBJECT not Array
    updateData:{
      type:Array,
      required:false,
    },
    experementData:{
      type:Object,
      required:false,
    }

  })
  const beforeUpdateLinks=ref([]);
  const chart = ref(null)
  //теоретически тут можно ускорить и обернуть пропсы в computed
  onBeforeUpdate(()=>{
    beforeUpdateLinks.value=converterGarphLinks(props.links);
    appendObject.value.series[0].links=beforeUpdateLinks.value;
    chart.value.refreshChart();
  })
  onUpdated(()=>{
    chart.value.setOption(computedArray.value);
  })
  onBeforeMount(()=>{
    beforeUpdateLinks.value=converterGarphLinks(props.links);
  })
  onMounted(()=>{
    appendObject.value.series[0].links=beforeUpdateLinks.value;
    chart.value.setOption(appendObject.value);
  })
  const computedArray=computed(()=>{
    return appendObject.value;
  },{},{cache:false})


  const appOnj=computed(()=>{
    return appendObject.value;
  })
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