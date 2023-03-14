import {createRouter,createWebHashHistory} from "vue-router";
import CreateGraph from "@/views/CreateGraph.vue";
import LoadGraph from "@/views/LoadGraph.vue";

const routes=[
    {
        path:"/",
        component:CreateGraph,
    },
    {
        path:"/load",
        component:LoadGraph,
    },
]

export const router=createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})