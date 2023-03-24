import {defineAsyncComponent, markRaw, reactive} from "vue";

export  const paperController=reactive(
    [{
        id:1,
        name:"circle",
        component:markRaw(defineAsyncComponent(() =>
            import('@/components/icons/IconCircle.vue')
        )),
    },
        {
            id:2,
            name:"rectangle",
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconRectangle.vue')
            )),
        },
        {
            id:3,
            name:"line",
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconLine.vue')
            )),
        },{
        id:4,
        name:'text',
        component:markRaw(defineAsyncComponent(() =>
            import('@/components/icons/IconText.vue')
        )),
    },{
        id:5,
        name:'hexagon',
        component:markRaw(defineAsyncComponent(() =>
            import('@/components/icons/IconPolygon.vue')
        )),
    },
        {
            id:6,
            name:'loop',
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconLoop.vue')
            )),
        },
        {
            id:7,
            name:'romb',
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconRomb.vue')
            )),
        },
        {
            id:8,
            name:'arrow',
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconArrow.vue')
            )),

        },
        {
            id:9,
            name:'process',
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconProcess.vue')
            )),

        },
        {
            id:10,
            name:'arrow90',
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconArrow90.vue')
            )),
        },
        {
            id:11,
            name:'ellipse',
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconEllipse.vue')
            )),
        },{
        id:12,
        name:'Newtext',
        component:markRaw(defineAsyncComponent(() =>
            import('@/components/icons/IconText.vue')
        )),
    }
    ]

)