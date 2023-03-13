<template>
  <vue-echarts   class="chart" @setOption="appendObject"  ref="chart"  :option="option" />
</template>

<script setup>
import {computed, onBeforeMount, onBeforeUpdate, onErrorCaptured, onMounted, onUpdated, ref,watchEffect} from "vue";

import {VueEcharts} from "@/components/vue-echarts/index";
import {useGraph} from "@/hooks/useGraph";
import {converterGarphLinks} from "@/components/vue-echarts/chart.helper";

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
const {option}=useGraph(props);


//теоретически тут можно ускорить и обернуть пропсы в computed
/*onBeforeUpdate(()=>{
    beforeUpdateLinks.value=converterGarphLinks(props.links);
    console.log("Before updated links: ",beforeUpdateLinks.value);
    appendObject.value.series[0].links=beforeUpdateLinks.value;
  chart.value.refreshChart();
})*/
onErrorCaptured((err, instance, info)=>{
  console.log("error: ",{err,instance,info});
})


//Выдергивать объект с обновлением из внешнего файла
//Порабоать над карточками
//После того как всё будет красиво динамично доабавляться,проработать визуал



onBeforeMount(()=>{
  if(props.type==='graph') {
    console.log("graph1");

    beforeUpdateLinks.value=converterGarphLinks(props.links);
    console.log("Before mounted links: ",beforeUpdateLinks.value);
  }
})
onMounted(()=>{
  if(props.type==='graph') {
    console.log("graph1");
    appendObject.value.series[0].links=beforeUpdateLinks.value;
    chart.value.setOption(appendObject.value);
  }

})

watchEffect(()=>{
  beforeUpdateLinks.value=converterGarphLinks(props.links);
  appendObject.value.series[0].links=beforeUpdateLinks.value;
  appendObject.value.series[0].data=props.optionsData;
  if(props.optionsData.length>1||props.links.length>0){
    chart.value.setOption(appendObject.value);
  }
})


</script>

<style lang="scss" scoped>
.chart{
  width: 100%;
  height: 500px;
  border:1px solid;
}
</style>