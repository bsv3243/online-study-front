import {Global} from "@/method/Global"

export default {
    install : (app) => {
        app.config.globalProperties.$global = Global
    }
}