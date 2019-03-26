import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login: 'http://192.168.1.199:8099/supplychain/operator/login',//登录
        addmaterial: 'http://192.168.1.199:8099/supplychain/materialmessage/save',//添加原材料
        upmaterial: 'http://192.168.1.199:8099/supplychain/materialmessage/update',//修改原材料
        queryPage: 'http://192.168.1.199:8099/supplychain/materialmessage/queryPage',//原材料信息分页查询
        delmaterials: 'http://192.168.1.199:8099/supplychain/materialmessage/updateByOut ',//根据ID把原材料信息放入回收站
        delmateropen: 'http://192.168.1.199:8099/supplychain/materialmessage/updateByIdOpen',//根据id启动原材料
        delmaterout: 'http://192.168.1.199:8099/supplychain/materialmessage/updateByIdOut',//根据id停用原材料
        selectRecycle: 'http://192.168.1.199:8099/supplychain/materialmessage/queryRecycle',//回收站列表
        updateByOpen: 'http://192.168.1.199:8099/supplychain/materialmessage/updateByOpen',//修改回收站中的原材料信息为可用信息

        goodsmessage: 'http://192.168.1.199:8099/supplychain/goodsmessage/queryPage',//商品信息分页查询
        addgoods: 'http://192.168.1.199:8099/supplychain/goodsmessage/save',//添加商品信息
        upgoods: 'http://192.168.1.199:8099/supplychain/goodsmessage/update',//修改商品信息
        delgoods: 'http://192.168.1.199:8099/supplychain/goodsmessage/updateByOut ',//根据ID把商品信息放入回收站
        goodsqueryRecycle: 'http://192.168.1.199:8099/supplychain/goodsmessage/queryRecycle',//回收站信息分页查询
        goodsByOpen: 'http://192.168.1.199:8099/supplychain/goodsmessage/updateByOpen',//恢复回收站中的商品信息为可用信息

        suppllierPage: 'http://192.168.1.199:8099/supplychain/supplier/queryPage',//供应商信息分页查询
        addSuppier: 'http://192.168.1.199:8099/supplychain/supplier/save',//新增供应商
        upSuppier: 'http://192.168.1.199:8099/supplychain/supplier/update',//修改供应商
        delSuppier: 'http://192.168.1.199:8099/supplychain/supplier/delete',//删除供应商信息
        suppllierSelect: 'http://192.168.1.199:8099/supplychain/supplier/select',//供应商列表信息

        factoryPage: 'http://192.168.1.199:8099/supplychain/factory/queryPage',//工厂信息分页查询
        addfactory: 'http://192.168.1.199:8099/supplychain/factory/save',//新增工厂信息
        upfactory: 'http://192.168.1.199:8099/supplychain/factory/update',//修改工厂信息
        delfactory: 'http://192.168.1.199:8099/supplychain/factory/delete',//删除工厂信息
        factoryselect: 'http://192.168.1.199:8099/supplychain/factory/select',//工厂列表信息

        purchaseQueryPage: 'http://192.168.1.199:8099/supplychain/purchase/goods/queryPage',//采购单分页查询（商品）
        addsavePurchase: 'http://192.168.1.199:8099/supplychain/purchase/goods/save',//添加采购单
        upaddsavePurchase: 'http://192.168.1.199:8099/supplychain/purchase/goods/update',//修改采购单
        queruPNumber: 'http://192.168.1.199:8099/supplychain/purchasedetail/goods/selectByPNumber',//根据采购单号查询当前批次信息
        deletepur: 'http://192.168.1.199:8099/supplychain/purchase/goods/delete',//根据ids删除采购单信息

        materialqueryPage: 'http://192.168.1.199:8099/supplychain/purchase/material/queryPage',//采购单分页查询（原材料）
        addmaterPurchase: 'http://192.168.1.199:8099/supplychain/purchase/material/save',//采购新建（原材料）
        delmater: 'http://192.168.1.199:8099/supplychain/purchase/material/delete',//删除采购单（原料）
        upmaterPurchase: 'http://192.168.1.199:8099/supplychain/purchase/material/update',//修改采购单(原料)
    },
    mutations: {},
    actions: {}
})
