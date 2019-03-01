<template>
    <div class="purchase">
        <div>
            <!--新建与查询-->
            <div class="menuBox">
                <div style="display: flex;justify-content: space-around">
                    <el-button size="mini" class="el-icon-plus" @click="Newpurchaseorder=true">新建</el-button>
                    <el-button icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>
                    <el-button size="mini" class="el-icon-delete">删除</el-button>
                    <el-button size="mini">打印</el-button>
                </div>
                <!--显示设置-->
                <el-dialog
                        title="显示设置"
                        :visible.sync="Settings"
                        width="30%"

                >
                    <div style="text-align: left">
                        <el-row>


                            <el-col :span="12">
                                <el-checkbox v-model="operation">供应商</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="purchaseNumber">采购单号</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="purchaseSource">采购订单来源</el-checkbox>
                            </el-col>
                        </el-row>


                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="auditStatus">审核状态</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="receiveStatus">收货状态</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="frequency">入库次数</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="type">采购订单类型</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="commodityType">商品类型</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="receiveAddress">收货地址</el-checkbox>
                            </el-col>
                        </el-row>


                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="contractTerm">合同条款</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="singlePerson">制单人</el-checkbox>
                            </el-col>
                        </el-row>


                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="submitter">提交人</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="financialJudge">财审人</el-checkbox>
                            </el-col>
                        </el-row>


                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="auditor">审核人</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="totalSum">总金额</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="totalQuantity">总数量</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="completeStatus">采购完成状态</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="distanceDate">距离下单时间</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="remark">备注</el-checkbox>
                            </el-col>
                        </el-row>


                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="createTime">创建时间</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="updateTime">修改时间</el-checkbox>
                            </el-col>
                        </el-row>


                    </div>

                </el-dialog>

                <!--新建采购单-->
                <el-dialog
                        title="新建采购单"
                        :visible.sync="Newpurchaseorder"
                        width="80%">

                    <el-form :model="addProcurement" ref="addProcurement" inline>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item
                                        label="供应商"
                                >
                                    <!--供应商选择-->
                                    <el-select size="mini" clearable v-model="addProcurement.supplierName"
                                               placeholder="供应商">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item
                                        label="工厂"
                                >
                                    <!--工厂选择-->
                                    <el-select size="mini" clearable v-model="addProcurement.factoryName"
                                               placeholder="工厂选择">
                                        <el-option
                                                v-for="item in factorylist"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="合同条款">
                                    <el-input size="mini" placeholder="合同条款"
                                              v-model="addProcurement.contract"></el-input>
                                </el-form-item>
                            </el-col>


                        </el-row>


                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="收货城市">
                                    <el-cascader
                                            size="mini"
                                            :options="option"
                                            v-model="address"
                                            @change="handleChange">
                                    </el-cascader>
                                </el-form-item>
                            </el-col>

                            <el-col :span="8">
                                <el-form-item label="收货地址">
                                    <el-input size="mini" placeholder="收货地址"
                                              v-model="addProcurement.ReceivingAddress"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="8">
                                <el-form-item label="备注">
                                    <el-input size="mini" placeholder="备注" v-model="addProcurement.Remarks"></el-input>
                                </el-form-item>
                            </el-col>


                        </el-row>


                    </el-form>
                    <div style="text-align: left">
                        <el-button size="mini" @click="PurchasingAddGoods=true">添加商品</el-button>
                    </div>

                    <el-table
                            :data="this.addProcurement.goodsList"
                            border
                            @selection-change="goodsSelection"
                            style="width: 100%">

                        <el-table-column
                                align="center"
                                type="selection"
                                width="50"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                type="index"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="merchantCode"
                                label="商家编码"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="name"
                                label="商品名称"
                                width="180">
                        </el-table-column>

                        <el-table-column
                                align="center"
                                prop="itemCode"
                                label="货品编号"
                                width="180"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="数量"
                                width="80"
                                prop="spare02"
                        >
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                fixed="left"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <!--删除from表单中商品数据-->
                                <el-button type="text" @click="deltetPurchase(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>


                        <el-table-column
                                label="单价（元）"
                                width="80"
                                align="center"
                                prop="spare04"
                        ></el-table-column>


                        <el-table-column
                                align="center"
                                prop="type"
                                label="分类"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="sku"
                                width="180"
                                label="盒装SKU">

                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="brand"
                                width="180"
                                label="品牌">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="process"
                                width="180"
                                label="工艺流程">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="season"
                                width="180"
                                label="季节">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="costPrice"
                                width="180"
                                label="商品成本价">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="unit"
                                width="180"
                                label="基本单位">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="packag"
                                width="180"
                                label="包装材料">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="weight"
                                width="180"
                                label="重量">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="barCode"
                                width="180"
                                label="条形码">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="ingredients"
                                width="180"
                                label="面料成份">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="standard"
                                width="180"
                                label="执行工艺标准">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="remark"
                                width="180"
                                label="备注">
                        </el-table-column>

                    </el-table>
                    <div style="text-align: right;margin: 0.2em">
                        <el-button type="primary" size="mini" @click="SubmissionPurchase">保存</el-button>
                        <el-button size="mini" @click="Newpurchaseorder=false">取消</el-button>
                    </div>

                </el-dialog>

                <!--采购订单添加商品-->
                <el-dialog
                        title="采购订单添加商品"
                        :visible.sync="PurchasingAddGoods"
                        width="80%"

                >
                    <!--新建与查询-->
                    <div class="menuBox">
                        <div>
                            <el-row>
                                <el-col :span="4">
                                    <el-input size="mini" placeholder="商家编码" v-model="querymerchantCode"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-input size="mini" placeholder="商品名称" v-model="queryname"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-input size="mini" placeholder="货品编号" v-model="queryitemCode"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-input size="mini" placeholder="盒装SKU" v-model="querysku"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-input size="mini" placeholder="其他" v-model="queryother"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <el-button type="primary" size="mini"
                                               @click="queryother='',querysku='',queryitemCode='',queryname='',querymerchantCode=''">
                                        重置
                                    </el-button>
                                </el-col>
                                <el-col :span="2">
                                    <el-button type="primary" size="mini" icon="el-icon-search" @click="queryGoods()">查询
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div>
                        <el-table
                                :data="quireGoodsData"
                                border
                                @selection-change="goodsSelection"
                                style="width: 100%">
                            <el-table-column
                                    align="center"
                                    type="index"
                                    width="50">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="操作"
                                    width="80"
                                    fixed="left"
                            >
                                <template slot-scope="scope">

                                    <el-button type="text" @click="addgoodsTopurchase(scope.row)">添加</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column

                                    label="创建时间"
                                    prop="createTime"
                                    width="180"
                                    align="center"
                                    sortable
                            ></el-table-column>
                            <el-table-column
                                    label="修改时间"
                                    prop="updateTime"
                                    width="180"
                                    align="center"
                                    sortable
                            ></el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="merchantCode"
                                    label="商家编码"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="name"
                                    label="商品名称"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="itemCode"
                                    label="货品编号"
                                    width="180"
                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="type"
                                    label="分类"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="sku"
                                    width="180"
                                    label="盒装SKU">

                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="brand"
                                    width="180"
                                    label="品牌">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="process"
                                    width="180"
                                    label="工艺流程">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="season"
                                    width="180"
                                    label="季节">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="costPrice"
                                    width="180"
                                    label="商品成本价">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="unit"
                                    width="180"
                                    label="基本单位">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="packag"
                                    width="180"
                                    label="包装材料">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="weight"
                                    width="180"
                                    label="重量">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="barCode"
                                    width="180"
                                    label="条形码">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="ingredients"
                                    width="180"
                                    label="面料成份">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="standard"
                                    width="180"
                                    label="执行工艺标准">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="remark"
                                    width="180"
                                    label="备注">
                            </el-table-column>

                        </el-table>
                        <!--分页-->
                        <el-row>
                            <el-col :span="10" :offset="14">
                                <el-pagination
                                        @current-change="goodslistpag"
                                        :page-size="5"
                                        layout="prev, pager, next, jumper"
                                        :total="totalRecordNum">
                                </el-pagination>
                            </el-col>
                        </el-row>
                        <el-table
                                :data="quireGoodsDataBox"
                                border
                                @selection-change="goodsSelection"
                                style="width: 100%">

                            <el-table-column
                                    align="center"
                                    type="index"
                                    width="50">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="merchantCode"
                                    label="商家编码"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="name"
                                    label="商品名称"
                                    width="180">
                            </el-table-column>

                            <el-table-column
                                    align="center"
                                    prop="itemCode"
                                    label="货品编号"
                                    width="180"
                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="数量"
                                    width="200"
                            >
                                <template slot-scope="scope">

                                    <el-input-number size="mini" v-model="scope.row.spare02" :min="1" :max="1000"
                                                     label="描述文字"></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    fixed="left"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <!--删除备选数组信息-->
                                    <el-button type="text" @click="delpruchase(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>


                            <el-table-column
                                    label="单价（元）"
                                    width="200"
                                    align="center"
                            >
                                <template slot-scope="scope">

                                    <el-input-number size="mini" v-model="scope.row.spare04" :precision="2" :step="0.1"
                                                     :max="1000" label="描述文字"></el-input-number>
                                </template>
                            </el-table-column>


                            <el-table-column

                                    label="创建时间"
                                    prop="createTime"
                                    width="180"
                                    align="center"
                                    sortable
                            ></el-table-column>
                            <el-table-column
                                    label="修改时间"
                                    prop="updateTime"
                                    width="180"
                                    align="center"
                                    sortable
                            ></el-table-column>

                            <el-table-column
                                    align="center"
                                    prop="type"
                                    label="分类"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="sku"
                                    width="180"
                                    label="盒装SKU">

                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="brand"
                                    width="180"
                                    label="品牌">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="process"
                                    width="180"
                                    label="工艺流程">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="season"
                                    width="180"
                                    label="季节">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="costPrice"
                                    width="180"
                                    label="商品成本价">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="unit"
                                    width="180"
                                    label="基本单位">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="packag"
                                    width="180"
                                    label="包装材料">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="weight"
                                    width="180"
                                    label="重量">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="barCode"
                                    width="180"
                                    label="条形码">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="ingredients"
                                    width="180"
                                    label="面料成份">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="standard"
                                    width="180"
                                    label="执行工艺标准">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="remark"
                                    width="180"
                                    label="备注">
                            </el-table-column>

                        </el-table>

                        <div style="text-align: right;margin: 0.2em">
                            <el-button type="primary" size="mini" @click="PreservationGoods">保存</el-button>
                            <el-button size="mini" @click="PurchasingAddGoods=false">取消</el-button>
                        </div>

                    </div>


                </el-dialog>


                <div style="display: flex;justify-content: space-around">


                    <el-select size="mini" v-model="TimeType" placeholder="时间类型">
                        <el-option
                                v-for="item in TimeTypelist"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                    <el-date-picker
                            size="mini"
                            v-model="purchaseTime"
                            type="daterange"
                            range-separator="至"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>

                    <el-select size="mini" clearable v-model="AuditStatuss" placeholder="审核状态">
                        <el-option
                                v-for="item in Audit"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                    <el-select size="mini" clearable v-model="ReceivingStatus" placeholder="收货状态">
                        <el-option
                                v-for="item in Receiving"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-row>
                        <el-col :span="24">
                            <el-input size="mini" placeholder="采购单号" v-model="purchaseNumbers"></el-input>
                        </el-col>
                    </el-row>


                    <el-button type="primary" size="mini"
                               @click="purchaseNumbers='',ReceivingStatus='',AuditStatuss='',purchaseTime='',TimeType=''">
                        重置
                    </el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search" @click="purchaseQueryPage()">查询
                    </el-button>

                </div>


                <!--修改采购单-->
                <el-dialog
                        title="修改采购单"
                        :visible.sync="upNewpurchaseorder"
                        width="80%">

                    <el-form :model="upaddProcurement" ref="upaddProcurement" inline>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item
                                        label="供应商"
                                >
                                    <!--供应商选择-->
                                    <el-select size="mini" clearable v-model="upaddProcurement.supplierName"
                                               placeholder="供应商">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item
                                        label="工厂"
                                >
                                    <!--工厂选择-->
                                    <el-select size="mini" clearable v-model="upaddProcurement.factoryName"
                                               placeholder="工厂选择">
                                        <el-option
                                                v-for="item in factorylist"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="合同条款">
                                    <el-input size="mini" placeholder="合同条款"
                                              v-model="upaddProcurement.contractTerm"></el-input>
                                </el-form-item>
                            </el-col>


                        </el-row>


                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="收货城市">
                                    <el-cascader
                                            size="mini"
                                            :options="option"
                                            v-model="address"
                                            @change="handleChange">
                                    </el-cascader>
                                </el-form-item>
                            </el-col>

                            <el-col :span="8">
                                <el-form-item label="收货地址">
                                    <el-input size="mini" placeholder="收货地址"
                                              v-model="upaddProcurement.ReceivingAddress"></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="8">
                                <el-form-item label="备注">
                                    <el-input size="mini" placeholder="备注" v-model="upaddProcurement.remark"></el-input>
                                </el-form-item>
                            </el-col>


                        </el-row>


                    </el-form>
                    <div style="text-align: left">
                        <el-button size="mini" @click="upPurchasingAddGoods=true">添加商品</el-button>
                    </div>

                    <el-table
                            :data="this.upaddProcurement.goodsList"
                            border
                            @selection-change="goodsSelection"
                            style="width: 100%">

                        <el-table-column
                                align="center"
                                type="selection"
                                width="50"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                type="index"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="merchantCode"
                                label="商家编码"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="name"
                                label="商品名称"
                                width="180">
                        </el-table-column>

                        <el-table-column
                                align="center"
                                prop="itemCode"
                                label="货品编号"
                                width="180"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="数量"
                                width="80"
                                prop="spare02"
                        >
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                fixed="left"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <!--删除from表单中商品数据-->
                                <el-button type="text" @click="deltetPurchase(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>


                        <el-table-column
                                label="单价（元）"
                                width="80"
                                align="center"
                                prop="spare04"
                        ></el-table-column>


                        <el-table-column
                                align="center"
                                prop="type"
                                label="分类"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="sku"
                                width="180"
                                label="盒装SKU">

                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="brand"
                                width="180"
                                label="品牌">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="process"
                                width="180"
                                label="工艺流程">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="season"
                                width="180"
                                label="季节">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="costPrice"
                                width="180"
                                label="商品成本价">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="unit"
                                width="180"
                                label="基本单位">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="packag"
                                width="180"
                                label="包装材料">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="weight"
                                width="180"
                                label="重量">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="barCode"
                                width="180"
                                label="条形码">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="ingredients"
                                width="180"
                                label="面料成份">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="standard"
                                width="180"
                                label="执行工艺标准">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="remark"
                                width="180"
                                label="备注">
                        </el-table-column>

                    </el-table>
                    <div style="text-align: right;margin: 0.2em">
                        <el-button type="primary" size="mini" @click="upSubmissionPurchase">保存</el-button>
                        <el-button size="mini" @click="upNewpurchaseorder=false">取消</el-button>
                    </div>

                </el-dialog>

                <!--修改采购订单添加商品-->
                <el-dialog
                        title="修改采购订单添加商品"
                        :visible.sync="upPurchasingAddGoods"
                        width="80%"

                >
                    <!--新建与查询-->
                    <div class="menuBox">
                        <div>
                            <el-row>
                                <el-col :span="4">
                                    <el-input size="mini" placeholder="商家编码" v-model="querymerchantCode"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-input size="mini" placeholder="商品名称" v-model="queryname"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-input size="mini" placeholder="货品编号" v-model="queryitemCode"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-input size="mini" placeholder="盒装SKU" v-model="querysku"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-input size="mini" placeholder="其他" v-model="queryother"></el-input>
                                </el-col>
                                <el-col :span="2">
                                    <el-button type="primary" size="mini"
                                               @click="queryother='',querysku='',queryitemCode='',queryname='',querymerchantCode=''">
                                        重置
                                    </el-button>
                                </el-col>
                                <el-col :span="2">
                                    <el-button type="primary" size="mini" icon="el-icon-search" @click="queryGoods()">查询
                                    </el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div>
                        <el-table
                                :data="quireGoodsData"
                                border
                                @selection-change="goodsSelection"
                                style="width: 100%">
                            <el-table-column
                                    align="center"
                                    type="index"
                                    width="50">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="操作"
                                    width="80"
                                    fixed="left"
                            >
                                <template slot-scope="scope">
                                    <el-button type="text" @click="upaddgoodsTopurchase(scope.row)">添加</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column

                                    label="创建时间"
                                    prop="createTime"
                                    width="180"
                                    align="center"
                                    sortable
                            ></el-table-column>
                            <el-table-column
                                    label="修改时间"
                                    prop="updateTime"
                                    width="180"
                                    align="center"
                                    sortable
                            ></el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="merchantCode"
                                    label="商家编码"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="name"
                                    label="商品名称"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="itemCode"
                                    label="货品编号"
                                    width="180"
                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="type"
                                    label="分类"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="sku"
                                    width="180"
                                    label="盒装SKU">

                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="brand"
                                    width="180"
                                    label="品牌">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="process"
                                    width="180"
                                    label="工艺流程">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="season"
                                    width="180"
                                    label="季节">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="costPrice"
                                    width="180"
                                    label="商品成本价">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="unit"
                                    width="180"
                                    label="基本单位">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="packag"
                                    width="180"
                                    label="包装材料">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="weight"
                                    width="180"
                                    label="重量">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="barCode"
                                    width="180"
                                    label="条形码">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="ingredients"
                                    width="180"
                                    label="面料成份">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="standard"
                                    width="180"
                                    label="执行工艺标准">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="remark"
                                    width="180"
                                    label="备注">
                            </el-table-column>

                        </el-table>
                        <!--分页-->
                        <el-row>
                            <el-col :span="10" :offset="14">
                                <el-pagination
                                        @current-change="goodslistpag"
                                        :page-size="5"
                                        layout="prev, pager, next, jumper"
                                        :total="totalRecordNum">
                                </el-pagination>
                            </el-col>
                        </el-row>
                        <el-table
                                :data="upquireGoodsDataBox"
                                border
                                @selection-change="goodsSelection"
                                style="width: 100%">

                            <el-table-column
                                    align="center"
                                    type="index"
                                    width="50">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="merchantCode"
                                    label="商家编码"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="name"
                                    label="商品名称"
                                    width="180">
                            </el-table-column>

                            <el-table-column
                                    align="center"
                                    prop="itemCode"
                                    label="货品编号"
                                    width="180"
                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="数量"
                                    width="200"
                            >
                                <template slot-scope="scope">

                                    <el-input-number size="mini" v-model="scope.row.spare02" :min="1" :max="1000"
                                                     label="描述文字"></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    fixed="left"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <!--删除备选数组信息-->
                                    <el-button type="text" @click="delpruchase(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>


                            <el-table-column
                                    label="单价（元）"
                                    width="200"
                                    align="center"
                            >
                                <template slot-scope="scope">

                                    <el-input-number size="mini" v-model="scope.row.spare04" :precision="2" :step="0.1"
                                                     :max="1000" label="描述文字"></el-input-number>
                                </template>
                            </el-table-column>


                            <el-table-column

                                    label="创建时间"
                                    prop="createTime"
                                    width="180"
                                    align="center"
                                    sortable
                            ></el-table-column>
                            <el-table-column
                                    label="修改时间"
                                    prop="updateTime"
                                    width="180"
                                    align="center"
                                    sortable
                            ></el-table-column>

                            <el-table-column
                                    align="center"
                                    prop="type"
                                    label="分类"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="sku"
                                    width="180"
                                    label="盒装SKU">

                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="brand"
                                    width="180"
                                    label="品牌">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="process"
                                    width="180"
                                    label="工艺流程">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="season"
                                    width="180"
                                    label="季节">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="costPrice"
                                    width="180"
                                    label="商品成本价">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="unit"
                                    width="180"
                                    label="基本单位">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="packag"
                                    width="180"
                                    label="包装材料">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="weight"
                                    width="180"
                                    label="重量">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="barCode"
                                    width="180"
                                    label="条形码">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="ingredients"
                                    width="180"
                                    label="面料成份">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="standard"
                                    width="180"
                                    label="执行工艺标准">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="remark"
                                    width="180"
                                    label="备注">
                            </el-table-column>

                        </el-table>

                        <div style="text-align: right;margin: 0.2em">
                            <el-button type="primary" size="mini" @click="upPreservationGoods">保存</el-button>
                            <el-button size="mini" @click="upPurchasingAddGoods=false">取消</el-button>
                        </div>

                    </div>


                </el-dialog>





            </div>

            <div>
                <el-table
                        :data="purchaseList"
                        border
                        style="width: 100%">
                    <el-table-column
                            align="center"
                            type="selection"
                            width="50"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            type="index"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            label="创建时间"
                            prop="createTime"
                            v-if="createTime"
                            width="180"
                            align="center"
                            sortable
                    ></el-table-column>
                    <el-table-column
                            label="修改时间"
                            prop="updateTime"
                            v-if="updateTime"
                            width="180"
                            align="center"
                            sortable
                    ></el-table-column>
                    <el-table-column
                            align="center"
                            prop="purchaseNumber"
                            label="采购单号"
                            v-if="purchaseNumber"
                    >
                    </el-table-column>
                    <el-table-column
                            label="供应商"
                            prop="operation"
                            align="center"
                            width="120"
                            v-if="operation"
                    ></el-table-column>
                    <el-table-column
                            align="center"
                            prop="purchaseSource"
                            label="采购订单来源"
                            v-if="purchaseSource"

                    >
                    </el-table-column>


                    <el-table-column
                            align="center"
                            prop="submitTime"
                            label="提交时间"
                            width="150"
                            v-if="submitTime"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="auditStatus"
                            label="审核状态"
                            v-if="auditStatus"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="auditTime"
                            label="审核时间"
                            width="150"
                            v-if="auditTime"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="receiveStatus"
                            v-if="receiveStatus"
                            label="收货状态">

                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="frequency"
                            v-if="frequency"
                            label="入库次数">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="type"
                            width="180"
                            v-if="type"
                            label="采购订单类型">
                    </el-table-column>
                    <el-table-column
                            prop="commodityType"
                            label="商品类型"
                            align="center"
                            width="120"
                            v-if="commodityType"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="receiveAddress"
                            label="收货地址"
                            v-if="receiveAddress"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="contractTerm"
                            label="合同条款"
                            v-if="contractTerm"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="singlePerson"
                            label="制单人"
                            v-if="singlePerson"

                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="submitter"
                            label="提交人"
                            v-if="submitter"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="financialJudge"
                            v-if="financialJudge"
                            label="财审人">

                    </el-table-column>
                    <el-table-column
                            align="frequency"
                            prop="auditor"
                            v-if="auditor"
                            label="审核人">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="totalSum"
                            width="180"
                            v-if="totalSum"
                            label="总金额">
                    </el-table-column>
                    <el-table-column
                            align="commodityType"
                            label="总数量"
                            v-if="totalQuantity"
                            width="120"
                            prop="totalQuantity"
                    >
                    </el-table-column>

                    <el-table-column
                            align="frequency"
                            prop="completeStatus"
                            v-if="completeStatus"
                            label="采购完成状态">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="distanceDate"
                            width="180"
                            v-if="distanceDate"
                            label="距离下单时间">
                    </el-table-column>
                    <el-table-column
                            label="备注"
                            align="center"
                            width="120"
                            v-if="remark"
                            prop="remark"
                    >
                    </el-table-column>

                    <el-table-column
                            label="操作"
                            fixed="right"
                            width="120"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <el-button type="text" @click="updata(scope.row)">修改</el-button>
                            <el-button type="text">删除</el-button>
                        </template>

                    </el-table-column>
                </el-table>
                <!--分页-->
                <el-row>
                    <el-col :span="10" :offset="14">
                        <el-pagination
                                @current-change="factorylistpag"
                                :page-size="10"
                                layout="prev, pager, next, jumper"
                                :total="totalRecordNum">
                        </el-pagination>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import {regionDataPlus, CodeToText} from 'element-china-area-data'

    export default {
        name: "purchase",

        data() {
            return {
                Receiving: [{
                    /**
                     * 收货状态
                     * **/
                    value: '未收货',
                    label: '未收货'
                }, {
                    value: '部分收货',
                    label: '部分收货'
                }, {
                    value: '已收货',
                    label: '已收货'
                }],
                TimeTypelist: [
                    /**
                     * 时间类型选择
                     * **/
                    {
                        value: 'createTime',
                        label: '创建时间',
                    },
                    {
                        value: 'submitTime',
                        label: '提交时间',
                    }
                    ,
                    {
                        value: 'auditTime',
                        label: '审核时间',
                    }

                ],
                TimeType: '',//时间类型状态
                ReceivingStatus: '',//收货状态
                purchaseNumbers: '',//采购单号
                Audit: [{
                    /**
                     * 审核状态
                     * **/
                    value: '已审核',
                    label: '已审核'
                }, {
                    value: '未审核',
                    label: '未审核'
                }],
                AuditStatuss: '',//审核状态
                purchaseTime: '',//查询时间
                purchasePageNum: 1,//采购单默认显示页数
                purchasePageSize: 10,//采购单默认显示条目数
                purchaseList: [],//采购订单列表信息
                totalRecordNum: 0,
                /**
                 * 显示设置
                 * **/
                purchaseCode: true,//"采购编码",
                operation: true,//"供应商",
                purchaseNumber: true,//"采购单号",
                updateTime: true,//修改时间
                createTime: true,//创建时间
                purchaseSource: true,//"采购订单来源",
                submitTime: true,//提交时间
                auditStatus: true,//"审核状态",
                auditTime: true,//审核时间
                receiveStatus: true,//"收货状态",
                frequency: true,//"入库次数",
                type: true,//"采购订单类型",
                commodityType: true,// "商品类型",
                receiveAddress: true,//"收货地址",
                contractTerm: true,//"合同条款",
                singlePerson: true,//"制单人",
                submitter: true,//"提交人",
                financialJudge: true,//"财审人",
                auditor: true,//"审核人",
                totalSum: true,//"总金额",
                totalQuantity: true,//"总数量",
                completeStatus: true,//"采购完成状态",
                distanceDate: true,//"距离下单时间",
                remark: true,//备注
                Settings: false,//显示设置面板
                Newpurchaseorder: false,//新建采购单面板
                upNewpurchaseorder: false,//修改采购单面板
                options: [],//供应商查询数据

                factorylist: [],//工厂查询数据
                address: [],//地址
                addProcurement: {
                    //新建采购单
                    supplierName: '',//供应商选择信息
                    factoryName: '',//工厂选择信息
                    address: '',//收货城市
                    ReceivingAddress: '',//收货地址
                    remark: '',//备注
                    contractTerm: '',//合同条款
                    goodsList: [],//采购单中的商品信息
                },
                upaddProcurement: {
                    //修改采购单
                    supplierName: '',//供应商选择信息
                    factoryName: '',//工厂选择信息
                    address: '',//收货城市
                    ReceivingAddress: '',//收货地址
                    remark: '',//备注
                    contractTerm: '',//合同条款
                    goodsList: [],//采购单中的商品信息
                },
                option: regionDataPlus,//城市选择
                PurchasingAddGoods: false,//采购订单添加商品
                upPurchasingAddGoods: false,//修改采购订单添加商品
                queryname: '',//查询商品名称
                querysku: '',//查询盒装SKU
                queryitemCode: '',//查询货品编号
                querymerchantCode: '',//查询商家编码
                queryother: '',//查询其他
                quireGoodspagesize: 5,//商品信息分页大小
                quireGoodspageNum: 1,//商品信息分页页数
                quireGoodsData: [],//商品信息

                quireGoodsDataBox: [],//选中的商品信息
                upquireGoodsDataBox:[],//修改选择的商品信息
                numbers: 1,//数量
                totalRecordNum: 0,//总条目数


            }
        },
        methods: {
            updata(data){
                //修改采购单信息
                this.upNewpurchaseorder=true
                this.upaddProcurement=data
                console.log(this.upaddProcurement)
                console.log(data)
            },
            SubmissionPurchase() {
                //提交采购单数据
                console.log(this.addProcurement)
            },
            upSubmissionPurchase() {
                //提交修改采购单数据
                console.log(this.upaddProcurement)
            },
            deltetPurchase(data) {
                //删除from表单数组中信息
                let a = this.addProcurement.goodsList.indexOf(data)
                this.quireGoodsDataBox.splice(a, 1)
            },
            PreservationGoods() {
                //保存商品信息
                //   goodsList
                this.addProcurement.goodsList = this.quireGoodsDataBox
                this.PurchasingAddGoods = false
            },
            upPreservationGoods() {
                //保存商品信息
                //   goodsList
                console.log(this.upquireGoodsDataBox)
                this.upaddProcurement.goodsList = this.upquireGoodsDataBox
                console.log(this.upaddProcurement.goodsList)
                this.upPurchasingAddGoods = false
            },
            delpruchase(data) {
                //删除备选数组中信息
                let a = this.quireGoodsDataBox.indexOf(data)
                this.quireGoodsDataBox.splice(a, 1)
            },
            addgoodsTopurchase(data) {
                //添加商品信息至备选数组

                let a = JSON.stringify(this.quireGoodsDataBox).indexOf(JSON.stringify(data))
                if (a != -1) {
                    data.spare02++
                } else {
                    this.quireGoodsDataBox.push(data)
                    data.spare02 = 1
                }


            },
            upaddgoodsTopurchase(data) {
                //添加商品信息至备选数组

                let a = JSON.stringify(this.upquireGoodsDataBox).indexOf(JSON.stringify(data))
                if (a != -1) {
                    data.spare02++
                } else {
                    this.upquireGoodsDataBox.push(data)
                    data.spare02 = 1
                }


            },
            goodslistpag(val) {
                //商品信息分页
                this.quireGoodspageNum = val
                this.queryGoods()
            },
            queryGoods() {
                //商品信息分页查询
                this.$axios.get(this.$store.state.goodsmessage,
                    {
                        params:
                            {
                                pageSize: this.quireGoodspagesize, pageNum: this.quireGoodspageNum,
                                name: this.queryname, sku: this.querysku,
                                itemCode: this.queryitemCode, merchantCode: this.querymerchantCode,
                                spare02: this.queryother
                            }
                    }).then(res => {
                    this.quireGoodsData = res.data.list
                    this.totalRecordNum = res.data.totalRecord
                    console.log(res.data.list)
                })
            },
            goodsSelection(val) {
                //商品信息多选
                console.log(val)
            },
            handleChange(value) {
                //城市选择
                this.addProcurement.address = ''
                this.addProcurement.address += `${CodeToText[value[0]]}-${CodeToText[value[1]]}-${CodeToText[value[2]]}`

                this.upaddProcurement.address = ''
                this.upaddProcurement.address+= `${CodeToText[value[0]]}-${CodeToText[value[1]]}-${CodeToText[value[2]]}`
            },
            supplierQuery() {
                //供应商列表
                this.$axios.get(this.$store.state.suppllierSelect).then(res => {
                    let data = res.data.data
                    data.forEach(item => {
                        this.options.push({value: item.unitCode, label: `${item.unitName}（${item.className}）`})
                    })

                })
            },
            factoryQuery() {
                //工厂列表
                this.$axios.get(this.$store.state.factoryselect).then(res => {
                    console.log(res.data)
                    let data = res.data.data
                    data.forEach(item => {
                        this.factorylist.push({value: item.code, label: item.name})
                    })
                    console.log(this.factorylist)
                })
            },
            factorylistpag(val) {
                //采购信息分页
                this.purchasePageNum = val
                this.purchaseQueryPage()
            },
            purchaseQueryPage() {
                //采购订单分页查询
                let querydata = {
                    pageNum: this.purchasePageNum, pageSize: this.purchasePageSize,
                    auditStatus: this.AuditStatuss, receiveStatus: this.ReceivingStatus,
                    purchaseNumber: this.purchaseNumbers, spare01: this.TimeType,
                    spare02: this.purchaseTime[0], spare03: this.purchaseTime[1]
                }

                console.log(querydata)
                this.$axios.get(this.$store.state.purchaseQueryPage, {
                    params: querydata

                }).then(res => {
                    this.purchaseList = res.data.list
                    this.totalRecordNum = res.data.totalRecord
                    console.log(res.data.list)

                })
            }
        },
        created: function () {
            this.purchaseQueryPage()//分页
            this.supplierQuery()//供应商列表
            this.factoryQuery()//工厂列表
            this.queryGoods()//商品信息查询
        }
    }
</script>

<style scoped>
    .menuBox {
        display: flex;
        background-color: #f8f8f8;
        justify-content: space-between;
        align-items: center;
    }
</style>