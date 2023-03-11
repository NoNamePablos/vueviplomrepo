export const ParseOption=(options)=>{
    if(options.length<1){
        return ;
    }
    let xAxisTemp=[];
    let yAxisTemp=[];
    let typeChart=options[0]?.type.toLowerCase();
    let isFinalObject={}
    let links=[];
    options.forEach((option)=>{
        if(typeChart==='pie'){
            console.log(option);
            yAxisTemp.push({
                value:option?.value,
                name:option?.title
            })

        }else{
            xAxisTemp.push(option?.title);
            yAxisTemp.push(Number(option?.value));
        }
    })
    if(typeChart==='pie'){
        isFinalObject={
            yAxis:yAxisTemp,
            typeChart:typeChart
        }
    }
    console.log("res:: ",{  xAxis:xAxisTemp,
        yAxis:yAxisTemp,
        typeChart:options[0].type.toLowerCase(),
    })
    return {
        xAxis:xAxisTemp,
        yAxis:yAxisTemp,
        typeChart:typeChart,
        links:links
    }
}
export const converterGraphData=(array)=>{
    let copyArr=JSON.parse(JSON.stringify(array));
/*    array.forEach((el)=>{
        el.name=el.title;
        delete el['title'];
        delete el['value'];
        delete el['type'];
        console.log("el ",el.name);
    })*/
    console.log("zzzz: ", )
    return [...copyArr.map((item)=>{
        item.name=item['title'];
        delete item['title'];
        delete item['value'];
        delete item['type'];
        return item;
    })];
}
export const converterGarphLinks=(array)=>{
    console.log("addded");
    let copyArr=JSON.parse(JSON.stringify(array));
    copyArr.forEach((el)=>{
        el.source=el.source.name;
        el.target=el.target.name;
    })

    /*    array.forEach((el)=>{
            el.name=el.title;
            delete el['title'];
            delete el['value'];
            delete el['type'];
            console.log("el ",el.name);
        })*/
    return copyArr;
}
