import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        getImage: 'https://supply.jiajiachuang.cn/supplychain/verify/getImage',//图片验证码
        login: 'https://supply.jiajiachuang.cn/supplychain/operator/login',//登录
        upPassWord: 'https://supply.jiajiachuang.cn/supplychain/operator/updatePassword',//修改密码
        addSaveOperator: 'https://supply.jiajiachuang.cn/supplychain/operator/add',//新增操作员
        updateState: 'https://supply.jiajiachuang.cn/supplychain/operator/updateState',//操作员停用启用
        OperatorQueryPages: 'https://supply.jiajiachuang.cn/supplychain/operator/getListPage',//操作员分页查询
        resetPassword: 'https://supply.jiajiachuang.cn/supplychain/operator/resetPassword',//批量重置密码
        deleteoperator: 'https://supply.jiajiachuang.cn/supplychain/operator/delete',//删除操作员
        updateoperator: 'https://supply.jiajiachuang.cn/supplychain/operator/update',//修改操作员信息

        addmaterial: 'https://supply.jiajiachuang.cn/supplychain/materialmessage/save',//添加原材料
        upmaterial: 'https://supply.jiajiachuang.cn/supplychain/materialmessage/update',//修改原材料
        queryPage: 'https://supply.jiajiachuang.cn/supplychain/materialmessage/queryPage',//原材料信息分页查询
        delmaterials: 'https://supply.jiajiachuang.cn/supplychain/materialmessage/updateByOut ',//根据ID把原材料信息放入回收站
        delmateropen: 'https://supply.jiajiachuang.cn/supplychain/materialmessage/updateByIdOpen',//根据id启动原材料
        delmaterout: 'https://supply.jiajiachuang.cn/supplychain/materialmessage/updateByIdOut',//根据id停用原材料
        selectRecycle: 'https://supply.jiajiachuang.cn/supplychain/materialmessage/queryRecycle',//回收站列表
        updateByOpen: 'https://supply.jiajiachuang.cn/supplychain/materialmessage/updateByOpen',//修改回收站中的原材料信息为可用信息

        goodsmessage: 'https://supply.jiajiachuang.cn/supplychain/goodsmessage/queryPage',//商品信息分页查询
        addgoods: 'https://supply.jiajiachuang.cn/supplychain/goodsmessage/save',//添加商品信息
        upgoods: 'https://supply.jiajiachuang.cn/supplychain/goodsmessage/update',//修改商品信息
        delgoods: 'https://supply.jiajiachuang.cn/supplychain/goodsmessage/updateByOut ',//根据ID把商品信息放入回收站
        goodsqueryRecycle: 'https://supply.jiajiachuang.cn/supplychain/goodsmessage/queryRecycle',//回收站信息分页查询
        goodsByOpen: 'https://supply.jiajiachuang.cn/supplychain/goodsmessage/updateByOpen',//恢复回收站中的商品信息为可用信息

        suppllierPage: 'https://supply.jiajiachuang.cn/supplychain/supplier/queryPage',//供应商信息分页查询
        addSuppier: 'https://supply.jiajiachuang.cn/supplychain/supplier/save',//新增供应商
        upSuppier: 'https://supply.jiajiachuang.cn/supplychain/supplier/update',//修改供应商
        delSuppier: 'https://supply.jiajiachuang.cn/supplychain/supplier/delete',//删除供应商信息
        suppllierSelect: 'https://supply.jiajiachuang.cn/supplychain/supplier/list',//供应商列表信息

        factoryPage: 'https://supply.jiajiachuang.cn/supplychain/factory/queryPage',//工厂信息分页查询
        addfactory: 'https://supply.jiajiachuang.cn/supplychain/factory/save',//新增工厂信息
        upfactory: 'https://supply.jiajiachuang.cn/supplychain/factory/update',//修改工厂信息
        delfactory: 'https://supply.jiajiachuang.cn/supplychain/factory/delete',//删除工厂信息
        factoryselect: 'https://supply.jiajiachuang.cn/supplychain/factory/select',//工厂列表信息

        purchaseQueryPage: 'https://supply.jiajiachuang.cn/supplychain/purchase/goods/queryPage',//采购单分页查询（商品）
        addsavePurchase: 'https://supply.jiajiachuang.cn/supplychain/purchase/goods/save',//添加采购单（商品）
        upaddsavePurchase: 'https://supply.jiajiachuang.cn/supplychain/purchase/goods/update',//修改采购单（商品）
        queruPNumber: 'https://supply.jiajiachuang.cn/supplychain/purchasedetail/goods/selectByPNumber',//根据采购单号查询当前批次信息（商品）
        deletepur: 'https://supply.jiajiachuang.cn/supplychain/purchase/goods/delete',//根据ids删除采购单信息（商品）

        materialqueryPage: 'https://supply.jiajiachuang.cn/supplychain/purchase/material/queryPage',//采购单分页查询（原材料）
        addmaterPurchase: 'https://supply.jiajiachuang.cn/supplychain/purchase/material/save',//采购新建（原材料）
        delmater: 'https://supply.jiajiachuang.cn/supplychain/purchase/material/delete',//删除采购单（原料）
        upmaterPurchase: 'https://supply.jiajiachuang.cn/supplychain/purchase/material/update',//修改采购单(原料)
        ProcurAudit: 'https://supply.jiajiachuang.cn/supplychain/purchase/material/updateSubmit',//采购单提交审核(原材料)
        ProcurementAudit: 'https://supply.jiajiachuang.cn/supplychain/purchase/material/updateAudit',//采购单审核通过(原材料)
        RejectMater: 'https://supply.jiajiachuang.cn/supplychain/purchase/material/updateUnaudit',//采购单审核驳回(原材料)
        ProcurAuditGoods: 'https://supply.jiajiachuang.cn/supplychain/purchase/goods/updateSubmit',//采购单提交审核(商品)
        goodsAudit: 'https://supply.jiajiachuang.cn/supplychain/purchase/goods/updateAudit',//采购单审核通过(商品)
        RejectGoods: 'https://supply.jiajiachuang.cn/supplychain/purchase/goods/updateUnaudit',//采购单审核驳回(商品)


        storageQuery: 'https://supply.jiajiachuang.cn/supplychain/warehouse/material/queryPage',//入库单分页查询
        Addstorage: 'https://supply.jiajiachuang.cn/supplychain/warehouse/material/save',//添加入库单
        Upstorage: 'https://supply.jiajiachuang.cn/supplychain/warehouse/material/update',//修改入库单
        deleteStorage: 'https://supply.jiajiachuang.cn/supplychain/warehouse/material/delete',//删除入库单
        storageAudit: 'https://supply.jiajiachuang.cn/supplychain/warehouse/material/updateSubmit',//入库单提交审核
        throughStorage: 'https://supply.jiajiachuang.cn/supplychain/warehouse/material/updateAudit',//入库单审核通过
        RejectStorage: 'https://supply.jiajiachuang.cn/supplychain/warehouse/material/updateUnAudit',//入库单审核驳回


        stockQuery: 'https://supply.jiajiachuang.cn/supplychain/warehouse/stock/material/queryPage',//库存分页查询

        AddPricess: 'https://supply.jiajiachuang.cn/supplychain/craft/insert',//工艺单保存接口
        upPricess: 'https://supply.jiajiachuang.cn/supplychain/craft/update',//工艺单修改保存接口
        PricessQueryPage: 'https://supply.jiajiachuang.cn/supplychain/craft/list',//工艺单分页查询接口
        PricessDetails: 'https://supply.jiajiachuang.cn/supplychain/craft/select',//工艺单详情数据
        delProce: 'https://supply.jiajiachuang.cn/supplychain/craft/delete',//删除工艺单信息
        deletedetail: 'https://supply.jiajiachuang.cn/supplychain/craft/deletedetail',//删除工艺单详情

        addProduction: 'https://supply.jiajiachuang.cn/supplychain/produceplan/save',//新建生产计划单
        upProduction: 'https://supply.jiajiachuang.cn/supplychain/produceplan/update',//修改生产计划单
        ProductionQueryPage: 'https://supply.jiajiachuang.cn/supplychain/produceplan/list',//生产计划单分页查询
        ProductionDetailQueryPage: 'https://supply.jiajiachuang.cn/supplychain/produceplan/detaillist',//生产计划单明细分页查询
        produceplanselect: 'https://supply.jiajiachuang.cn/supplychain/produceplan/select',//生产计划单单条明细查询
        produceplanSaveState: 'https://supply.jiajiachuang.cn/supplychain/produceplan/saveState',//生产计划单（提交审核，审核通过，审核拒绝）
        dispatchSaveState: 'https://supply.jiajiachuang.cn/supplychain/dispatch/saveState',//派工单（提交审核，审核通过，审核拒绝）


        basicInformationPro: 'https://supply.jiajiachuang.cn/supplychain/produceplan/select',//查询生产计划单基本信息
        deleteproduction: 'https://supply.jiajiachuang.cn/supplychain/produceplan/delete',//删除生产计划单

        factTechno: 'https://supply.jiajiachuang.cn/supplychain/factory/selectByTechnology',//根据职能查询工厂信息

        addDispatch: 'https://supply.jiajiachuang.cn/supplychain/dispatch/add',//新增派工单
        dispatchPage: 'https://supply.jiajiachuang.cn/supplychain/dispatch/list/produceDetail',//派工单分页查询
        delFaDisp: 'https://supply.jiajiachuang.cn/supplychain/dispatch/delete',//删除派工单

        addproducelog: 'https://supply.jiajiachuang.cn/supplychain/producelog/save',//新增生产日志
        producelogQueryPage: 'https://supply.jiajiachuang.cn/supplychain/producelog/list',//生产日志分页查询
        producelogDel: 'https://supply.jiajiachuang.cn/supplychain/producelog/delete',//生产日志删除
        upproducelog: 'https://supply.jiajiachuang.cn/supplychain/producelog/update',//修改生产日志

        addDelivProucts: 'https://supply.jiajiachuang.cn/supplychain/sendgoods/add',//半成品发货添加
        upDelivProucts: 'https://supply.jiajiachuang.cn/supplychain/sendgoods/save',//修改半成品发货
        selectSendgoods: 'https://supply.jiajiachuang.cn/supplychain/sendgoods/select',//根据id查询发货基本信息
        sendgoodsQueryPage: 'https://supply.jiajiachuang.cn/supplychain/sendgoods/list',//半成品发货分页查询
        deleteSendgoods: 'https://supply.jiajiachuang.cn/supplychain/sendgoods/delete',//半成品发货单删除


        addStockin: 'https://supply.jiajiachuang.cn/supplychain/stockin/add',//半成品入库新增
        stockinQuery: 'https://supply.jiajiachuang.cn/supplychain/stockin/list',//半成品入库分页查询
        selectstockin: 'https://supply.jiajiachuang.cn/supplychain/stockin/select',//根据id查询入库基本信息
        upselectstockin: 'https://supply.jiajiachuang.cn/supplychain/stockin/save',//修改入库基本信息
        delStockin: 'https://supply.jiajiachuang.cn/supplychain/stockin/delete',//半成品入库单删除

    },
    mutations: {},
    actions: {}
})
