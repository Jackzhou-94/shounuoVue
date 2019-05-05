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
import './less/Style.less'
import {Loading} from 'element-ui'
import md5 from 'js-md5'
import VCharts from 'v-charts'

Vue.prototype.$md5 = md5
axios.defaults.withCredentials = true; //意思是携带cookie信息,保持session的一致性
Vue.prototype.$axios = axios
require('./assets/icon/iconfont')


Vue.use(ElementUi)
Vue.use(VueCookies)
Vue.use(VCharts)
Vue.config.productionTip = false

// axios.defaults.timeout = 10;//全局请求超时


/**
 * 请求拦截
 * */
axios.interceptors.request.use(
    config => {
        // let token = VueCookies.get('token')
        // if (token != null) {
        //     config.headers['token'] = token
        // }

        // const loading = this.$loading({
        //     lock: true,
        //     text: 'Loading',
        //     spinner: 'el-icon-loading',
        //     background: 'rgba(0, 0, 0, 0.7)'
        // });
        Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        })
        return config
    }
)

// 响应拦截（配置请求回来的信息）
axios.interceptors.response.use(response => {
    let loadingInstance = Loading.service();
    // 处理响应数据
    setTimeout(function () {
        loadingInstance.close();
        if (response) {
            loadingInstance.close();
        }
    }, 500)
    return response;

}, function (error) {
    let loadingInstance = Loading.service();
    // 处理响应失败
    setTimeout(function () {
        if (error) {
            alert('服务器连接异常')
            loadingInstance.close();
            throw error

        }
    }, 5000)
    return Promise.reject(error);
});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
