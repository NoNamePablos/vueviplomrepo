import {ref} from "vue";

export const useChartController=()=>{
    const  graphNode=ref({
        title:"",
        x:"",
        y:"",
    })
    const graphNodeList=ref([]);
    const tempData=ref({});
    const clearGraphNode=()=>{
        graphNode.value.title="";
        graphNode.value.x="";
        graphNode.value.y="";
    }
    const appendItem=()=>{
        const data={
            title:graphNode.value.title,
            x:graphNode.value.x,
            y:graphNode.value.y,
        }
        console.log("add: ",data);
        //Проверка на редактирование если tempData не !=Null;
        //Кастомное событие change-data;
        if(Object.keys(tempData.value).length !== 0){
            let index=graphNodeList.value.findIndex(element => element?.title===tempData.value?.title);
            console.log("before update graph node:  ",graphNodeList.value[index]);
            graphNodeList.value[index]=data;
            console.log("after update graph node: ",graphNodeList.value[index]);
            tempData.value={};
            console.log("tempData: ",tempData.value);
        }else{
            console.log("is appended data: ",data);
            graphNodeList.value.push(data);
            console.log("Graph node list: ",graphNodeList.value);
        }
        clearGraphNode();
    }
    const editNode=(value)=>{
        tempData.value=value;
        graphNode.value.title=tempData.value?.title;
        graphNode.value.x=tempData.value?.x;
        graphNode.value.y=tempData.value?.y;

    }
    const deleteNode=(value)=>{
        let index=graphNodeList.value.findIndex(element => element?.title===value?.title);
        if (index > -1) {
            console.log("remove value node: ",graphNodeList[index]);
            graphNodeList.value.splice(index, 1);
            console.log("remove data in graph: ",graphNodeList.value);
        }
    }

   /* return {
        graphNode,tempData,graphNodeList,clearGraphNode,appendItem,editNode,deleteNode
    }*/

}