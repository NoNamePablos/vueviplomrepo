import {createRouter,createWebHashHistory} from "vue-router";
import CreateGraph from "@/views/CreateGraph.vue";
import LoadGraph from "@/views/LoadGraph.vue";
import CreateGraphOnce from "@/views/CreateGraphOnce.vue";
import HigilightCode from "@/views/HigilightCode.vue";

const routes=[
    {
        path:"/",
        component:CreateGraph,
    },
    {
        path:"/load",
        component:LoadGraph,
    },
    {
        path: "/grpah-creater",
        component: CreateGraphOnce
    },{
        path:"/highlight",
        component: HigilightCode
    }
]

export const router=createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})