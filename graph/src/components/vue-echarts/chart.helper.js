export const ParseOption=(options)=>{
    let xAxisTemp=[];
    let yAxisTemp=[];
    options.forEach((option)=>{
        xAxisTemp.push(option?.title);
        yAxisTemp.push(Number(option?.value));
    })
    console.log("res:: ",{  xAxis:xAxisTemp,
        yAxis:yAxisTemp})
    return {
        xAxis:xAxisTemp,
        yAxis:yAxisTemp
    }
}