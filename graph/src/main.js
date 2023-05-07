import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import ui from '@/components/ui/index';
import {router} from "@/router/router";

const app=createApp(App);
app.use(router);
ui.forEach((uiItem)=>{
    app.component(uiItem.__name,uiItem)
})
app.mount('#app')
