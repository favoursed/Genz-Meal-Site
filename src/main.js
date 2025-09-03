import { createApp } from "vue";
import router from "./router";
import { createPinia } from "pinia"
import "./style.css";
import App from "./App.vue";
import * as filters from './filters'



const app = createApp(App);
const pinia = createPinia()
app.use(router).use(pinia).mount("#app");

app.config.globalProperties.$filters = filters