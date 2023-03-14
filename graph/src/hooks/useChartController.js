import {computed, ref,watch} from "vue";
import {radiogroup} from "@/utils/radiogroup.routes";
import {tabBlock, tabUnlock} from "@/utils/tabs.routes";

export const useChartController=()=>{

    const chartType=ref(radiogroup[radiogroup.findIndex((el)=>el.selected===true)].title===''?'':radiogroup[radiogroup.findIndex((el)=>el.selected===true)].title);
    const chartNode=ref({
        type:radiogroup[radiogroup.findIndex((el)=>el.selected===true)].title===''?'':radiogroup[radiogroup.findIndex((el)=>el.selected===true)].title.toLowerCase(),
        title:'',
        value:'',
    })
    const isLockedRadioButton=ref(false);
    const isLockedRadio = computed(() => {
        isLockedRadioButton.value=chartNodeList.value.length>0?true:false;
        return isLockedRadioButton.value;
    })
    const chartNodeList=ref([]);
    const tempData=ref({});
    const clearChartItem=()=>{
        chartNode.value.title="";
        chartNode.value.value="";
    }
    const isChart=ref(false);

    const appendChartItem=()=>{
        const data={
            type:chartNode.value.type.toLowerCase(),
            title:chartNode.value.title,
            value:chartNode.value.value,
        }
        chartType.value=chartNode.value.type;
        console.log("add object data into chart: {data} ",data);
        //Проверка на редактирование если tempData не !=Null;
        //Кастомное событие change-data;
        if(Object.keys(tempData.value).length != 0){
            let index=chartNodeList.value.findIndex(element => element?.title===tempData.value?.title);
            console.log("before update chartlist: ",chartNodeList.value[index]);
            chartNodeList.value[index]=data;
            console.log("after update chartlist: ",chartNodeList.value[index]);
            tempData.value={};
        }else{
            console.log("before radiogroup: ",radiogroup);
            let lockedRadio=data?.type.toLowerCase();
            if(chartNodeList.value.length<1){
                isLockedRadioButton.value=true;
            }
            if(lockedRadio==='graph'){
                console.log("graph added")
                console.log("test data:: ",data)
            }
            chartNodeList.value.push(data);
            isChart.value=true;
            tabBlock('chart');
        }
        clearChartItem();
    }
    const editChartItem=(value)=>{
        tempData.value=value;
        chartNode.value.type=tempData.value?.type;
        chartNode.value.title=tempData.value?.title;
        chartNode.value.value=tempData.value?.value;

    }
    const deleteChartItem=(value)=>{
        let index=chartNodeList.value.findIndex(element => element?.title===value?.title);
        if (index > -1) {
            chartNodeList.value.splice(index, 1);
            console.log("dataaa: ",chartNodeList.value.length);
        }
        if(chartNodeList.value.length===0){
            tabUnlock();
            isChart.value=false;
            chartType.value=radiogroup[radiogroup.findIndex((el)=>el.selected===true)].title===''?'':radiogroup[radiogroup.findIndex((el)=>el.selected===true)].title.toLowerCase();
        }
    }

    return {
        chartNode,chartType,tempData,chartNodeList,clearChartItem,appendChartItem,editChartItem,deleteChartItem,isLockedRadio,isChart
    }

}