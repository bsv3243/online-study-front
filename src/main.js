import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from "./router/router"
import axios from 'axios'
import VueCookies from "vue-cookies"
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import GlobalPlugin from "@/method/GlobalPlugin";


loadFonts()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App);

axios.defaults.withCredentials = true

app.config.globalProperties.axios = axios;
app
    .use(router)
    .use(pinia)
    .use(VueCookies)
    .use(vuetify)
    .use(GlobalPlugin)
    .mount('#app')

// createApp(App)
//     .use(router)
//   .use(vuetify)
//   .mount('#app')
