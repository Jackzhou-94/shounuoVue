import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        getImage: 'http://supply.jiajiachuang.cn/supplychain/verify/getImage',//图片验证码
        login: 'http://supply.jiajiachuang.cn/supplychain/operator/login',//登录
        upPassWord: 'http://supply.jiajiachuang.cn/supplychain/operator/updatePassword',//修改密码
        addSaveOperator: 'http://supply.jiajiachuang.cn/supplychain/operator/add',//新增操作员
        updateState: 'http://supply.jiajiachuang.cn/supplychain/operator/updateState',//操作员停用启用
        OperatorQueryPages: 'http://supply.jiajiachuang.cn/supplychain/operator/getListPage',//操作员分页查询
        resetPassword: 'http://supply.jiajiachuang.cn/supplychain/operator/resetPassword',//批量重置密码
        deleteoperator: 'http://supply.jiajiachuang.cn/supplychain/operator/delete',//删除操作员
        updateoperator: 'http://supply.jiajiachuang.cn/supplychain/operator/update',//修改操作员信息

        addmaterial: 'http://supply.jiajiachuang.cn/supplychain/materialmessage/save',//添加原材料
        upmaterial: 'http://supply.jiajiachuang.cn/supplychain/materialmessage/update',//修改原材料
        queryPage: 'http://supply.jiajiachuang.cn/supplychain/materialmessage/queryPage',//原材料信息分页查询
        delmaterials: 'http://supply.jiajiachuang.cn/supplychain/materialmessage/updateByOut ',//根据ID把原材料信息放入回收站
        delmateropen: 'http://supply.jiajiachuang.cn/supplychain/materialmessage/updateByIdOpen',//根据id启动原材料
        delmaterout: 'http://supply.jiajiachuang.cn/supplychain/materialmessage/updateByIdOut',//根据id停用原材料
        selectRecycle: 'http://supply.jiajiachuang.cn/supplychain/materialmessage/queryRecycle',//回收站列表
        updateByOpen: 'http://supply.jiajiachuang.cn/supplychain/materialmessage/updateByOpen',//修改回收站中的原材料信息为可用信息

        goodsmessage: 'http://supply.jiajiachuang.cn/supplychain/goodsmessage/queryPage',//商品信息分页查询
        addgoods: 'http://supply.jiajiachuang.cn/supplychain/goodsmessage/save',//添加商品信息
        upgoods: 'http://supply.jiajiachuang.cn/supplychain/goodsmessage/update',//修改商品信息
        delgoods: 'http://supply.jiajiachuang.cn/supplychain/goodsmessage/updateByOut ',//根据ID把商品信息放入回收站
        goodsqueryRecycle: 'http://supply.jiajiachuang.cn/supplychain/goodsmessage/queryRecycle',//回收站信息分页查询
        goodsByOpen: 'http://supply.jiajiachuang.cn/supplychain/goodsmessage/updateByOpen',//恢复回收站中的商品信息为可用信息

        suppllierPage: 'http://supply.jiajiachuang.cn/supplychain/supplier/queryPage',//供应商信息分页查询
        addSuppier: 'http://supply.jiajiachuang.cn/supplychain/supplier/save',//新增供应商
        upSuppier: 'http://supply.jiajiachuang.cn/supplychain/supplier/update',//修改供应商
        delSuppier: 'http://supply.jiajiachuang.cn/supplychain/supplier/delete',//删除供应商信息
        suppllierSelect: 'http://supply.jiajiachuang.cn/supplychain/supplier/list',//供应商列表信息

        factoryPage: 'http://supply.jiajiachuang.cn/supplychain/factory/queryPage',//工厂信息分页查询
        addfactory: 'http://supply.jiajiachuang.cn/supplychain/factory/save',//新增工厂信息
        upfactory: 'http://supply.jiajiachuang.cn/supplychain/factory/update',//修改工厂信息
        delfactory: 'http://supply.jiajiachuang.cn/supplychain/factory/delete',//删除工厂信息
        factoryselect: 'http://supply.jiajiachuang.cn/supplychain/factory/select',//工厂列表信息

        purchaseQueryPage: 'http://supply.jiajiachuang.cn/supplychain/purchase/goods/queryPage',//采购单分页查询（商品）
        addsavePurchase: 'http://supply.jiajiachuang.cn/supplychain/purchase/goods/save',//添加采购单（商品）
        upaddsavePurchase: 'http://supply.jiajiachuang.cn/supplychain/purchase/goods/update',//修改采购单（商品）
        queruPNumber: 'http://supply.jiajiachuang.cn/supplychain/purchasedetail/goods/selectByPNumber',//根据采购单号查询当前批次信息（商品）
        deletepur: 'http://supply.jiajiachuang.cn/supplychain/purchase/goods/delete',//根据ids删除采购单信息（商品）

        materialqueryPage: 'http://supply.jiajiachuang.cn/supplychain/purchase/material/queryPage',//采购单分页查询（原材料）
        addmaterPurchase: 'http://supply.jiajiachuang.cn/supplychain/purchase/material/save',//采购新建（原材料）
        delmater: 'http://supply.jiajiachuang.cn/supplychain/purchase/material/delete',//删除采购单（原料）
        upmaterPurchase: 'http://supply.jiajiachuang.cn/supplychain/purchase/material/update',//修改采购单(原料)
        ProcurAudit: 'http://supply.jiajiachuang.cn/supplychain/purchase/material/updateSubmit',//采购单提交审核(原材料)
        ProcurementAudit: 'http://supply.jiajiachuang.cn/supplychain/purchase/material/updateAudit',//采购单审核通过(原材料)
        RejectMater: 'http://supply.jiajiachuang.cn/supplychain/purchase/material/updateUnaudit',//采购单审核驳回(原材料)
        ProcurAuditGoods: 'http://supply.jiajiachuang.cn/supplychain/purchase/goods/updateSubmit',//采购单提交审核(商品)
        goodsAudit: 'http://supply.jiajiachuang.cn/supplychain/purchase/goods/updateAudit',//采购单审核通过(商品)
        RejectGoods: 'http://supply.jiajiachuang.cn/supplychain/purchase/goods/updateUnaudit',//采购单审核驳回(商品)


        storageQuery: 'http://supply.jiajiachuang.cn/supplychain/warehouse/material/queryPage',//入库单分页查询
        Addstorage: 'http://supply.jiajiachuang.cn/supplychain/warehouse/material/save',//添加入库单
        Upstorage: 'http://supply.jiajiachuang.cn/supplychain/warehouse/material/update',//修改入库单
        deleteStorage: 'http://supply.jiajiachuang.cn/supplychain/warehouse/material/delete',//删除入库单
        storageAudit: 'http://supply.jiajiachuang.cn/supplychain/warehouse/material/updateSubmit',//入库单提交审核
        throughStorage: 'http://supply.jiajiachuang.cn/supplychain/warehouse/material/updateAudit',//入库单审核通过
        RejectStorage: 'http://supply.jiajiachuang.cn/supplychain/warehouse/material/updateUnAudit',//入库单审核驳回


        stockQuery: 'http://supply.jiajiachuang.cn/supplychain/warehouse/stock/material/queryPage',//库存分页查询

        AddPricess: 'http://supply.jiajiachuang.cn/supplychain/craft/insert',//工艺单保存接口
        upPricess: 'http://supply.jiajiachuang.cn/supplychain/craft/update',//工艺单修改保存接口
        PricessQueryPage: 'http://supply.jiajiachuang.cn/supplychain/craft/list',//工艺单分页查询接口
        PricessDetails: 'http://supply.jiajiachuang.cn/supplychain/craft/select',//工艺单详情数据
        delProce: 'http://supply.jiajiachuang.cn/supplychain/craft/delete',//删除工艺单信息
        deletedetail: 'http://supply.jiajiachuang.cn/supplychain/craft/deletedetail',//删除工艺单详情

        addProduction: 'http://supply.jiajiachuang.cn/supplychain/produceplan/save',//新建生产计划单
        upProduction: 'http://supply.jiajiachuang.cn/supplychain/produceplan/update',//修改生产计划单
        ProductionQueryPage: 'http://supply.jiajiachuang.cn/supplychain/produceplan/list',//生产计划单分页查询
        ProductionDetailQueryPage: 'http://supply.jiajiachuang.cn/supplychain/produceplan/detaillist',//生产计划单明细分页查询
        produceplanselect: 'http://supply.jiajiachuang.cn/supplychain/produceplan/select',//生产计划单单条明细查询
        produceplanSaveState: 'http://supply.jiajiachuang.cn/supplychain/produceplan/saveState',//生产计划单（提交审核，审核通过，审核拒绝）
        dispatchSaveState: 'http://supply.jiajiachuang.cn/supplychain/dispatch/saveState',//派工单（提交审核，审核通过，审核拒绝）


        basicInformationPro: 'http://supply.jiajiachuang.cn/supplychain/produceplan/select',//查询生产计划单基本信息
        deleteproduction: 'http://supply.jiajiachuang.cn/supplychain/produceplan/delete',//删除生产计划单

        factTechno: 'http://supply.jiajiachuang.cn/supplychain/factory/selectByTechnology',//根据职能查询工厂信息

        addDispatch: 'http://supply.jiajiachuang.cn/supplychain/dispatch/add',//新增派工单
        dispatchPage: 'http://supply.jiajiachuang.cn/supplychain/dispatch/list/produceDetail',//派工单分页查询
        delFaDisp: 'http://supply.jiajiachuang.cn/supplychain/dispatch/delete',//删除派工单

        addproducelog: 'http://supply.jiajiachuang.cn/supplychain/producelog/save',//新增生产日志
        producelogQueryPage: 'http://supply.jiajiachuang.cn/supplychain/producelog/list',//生产日志分页查询
        producelogDel: 'http://supply.jiajiachuang.cn/supplychain/producelog/delete',//生产日志删除
        upproducelog: 'http://supply.jiajiachuang.cn/supplychain/producelog/update',//修改生产日志

        addDelivProucts: 'http://supply.jiajiachuang.cn/supplychain/sendgoods/add',//半成品发货添加
        upDelivProucts: 'http://supply.jiajiachuang.cn/supplychain/sendgoods/save',//修改半成品发货
        selectSendgoods: 'http://supply.jiajiachuang.cn/supplychain/sendgoods/select',//根据id查询发货基本信息
        sendgoodsQueryPage: 'http://supply.jiajiachuang.cn/supplychain/sendgoods/list',//半成品发货分页查询
        deleteSendgoods: 'http://supply.jiajiachuang.cn/supplychain/sendgoods/delete',//半成品发货单删除


        addStockin: 'http://supply.jiajiachuang.cn/supplychain/stockin/add',//半成品入库新增
        stockinQuery: 'http://supply.jiajiachuang.cn/supplychain/stockin/list',//半成品入库分页查询
        selectstockin: 'http://supply.jiajiachuang.cn/supplychain/stockin/select',//根据id查询入库基本信息
        upselectstockin: 'http://supply.jiajiachuang.cn/supplychain/stockin/save',//修改入库基本信息
        delStockin: 'http://supply.jiajiachuang.cn/supplychain/stockin/delete',//半成品入库单删除

    },
    mutations: {},
    actions: {}
})
