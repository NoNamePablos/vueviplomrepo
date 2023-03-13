import {computed, onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref} from "vue";
import {converterGarphLinks} from "@/components/vue-echarts/chart.helper";

export const useGraph=(props)=>{

    /*const {optionChart}=useCharts(props)*/
    const option = {
        title: {
            text: 'Basic Graph'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                type: 'graph',
                layout: 'none',
                symbolSize: 50,
                roam: true,
                label: {
                    show: true
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    fontSize: 20
                },
                data:[],
                links: [],
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0
                }
            }
        ]
    };

    return{option}
}