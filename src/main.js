import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from "./router/router"
import axios from 'axios'

loadFonts()

const app = createApp(App);

app.config.globalProperties.axios = axios;
app.use(router).use(vuetify).mount('#app')

// createApp(App)
//     .use(router)
//   .use(vuetify)
//   .mount('#app')
