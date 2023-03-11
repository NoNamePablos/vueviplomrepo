import {defineAsyncComponent, markRaw, reactive} from "vue";

export const radiogroup=reactive([
    {
        title:'Line',
        radiotype:'typeChart',
        component:markRaw(defineAsyncComponent(() =>
            import('@/components/icons/chart/IconLineChart.vue')
        )),
        selected:false,
    },
    {
        title:'Bar',
        radiotype:'typeChart',
        component:markRaw(defineAsyncComponent(() =>
            import('@/components/icons/chart/IconBarChart.vue')
        )),
        selected:true,
    },
    {
        title:'Pie',
        radiotype:'typeChart',
        component:markRaw(defineAsyncComponent(() =>
            import('@/components/icons/chart/IconPieChart.vue')
        )),
        selected:false,
    },
    {
        title:'Graph',
        radiotype:'typeChart',
        component:markRaw(defineAsyncComponent(() =>
            import('@/components/icons/chart/IconGraphChart.vue')
        )),
        selected:false,
    },
    {
        title:'Tree',
        radiotype:'typeChart',
        component:markRaw(defineAsyncComponent(() =>
            import('@/components/icons/chart/IconTreeChart.vue')
        )),
        selected:false,
    },
])