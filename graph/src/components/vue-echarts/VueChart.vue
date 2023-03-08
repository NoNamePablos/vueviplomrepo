<template>
  <vue-echarts class="chart" :option="optionConfig" />
</template>
<script setup>

  import {VueEcharts} from "@/components/vue-echarts/index";
  import {useCharts} from "@/hooks/useCharts";
  import {useGraph} from "@/hooks/useGraph";
  import {computed, onMounted, onUpdated, ref} from "vue";
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
  const linksArray=ref(props.links);

  const linksComputed=computed(()=>{
      return linksArray.value;
  })

  const {optionChart}=useCharts(props)
  const {getOption}=useGraph(props);
  const optionConfig=ref({});
  onMounted(()=>{
    console.log("links computed: ",linksComputed.value);
    optionConfig.value=getOption(linksComputed);
  })
  onUpdated(()=>{
    console.log("links Updated computed: ",linksComputed.value);
    optionConfig.value=getOption(linksComputed.value);
  })

</script>

<style lang="scss" scoped>
    .chart{
      width: 500px;
      height: 500px;
    }
</style>