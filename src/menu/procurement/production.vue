<template>
    <div class="production">
        <!--查询条件-->
        <div class="Query">

            <div style="display: flex;justify-content: space-between;align-items: center">
                <el-date-picker
                        v-model="start"
                        type="datetime"
                        placeholder="选择日期"
                        size="small"
                        format="yyyy-MM-dd HH:mm"
                >
                </el-date-picker>
                <span>至</span>
                <el-date-picker
                        v-model="end"
                        type="datetime"
                        placeholder="选择日期"
                        size="small"
                        format="yyyy-MM-dd HH:mm"
                >
                </el-date-picker>

                <el-select v-model="warehouse" placeholder="仓库" size="small" @change="serea">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>


                <el-select v-model="supplier" placeholder="供应商" size="small">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-input
                        class="inputSelect"
                        size="small"
                        placeholder="采购单号"
                        v-model="PurchaseOrder">
                </el-input>
                <el-input
                        class="inputSelect"
                        size="small"
                        placeholder="SKU编码"
                        v-model="SKUNum">
                </el-input>
                <el-input
                        class="inputSelect"
                        size="small"
                        placeholder="备注"
                        v-model="note">
                </el-input>
            </div>


            <div style="display: flex;justify-content: space-between">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="query">搜索</el-button>
                <el-button type="primary" size="mini">重置</el-button>
            </div>
        </div>
        <!--操作按钮-->
        <div class="operationBtn">
            <el-button size="mini" @click="addgoods = true"><i class="fontFamily hhtx-icon-test1"></i><span>新建</span>
            </el-button>
            <el-button size="mini"><i class="fontFamily hhtx-xiugai"></i><span>批量修改</span></el-button>
            <el-button size="mini"><i class="fontFamily hhtx-fuzhi"></i><span>复制</span></el-button>
            <el-button size="mini"><i class="fontFamily hhtx-tiaoxingma"></i><span>条形码</span></el-button>
            <el-button size="mini"><i class="fontFamily hhtx-qiyong"></i><span>启用</span></el-button>
            <el-button size="mini"><i class="fontFamily hhtx-ban"></i><span>禁用</span></el-button>
            <el-button size="mini"><i class="fontFamily hhtx-icon-p_mrpcanshushezhi"></i><span>参数设置</span></el-button>

        </div>


        <div class="tabaData">

            <!--表格数据-->
            <el-table
                    ref="multipleTable"
                    :data="queryArr"
                    tooltip-effect="dark"
                    border
                    highlight-current-row
                    :max-height="MaxHeight"
                    @selection-change="handleSelectionChange"

            >
                <el-table-column
                        type="selection"
                        width="55"
                >
                </el-table-column>
                <el-table-column
                        type="index"
                        align="center"
                        width="50"
                >
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        width="80"
                >
                    <template slot-scope="scope">
                        <!--<el-button-->
                                <!--type="text"-->
                                <!--size="small">-->
                            <!--编辑-->
                        <!--</el-button>-->
                        <el-button
                                type="text"
                                size="small"
                                @click="removeData(scope.row)"
                        >
                            移除
                        </el-button>
                    </template>

                </el-table-column>


                <!--{-->
                <!--sync: '自动同步',//同步状态-->
                <!--Reviewthestatus: '已审核',//审核状态-->
                <!--关闭status: '已关闭',//关闭状态-->
                <!--warehouse: '北京',//仓库-->
                <!--WarehouseNumber: 0,//入库次数-->
                <!--PurchaseOrder: 'CG2018-1000038',//采购单号-->
                <!--OrderType: '销采拿货',//订单类型-->
                <!--DatePurchase: '2018-10-22 16:36:42',//采购日期-->
                <!--CommodityType: '成品',//商品类型-->
                <!--note: '由缺货订单生成',//备注-->
                <!--MakingPeople: 'admin',//制单人-->
                <!--OnSingle: 'admin',//审单人-->
                <!--AuditTime: '2018-10-22 16:37:01',//审核时间-->
                <!--CreationTime: '2018-10-22 16:37:01'//创建时间-->

                <!--}-->
                <el-table-column
                        label="同步状态"
                        width="120"
                        align="center"
                >
                    <template slot-scope="scope">{{ scope.row.sync }}</template>
                </el-table-column>
                <el-table-column
                        prop="Reviewthestatus"
                        label="审核状态"
                        width="120"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="closedStatus"
                        label="关闭状态"
                        align="center"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="warehouse"
                        label="仓库"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="WarehouseNumber"
                        label="入库次数"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="PurchaseOrder"
                        align="center"
                        label="采购单号"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="OrderType"
                        align="center"
                        label="订单类型"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="DatePurchase"
                        align="center"
                        label="采购日期"
                        width="160">
                    <template slot-scope="scope">
                        {{scope.row.DatePurchase|Time}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="CommodityType"
                        align="center"
                        label="商品类型"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="note"
                        align="center"
                        label="备注"
                        width="120">
                </el-table-column>

                <el-table-column
                        prop="contract"
                        align="center"
                        label="合同条款"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="送货地址"
                        width="260">
                    <template slot-scope="scope">
                        <span>{{scope.row.province}}</span>
                        <span>{{scope.row.city}}</span>
                        <span>{{scope.row.county}}</span>
                        <span>{{scope.row.DetailedAddress}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="MakingPeople"
                        align="center"
                        label="制单人"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="OnSingle"
                        align="center"
                        label="审核人"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="AuditTime"
                        align="center"
                        label="审核时间"
                        width="160">
                    <template slot-scope="scope">
                        {{scope.row.AuditTime=undefined?'暂未审核':scope.row.AuditTime}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="CreationTime"
                        align="center"
                        label="创建时间"
                        width="160">
                </el-table-column>
            </el-table>
            <!--展开收起数据-->
            <el-tag type="info">
                <i :class="openIcon" @click="open"></i>
            </el-tag>

            <!--分页-->
            <div class="pagination">
                <span>已选中{{num}}条</span>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-size="100"
                        layout="prev, pager, next, jumper"
                        :total="1000">
                </el-pagination>
            </div>

        </div>

        <!--新建-->
        <el-dialog
                title="新建"
                :visible.sync="addgoods"
                width="80%"
                :before-close="handleClose">
            <div style="width: 100%">


                <el-form :inline="true" :model="numberValidateForm" ref="numberValidateForm">
                    <el-form-item label="采购日期：" prop="DatePurchase"
                                  :rules="[
                { required: true, message: '请选择日期'},

    ]"
                    >
                        <el-date-picker type="date" placeholder="选择日期"
                                        v-model="numberValidateForm.DatePurchase"></el-date-picker>
                    </el-form-item>

                    <el-form-item label="商品类型：" prop="CommodityType">
                        <el-select v-model="numberValidateForm.CommodityType" placeholder="请选择">
                            <el-option label="成品" value="成品"></el-option>
                            <el-option label="半成品" value="半成品"></el-option>
                            <el-option label="原料" value="原料"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="订单类型：" prop="OrderType" required>
                        <el-input v-model="numberValidateForm.OrderType" :disabled="true">普通采购</el-input>
                    </el-form-item>

                    <el-form-item
                            label="合同条款："
                            prop="contract"
                    >
                        <el-input v-model="numberValidateForm.contract"></el-input>
                    </el-form-item>


                    <el-form-item label="供应商：" prop="Addsupplier">
                        <el-select v-model="numberValidateForm.Addsupplier">
                            <el-option label="1" value="1"></el-option>
                            <el-option label="2" value="2"></el-option>
                        </el-select>
                    </el-form-item>


                    <el-form-item label="送货地址：" prop="songhuodizhi" ref="ShippingAddress">
                        <el-cascader

                                size="large"
                                :options="option"
                                v-model="numberValidateForm.ShippingAddress"
                                @change="handleChange">
                        </el-cascader>

                    </el-form-item>

                    <el-form-item>
                        <el-input placeholder="详细地址" v-model="numberValidateForm.DetailedAddress"></el-input>
                    </el-form-item>

                    <el-form-item label="仓库：" prop="warehouse"
                                  :rules="[ { required: true, message: '请选择仓库', trigger: 'change' }]"
                    >
                        <el-select v-model="numberValidateForm.warehouse">
                            <el-option label="换货仓" value="换货仓"></el-option>
                            <el-option label="北京" value="北京"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="备注：" prop="note">
                        <el-input v-model="numberValidateForm.note"></el-input>
                    </el-form-item>


                </el-form>

            </div>

            <span slot="footer" class="dialog-footer">
    <el-button @click="addgoods = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('numberValidateForm')">确 定</el-button>
  </span>
        </el-dialog>


        <!--操作按钮-->
        <!--<div class="operationBtn">-->
        <!--&lt;!&ndash;<el-button size="mini"><i class="fontFamily hhtx-icon-test1"></i><span>新建</span></el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button size="mini"><i class="fontFamily hhtx-xiugai"></i><span>批量修改</span></el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button size="mini"><i class="fontFamily hhtx-fuzhi"></i><span>复制</span></el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button size="mini"><i class="fontFamily hhtx-zuhe"></i><span>转组合商品</span></el-button>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-button size="mini"><i class="fontFamily hhtx-shuxing"></i><span>属性组</span></el-button>&ndash;&gt;-->


        <!--</div>-->
        <hr>
        <!--货品详情-->
        <div class="tabaData">
            <div style="width: 100%;text-align: left">
                <el-tag type="info">采购订单明细</el-tag>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="SKU"
                    id="out-table"
                    border
                    highlight-current-row
                    tooltip-effect="dark"
                    :max-height="itemdetails"
                    @selection-change="handleSelectionChange"

            >
                <el-table-column
                        type="selection"
                        width="55"
                >
                </el-table-column>
                <el-table-column
                        type="index"
                        align="center"
                        width="50"
                >
                </el-table-column>


                <el-table-column
                        label="图片"
                        width="120"
                        align="center"
                >
                    <template slot-scope="scope">
                        <el-popover
                                placement="top-start"
                                width="200"
                                trigger="hover"
                        >
                            <img style="width: 300px;height: 300px" :src=scope.row.img>
                            <img slot="reference" style="width: 50px;height: 50px" :src=scope.row.img>
                        </el-popover>


                        <!--<img style="width: 100px;height: 100px" :src=scope.row.img>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="skubianma"
                        label="SKU编码"
                        width="120"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="tiaoxingma"
                        label="计划采购数量"
                        align="center"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="shangjiabianma"
                        label="换货数量"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="shifouzengping"
                        label="调整数量"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="shifouqiyong"
                        align="center"
                        label="实际采购数量"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="zuheshangping"
                        align="center"
                        label="实际入库数量"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="yanse"
                        align="center"
                        label="供应商确认"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="chima"
                        align="center"
                        label="配货数量"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="chengbenjia"
                        align="center"
                        label="商品编码"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="jiesuanjia"
                        align="center"
                        label="颜色"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="chengbenhesuanfangfa"
                        align="center"
                        label="尺码"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="xiaoshoujia"
                        align="center"
                        label="采购员"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="caigouzhouqi"
                        align="center"
                        label="供应商"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="shenheshijian"
                        align="center"
                        label="计划采购价"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="chuangjianshijian"
                        align="center"
                        label="实际采购价"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="caigouyuan"
                        align="center"
                        label="供应商确认"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="caigouzhouqi"
                        align="center"
                        label="采购周期"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="xianggui"
                        align="center"
                        label="预计到货日"
                        width="160">
                </el-table-column>

            </el-table>

            <!--展开收起数据-->
            <el-tag type="info">
                <i :class="opendetailsIcon" @click="opendetails"></i>
            </el-tag>
            <!--分页-->
            <div class="pagination">
                <span>已选中{{num}}条</span>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-size="100"
                        layout="prev, pager, next, jumper"
                        :total="1000">
                </el-pagination>
            </div>

        </div>

    </div>
</template>

<script>

    import {regionDataPlus, CodeToText} from 'element-china-area-data'


    export default {
        name: "production",
        data() {
            return {
                itemdetails: 300,//默认货品详情的最大高度
                MaxHeight: 300,//默认表格数据最大高度
                openIcon: 'fontFamily hhtx-zhankai',//默认为展开的按钮
                opendetailsIcon: 'fontFamily hhtx-zhankai',
                option: regionDataPlus,
                selectedOptions: [],
                //新建品牌
                addbrand: {},
                innerVisible: false,
                numberValidateForm: {
                    sync: '',//同步状态
                    Reviewthestatus: '',//审核状态
                    address: '',
                    warehouse: '',//仓库
                    Addsupplier: '',//供应商
                    ShippingAddress: [],//送货地址
                    province: '',//省
                    city: '',//城市
                    county: '',//区县
                    DetailedAddress: '',//详细地址
                    WarehouseNumber: '',//入库次数
                    PurchaseOrder: '',//采购单号
                    OrderType: '普通采购',//订单类型
                    DatePurchase: '',//采购日期
                    CommodityType: '',//商品类型
                    note: '',//备注
                    MakingPeople: '',//制单人
                    OnSingle: '',//审单人
                    AuditTime: '',//审核时间
                    CreationTime: '', //创建时间
                    contract: '',//合同条款
                },
                start: '',//开始时间
                end: '',//结束时间
                options: [
                    {
                        value: '换货仓',
                        label: '换货仓'
                    }, {
                        value: '北京',
                        label: '北京'
                    }],
                num: '0',//选中的条目数
                warehouse: '',//仓库
                PurchaseOrder: '',//采购单号
                SKUNum: '',//SKU编码
                supplier: '',//供应商
                note: '',//备注
                addgoods: false,
                tableData3: [
                    {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '北京',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '上海',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '换货仓',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '换货仓',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '换货仓',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '上海',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '北京',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '换货仓',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '换货仓',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '北京',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '北京',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '换货仓',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '北京',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }],
                queryArr: [
                    {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '北京',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '上海',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '换货仓',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '换货仓',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '换货仓',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '上海',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '北京',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '换货仓',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '换货仓',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '北京',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '北京',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '换货仓',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }, {
                        sync: '自动同步',//同步状态
                        Reviewthestatus: '已审核',//审核状态
                        closedStatus: '已关闭',//关闭状态
                        warehouse: '北京',//仓库
                        WarehouseNumber: 0,//入库次数
                        PurchaseOrder: 'CG2018-1000038',//采购单号
                        OrderType: '销采拿货',//订单类型
                        DatePurchase: '2018-10-22 16:36:42',//采购日期
                        CommodityType: '成品',//商品类型
                        note: '由缺货订单生成',//备注
                        contract: '',//合同条款
                        ShippingAddress: '',//送货地址
                        MakingPeople: 'admin',//制单人
                        OnSingle: 'admin',//审单人
                        AuditTime: '2018-10-22 16:37:01',//审核时间
                        CreationTime: '2018-10-22 16:37:01'//创建时间

                    }],
                SKU: [
                    {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '112140446',
                        tiaoxingma: '10000',
                        shangjiabianma: '0',
                        shifouzengping: '0',
                        shifouqiyong: '0',
                        zuheshangping: '0',
                        shenheshijian: '2',
                        yanse: '2',
                        chima: '0',

                        chengbenjia: 'bruce',
                        jiesuanjia: '白色',
                        chengbenhesuanfangfa: 'm',
                        chuangjianshijian: '0',
                        xiaoshoujia: '',
                        caigouzhouqi: '0',
                        caigouyuan: '0',
                        xianggui: '2018-12-22',
                        guige: '2018-12-22'
                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '112140446',
                        tiaoxingma: '10000',
                        shangjiabianma: '0',
                        shifouzengping: '0',
                        shifouqiyong: '0',
                        zuheshangping: '0',
                        shenheshijian: '2',
                        yanse: '2',
                        chima: '0',

                        chengbenjia: 'bruce',
                        jiesuanjia: '白色',
                        chengbenhesuanfangfa: 'm',
                        chuangjianshijian: '0',
                        xiaoshoujia: '',
                        caigouzhouqi: '0',
                        caigouyuan: '0',
                        xianggui: '2018-12-22',
                        guige: '2018-12-22'
                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '112140446',
                        tiaoxingma: '10000',
                        shangjiabianma: '0',
                        shifouzengping: '0',
                        shifouqiyong: '0',
                        zuheshangping: '0',
                        shenheshijian: '2',
                        yanse: '2',
                        chima: '0',

                        chengbenjia: 'bruce',
                        jiesuanjia: '白色',
                        chengbenhesuanfangfa: 'm',
                        chuangjianshijian: '0',
                        xiaoshoujia: '',
                        caigouzhouqi: '0',
                        caigouyuan: '0',
                        xianggui: '2018-12-22',
                        guige: '2018-12-22'

                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '112140446',
                        tiaoxingma: '10000',
                        shangjiabianma: '0',
                        shifouzengping: '0',
                        shifouqiyong: '0',
                        zuheshangping: '0',
                        shenheshijian: '2',
                        yanse: '2',
                        chima: '0',

                        chengbenjia: 'bruce',
                        jiesuanjia: '白色',
                        chengbenhesuanfangfa: 'm',
                        chuangjianshijian: '0',
                        xiaoshoujia: '',
                        caigouzhouqi: '0',
                        caigouyuan: '0',
                        xianggui: '2018-12-22',
                        guige: '2018-12-22'
                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '112140446',
                        tiaoxingma: '10000',
                        shangjiabianma: '0',
                        shifouzengping: '0',
                        shifouqiyong: '0',
                        zuheshangping: '0',
                        shenheshijian: '2',
                        yanse: '2',
                        chima: '0',

                        chengbenjia: 'bruce',
                        jiesuanjia: '白色',
                        chengbenhesuanfangfa: 'm',
                        chuangjianshijian: '0',
                        xiaoshoujia: '',
                        caigouzhouqi: '0',
                        caigouyuan: '0',
                        xianggui: '2018-12-22',
                        guige: '2018-12-22'
                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '112140446',
                        tiaoxingma: '10000',
                        shangjiabianma: '0',
                        shifouzengping: '0',
                        shifouqiyong: '0',
                        zuheshangping: '0',
                        shenheshijian: '2',
                        yanse: '2',
                        chima: '0',

                        chengbenjia: 'bruce',
                        jiesuanjia: '白色',
                        chengbenhesuanfangfa: 'm',
                        chuangjianshijian: '0',
                        xiaoshoujia: '',
                        caigouzhouqi: '0',
                        caigouyuan: '0',
                        xianggui: '2018-12-22',
                        guige: '2018-12-22'

                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '112140446',
                        tiaoxingma: '10000',
                        shangjiabianma: '0',
                        shifouzengping: '0',
                        shifouqiyong: '0',
                        zuheshangping: '0',
                        shenheshijian: '2',
                        yanse: '2',
                        chima: '0',

                        chengbenjia: 'bruce',
                        jiesuanjia: '白色',
                        chengbenhesuanfangfa: 'm',
                        chuangjianshijian: '0',
                        xiaoshoujia: '',
                        caigouzhouqi: '0',
                        caigouyuan: '0',
                        xianggui: '2018-12-22',
                        guige: '2018-12-22'
                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '112140446',
                        tiaoxingma: '10000',
                        shangjiabianma: '0',
                        shifouzengping: '0',
                        shifouqiyong: '0',
                        zuheshangping: '0',
                        shenheshijian: '2',
                        yanse: '2',
                        chima: '0',

                        chengbenjia: 'bruce',
                        jiesuanjia: '白色',
                        chengbenhesuanfangfa: 'm',
                        chuangjianshijian: '0',
                        xiaoshoujia: '',
                        caigouzhouqi: '0',
                        caigouyuan: '0',
                        xianggui: '2018-12-22',
                        guige: '2018-12-22'
                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '112140446',
                        tiaoxingma: '10000',
                        shangjiabianma: '0',
                        shifouzengping: '0',
                        shifouqiyong: '0',
                        zuheshangping: '0',
                        shenheshijian: '2',
                        yanse: '2',
                        chima: '0',

                        chengbenjia: 'bruce',
                        jiesuanjia: '白色',
                        chengbenhesuanfangfa: 'm',
                        chuangjianshijian: '0',
                        xiaoshoujia: '',
                        caigouzhouqi: '0',
                        caigouyuan: '0',
                        xianggui: '2018-12-22',
                        guige: '2018-12-22'
                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '112140446',
                        tiaoxingma: '10000',
                        shangjiabianma: '0',
                        shifouzengping: '0',
                        shifouqiyong: '0',
                        zuheshangping: '0',
                        shenheshijian: '2',
                        yanse: '2',
                        chima: '0',

                        chengbenjia: 'bruce',
                        jiesuanjia: '白色',
                        chengbenhesuanfangfa: 'm',
                        chuangjianshijian: '0',
                        xiaoshoujia: '',
                        caigouzhouqi: '0',
                        caigouyuan: '0',
                        xianggui: '2018-12-22',
                        guige: '2018-12-22'
                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '112140446',
                        tiaoxingma: '10000',
                        shangjiabianma: '0',
                        shifouzengping: '0',
                        shifouqiyong: '0',
                        zuheshangping: '0',
                        shenheshijian: '2',
                        yanse: '2',
                        chima: '0',

                        chengbenjia: 'bruce',
                        jiesuanjia: '白色',
                        chengbenhesuanfangfa: 'm',
                        chuangjianshijian: '0',
                        xiaoshoujia: '',
                        caigouzhouqi: '0',
                        caigouyuan: '0',
                        xianggui: '2018-12-22',
                        guige: '2018-12-22'
                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '112140446',
                        tiaoxingma: '10000',
                        shangjiabianma: '0',
                        shifouzengping: '0',
                        shifouqiyong: '0',
                        zuheshangping: '0',
                        shenheshijian: '2',
                        yanse: '2',
                        chima: '0',

                        chengbenjia: 'bruce',
                        jiesuanjia: '白色',
                        chengbenhesuanfangfa: 'm',
                        chuangjianshijian: '0',
                        xiaoshoujia: '',
                        caigouzhouqi: '0',
                        caigouyuan: '0',
                        xianggui: '2018-12-22',
                        guige: '2018-12-22'
                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '112140446',
                        tiaoxingma: '10000',
                        shangjiabianma: '0',
                        shifouzengping: '0',
                        shifouqiyong: '0',
                        zuheshangping: '0',
                        shenheshijian: '2',
                        yanse: '2',
                        chima: '0',
                        chengbenjia: 'bruce',
                        jiesuanjia: '白色',
                        chengbenhesuanfangfa: 'm',
                        chuangjianshijian: '0',
                        xiaoshoujia: '',
                        caigouzhouqi: '0',
                        caigouyuan: '0',
                        xianggui: '2018-12-22',
                        guige: '2018-12-22'
                    }],
                multipleSelection: [],
            }
        },
        //过滤器
        filters: {
            Time: function (input) {
                let d = new Date(input);
                let year = d.getFullYear();
                let month = d.getMonth() + 1;
                let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
                let hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
                let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
                let seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
                return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
            }
        },
        methods: {

            //移除
            removeData(data) {
                console.log(data)
                this.queryArr.forEach((item,index)=>{
                    if (item==data){
                        this.queryArr.splice(index,1)
                    }
                })
            },
            serea(command) {
                console.log(command)
            },
            //查询
            query() {
                if (this.warehouse != '' || this.PurchaseOrder != '') {
                    let arr = this.tableData3.filter(item => {
                        return (
                            (item.warehouse == this.warehouse) || (item.PurchaseOrder == this.PurchaseOrder)
                        )
                    })
                    this.queryArr = arr
                }

            },
            //货品详情展开
            opendetails() {
                // opendetailsIcon
                let tableHeight = this.itemdetails
                if (tableHeight == 900) {
                    this.opendetailsIcon = 'fontFamily hhtx-zhankai'
                    this.itemdetails = 300
                } else {
                    this.opendetailsIcon = 'fontFamily hhtx-shouqi'
                    this.itemdetails = 900
                }
            },
            //展开按钮
            open() {
                let tableHeight = this.MaxHeight
                if (tableHeight == 900) {
                    this.openIcon = 'fontFamily hhtx-zhankai'
                    this.MaxHeight = 300
                } else {
                    this.openIcon = 'fontFamily hhtx-shouqi'
                    this.MaxHeight = 900
                }
            },
            //地址选择
            handleChange(value) {

                this.numberValidateForm.province = CodeToText[value[0]];
                this.numberValidateForm.city = CodeToText[value[1]]
                this.numberValidateForm.county = CodeToText[value[2]]
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleSelectionChange(val) {
                this.num = val.length

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },

            //新建品牌
            brand() {
            },
            //新建商品确定
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        this.tableData3.push(this.numberValidateForm)
                        this.queryArr.push(this.numberValidateForm)

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },

    }
</script>

<style scoped>
    .tabaData {
        text-align: center;
    }

    .production {
        width: 98%;
        height: 95%;
        background-color: #ffffff;
        text-align: left;
        padding: 0px 1% 0px 1%;
    }

    .Query {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 8%;
    }

    .Query .el-input, .Query .el-select {
        margin: 0 0 0 5px
    }

    .inputSelect {
        width: 20%
    }

    /*.tabaData {*/
    /*width: 100%;*/
    /*border: 1px #f8f8f8 solid;*/
    /*!*resize: vertical;*!*/
    /*!*overflow: auto;*!*/
    /*!*height: 50%;*!*/
    /*}*/

    .pagination {
        display: flex;
        justify-content: space-between;
    }

    .operationBtn {
        background-color: #f8f8f8
    }

</style>