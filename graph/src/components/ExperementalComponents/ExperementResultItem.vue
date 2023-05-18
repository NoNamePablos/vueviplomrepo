<template>
  <div :class="['experement-result-item',{'experement-result-item--winner':winner},{'experement-result-item--looser':looser}]" >
    <div class="experement-result-item__star">
      <svg v-if="winner" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
      <svg v-if="looser" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-exclamation" viewBox="0 0 16 16">
        <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/>
        <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
      </svg>
    </div>
    <div class="experement-result-item__title">
      {{block?.title}}
    </div>
    <div class="experement-result-item__stats">
      <div class="stat-item">
        Среднее значение: {{block?.statistics?.average.toFixed(2)}}
      </div>
      <div class="stat-item" v-if="isWinner!==0">
        Быстрее на: {{isWinner}}%
      </div>
      <div class="stat-list-regression">
        <div>linear</div>
        <div >{{resultsRegression.string}}</div>
      </div>
      <div class="stat-list-regression">
        <div>Polynominal</div>
        <div >{{resultsRegression1.string}}</div>
      </div>
    </div>
    <progress-bar :count="percent" />
    <div>

    </div>
    <vue-echarts    class="chart chart-chart"  @setOption="appendObject"  ref="chartstat"  :option="optChart" />
  </div>
</template>

<script setup>
import ProgressBar from "@/components/ProgressBar/ProgressBar.vue";
import {computed, onBeforeMount, onMounted, ref, watch} from "vue";
import regression from 'regression';
import {VueEcharts} from "@/components/vue-echarts";

const chartstat=ref(null);
const props=defineProps({
  block:{
    type:Object,
    required:true,
  },
  percent:{
    type:Number,
    required:false,
  },
  winner:{
    type:Boolean,
    required:false,
  },
  looser:{
    type:Boolean,
    required:false,
  }
})
const appendObject=ref({
  series:[{
    name:"",
    data:null,
  },
    {
      name:"",
      data:null,
    }
  ]
})
const optChart=ref({
  xAxis: {
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  yAxis: {
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  series: [
    {
      name: 'title',
      symbolSize: 20,
      data: null,
      type: 'scatter'
    },
    {
      name: 'title2',
      symbolSize: 20,
      data: null,
      type: 'scatter'
    }
  ]
});
const isWinner=computed(()=>{
  return props.looser!=true?100-props.percent:0;
})


const resultsRegression=ref(null);
const resultsRegression1=ref(null);
watch(()=>resultsRegression.value,(newValue,oldValue)=>{
  resultsRegression.value=newValue;
  console.log("fgggL ",appendObject.value);
  appendObject.value.series[0].data=resultsRegression.value.points;
  appendObject.value.series[0].name="Linear";
  appendObject.value.series[1].data=resultsRegression1.value.points;
  appendObject.value.series[1].name="Polynominal";

})
onBeforeMount(()=>{
  console.log("props block: ",props.block);
  let a=[...props.block.result].map((item,idx)=>{
    return [item.runTime,idx];
  })
  resultsRegression.value = regression.linear(a,{
    order: 2,
    precision: 2,
  });
  resultsRegression1.value = regression.polynomial(a, { order: 3 });
  /*optChart.value.series.data=resultsRegression.value.points;*/
})
onMounted(()=>{
  if(chartstat.value){
    console.log("fsadfdsg");
    console.log(appendObject.value);
    chartstat.value.setOption(appendObject.value);
    console.log(resultsRegression.value);
  }
})
</script>

<style lang="scss" scoped>
    .experement-result-item{
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding:10px;
      border-radius: 6px;
      border:2px solid transparent;
      position: relative;
      &__star{
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px 10px;
        border-bottom-left-radius: 6px;
        height: auto;
        display: none;
        background: #2d69e8;
        color: white;
        & svg{
          height: 15px;
          width: 15px;
          flex: 0 0 15px;
        }
      }
      &__title{
        font-size: 16px;
        line-height: 1.5;
      }
      &--looser{
        border: 2px solid #dc3545;
        & .experement-result-item__star{
          display: flex;
          background:  #dc3545;;
        }
      }
      &--winner{
        border: 2px solid #2d69e8;
        & .experement-result-item__star{
          display: flex;
        }
      }
    }
    .chart{
      width: 500px;
      height: 500px;
    }
</style>