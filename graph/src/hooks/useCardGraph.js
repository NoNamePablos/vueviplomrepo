import {computed, ref} from "vue";
import {tabBlock, tabUnlock} from "@/utils/tabs.routes";

export const useCardGraph=()=>{
    const graphGlobSettings=ref({
        title:""
    })
    const graphNode=ref({
        name:"",
        x:-1,
        y:-1,
        link:""
    })
    const graphLinkFields=ref({
        source:{},
        target:{},
    });
    const graphLinkList=ref([]);
    const appendLink=()=>{
        const data={
            source:graphLinkFields.value.source,
            target:graphLinkFields.value.target,
        }
        console.log("add to graph link: ",data);
        //Проверка на редактирование если tempData не !=Null;
        //Кастомное событие change-data;
        if(Object.keys(tempData.value).length !== 0){
            let index=graphLinkList.value.findIndex(element => element?.source===tempData.value?.source);
            console.log("before update graph: ",graphLinkList.value[index]);
            graphLinkList.value[index]=data;
            console.log("after update graph: ",graphLinkList.value[index]);
            tempData.value={};
            console.log("tempData: ",tempData.value);
        }else{
            console.log("graph link: ",graphLinkFields.value);
            graphLinkList.value.push(data);
            console.log("graph links: ",graphLinkList.value);
        }
        graphLinkFields.value.source={};
        graphLinkFields.value.target= {};
    }
    const editLink=(value)=>{
        tempData.value=value;
        graphLinkFields.value.source=tempData.value?.source;
        graphLinkFields.value.target=tempData.value?.target;
    }
    const deleteLink=(value)=>{
        let index=graphLinkList.value.findIndex(element => element?.source===value?.source);
        if (index > -1) {
            graphLinkList.value.splice(index, 1);
            console.log("remove link: ",graphLinkList.value.length);
        }
    }
    const selectedFieldSource=(value)=>{
        graphLinkFields.value.source=value
    }
    const selectedFieldTarget=(value)=>{
        graphLinkFields.value.target=value
    }


    const graphNodeList=ref([]);

    const tempData=ref({});

    const isGraph=ref(false);



    const clearGraphNode=()=>{
        graphNode.value.name="";
        graphNode.value.x=-1;
        graphNode.value.y=-1;
        graphNode.value.link="";
    }
    const appendItem=()=>{
        const data={
            name:graphNode.value.name,
            x:graphNode.value.x,
            y:graphNode.value.y,
            link:graphNode.value.link
        }
        console.log("add graph node: ",data);
        //Проверка на редактирование если tempData не !=Null;
        //Кастомное событие change-data;
        if(Object.keys(tempData.value).length !== 0){
            let index=graphNodeList.value.findIndex(element => element?.name===tempData.value?.name);
            console.log("before update graph node:  ",graphNodeList.value[index]);
            graphNodeList.value[index]=data;
            console.log("after update graph node: ",graphNodeList.value[index]);
            tempData.value={};
            console.log("tempData: ",tempData.value);
        }else{
            console.log("is appended data: ",data);
            graphNodeList.value.push(data);
            isGraph.value=true;

            tabBlock('graph');
            console.log("Graph node list: ",graphNodeList.value);
        }
        clearGraphNode();
    }
    const editNode=(value)=>{
        tempData.value=value;
        graphNode.value.name=tempData.value?.name;
        graphNode.value.x=tempData.value?.x;
        graphNode.value.y=tempData.value?.y;
        graphNode.value.link=tempData.value?.link;


    }
    const deleteNode=(value)=>{
        let index=graphNodeList.value.findIndex(element => element?.name===value?.name);
        if (index > -1) {
            console.log("remove value node: ",graphNodeList[index]);
            graphNodeList.value.splice(index, 1);
            console.log("remove data in graph: ",graphNodeList.value);
        }
        if(graphNodeList.value.length===0){
            isGraph.value=false;
            tabUnlock();
        }
    }

    return {
        graphLinkFields,
        graphLinkList,
        graphNode,
        tempData,
        graphNodeList,
        clearGraphNode,
        appendItem,
        editNode,
        deleteNode,
        appendLink,
        editLink,
        deleteLink,
        selectedFieldSource,
        selectedFieldTarget,
        isGraph,graphGlobSettings
    }

}