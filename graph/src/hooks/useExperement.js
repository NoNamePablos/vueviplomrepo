import {computed, reactive, ref} from "vue";

export const useExperement=(props)=> {

    const testsRounds=ref(0);
    const doc=ref(null);
    const autoStartTimer=reactive(null);
    const autoStartCounter=reactive(null);
    const iframe=ref(null);
    const showTestInProgress=ref(false);
    const loadScripts=()=>{
        loadLibraryIntoIframe("https://code.jquery.com/jquery-3.4.1.min.js");
        loadLibraryIntoIframe("https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.8/angular.min.js");
        loadLibraryIntoIframe("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.14.1/lodash.min.js");
        console.log("scripts is loaded");
    }
    const codeBlocks=ref([{
        id:1,
        title:"code block 1",
        code_block: "",
        benchmarks:{
            startIndex:0,
            endIndex:0,
        },
        result:[]
    },{
        id:2,
        title:"code block 2",
        code_block: "",
        benchmarks:{
            startIndex:0,
            endIndex:0,
        },
        result:[]
    }])
    const blockAmount=computed(()=>{ return codeBlocks.value.length});
    const resetResults=()=> {
        codeBlocks.value.forEach((item)=>{
            item.result.amountOfRounds=0;
            item.result.percent=0;
        })
    }
    const addCodeBlock=()=>{
        let lastIndex=codeBlocks.value.length;
        const obj = {
            id: lastIndex + 1,
            title: "code block " + (codeBlocks.value.length + 1),
            code_block: "",
            benchmarks:{
                startIndex:0,
                endIndex:0,
            },
            result: []
        };
        codeBlocks.value.push(obj);
    }
    const removeCodeBlock=(id)=>{
        console.log(id);
        if(codeBlocks.value.length>1){
            console.log("id: ",id);
            codeBlocks.value=codeBlocks.value.filter(codeBlock=>codeBlock.id!=id);
        }
    }

    const runTestForAmountOfTime=(idx,timing,isRoundBenchmark=false)=> {
        let rounds = 0;
        //todo Работает добавление кода и его выполнения.Добавление код-блоков пока не реализовано!!!!
        let arr = [];
        let start = performance.now();
        let finish = performance.now();
        let functionCall = "benchmark_" + idx;
        if (!isRoundBenchmark) {
            start = performance.now();
            iframe.value.contentWindow[functionCall](arguments);
            finish = performance.now();
        } else {
            do {
                rounds++;
                iframe.value.contentWindow[functionCall](arguments);
                finish = performance.now();
            } while (finish - start < timing);
        }
        return {
            isRoundBenchmark: isRoundBenchmark,
            counter: rounds,
            runTime: finish - start,
            timer: finish
        }
    }

    const runTestForAmountOfTimeSecond=(idx)=>{

        let functionCall = "benchmark_" + idx;
        let start = performance.now();
        iframe.value.contentWindow[functionCall](arguments);
        let finish = performance.now();
        return{
            runTime: finish - start,
            timer: finish
        }
    }
  /*  const calcResult=()=>{
        for (var o of (this.model.winnerBlockId = e.id,
            this.model.codeBlocks))
            o.result.percent = Math.round(100 / t * o.result.amountOfRounds * 100) / 100
    }*/


    const runTests2=async ()=>{
        console.log("Zero");
        state.app.testProgress = 0;
        removeBenchmarkScripts();
        showTestInProgress.value = true;
        console.log(state.ui);
        iframe.value = window.document.createElement("iframe");
        iframe.value.style.display = "none";
        iframe.value.id = "iframe";
        document.body.appendChild(iframe.value);
        const content = iframe.value.contentWindow;
        console.log("Cnt: ", content);
        loadScripts();
        const scriptBlock = document.createElement("script");
        let s = "";
        let roundId = 0;
        //Создаём функции для тестирования
        for (let item of codeBlocks.value) {
            item.benchmarks.startIndex = roundId;
            for (let round = 0; round < state.app.countRounds; round++) {
                let i = "function benchmark_" + roundId + "() {" + item.code_block + "}";
                s += i;
                roundId++;
            }
            item.benchmarks.endIndex = roundId - 1;
        }
        scriptBlock.type = "text/javascript";
        scriptBlock.text = s;
        scriptBlock.dataset.benchmark = "true";
        content.document.body.appendChild(scriptBlock);

        showTestInProgress.value = true;
        const totalTests=codeBlocks.value.length*state.app.countRounds;
        let completedTests=0;
        //Делаем промис-таймер для разблокировки ui,для отображения preloader
        sleep(1e3).then(()=>{
            codeBlocks.value.map(async (codeBlock) => {
                codeBlock.result = [];
                for (let i = codeBlock.benchmarks.startIndex; i <= codeBlock.benchmarks.endIndex; i++) {
                    codeBlock.result.percent = 0;
                    let testTime = runTestForAmountOfTimeSecond(i);
                    codeBlock.result.push(testTime);
                    completedTests++;
                    state.app.testProgress = Math.round((100 * completedTests) / totalTests);
                    if (state.app.testProgress >= 100 && (state.app.testProgress = 100)) {
                        showTestInProgress.value=false;
                    }
                    await sleep(state.model.pausePerBlock);
                }
            })
        })
    }
    const sleep= (ms)=> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    const runTests=async ()=>{
        console.log("Zero");
        state.app.testProgress=0;
        removeBenchmarkScripts();
        showTestInProgress.value=true;
        console.log(state.ui);
        iframe.value=window.document.createElement('iframe');
        iframe.value.style.display="none";
        iframe.value.id="iframe";
        document.body.appendChild(iframe.value);
        const content=iframe.value.contentWindow;
        console.log("Cnt: ",content);
        loadScripts();
        const sctiptBlock=document.createElement('script');
        let s="";
        let roundId=0;
        //item_id id code blcok
        for (let item of codeBlocks.value) {
            item.benchmarks.startIndex=roundId;
            for (let round=0;round<state.app.countRounds;round++){

                /*var i = "function benchmark_" + item.id + "() {" + e.model.boilerplateBlock.code + r.code_block + "}";*/
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
        /*runTestForAmountOfTime*/
        const totalTests=codeBlocks.value.length*state.app.countRounds;
        let completedTests=0;
        showTestInProgress.value=true;
        sleep(1e3).then(()=>{
            codeBlocks.value.map(async (codeBlock) => {
                codeBlock.result = [];
                for (let i = codeBlock.benchmarks.startIndex; i < codeBlock.benchmarks.endIndex; i++) {
                    sleep(state.model.pausePerBlock).then(()=>{
                        codeBlock.result.percent = 0;
                        let test = runTestForAmountOfTime(i, state.model.timeToRun, true); // Wait for the test to finish
                        codeBlock.result.push(test);
                        completedTests++;
                        state.app.testProgress = Math.round((100 * completedTests) / totalTests);
                        if (state.app.testProgress > 100 && (state.app.testProgress = 100)) {
                            showTestInProgress.value=false;
                        }
                        console.log(codeBlocks.value);
                    })
                }
            })

        })
    }


    const releaseAutostart=()=> {
        if(autoStartTimer.value && clearInterval(autoStartTimer.value)){
            state.ui.showAutoStart = false;
        }
    }
    const removeBenchmarkScripts=()=> {
        if(iframe.value&&(iframe.value.parentNode.removeChild(iframe.value))){
            iframe.value = null;
        }
    };
  /*  const startAutoStart=() =>{
        state.ui.showAutoStart = true;
        let timing = 5900;
        autoStartTimer.value= setInterval(()=>{
            timing -= 100;
            autoStartCounter.value = parseInt(timing / 1e3),
            autoStartCounter.value <= 0 && this.runTests()
        }, 100)
    }*/


    const loadLibraryIntoIframe=(path)=>{
        const iframeComp=iframe.value.contentWindow;
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = path;
        iframeComp.document.body.appendChild(script);
    }

    const state=reactive({
        ui:{

            showAutoStart:false,
        },
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

    return{state,codeBlocks, showTestInProgress,testsRounds,runTests,runTests2,addCodeBlock,removeCodeBlock}

}