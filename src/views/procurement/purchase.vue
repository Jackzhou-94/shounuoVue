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
                            <el-col :span="8">
                                <el-checkbox v-model="purchaseNumber">采购单号</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="purchaseSource">采购订单来源</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="frequency">入库次数</el-checkbox>
                            </el-col>
                        </el-row>


                        <el-row>
                            <el-col :span="8">
                                <el-checkbox v-model="auditStatus">审核状态</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="receiveStatus">收货状态</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="type">采购订单类型</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-checkbox v-model="commodityType">商品类型</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="receiveAddress">收货地址</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="submitter">提交人</el-checkbox>
                            </el-col>
                        </el-row>


                        <el-row>
                            <el-col :span="8">
                                <el-checkbox v-model="contractTerm">合同条款</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="singlePerson">制单人</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="financialJudge">财审人</el-checkbox>
                            </el-col>
                        </el-row>


                        <el-row>
                            <el-col :span="8">
                                <el-checkbox v-model="auditor">审核人</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="totalSum">总金额</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="distanceDates">距离下单时间</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-checkbox v-model="totalQuantity">总数量</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="completeStatus">采购完成状态</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="remark">备注</el-checkbox>
                            </el-col>
                        </el-row>


                        <el-row>
                            <el-col :span="8">
                                <el-checkbox v-model="createTime">创建时间</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="updateTime">修改时间</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="freight">运费</el-checkbox>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-checkbox v-model="invoice">发票</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="freightTransportation">货运方式</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="taxRate">税率</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-checkbox v-model="taxAmount">税额</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="nonInvoice">不开票金额</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="invoiceAmount">开票金额</el-checkbox>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-checkbox v-model="submitTime">提交时间</el-checkbox>
                            </el-col>
                            <el-col :span="8">
                                <el-checkbox v-model="auditTime">审核时间</el-checkbox>
                            </el-col>

                            <el-col :span="8">
                                <el-checkbox v-model="operation">供应商</el-checkbox>
                            </el-col>

                        </el-row>

                    </div>

                </el-dialog>


                <!--新建采购单-->
                <el-dialog
                        title="新建采购单"
                        :visible.sync="Newpurchaseorder"
                        width="80%">
                    <el-form :model="addProcurement" ref="addProcurement" :rules="addProcurements" inline
                             label-width="150">
                        <el-row>
                            <el-col :span="6">
                                <el-form-item
                                        label="供应商"
                                        prop="supplier"
                                >
                                    <!--供应商选择-->
                                    <el-select size="mini" filterable clearable v-model="addProcurement.supplier"
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
                            <el-col :span="6">
                                <el-form-item
                                        label="工厂"
                                        prop="factoryName"
                                >
                                    <!--工厂选择-->
                                    <el-select filterable size="mini" clearable v-model="addProcurement.factoryName"
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
                            <el-col :span="6">
                                <el-form-item label="运费" prop="freight">
                                    <el-input size="mini" v-model="addProcurement.freight"></el-input>
                                </el-form-item>

                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="备注">
                                    <el-input size="mini" placeholder="备注" v-model="addProcurement.remark"></el-input>
                                </el-form-item>
                            </el-col>

                        </el-row>


                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="发票" prop="invoice">
                                    <el-select size="mini" v-model="addProcurement.invoice" placeholder="请选择发票">
                                        <el-option
                                                v-for="item in addinvoice"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="货运方式" prop="freightTransportation">
                                    <el-input size="mini" placeholder="货运方式"
                                              v-model="addProcurement.freightTransportation"></el-input>
                                </el-form-item>
                            </el-col>
                            <!--<el-col :span="6">-->
                            <!--<el-form-item label="预计入库" prop="distanceDate">-->
                            <!--&lt;!&ndash;<el-input size="mini" placeholder="合同条款"&ndash;&gt;-->
                            <!--&lt;!&ndash;v-model="addProcurement.contract"></el-input>&ndash;&gt;-->
                            <!--<el-date-picker-->
                            <!--style="width: 180px"-->
                            <!--v-model="distanceDate"-->
                            <!--size="mini"-->
                            <!--type="datetime"-->
                            <!--value-format="yyyy-MM-dd HH:mm:ss"-->
                            <!--placeholder="预计入库时间">-->
                            <!--</el-date-picker>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->

                        </el-row>


                    </el-form>
                    <div style="text-align: left">
                        <el-button size="mini" @click="PurchasingAddGoods=true">添加商品</el-button>
                        <el-button size="mini" @click="batchTime">批量添加预计入库时间</el-button>
                        <el-date-picker
                                size="mini"
                                v-model="timeData"
                                type="datetime"
                                placeholder="批量添加预计入库时间">
                        </el-date-picker>
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
                                label="预计入库时间"
                                width="200"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-date-picker
                                        style="width: 180px"
                                        v-model="scope.row.warehouseTime"
                                        size="mini"
                                        type="datetime"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="预计入库时间">
                                </el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="数量"
                                width="200"
                                prop="number"
                        >
                            <template slot-scope="scope">
                                <el-input-number size="mini" v-model="scope.row.number"
                                                 @change="addprocureNumber(scope.row)"></el-input-number>
                            </template>
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
                        <!--<el-table-column-->
                        <!--label="含税单价（元）"-->
                        <!--width="120"-->
                        <!--prop="taxPrice"-->
                        <!--align="center"-->
                        <!--&gt;-->
                        <!--</el-table-column>-->


                        <el-table-column
                                label="含税单价（元）"
                                width="200"
                                align="center"

                        >
                            <template slot-scope="scope">
                                <el-input-number disabled size="mini" v-model="scope.row.taxPrice"
                                                 label="描述文字"></el-input-number>
                            </template>
                        </el-table-column>

                        <el-table-column
                                label="不含税单价（元）"
                                width="200"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-input-number size="mini" v-model="scope.row.unitPrice"
                                                 @change="addprocure(scope.row)"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="含税总价（元）"
                                width="120"
                                align="center"
                                prop="taxTotalPrice"
                        >
                        </el-table-column>
                        <el-table-column
                                label="不含税总价（元）"
                                width="120"
                                align="center"
                                prop="totalPrice"
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

                    <div style="display: flex;justify-content: space-between;margin: 0.2em">
                        <div>
                            总数量:{{goodsNum}},
                            总金额（含税）:{{taxgoodsMoney}},
                            总金额（不含税）:{{goodsMoney}}

                        </div>
                        <div>
                            <el-button type="primary" size="mini" @click="SubmissionPurchase('addProcurement')">保存
                            </el-button>
                            <el-button size="mini" @click="Newpurchaseorder=false">取消</el-button>
                        </div>

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
                                    width="30">
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
                                    prop="sku"
                                    width="180"
                                    label="盒装SKU">
                            </el-table-column>


                            <el-table-column
                                    align="center"
                                    prop="type"
                                    label="分类"
                                    width="180">
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
                            <el-col :span="10" :offset="12">
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
                                    width="30">
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
                                    label="预计入库时间"
                                    width="200"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-date-picker
                                            style="width: 180px"
                                            type="datetime"
                                            v-model="scope.row.warehouseTime"
                                            size="mini"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            placeholder="预计入库时间">
                                    </el-date-picker>
                                </template>
                            </el-table-column>


                            <el-table-column
                                    align="center"
                                    label="数量"
                                    width="200"
                            >
                                <template slot-scope="scope">
                                    <el-input-number size="mini" v-model="scope.row.number" :min="1" :max="100000"
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


                            <!--<el-input-number size="mini" v-model="scope.row.spare04"  :min="1"-->
                            <!--:max="100000" label="描述文字"></el-input-number>-->
                            <!--</template>-->
                            <!--</el-table-column>-->


                            <el-table-column
                                    label="不含税单价（元）"
                                    width="200"
                                    align="center"
                            >
                                <template slot-scope="scope">

                                    <el-input-number :change="CalculationPrice(scope.row)" size="mini"
                                                     v-model="scope.row.unitPrice" :min="1"
                                                     :max="100000" label="描述文字"></el-input-number>

                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="含税单价（元）"
                                    width="200"
                                    align="center"

                            >
                                <template slot-scope="scope">
                                    <el-input-number disabled size="mini" v-model="scope.row.taxPrice"
                                                     label="描述文字"></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="含税总价（元）"
                                    width="120"
                                    align="center"
                                    prop="taxTotalPrice"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="不含税总价（元）"
                                    width="150"
                                    align="center"
                                    prop="totalPrice"
                            >
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

                    <el-form :model="upaddProcurement" :rules="upaddProcurements" label-width="150"
                             ref="upaddProcurement" inline>
                        <el-row>
                            <el-col :span="6">
                                <el-form-item
                                        label="供应商"
                                        clearable
                                        prop="supplierName"
                                >

                                    <!--供应商选择-->
                                    <el-select size="mini" filterable clearable v-model="upaddProcurement.supplierName"
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
                            <el-col :span="6">
                                <el-form-item
                                        label="工厂"
                                        clearable
                                        prop="factoryName"
                                >
                                    <!--工厂选择-->
                                    <el-select size="mini" filterable clearable v-model="upaddProcurement.factoryName"
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
                            <el-col :span="6">
                                <el-form-item label="运费" prop="freight">
                                    <el-input size="mini" placeholder="运费"
                                              v-model="upaddProcurement.freight"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="备注">
                                    <el-input size="mini" placeholder="备注" v-model="upaddProcurement.remark"></el-input>
                                </el-form-item>
                            </el-col>

                        </el-row>


                        <el-row>
                            <!--freightTransportation: '',//货运方式-->
                            <!--invoice: '',//发票-->
                            <el-col :span="6">
                                <el-form-item label="发票" prop="invoice">
                                    <el-select size="mini" v-model="upaddProcurement.invoice" placeholder="请选择发票">
                                        <el-option
                                                v-for="item in addinvoice"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="货运方式" prop="freightTransportation">
                                    <el-input size="mini" placeholder="货运方式"
                                              v-model="upaddProcurement.freightTransportation"></el-input>
                                </el-form-item>
                            </el-col>
                            <!--<el-col :span="6">-->
                            <!--<el-form-item label="预计入库" prop="distanceDate">-->
                            <!--<el-date-picker-->
                            <!--style="width: 180px"-->
                            <!--v-model="updistanceDate"-->
                            <!--size="mini"-->
                            <!--type="datetime"-->
                            <!--value-format="yyyy-MM-dd HH:mm:ss"-->
                            <!--placeholder="预计入库时间">-->
                            <!--</el-date-picker>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->

                        </el-row>
                    </el-form>
                    <div style="text-align: left">
                        <el-button size="mini" @click="upPurchasingAddGoods=true">添加商品</el-button>
                        <el-button size="mini" @click="upbatchTime">批量添加预计入库时间</el-button>
                        <el-date-picker
                                size="mini"
                                v-model="uptimeData"
                                type="datetime"
                                placeholder="批量添加预计入库时间">
                        </el-date-picker>
                    </div>

                    <el-table
                            :data="this.upaddProcurement.goodsList"
                            border
                            @selection-change="upgoodsSelection"
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
                                label="预计入库时间"
                                width="200"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-date-picker
                                        style="width: 180px"
                                        v-model="scope.row.warehouseTime"
                                        size="mini"
                                        type="datetime"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="预计入库时间">
                                </el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="数量"
                                width="200"
                                prop="number"
                        >
                            <template slot-scope="scope">
                                <el-input-number size="mini" v-model="scope.row.number"
                                                 @change="upaddprocureNumber(scope.row)"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                fixed="left"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <!--删除from表单中商品数据-->
                                <el-button type="text" @click="updeltetPurchase(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>


                        <!--<el-table-column-->
                        <!--label="含税单价（元）"-->
                        <!--width="120"-->
                        <!--prop="taxPrice"-->
                        <!--align="center"-->
                        <!--&gt;-->
                        <!--</el-table-column>-->

                        <el-table-column
                                label="含税单价（元）"
                                width="200"
                                align="center"

                        >
                            <template slot-scope="scope">
                                <el-input-number disabled size="mini" v-model="scope.row.taxPrice"
                                                 label="描述文字"></el-input-number>
                            </template>
                        </el-table-column>


                        <el-table-column
                                label="不含税单价（元）"
                                width="200"
                                align="center"
                        >
                            <template slot-scope="scope">
                                <el-input-number size="mini" v-model="scope.row.unitPrice"
                                                 @change="upaddprocure(scope.row)"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="含税总价（元）"
                                width="120"
                                align="center"
                                prop="taxTotalPrice"
                        >
                        </el-table-column>
                        <el-table-column
                                label="不含税总价（元）"
                                width="120"
                                align="center"
                                prop="totalPrice"
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
                    <div style="display: flex;justify-content: space-between;margin: 0.2em">
                        <div>
                            总数量{{upgoodsNum}},
                            总金额（含税）{{uptaxgoodsMoney}}
                            总金额（不含税）:{{upgoodsMoney}}
                        </div>
                        <div>
                            <el-button type="primary" size="mini" @click="upSubmissionPurchase('upaddProcurement')">保存
                            </el-button>
                            <el-button size="mini" @click="upNewpurchaseorder=false">取消</el-button>
                        </div>

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
                                    width="30">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="操作"
                                    width="60"
                                    fixed="left"
                            >
                                <template slot-scope="scope">
                                    <el-button type="text" @click="upaddgoodsTopurchase(scope.row)">添加</el-button>
                                </template>
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
                                    prop="sku"
                                    width="180"
                                    label="盒装SKU">
                            </el-table-column>


                            <el-table-column
                                    align="center"
                                    prop="type"
                                    label="分类"
                                    width="180">
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
                            <el-col :span="10" :offset="12">
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
                                    width="30">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="merchantCode"
                                    label="商家编码"
                                    width="150">
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
                                    width="150"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="预计入库时间"
                                    width="200"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-date-picker
                                            style="width: 180px"
                                            v-model="scope.row.warehouseTime"
                                            size="mini"
                                            type="datetime"
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                            placeholder="预计入库时间">
                                    </el-date-picker>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="数量"
                                    width="200"
                            >
                                <template slot-scope="scope">

                                    <el-input-number size="mini" v-model="scope.row.number" :min="1" :max="100000"
                                                     label="描述文字"></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    fixed="left"
                                    align="center"
                                    width="50"
                            >
                                <template slot-scope="scope">
                                    <!--删除备选数组信息-->
                                    <el-button type="text" @click="delpruchase(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>


                            <el-table-column
                                    label="不含税单价（元）"
                                    width="200"
                                    align="center"
                            >
                                <template slot-scope="scope">

                                    <el-input-number :change="UPCalculationPrice(scope.row)" size="mini"
                                                     v-model="scope.row.unitPrice  " :min="1"
                                                     :max="100000" label="描述文字"></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="含税单价（元）"
                                    width="200"
                                    align="center"
                            >
                                <template slot-scope="scope">

                                    <el-input-number disabled size="mini" v-model="scope.row.taxPrice"
                                                     label="描述文字"></el-input-number>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="含税总价（元）"
                                    width="120"
                                    align="center"
                                    prop="taxTotalPrice"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="不含税总价（元）"
                                    width="120"
                                    align="center"
                                    prop="totalPrice"
                            >
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

                            <div>
                                <el-button type="primary" size="mini" @click="upPreservationGoods">保存</el-button>
                                <el-button size="mini" @click="upPurchasingAddGoods=false">取消</el-button>
                            </div>

                        </div>

                    </div>


                </el-dialog>


            </div>
            <el-dialog
                    title="采购明细"
                    :visible.sync="Purchasedetail"
                    width="80%"
                >
                <el-table
                        :data="selsectdetailsList"
                        border
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
                            label="预计入库时间"
                            width="200"
                            align="center"
                            prop="warehouseTime"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="数量"
                            width="200"
                            prop="number"
                    >
                    </el-table-column>

                    <!--<el-table-column-->
                    <!--label="含税单价（元）"-->
                    <!--width="120"-->
                    <!--prop="taxPrice"-->
                    <!--align="center"-->
                    <!--&gt;-->
                    <!--</el-table-column>-->


                    <el-table-column
                            label="含税单价（元）"
                            width="200"
                            align="center"
                            prop="taxPrice"

                    >
                    </el-table-column>

                    <el-table-column
                            label="不含税单价（元）"
                            width="200"
                            align="center"
                            prop="unitPrice"
                    >
                    </el-table-column>
                    <el-table-column
                            label="含税总价（元）"
                            width="120"
                            align="center"
                            prop="taxTotalPrice"
                    >
                    </el-table-column>
                    <el-table-column
                            label="不含税总价（元）"
                            width="120"
                            align="center"
                            prop="totalPrice"
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

            </el-dialog>
            <div>
                <el-table
                        :data="purchaseList"
                        border
                        height="700px"
                        @row-dblclick="Purchasedetails"

                >
                    <el-table-column
                            align="center"
                            type="selection"
                            width="50"
                    >
                    </el-table-column>
                    <el-table-column
                            align="center"
                            type="index"
                            width="40">
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
                            width="200"
                            v-if="purchaseNumber"
                    >
                    </el-table-column>
                    <el-table-column
                            label="供应商"
                            prop="supplier"
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
                            prop="invoice"
                            v-if="receiveStatus"
                            label="发票">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="freight"
                            v-if="freight"
                            label="运费">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="freightTransportation"
                            v-if="freightTransportation"
                            label="货运方式">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="frequency"
                            v-if="frequency"
                            label="已入库数量">
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
                            prop="invoiceAmount"
                            width="100"
                            v-if="invoiceAmount"
                            label="开票金额">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="nonInvoice"
                            width="100"
                            v-if="nonInvoice"
                            label="不开票金额">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="taxAmount"
                            width="100"
                            v-if="taxAmount"
                            label="税额">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="taxRate"
                            width="100"
                            v-if="taxRate"
                            label="税率">
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
                addinvoice: [
                    /**
                     * 发票
                     * */
                    {
                        value: '收据',
                        label: '收据'
                    },
                    {
                        value: '增值税普通发票',
                        label: '增值税普通发票'
                    },
                    {
                        value: '增值税专用发票',
                        label: '增值税专用发票'
                    }
                ],
                upaddinvoice: [
                    /**
                     * 发票
                     * */
                    {
                        value: '收据',
                        label: '收据'
                    },
                    {
                        value: '增值税普通发票',
                        label: '增值税普通发票'
                    },
                    {
                        value: '增值税专用发票',
                        label: '增值税专用发票'
                    }
                ],
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
                invoice: true,//发票
                freightTransportation: true,//货运方式
                freight: true,//运费
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
                distanceDates: true,//"距离下单时间",
                taxRate: true,//税率
                taxAmount: true,//税额
                nonInvoice: true,//不开票金额
                invoiceAmount: true,//开票金额
                remark: true,//备注
                Settings: false,//显示设置面板
                Newpurchaseorder: false,//新建采购单面板
                upNewpurchaseorder: false,//修改采购单面板
                options: [],//供应商查询数据

                factorylist: [],//工厂查询数据
                address: [],//地址
                addProcurement: {
                    //新建采购单
                    supplier: '',//供应商选择信息
                    factoryName: '',//工厂选择信息
                    remark: '',//备注
                    freightTransportation: '',//货运方式
                    freight: '',//运费
                    invoice: '',//发票
                    goodsList: [],//采购单中的商品信息
                },
                addProcurements: {
                    //新建采购单表单验证
                    supplier: [
                        {required: true, message: '请选择供应商', trigger: 'change'},
                    ],
                    factoryName: [
                        {required: true, message: '请选择工厂', trigger: 'change'},
                    ],
                    freight: [
                        {required: true, message: '请输入运费', trigger: 'blur'},
                    ],
                    invoice: [
                        {required: true, message: '请选择发票', trigger: 'change'},
                    ],
                    freightTransportation: [
                        {required: true, message: '请输入货运方式', trigger: 'blur'},
                    ],
                    distanceDate: [
                        {required: true, message: '请选择预计入库时间', trigger: 'blur'},
                    ],
                },
                upaddProcurement: {
                    //修改采购单
                    supplierName: '',//供应商选择信息
                    factoryName: '',//工厂选择信息
                    address: '',//收货城市
                    freightTransportation: '',//货运方式
                    freight: '',//运费
                    invoice: '',//发票
                    ReceivingAddress: '',//收货地址
                    remark: '',//备注
                    contractTerm: '',//合同条款
                    goodsList: [],//采购单中的商品信息
                    distanceDate: '',//预计入库时间
                },
                upaddProcurements: {
                    //修改采购单表单验证
                    supplierName: [
                        {required: true, message: '请选择供应商', trigger: 'change'},
                    ],
                    factoryName: [
                        {required: true, message: '请选择工厂', trigger: 'change'},
                    ],
                    freight: [
                        {required: true, message: '请输入运费', trigger: 'blur'},
                    ],
                    invoice: [
                        {required: true, message: '请选择发票', trigger: 'change'},
                    ],
                    freightTransportation: [
                        {required: true, message: '请输入货运方式', trigger: 'blur'},
                    ],
                    distanceDate: [
                        {required: true, message: '请选择预计入库时间', trigger: 'blur'},
                    ],
                },
                distanceDate: '',//预计入库时间
                updistanceDate: '',//修改预计入库时间
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
                batchTimelist: [],//批量添加时间数据
                timeData: '',//批量时间
                upbatchTimelist: [],//修改批量添加时间数据
                uptimeData: '',//修改批量时间

                quireGoodsDataBox: [],//选中的商品信息
                upquireGoodsDataBox: [],//修改选择的商品信息
                numbers: 1,//数量
                totalRecordNum: 0,//总条目数

                goodsNum: 0,//总数量,
                goodsMoney: 0,//总金额(不含税)
                taxgoodsMoney: 0,//总金额(含税)
                upgoodsNum: 0,//总数量,
                upgoodsMoney: 0,//总金额(不含税)
                uptaxgoodsMoney: 0,//总金额(含税)

                purchaseNum:'',//采购单号
                selsectdetailsList:[],//采购明细数据
                Purchasedetail:false,//采购明细面板

            }
        },

        methods: {
            Purchasedetails(row){
              //采购明细
                this.Purchasedetail=true
                this.purchaseNum=row.purchaseNumber
                this.selsectdetails()
            },
            selsectdetails(){
              //根据采购单号查询当前采购详情
                this.$axios.get(this.$store.state.queruPNumber,{
                    params:{purchaseNumber:this.purchaseNum}
                }).then(res=>{
                    console.log(res)
                    this.selsectdetailsList=res.data.data
                })
            },
            batchTime() {
                //批量添加入库时间
                // this.timeData
                console.log(this.batchTimelist)
                if (this.timeData == '') {
                    this.$message.error('请先选择批量添加的时间');
                } else if (this.batchTimelist.length == 0) {
                    this.$message.error('还未选择数据，无法添加');
                } else {
                    this.batchTimelist.forEach(item => {
                        item.warehouseTime = this.timeData
                    })
                }

            },
            upbatchTime() {
                //批量添加入库时间
                // this.timeData
                console.log(this.batchTimelist)
                if (this.uptimeData == '') {
                    this.$message.error('请先选择批量添加的时间');
                } else if (this.upbatchTimelist.length == 0) {
                    this.$message.error('还未选择数据，无法添加');
                } else {
                    this.upbatchTimelist.forEach(item => {
                        item.warehouseTime = this.uptimeData
                    })
                }

            },
            addprocure(data) {
                //最后调整单价
                // data.totalPrice
                this.goodsMoney = 0//总金额(不含税)
                this.taxgoodsMoney = 0//总金额(含税)
                console.log(this.addProcurement.goodsList)
                let list = this.addProcurement.goodsList
                list.forEach(item => {
                    // this.goodsMoney += item.unitPrice //不含税总价
                    this.goodsMoney += item.unitPrice*item.number
                    // this.taxgoodsMoney+=item.taxTotalPrice

                })
                this.taxgoodsMoney = this.goodsMoney + this.goodsMoney * 0.15

                // data.taxPrice = data.unitPrice + data.unitPrice * 0.15
                // // data.totalPrice=data.unitPrice*data.number
                // data.totalPrice = data.number * data.unitPrice //不含税总价
                // data.taxTotalPrice = data.number * data.taxPrice//含税总价
                //
                //
                // this.taxgoodsMoney = data.taxTotalPrice
                // this.goodsMoney = data.totalPrice
                // console.log(data)
            },
            upaddprocure(data) {
                //最后调整单价
                this.upgoodsMoney = 0//总金额(不含税)
                this.uptaxgoodsMoney = 0//总金额(含税)

                let list = this.upaddProcurement.goodsList
                list.forEach(item => {
                    this.upgoodsMoney += item.unitPrice*item.number//不含税总价
                })
                this.uptaxgoodsMoney = this.upgoodsMoney + this.upgoodsMoney * 0.15


                // data.taxPrice = data.unitPrice + data.unitPrice * 0.15
                // // data.totalPrice=data.unitPrice*data.number
                // data.totalPrice = data.number * data.unitPrice //不含税总价
                // data.taxTotalPrice = data.number * data.taxPrice//含税总价
                //
                // this.uptaxgoodsMoney = data.taxTotalPrice
                // this.upgoodsMoney = data.totalPrice
                // console.log(data)
            },
            addprocureNumber(data) {
                //最后调整数量
                this.goodsNum = 0,//总数量,
                    this.goodsMoney = 0//总金额(不含税)
                this.taxgoodsMoney = 0//总金额(含税)
                let list = this.addProcurement.goodsList
                list.forEach(item => {
                    this.goodsNum += item.number //总数量
                    this.goodsMoney += item.number * item.unitPrice  //不含税总价
                    this.taxgoodsMoney += item.number * item.taxPrice  //含税总价
                })


                // this.taxgoodsMoney = 0;
                // this.quireGoodsDataBox.forEach(item => {
                //     this.goodsNum += item.number//总数量
                //     this.goodsMoney += item.number * item.unitPrice  //总金额
                // })


                // this.taxgoodsMoney= this.goodsMoney+ this.goodsMoney*0.15
                // data.totalPrice = data.number * data.unitPrice //不含税总价
                // data.taxTotalPrice = data.number * data.taxPrice//含税总价
                //
                // this.goodsNum = data.number
                // this.taxgoodsMoney = data.taxTotalPrice
                // this.goodsMoney = data.totalPrice
            },
            upaddprocureNumber(data) {
                //最后调整数量
                // upgoodsNum: 0,//总数量,
                //     upgoodsMoney: 0,//总金额(不含税)
                //     uptaxgoodsMoney: 0,//总金额(含税)

                //最后调整数量
                this.upgoodsNum = 0,//总数量,
                this.upgoodsMoney = 0//总金额(不含税)
                this.uptaxgoodsMoney = 0//总金额(含税)
                let list = this.upaddProcurement.goodsList
                list.forEach(item => {
                    this.upgoodsNum += item.number //总数量
                    this.upgoodsMoney += item.number * item.unitPrice  //不含税总价
                    this.uptaxgoodsMoney += item.number * item.taxPrice  //含税总价
                })


                // data.totalPrice = data.number * data.unitPrice //不含税总价
                // data.taxTotalPrice = data.number * data.taxPrice//含税总价
                //
                // this.upgoodsNum = data.number
                // this.uptaxgoodsMoney = data.taxTotalPrice
                // this.upgoodsMoney = data.totalPrice
            },
            CalculationPrice(data) {
                //计算含税单价
                data.taxPrice = data.unitPrice + data.unitPrice * 0.15
                data.totalPrice = data.number * data.unitPrice //不含税总价
                data.taxTotalPrice = data.number * data.taxPrice//含税总价
            },
            UPCalculationPrice(data) {
                //修改计算含税单价
                data.taxPrice = data.unitPrice + data.unitPrice * 0.15
                data.totalPrice = data.number * data.unitPrice //不含税总价
                data.taxTotalPrice = data.number * data.taxPrice//含税总价

            },

            updata(data) {
                //修改采购单信息
                this.upNewpurchaseorder = true
                this.upaddProcurement = data
                console.log(this.upaddProcurement)

            },
            SubmissionPurchase(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //提交采购单数据
                        this.$axios.post(this.$store.state.addsavePurchase, this.addProcurement).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success',
                                    onClose() {
                                        location.reload()
                                    }
                                });
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            upSubmissionPurchase(formName) {
                //提交修改采购单数据

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.upaddProcurement.distanceDate = this.updistanceDate//预计入库时间
                        console.log(this.upaddProcurement)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                // this.distanceDate

            },
            deltetPurchase(data) {
                //删除from表单数组中信息
                let a = this.addProcurement.goodsList.indexOf(data)
                console.log(data)
                this.quireGoodsDataBox.splice(a, 1)
                alert()
                // goodsNum:0,//总数量,
                //     goodsMoney:0,//总金额
                // this.goodsNum = this.goodsNum - data.spare02
                // this.goodsMoney = this.goodsMoney - (data.spare02 * data.spare04)

                this.goodsNum = this.goodsNum - data.spare02
                this.goodsMoney = this.goodsMoney - (data.spare02 * data.spare04)
            },
            updeltetPurchase(data) {
                //删除from表单数组中信息
                let a = this.upaddProcurement.goodsList.indexOf(data)
                console.log(data)
                this.upquireGoodsDataBox.splice(a, 1)

                // goodsNum:0,//总数量,
                //     goodsMoney:0,//总金额


                this.upgoodsNum = this.upgoodsNum - data.spare02
                this.upgoodsMoney = this.upgoodsMoney - (data.spare02 * data.spare04)
            },
            PreservationGoods() {
                //保存商品信息
                this.addProcurement.goodsList = this.quireGoodsDataBox
                this.goodsNum = 0;
                this.goodsMoney = 0
                this.taxgoodsMoney = 0;
                this.quireGoodsDataBox.forEach(item => {
                    this.goodsNum += item.number//总数量
                    this.goodsMoney += item.number * item.unitPrice  //总金额
                })
                this.taxgoodsMoney = this.goodsMoney + this.goodsMoney * 0.15
                console.log(this.addProcurement.goodsList)
                this.PurchasingAddGoods = false
            },
            upPreservationGoods() {
                //保存商品信息
                //   goodsList
                this.upgoodsNum = 0;
                this.upgoodsMoney = 0
                this.upaddProcurement.goodsList = this.upquireGoodsDataBox
                this.upquireGoodsDataBox.forEach(item => {
                    this.upgoodsNum += item.number//总数量
                    this.upgoodsMoney += item.number * item.unitPrice//总金额(不含税)
                })
                this.uptaxgoodsMoney = this.upgoodsMoney + this.upgoodsMoney * 0.15//总金额(含税)
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
                    data.number++
                } else {
                    this.quireGoodsDataBox.push(data)
                    data.number = 1
                }
                data.unitPrice = 1 //不含税单价

            },
            upaddgoodsTopurchase(data) {
                //添加商品信息至备选数组

                let a = JSON.stringify(this.upquireGoodsDataBox).indexOf(JSON.stringify(data))
                if (a != -1) {
                    data.number++
                } else {
                    this.upquireGoodsDataBox.push(data)
                    data.number = 1
                }
                data.unitPrice = 1 //不含税单价

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
                                other: this.queryother
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
                this.batchTimelist = val
            },
            upgoodsSelection(val) {
                //修改商品信息多选
                console.log(val)
                this.upbatchTimelist = val
            },
            handleChange(value) {
                //城市选择
                this.addProcurement.address = ''
                this.addProcurement.address += `${CodeToText[value[0]]}-${CodeToText[value[1]]}-${CodeToText[value[2]]}`

                this.upaddProcurement.address = ''
                this.upaddProcurement.address += `${CodeToText[value[0]]}-${CodeToText[value[1]]}-${CodeToText[value[2]]}`
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
                    let data = res.data.data
                    data.forEach(item => {
                        this.factorylist.push({value: item.code, label: item.name})
                    })
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
                    purchaseNumber: this.purchaseNumbers, typeTime: this.TimeType,
                    startTime: this.purchaseTime[0], endTime: this.purchaseTime[1]
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

    .el-dialog {
        margin: 0;
        padding: 0;
    }
</style>