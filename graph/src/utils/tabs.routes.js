import {reactive} from "vue";

export const tabBlock=(type)=>{
    tabs.map((item)=>{
        if(item?.type.toLowerCase()!==type.toLowerCase()){
            item.isBlocked=true;
        }else item.isBlocked=false
    })
}
export const tabUnlock=()=>{
    tabs.map((item)=>{
         item.isBlocked=false
    })
}
export  const tabs=reactive([
    {
        type:'chart',
        name:"Create",
        label:"Создание графиков",
        icon:'',
        isBlocked:false,
    },
    {
        type:'graph',
        name:"Graph",
        label:"Создание Дерева",
        icon:'',
        isBlocked: false,
    },
    {   type:"Node",
        name:"Node editor",
        label:"Редактор графа",
        icon:'',
        isBlocked: false,
    },
])

export const tabGraph=[{
    name:"CreateGraph",
    label:"Создать узел",
    icon:'',
},{
    name:"SetLinks",
    label:"Создание связей",
    icon:'',
}]
