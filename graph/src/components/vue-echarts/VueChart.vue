<template>
  <div >
    <vue-echarts   class="chart"    :option="option" />
  </div>
  <div>zzz{{reply}}</div>
  <div>Props res: {{updOpt}}</div>
</template>
<script setup>

  import {VueEcharts} from "@/components/vue-echarts/index";
 /* import {useCharts} from "@/hooks/useCharts";*/
  import {useGraph} from "@/hooks/useGraph";
  import {computed, inject, onMounted, onUpdated, ref} from "vue";
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
    updateLinks:{
      type:Array,
      required:false,
    }
  })
  const linksArray=ref([]);
  const provideLinks=ref(null);
  const logg=(val)=>{
    console.log( val );
  }
  const refData=ref(null);
  const links = computed({
    // getter
    get() {
      return linksArray.value;
    },
    // setter
    set(newValue) {
     linksArray.value.push(newValue);
    }
  })

  /*const {optionChart}=useCharts(props)*/
  const {option}=useGraph(props);
  const reply = inject("LINKS_UPDATE", null);


</script>

<style lang="scss" scoped>
    .chart{
      width: 500px;
      height: 500px;
    }
</style>