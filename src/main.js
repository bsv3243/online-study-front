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
import {useLoginStore} from "@/store/LoginStore";

loadFonts()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App);

axios.defaults.withCredentials = true
axios.defaults.baseURL = "https://studybread.shop"
// axios.defaults.baseURL = "http://localhost:8080"


axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response && error.response.status) {
            const loginStore = useLoginStore();
            switch (error.response.status) {
                //401의 경우 메인화면 로그인 모달
                case 401:
                    loginStore.logout()
                    loginStore.setLoginDialog(true)
/*                    console.log(loginStore.getLoginDialog)
                    router.push("/")*/
                    return new Promise(() => {})
                default:
                    return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)

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
