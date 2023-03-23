<template>
  <vue-echarts @click="logger"  class="chart" @setOption="appendObject"  ref="chart"  :option="option" />
</template>

<script setup>
import {
  computed,
  onBeforeMount,
  onBeforeUpdate,
  onErrorCaptured,
  onMounted,
  onUpdated,
  ref,
  shallowRef, watch,
  watchEffect
} from "vue";

import {VueEcharts} from "@/components/vue-echarts/index";
import {useGraph} from "@/hooks/useGraph";
import {converterGarphLinks, ParseOption} from "@/components/vue-echarts/chart.helper";

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
  globalSettings:{
    type:Object,
    required:false,
  }
})
const beforeUpdateLinks=ref([]);
const chart = ref(null)

const computedArray=computed(()=>{
  return appendObject.value;
},{},{cache:false})
const appendObject=ref({
  title:{
    text: props?.globalSettings?.title||'base'
  },
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

const dataLinks=shallowRef(props.links);
const data=shallowRef(props.optionsData);
const parsedData=ref([]);
const globSetting=shallowRef(props.globalSettings);
watch(() => props.links, (newValue, oldValue) => {
  dataLinks.value=newValue;
  beforeUpdateLinks.value=converterGarphLinks(dataLinks.value);
  console.log("parse: watch ",beforeUpdateLinks.value);
  appendObject.value.series[0].links=beforeUpdateLinks.value;
  chart.value.setOption(appendObject.value);
},{deep:true})
watch(() => props.optionsData, (newValue, oldValue) => {
  data.value=newValue;
  parsedData.value=data.value;
  appendObject.value.series[0].data=parsedData.value;
  chart.value.setOption(appendObject.value);
},{deep:true})
watch(()=>props.globalSettings,(newValue,oldValue)=>{
  globSetting.value=newValue;
  appendObject.value.title.text=globSetting.value?.title;
  chart.value.setOption(appendObject.value);

},{deep:true})
const logger=(value)=>{
  console.log(value);
  window.open(''+value.data.link,'_blank');
}


onBeforeMount(()=>{
    beforeUpdateLinks.value=converterGarphLinks(props.links);
})
onMounted(()=>{
    appendObject.value.series[0].links=beforeUpdateLinks.value;
    chart.value.setOption(appendObject.value);
})




</script>

<style lang="scss" scoped>
.chart{
  width: 100%;
  height: 500px;
  border:1px solid;
}
</style>