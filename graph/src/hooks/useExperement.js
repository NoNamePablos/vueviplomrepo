import {computed, reactive, ref} from "vue";
import {radiogroup, radiogroupExperements} from "@/utils/radiogroup.routes";

export const useExperement=(props)=> {
    const isEnabledResults=ref(false);
    const testsRounds=ref(0);
    const doc=ref(null);
    const autoStartTimer=reactive(null);
    const autoStartCounter=reactive(null);
    const iframe=ref(null);
    const showTestInProgress=ref(false);
    const testType=ref(radiogroupExperements[radiogroupExperements.findIndex((el)=>el.selected===true)].title===''?'':radiogroupExperements[radiogroupExperements.findIndex((el)=>el.selected===true)].title);
    const loadScripts=()=>{
        loadLibraryIntoIframe("https://code.jquery.com/jquery-3.4.1.min.js");
        loadLibraryIntoIframe("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.8/angular.min.js");
        loadLibraryIntoIframe("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js");
        console.log("scripts is loaded");
    }
    const resultBlock=ref({
        winnerId:-1,
        looserId:-1
    })
    const  runTimeTest=ref([]);
    const codeBlocks=ref([{
        id:1,
        title:"code block 1",
        typeOfTest:'',
        code_block: "",
        benchmarks:{
            startIndex:0,
            endIndex:0,
        },
        statistics:{
          min:0,
          max:0,
          average:0,
            percent:0,
        },
        result:[],
        runTimeTest:[],
    },{
        id:2,
        title:"code block 2",
        code_block: "",
        typeOfTest:'',
        benchmarks:{
            startIndex:0,
            endIndex:0,
        },
        statistics:{
            min:0,
            max:0,
            average:0,
            percent:0,

        },
        result:[],
        runTimeTest:[],
    }])
    const blockAmount=computed(()=>{ return codeBlocks.value.length});
    const resetResults=()=> {
        codeBlocks.value.forEach((item)=>{
            item.result.amountOfRounds=0;
            item.result.percent=0;
        })
    }
    //Добавить блок для теста
    const addCodeBlock=()=>{
        let lastIndex=codeBlocks.value.length;
        const obj = {
            id: lastIndex + 1,
            title: "code block " + (codeBlocks.value.length + 1),
            typeOfTest:'',
            code_block: "",
            benchmarks:{
                startIndex:0,
                endIndex:0,
            },
            statistics:{
                min:0,
                max:0,
                average:0,
                percent:0,

            },
            result:[],
            runTimeTest:[],
        };
        codeBlocks.value.push(obj);
    }
    //Удалить блок
    const removeCodeBlock=(id)=>{
        if(codeBlocks.value.length>1){
            codeBlocks.value=codeBlocks.value.filter(codeBlock=>codeBlock.id!=id);
        }
    }

    /*const runTestForAmountOfTime=(idx,timing,isRoundBenchmark=false)=> {
        let rounds = 0;
        let start = performance.now();
        let finish = performance.now();
        let functionCall = "benchmark_" + idx;
            do {
                rounds++;
                iframe.value.contentWindow[functionCall]();
                finish = performance.now();
            } while (finish - start < timing);
        return {
            counter: rounds,
            timer:finish
        }
    }*/
    const runTestForAmountOfTime = (idx, timing, isRoundBenchmark = false) => {
        return new Promise((resolve, reject) => {
            let rounds = 0;
            let start = performance.now();
            let finish = performance.now();
            let functionCall = "benchmark_" + idx;

            const performAnimationFrame = (timestamp) => {
                rounds++;
                iframe.value.contentWindow[functionCall]();

                finish = performance.now();
                if (finish - start < timing) {
                    window.requestAnimationFrame(performAnimationFrame);
                } else {
                    const result = {
                        counter: rounds,
                        timer: finish,
                    };
                    // Другая логика, основанная на результате

                    resolve(result);
                }
            };

            window.requestAnimationFrame(performAnimationFrame);
        });
    };
    const runTestForAmountOfTimeSecond=(idx)=>{
        return new Promise((resolve, reject) => {
            let functionCall = "benchmark_" + idx;
            let totalTime = 0;
            let numExecutions = 0;

            let startTime = performance.now();

            const loop = (timestamp) => {
                iframe.value.contentWindow[functionCall]();

                const currentTime = performance.now();
                const elapsedTime = currentTime - startTime;

                if (elapsedTime < 1000 && numExecutions < 3) {
                    totalTime += currentTime - startTime;
                    numExecutions++;
                    startTime = currentTime;
                    window.requestAnimationFrame(loop);
                } else {
                    const averageRunTime = totalTime / numExecutions;
                    resolve({
                        runTime: averageRunTime,
                        timer: performance.now()
                    });
                }
            };

            window.requestAnimationFrame(loop);
        });
    }
    const calculationAverageTime=()=>{
        codeBlocks.value.map((code)=>{
            let avg=0;
            const average=[...code.result].map((item)=>{
                avg+=item.runTime;
                item=item.runTime;
                return item;
            });
            code.statistics.average=avg/code.result.length;
            code.statistics.max=Math.max(...average);
            code.statistics.min=Math.min(...average);
        })
    }
    const calculationAverageRounds=()=>{
        //рефакторить нужно по хорошему;
        codeBlocks.value.map((code)=>{
                let avg=0;
                    const average=[...code.result].map((item)=>{
                        avg+=item.counter;
                        item=item.counter;
                        return item;
                    });
                    code.statistics.average=avg/code.result.length;
                    code.statistics.max=Math.max(...average);
                    code.statistics.min=Math.min(...average);
        })
    }
    const calcResults=(isTime=false)=>{
        if(isTime){
            calculationAverageTime();
        }
        else{
            calculationAverageRounds();
        }
        let slowBlock = codeBlocks.value.reduce((e, t) => e.statistics.average > t.statistics.average ? e : t);
        let slowBlockAvg = slowBlock.statistics.average;
        let arrsort= codeBlocks.value.toSorted((a,b)=>{
            return a.statistics.average - b.statistics.average;
        });
        for (let block of codeBlocks.value) {
            if(block.id===arrsort[0].id){
                resultBlock.value.winnerId=arrsort[0].id;
            }
            if(block.id===slowBlock.id){
                resultBlock.value.looserId=slowBlock.id;
            }
            block.statistics.percent = Math.round(100 / slowBlockAvg * block.statistics.average * 100) / 100;
        }
    }
    const runTests2=async ()=>{
        state.app.testProgress = 0;
        removeBenchmarkScripts();
        showTestInProgress.value = true;
        iframe.value = window.document.createElement("iframe");
        iframe.value.style.display = "none";
        iframe.value.id = "iframe";
        document.body.appendChild(iframe.value);
        const content = iframe.value.contentWindow;
        loadScripts();
        const scriptBlock = document.createElement("script");
        let s = "";
        //Создаём функции для тестирования
        for (let item of codeBlocks.value) {
            let i = "function benchmark_" + item.id + "() {" + item.code_block + "}";
            s += i;
        }
        scriptBlock.type = "text/javascript";
        scriptBlock.text = s;
        scriptBlock.dataset.benchmark = "true";
        content.document.body.appendChild(scriptBlock);

        showTestInProgress.value=true;
        isEnabledResults.value=false;
        const totalTests=codeBlocks.value.length*state.app.countRounds;
        let completedTests=0;
        //Делаем промис-таймер для разблокировки ui,для отображения preloader
        sleep(1e3).then(()=>{
            return Promise.all(codeBlocks.value.map(async (codeBlock) => {
                codeBlock.result = [];
                for (let i = 0; i < state.app.countRounds; i++) {
                    let test = runTestForAmountOfTimeSecond(codeBlock.id);
                    test.then((res)=>{
                        if(res.runTime!==0&&!isNaN(res.runTime)){
                            codeBlock.result.push(res);
                        }

                    })
                    completedTests++;
                    state.app.testProgress = Math.round((100 * completedTests) / totalTests);
                    if (state.app.testProgress >= 100 && (state.app.testProgress = 100)) {
                        showTestInProgress.value=false;
                    }
                    await sleep(1000);
                }
                // Возвращаем  промис для обработки результатов выполнения кода внутри
                return Promise.resolve();
            }))
        }).then(() => {
            isEnabledResults.value=true;
            calcResults(true);
        });

    }
    const sleep= (ms)=> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    const isEnded=ref(false);
    const runTests=async ()=>{
        state.app.testProgress=0;
        resetResults();
        removeBenchmarkScripts();
        showTestInProgress.value=true;
        iframe.value=window.document.createElement('iframe');
        iframe.value.style.display="none";
        iframe.value.id="iframe";
        document.body.appendChild(iframe.value);
        const content=iframe.value.contentWindow;
        loadScripts();
        const sctiptBlock=document.createElement('script');
        let s="";
        let roundId=0;
        for (let item of codeBlocks.value) {
            item.benchmarks.startIndex=roundId;
            for (let round=0;round<state.app.countRounds;round++){
                let i = "function benchmark_" + roundId + "() {"  + item.code_block + "}";
                s += i
                roundId++;
            }
            item.benchmarks.endIndex=roundId-1;
        }
        sctiptBlock.type = "text/javascript";
        sctiptBlock.text = s;
        sctiptBlock.dataset.benchmark = "true";
        content.document.body.appendChild(sctiptBlock);
        const totalTests=codeBlocks.value.length*state.app.countRounds;
        let completedTests=0;
        showTestInProgress.value=true;
        isEnabledResults.value=false;
        sleep(1e3).then(()=>{
            return Promise.all(codeBlocks.value.map(async (codeBlock) => {
                codeBlock.result = [];
                for (let i = codeBlock.benchmarks.startIndex; i <= codeBlock.benchmarks.endIndex; i++) {
                    codeBlock.result.percent = 0;
                    let test = runTestForAmountOfTime(i, 1000, false); // Wait for the test to finish
                    test.then((res)=>{
                        if(res.counter!==0&&!isNaN(res.counter)){
                            codeBlock.result.push(res);
                        }
                    })
                    completedTests++;
                        state.app.testProgress = Math.round((100 * completedTests) / totalTests);
                        if (state.app.testProgress >= 100 && (state.app.testProgress = 100)) {
                            showTestInProgress.value=false;
                        }
                    await sleep(1000);
                }
                // Возвращаем  промис для обработки результатов выполнения кода внутри
                return Promise.resolve();

            }))
        }).then(() => {
            isEnabledResults.value=true;
            calcResults();
        });
    }

    const removeBenchmarkScripts=()=> {
        if(iframe.value&&(iframe.value.parentNode.removeChild(iframe.value))){
            iframe.value = null;
        }
    };

    const loadLibraryIntoIframe=(path)=>{
        const iframeComp=iframe.value.contentWindow;
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = path;
        iframeComp.document.body.appendChild(script);
    }

    const state=reactive({
        app:{
            testProgress:0,
            countRounds:1,
        },
        model:{
            timeToRun: 2e3,
            pausePerBlock: 700,
            title: "",
            errorMessage: null,
        }
    })
    const runnerTest=async ()=>{
        codeBlocks.value.map((code)=>code.typeOfTest=testType.value);
        if(testType.value.toLowerCase()==='итерации'){
            runTests();
        }
        else if(testType.value.toLowerCase()==='время'){
            runTests2();
        }
    }

    return{resultBlock,isEnabledResults,state,codeBlocks, testType,showTestInProgress,testsRounds,runTests,runTests2,addCodeBlock,removeCodeBlock,runnerTest}

}