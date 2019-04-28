import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login: 'http://192.168.1.131:8099/supplychain/operator/login',//登录
        upPassWord:'http://192.168.1.131:8099/supplychain/operator/updatePassword',//修改密码

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
        addsavePurchase: 'http://192.168.1.199:8099/supplychain/purchase/goods/save',//添加采购单（商品）
        upaddsavePurchase: 'http://192.168.1.199:8099/supplychain/purchase/goods/update',//修改采购单（商品）
        queruPNumber: 'http://192.168.1.199:8099/supplychain/purchasedetail/goods/selectByPNumber',//根据采购单号查询当前批次信息（商品）
        deletepur: 'http://192.168.1.199:8099/supplychain/purchase/goods/delete',//根据ids删除采购单信息（商品）

        materialqueryPage: 'http://192.168.1.199:8099/supplychain/purchase/material/queryPage',//采购单分页查询（原材料）
        addmaterPurchase: 'http://192.168.1.199:8099/supplychain/purchase/material/save',//采购新建（原材料）
        delmater: 'http://192.168.1.199:8099/supplychain/purchase/material/delete',//删除采购单（原料）
        upmaterPurchase: 'http://192.168.1.199:8099/supplychain/purchase/material/update',//修改采购单(原料)
        ProcurAudit: 'http://192.168.1.199:8099/supplychain/purchase/material/updateSubmit',//采购单提交审核(原材料)
        ProcurementAudit: 'http://192.168.1.199:8099/supplychain/purchase/material/updateAudit',//采购单审核通过(原材料)
        RejectMater: 'http://192.168.1.199:8099/supplychain/purchase/material/updateUnaudit',//采购单审核驳回(原材料)
        ProcurAuditGoods: 'http://192.168.1.199:8099/supplychain/purchase/goods/updateSubmit',//采购单提交审核(商品)
        goodsAudit: 'http://192.168.1.199:8099/supplychain/purchase/goods/updateAudit',//采购单审核通过(商品)
        RejectGoods: 'http://192.168.1.199:8099/supplychain/purchase/goods/updateUnaudit',//采购单审核驳回(商品)


        storageQuery: 'http://192.168.1.199:8099/supplychain/warehouse/material/queryPage',//入库单分页查询
        Addstorage: 'http://192.168.1.199:8099/supplychain/warehouse/material/save',//添加入库单
        Upstorage: 'http://192.168.1.199:8099/supplychain/warehouse/material/update',//修改入库单
        deleteStorage: 'http://192.168.1.199:8099/supplychain/warehouse/material/delete',//删除入库单
        storageAudit: 'http://192.168.1.199:8099/supplychain/warehouse/material/updateSubmit',//入库单提交审核
        throughStorage: 'http://192.168.1.199:8099/supplychain/warehouse/material/updateAudit',//入库单审核通过
        RejectStorage: 'http://192.168.1.199:8099/supplychain/warehouse/material/updateUnSubmit',//入库单审核驳回


        stockQuery: 'http://192.168.1.199:8099/supplychain/warehouse/stock/material/queryPage',//库存分页查询

        AddPricess:'http://192.168.2.112:8099/supplychain/craft/save',//工艺单保存接口
        PricessQueryPage:'http://192.168.1.131:8099/supplychain/craft/list',//工艺单分页查询接口
        PricessDetails:'http://192.168.1.131:8099/supplychain/craft/select',//工艺单详情数据
        delProce:'http://192.168.1.131:8099/supplychain/craft/delete',//删除工艺单信息

        addProduction:'http://192.168.1.131:8099/supplychain/produceplan/save',//保存生产计划单
        ProductionQueryPage:'http://192.168.1.131:8099/supplychain/produceplan/list',//生产计划单分页查询
        basicInformationPro:'http://192.168.1.131:8099/supplychain/produceplan/select',//查询生产计划单基本信息
        deleteproduction:'http://192.168.2.112:8099/supplychain/produceplan/delete',//删除生产计划单

        factTechno:'http://192.168.1.199:8099/supplychain/factory/selectByTechnology',//根据职能查询工厂信息

        addDispatch:'http://192.168.1.131:8099/supplychain/dispatch/add',//新增派工单
        dispatchPage:'http://192.168.1.131:8099/supplychain/dispatch/list',//派工单分页查询
        delFaDisp:'http://192.168.1.131:8099/supplychain/dispatch/delete',//删除派工单

},
    mutations: {},
    actions: {}
})
