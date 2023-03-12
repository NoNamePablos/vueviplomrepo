<template>
  <div >
    <vue-echarts   class="chart" @setOption="appendObject"  ref="chart"  :option="option" />
  </div>
  <div>Option: {{optionsData}}</div>
  <div>append object: {{appendObject}}</div>
  <div style="background-color: #1D9FE7;color:black">
    {{links}}
  </div>
</template>
<script setup>

  import {VueEcharts} from "@/components/vue-echarts/index";
  import {converterGarphLinks} from "@/components/vue-echarts/chart.helper";
 /* import {useCharts} from "@/hooks/useCharts";*/
  import {useGraph} from "@/hooks/useGraph";
  import {computed, onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref} from "vue";
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
    if(props.type==='graph'){
      beforeUpdateLinks.value=converterGarphLinks(props.links);
      console.log("Before updated links: ",beforeUpdateLinks.value);
      appendObject.value.series[0].links=beforeUpdateLinks.value;
    }

      chart.value.refreshChart();
  })
  onUpdated(()=>{
    if(props.type==='graph') {
      chart.value.setOption(computedArray.value);

    }
  })
  //Выдергивать объект с обновлением из внешнего файла
  //Порабоать над карточками
  //После того как всё будет красиво динамично доабавляться,проработать визуал



  onBeforeMount(()=>{
    if(props.type==='graph') {
      beforeUpdateLinks.value=converterGarphLinks(props.links);
      console.log("Before mounted links: ",beforeUpdateLinks.value);
    }
  })
  onMounted(()=>{
    if(props.type==='graph') {
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