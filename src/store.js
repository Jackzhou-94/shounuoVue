import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login: 'http://192.168.1.199:8099/supplychain/operator/login',//登录
        addmaterial: 'http://192.168.1.199:8099/supplychain/materialmessage/saveMaterialmessage',//添加原材料
        upmaterial: 'http://192.168.1.199:8099/supplychain/materialmessage/updateMaterialmessage',//修改原材料
        queryPage: 'http://192.168.1.199:8099/supplychain/materialmessage/queryPage',//原材料信息分页查询
        delmaterials: 'http://192.168.1.199:8099/supplychain/materialmessage/updateByOut ',//根据ID把原材料信息放入回收站
        delmateropen: 'http://192.168.1.199:8099/supplychain/materialmessage/updateByIdOpen',//根据id启动原材料
        delmaterout: 'http://192.168.1.199:8099/supplychain/materialmessage/updateByIdOut',//根据id停用原材料
        selectRecycle: 'http://192.168.1.199:8099/supplychain/materialmessage/queryRecycle',//回收站列表
        updateByOpen: 'http://192.168.1.199:8099/supplychain/materialmessage/updateByOpen',//修改回收站中的原材料信息为可用信息

        goodsmessage: 'http://192.168.1.199:8099/supplychain/goodsmessage/queryPage',//商品信息分页查询
        addgoods: 'http://192.168.1.199:8099/supplychain/goodsmessage/saveGoodsmessage',//添加商品信息
        upgoods: 'http://192.168.1.199:8099/supplychain/goodsmessage/updateGoodsmessage',//修改商品信息
        delgoods: 'http://192.168.1.199:8099/supplychain/goodsmessage/updateByOut ',//根据ID把商品信息放入回收站
        goodsqueryRecycle: 'http://192.168.1.199:8099/supplychain/goodsmessage/queryRecycle',//回收站信息分页查询
        goodsByOpen: 'http://192.168.1.199:8099/supplychain/goodsmessage/updateByOpen',//恢复回收站中的商品信息为可用信息

        suppllierPage:'http://192.168.1.199:8099/supplychain/suppllier/queryPage',//供应商信息分页查询
        addSuppier:'http://192.168.1.199:8099/supplychain/suppllier/saveSuppllier' ,//新增供应商
        upSuppier:'http://192.168.1.199:8099/supplychain/suppllier/updateSuppllier',//修改供应商
        delSuppier:'http://192.168.1.199:8099/supplychain/suppllier/deleteSuppllier',//删除供应商信息
},
    mutations: {},
    actions: {}
})
