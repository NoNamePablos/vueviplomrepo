import {converterGraphData, converterGraphLinks} from "@/components/vue-echarts/chart.helper";
import {computed} from "vue";

export const useGraph=(props)=>{
    const parseData=converterGraphData(props.optionsData)
    const parseLinks=converterGraphLinks(props.links)
    /*const optionGraph = {
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
                data: parseData,
                // links: [],
                links: [
                    //обрабоатать массив links
                ],
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0
                }
            }
        ]
    };*/

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
                data: parseData,
                // links: [],
                links: parseLinks,
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