
export const loadEr={"production":false,"type":"chart","typeChart":"pie","optionData":[{"type":"pie","title":"hdfgh","value":"5656"},{"type":"pie","title":"lklghj","value":"324"},{"type":"pie","title":"lhjkl","value":"666"},{"type":"pie","title":"kghjkj","value":"3333"}]};


export const mockDataChart={
    production:false,//есть возможность добавлять элементы
    type:"chart",//chart
    typeChart:"pie",//Bar//Line
    optionData:[
        {
         title:"test1",
         value:200,
        },
        {
            title:"test2",
            value:300,
        },
        {
            title:"test3",
            value:120,
        }
    ]
}
export const mockDataGraph={
    production:true,//Отключает форму с добавлеением элементов
    type:"graph",//chart
    typeChart:"graph",
    optionData:[
        {
            name:"test1",
            x:"100",
            y:"100",
            link:"/mock-page/1.html"
        },
        {
            name:"test2",
            x:"300",
            y:"300",
            link:"/mock-page/2.html"

        },
        {
            name:"test3",
            x:"700",
            y:"300",
            link:"/mock-page/3.html"
        }
    ],
    links:[
        {
            source:  {
                name:"test2",
            },
            target:{
                name:"test1",
            },
        },
        {
            source:  {
                name:"test2",
            },
            target:{
                name:"test3",
            },
        },
    ]
}