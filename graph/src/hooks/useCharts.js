import {computed, onBeforeMount, onErrorCaptured, onMounted, onUpdated, ref, watchEffect,watch,shallowRef} from "vue";
import {ParseOption} from "@/components/vue-echarts/chart.helper";

export const useCharts=(props)=>{
        const parsedData=ref(ParseOption(props.optionsData));

        const optionUpdate=ref({
            xAxis:[
                {
                    data:[]
                }
            ],
            series: [
                {
                    data: [],
                    type:'pie',
                }
            ]
        })
        const chartChart =ref(null);
        const computedArray=computed(()=>{
            return optionUpdate.value;
        })
    /*onBeforeUpdate(()=>{
        if(props.type!=='graph'){
            parsedData.value=ParseOption(props.optionsData);
            optionUpdate.value.xAxis[0].data=parsedData.value?.xAxis;
            optionUpdate.value.series[0].data=parsedData.value?.yAxis;
            optionUpdate.value.series[0].type=parsedData.value?.typeChart;
            console.log("Before updated data object chart: ",parsedData.value);
            chartChart.value.refreshChart();
        }
    })
    onUpdated(()=>{
        if(props.type!=='graph'){

            chartChart.value.setOption(computedArray.value);
            console.log("type chart: ",props.type);
        }
    })*/
    onErrorCaptured((err, instance, info)=>{
        console.log("error: ",{err,instance,info});
    })
    const data=shallowRef(props.optionsData);
    const isMounted=ref(false)
    onBeforeMount(()=>{
        parsedData.value=ParseOption(props.optionsData);
        console.log("parse1: ",parsedData.value);

        optionUpdate.value.xAxis[0].data=parsedData.value?.xAxis;
        optionUpdate.value.series[0].data=parsedData.value?.yAxis;
        optionUpdate.value.series[0].type=parsedData.value?.typeChart;
    })
    onMounted(()=>{
        chartChart.value.setOption(optionUpdate.value);
    })
    watch(() => props.optionsData, (newValue, oldValue) => {
        data.value=newValue;
        parsedData.value=ParseOption(data.value);
        console.log("parse: watch ",parsedData.value);
        optionUpdate.value.xAxis[0].data=parsedData.value?.xAxis;
        optionUpdate.value.series[0].data=parsedData.value?.yAxis;
        optionUpdate.value.series[0].type=parsedData.value?.typeChart;
        console.log("option update: ",optionUpdate.value);
        chartChart.value.setOption(optionUpdate.value);
    },{deep:true})

    const logger=(value)=>{
        console.log(value);
        window.open(''+value.data.link,'_blank');
    }


    const optionChart=ref({
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [],
                type: "pie",
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
    return {
        optionChart,parsedData,chartChart,optionUpdate,logger,
    }
}