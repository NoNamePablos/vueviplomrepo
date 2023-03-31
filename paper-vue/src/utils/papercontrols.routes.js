import {defineAsyncComponent, markRaw, reactive} from "vue";

export  const paperController=reactive(
    [{
        id:1,
        name:"circle",
        sub_name:"circle_",
        component:markRaw(defineAsyncComponent(() =>
            import('@/components/icons/IconCircle.vue')
        )),
    },
        {
            id:2,
            name:"rectangle",
            sub_name:"rectangle_",
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconRectangle.vue')
            )),
        },
        {
            id:3,
            name:"line",
            sub_name:"line_",
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconLine.vue')
            )),
        },{
        id:4,
        name:'text',
        sub_name:"text_",
        component:markRaw(defineAsyncComponent(() =>
            import('@/components/icons/IconText.vue')
        )),
    },{
        id:5,
        name:'hexagon',
        sub_name:"hexagon_",
        component:markRaw(defineAsyncComponent(() =>
            import('@/components/icons/IconPolygon.vue')
        )),
    },
        {
            id:6,
            name:'loop',
            sub_name:"loop_",
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconLoop.vue')
            )),
        },
        {
            id:7,
            name:'romb',
            sub_name:"romb_",
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconRomb.vue')
            )),
        },
        {
            id:8,
            name:'arrow',
            sub_name:"arrow_",
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconArrow.vue')
            )),

        },
        {
            id:9,
            name:'process',
            sub_name:"process_",
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconProcess.vue')
            )),

        },
        {
            id:10,
            name:'arrow90',
            sub_name:"arrow90_",
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconArrow90.vue')
            )),
        },
        {
            id:11,
            name:'ellipse',
            sub_name:"ellipse_",
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconEllipse.vue')
            )),
       },
        {
            id:12,
            name:"square",
            sub_name:"square_",
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconRectangle.vue')
            )),
        },
        {
            id:13,
            name:"triangle",
            sub_name:"triangle_",
            component:markRaw(defineAsyncComponent(() =>
                import('@/components/icons/IconRectangle.vue')
            )),
        },
    ]

)