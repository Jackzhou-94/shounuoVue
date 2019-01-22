import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login: 'http://192.168.1.199:8099/supplychain/operator/login',//登录
        addmaterial: 'http://192.168.1.199:8099/supplychain/materialmessage/saveMaterialmessage',//添加原材料
        queryPage: 'http://192.168.1.199:8099/supplychain/materialmessage/queryPage',//原材料信息分页查询
    },
    mutations: {},
    actions: {}
})
