import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import axios from 'axios'
import VueCookies from 'vue-cookies'



Vue.prototype.$axios=axios
require('./assets/icon/iconfont')


Vue.use(ElementUi)
Vue.use(VueCookies)
Vue.config.productionTip = false

/**
 * 请求拦截
 * */
axios.interceptors.request.use(
    config=>{
        let token=VueCookies.get('token')
        if (token!=null){
            config.headers['token']=token
        }
        return config
    }
)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
