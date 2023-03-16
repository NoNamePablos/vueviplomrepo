import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import PaperDirecrive from "@/directives/PaperDirecrive";
const app=createApp(App);
app.directive('paper',PaperDirecrive);
app.mount('#app')
