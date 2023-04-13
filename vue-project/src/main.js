import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import ui from '@/components/ui/index';
const app=createApp(App);
ui.forEach((uiItem)=>{
    app.component(uiItem.__name,uiItem)
})
app.mount('#app3')
