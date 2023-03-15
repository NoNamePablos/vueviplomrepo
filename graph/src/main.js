import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import ui from '@/components/ui/index';
import {router} from "@/router/router";
import paper from "paper";



const app=createApp(App);
app.directive('paper', {
    mounted(el) {
        const paperScope = new paper.PaperScope();
        paperScope.setup(el);
        el.paperScope = paperScope;
    },

    unmounted(el) {
        el.paperScope.remove();
    },
});
app.use(router);
ui.forEach((uiItem)=>{
    app.component(uiItem.__name,uiItem)
})
app.mount('#app')
