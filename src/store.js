import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login: 'http://192.168.1.199:8099/supplychain/operator/login',//登录
        addmaterial: 'http://192.168.1.199:8099/supplychain/materialmessage/saveMaterialmessage',//添加原材料
        upmaterial: 'http://192.168.1.199:8099/supplychain/materialmessage/updateMaterialmessage',//修改原材料
        queryPage: 'http://192.168.1.199:8099/supplychain/materialmessage/queryPage',//原材料信息分页查询
        delmaterials: 'http://192.168.1.199:8099/supplychain/materialmessage/deleteMaterialmessages',//根据ID删除原材料信息
        delmateropen: 'http://192.168.1.199:8099/supplychain/materialmessage/updateByIdOpen',//根据id启动原材料
        delmaterout:'http://192.168.1.199:8099/supplychain/materialmessage/updateByIdOut',//根据id停用原材料
},
    mutations: {},
    actions: {}
})
