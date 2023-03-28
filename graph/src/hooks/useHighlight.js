import hljs from 'highlight.js/lib/common';
/*import 'highlight.js/styles/monokai-sublime.css'*/
/*import 'highlight.js/styles/dark.css'*/
/*import 'highlight.js/styles/nord.css'*/
import 'highlight.js/styles/monokai.css';

import {onMounted, ref, watch} from "vue";
import {converterGarphLinks} from "@/components/vue-echarts/chart.helper";
export const useHighlight=()=>{
    onMounted(()=>{
        console.log("hljs.listLanguages(): ",hljs.listLanguages());
    })
    const highlightItem=ref(null);
    const selectedLanguage=ref({});
    const setLanguage=(item)=>{
        console.log(item);
        selectedLanguage.value=item;
        console.log("selected: ",selectedLanguage.value)

    }
    const hightlighting=(code)=>{
        console.log("sel: ",selectedLanguage.value);
        console.log(hljs.highlight(code, {language: selectedLanguage.value?.code, ignoreIllegals: true }))
        let s=hljs.highlight(code, {language: selectedLanguage.value?.code, ignoreIllegals: true });
       return s.value;
    }
    return{
        highlightItem,selectedLanguage,hightlighting,setLanguage
    }

}