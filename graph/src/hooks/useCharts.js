import {ref} from "vue";
import {ParseOption} from "@/components/vue-echarts/chart.helper";

export const useCharts=(props)=>{
    const parsedData=ParseOption(props.optionsData);
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
    const addChart=(props)=>{
        console.log("add");
    }
    return {
        addChart,optionChart,parsedData,
    }
}