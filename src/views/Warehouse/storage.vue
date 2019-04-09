<template>
    <div class="storage">
        <div style="text-align: left;margin-bottom: 0.5em">
            <el-button size="mini" type="primary" class="el-icon-plus" @click="Newpurchaseorder=true">新建</el-button>
            <el-button icon="el-icon-view" type="primary" size="mini" @click="Settings=true">显示设置
            </el-button>
            <el-button size="mini" type="primary" :disabled="auditStatusBut">提交审核</el-button>
            <el-button size="mini" type="primary" :disabled="submitStatusBut">审核通过</el-button>
            <el-button size="mini" type="primary" :disabled="submitStatusBut">审核驳回</el-button>
            <el-button size="mini" type="danger" :disabled="delStatusBut" @click="delStorage()">批量删除</el-button>
            <!--<el-button size="mini">导出</el-button>-->
        </div>
        <div style="display: flex;justify-content:space-between;margin-bottom: 0.5em;">

            <div>
                <el-select  v-model="factoryName" size="mini" placeholder="仓库">
                    <el-option
                            v-for="item in factorylist"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="categorys" size="mini" placeholder="入库类别">
                    <el-option
                            v-for="item in category"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-input size="mini" style="width: 200px" placeholder="入库单号" clearable
                          v-model="oddNumber"></el-input>
            </div>

            <div>
                <el-button type="primary" size="mini" icon="el-icon-edit"
                           @click="factoryName='',categorys='',oddNumber=''">
                    重置
                </el-button>
                <el-button type="primary" size="mini" icon="el-icon-search" @click="storageQuery()">查询
                </el-button>

            </div>


        </div>
        <!--入库开单-->
        <el-dialog
                title="入库开单"
                :visible.sync="Newpurchaseorder"
                :show-close="false"
                width="85%">
            <el-form :model="NewWarehousing" ref="NewWarehousing" label-width="130px" :rules="rules"
                     label-position="right">

                <el-row>
                    <el-col :span="6">
                        <el-form-item label="入库类别" prop="category">
                            <el-select v-model="NewWarehousing.category" @change="WareSelect" size="mini">
                                <el-option
                                        v-for="item in category"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="引入单号" prop="introduceNumber">
                            <el-input size="mini" v-model="NewWarehousing.introduceNumber" :disabled="showIntrodw"
                                      @focus="introduction"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="入库工厂" prop="factoryName">
                            <el-select v-model="NewWarehousing.factoryName" size="mini">
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
                        <el-form-item
                                label="供应商"
                                prop="supplier"
                        >
                            <!--供应商选择-->
                            <el-select size="mini" filterable clearable
                                       v-model="NewWarehousing.supplier"
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

                </el-row>


                <el-row>

                    <el-col :span="6">
                        <el-form-item label="物流公司">
                            <el-input size="mini" v-model="NewWarehousing.company"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="物流单号">
                            <el-input size="mini" type="number" v-model="NewWarehousing.logisticsNumbe"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="分摊方式（运费）">
                            <el-select v-model="NewWarehousing.mode" size="mini" @change="freightBut" placeholder="运费">
                                <el-option
                                        v-for="item in Share_way"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="运费">
                            <el-input size="mini" @blur="freightIn" :disabled="freightInput"
                                      v-model="NewWarehousing.freight"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="6">
                        <el-form-item label="入库数量">
                            <el-input size="mini" disabled v-model="NewWarehousing.warehouseNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="入库金额">
                            <el-input size="mini" disabled v-model="NewWarehousing.warehouseAmount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="入库金额（税）">
                            <el-input size="mini" disabled v-model="NewWarehousing.warehouseTaxamount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="备注">
                            <el-input size="mini" v-model="NewWarehousing.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="6">
                        <el-form-item label="分摊方式（其他）">
                            <el-select @change="OtherfreightBut" v-model="NewWarehousing.expensesMode" size="mini" placeholder="其他费用">
                                <el-option
                                        v-for="item in Apportionment_method"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="其他费用">
                            <el-input size="mini" :disabled="expensesInput" @blur="OtherfreightIn"
                                      v-model="NewWarehousing.expenses"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>


            <el-table
                    :data="NewWarehousing.goodsList"
                    border
                    stripe
            >
                <el-table-column
                        align="center"
                        type="index"
                ></el-table-column>
                <el-table-column label="编号"
                                 align="center"
                                 prop="itemCode"
                ></el-table-column>
                <el-table-column label="货品名称"
                                 align="center"
                                 prop="name"
                                 width="150"
                ></el-table-column>
                <el-table-column label="品牌"
                                 align="center"
                                 prop="brand"
                ></el-table-column>
                <el-table-column label="条形码"
                                 align="center"
                                 prop="barCode"
                                 v-if="goodsShow"
                ></el-table-column>
                <el-table-column label="数量"
                                 align="center"
                                 prop="number"
                ></el-table-column>
                <el-table-column label="入库数量"
                                 align="center"
                                 width="150"
                >
                    <template slot-scope="scope">
                        <el-input-number
                                @change="warehouseNumberAdd(scope.row)"
                                v-model="scope.row.warehouseNumber" size="mini"
                                controls-position="right" :min="1" :max="scope.row.number">

                        </el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="入库单位"
                                 align="center"
                                 prop="unit"
                ></el-table-column>
                <el-table-column label="入库金额"
                                 align="center"
                                 width="120"
                                 prop="totalPrice"
                ></el-table-column>
                <el-table-column label="入库金额(税)"
                                 align="center"
                                 width="120"
                                 prop="taxTotalPrice"
                ></el-table-column>
                <el-table-column label="运费分摊"
                                 align="center"
                                 width="130"
                >
                    <template slot-scope="scope">
                        <el-input type="number" size="mini" :disabled="freightShow"
                                  v-model="scope.row.freightShare" @blur="Freightallocation(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="其他费用总分摊"
                                 width="130"
                                 align="center"
                >
                    <template slot-scope="scope">
                        <el-input type="number" size="mini" @blur="OtherFreightallocation(scope.row)"
                                  :disabled="expensesShow"
                                  v-model="scope.row.expenses"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin: 0.5em;text-align: right">
                <el-button type="primary" size="mini" @click="submitForm('NewWarehousing')">保存</el-button>
                <el-button size="mini" @click="Newpurchaseorder=false">取消</el-button>
            </div>


        </el-dialog>


        <!--引入单号-->
        <el-dialog
                title="引入单号"
                :visible.sync="introductionNumber"
                :show-close="false"
                width="80%">
            <div style="text-align: right;margin: 0.5em">
                <el-input size="mini" style="width: 200px" placeholder="采购单号" clearable
                          v-model="purchaseNumbers"></el-input>

                <el-button type="primary" size="mini" icon="el-icon-edit">
                    重置
                </el-button>

                <el-button type="primary" size="mini" icon="el-icon-search" @click="factorylistpag()">查询
                </el-button>
                <el-button type="primary" size="mini" icon="el-icon-search" @click="alternative">引入</el-button>
            </div>
            <el-table
                    :data="purchaseList"
                    border
                    stripe
                    highlight-current-row
                    @row-dblclick="DobleIn"
                    @current-change="Multipleselection"
            >
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
                        width="150"
                        v-if="operation"
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="purchaseSource"
                        label="采购订单来源"
                        v-if="purchaseSource"
                        width="150"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="submitStatus"
                        label="提交状态"
                        width="150"
                        v-if="submitStatus"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.submitStatus=='tj01'?'已提交':'未提交'}}</span>
                    </template>
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
                    <template slot-scope="scope">
                        <span>{{scope.row.auditStatus=='sh01'?'已审核':'未审核'}}</span>
                    </template>
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
                    <template slot-scope="scope">
                        <span>{{scope.row.receiveStatus=='sh01'?'已收货':(scope.row.receiveStatus=='sh02'?'部分收货':'未收货')}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="invoice"
                        v-if="invoice"
                        width="120"
                        label="发票">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="freight"
                        v-if="freightOn"
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
                        width="120"
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
                        width="180"
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
                        label="总金额(不含税)">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="taxTotalSum"
                        width="180"
                        v-if="taxTotalSum"
                        label="总金额(含税)">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="总数量"
                        v-if="totalQuantity"
                        width="120"
                        prop="totalQuantity"
                >
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="completeStatus"
                        width="120"
                        v-if="completeStatus"
                        label="采购完成状态">
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

            </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            @current-change="factorylistpag"
                            :page-size="5"
                            layout="prev, pager, next, jumper"
                            :total="totalRecordNum">
                    </el-pagination>
                </el-col>
            </el-row>
        </el-dialog>


        <!--修改入库开单-->
        <el-dialog
                title="修改入库开单"
                :visible.sync="upNewpurchaseorder"
                :show-close="false"
                width="80%">
            <el-form :model="upNewWarehousing" ref="upNewWarehousing" label-position="right" label-width="130px"
                     :rules="uprules">

                <el-row>
                    <el-col :span="6">
                        <el-form-item label="入库类别" prop="category">
                            <el-select v-model="upNewWarehousing.category" @change="upWareSelect" size="mini">
                                <el-option
                                        v-for="item in upcategory"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="引入单号" prop="introduceNumber">
                            <el-input size="mini" v-model="upNewWarehousing.introduceNumber" :disabled="upshowIntrodw"
                                      @focus="upintroduction"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="入库工厂" prop="factoryName">
                            <el-select v-model="upNewWarehousing.factoryName" size="mini">
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
                        <el-form-item
                                label="供应商"
                                prop="supplier"
                        >
                            <!--供应商选择-->
                            <el-select size="mini" filterable clearable
                                       v-model="upNewWarehousing.supplier"
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

                </el-row>


                <el-row>
                    <el-col :span="6">
                        <el-form-item label="物流公司">
                            <el-input size="mini" v-model="upNewWarehousing.company"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="物流单号">
                            <el-input size="mini" type="number" v-model="upNewWarehousing.logisticsNumbe"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="分摊方式（运费）">
                            <el-select v-model="upNewWarehousing.mode" size="mini" @change="upfreightBut" placeholder="运费">
                                <el-option
                                        v-for="item in upShare_way"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="运费">
                            <el-input size="mini" @blur="upfreightIn" :disabled="freightInput"
                                      v-model="upNewWarehousing.freight"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="6">
                        <el-form-item label="入库数量">
                            <el-input size="mini" disabled v-model="upNewWarehousing.warehouseNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="入库金额">
                            <el-input size="mini" disabled v-model="upNewWarehousing.warehouseAmount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">

                        <el-form-item label="入库金额（税）">
                            <el-input size="mini" disabled v-model="upNewWarehousing.warehouseTaxamount"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="备注">
                            <el-input size="mini" v-model="upNewWarehousing.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="6">
                        <el-form-item label="分摊方式（其他）">
                            <el-select @change="upOtherfreightBut" v-model="upNewWarehousing.expensesMode" size="mini" placeholder="其他费用">
                                <el-option
                                        v-for="item in Apportionment_method"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="其他费用">
                            <el-input size="mini" :disabled="expensesInput" @blur="upOtherfreightIn"
                                      v-model="upNewWarehousing.expenses"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <el-table
                    :data="upNewWarehousing.goodsList"
                    border
                    stripe
            >
                <el-table-column
                        align="center"
                        type="index"
                ></el-table-column>
                <el-table-column label="编号"
                                 align="center"
                                 prop="itemCode"
                ></el-table-column>
                <el-table-column label="货品名称"
                                 align="center"
                                 prop="name"
                                 width="150"
                ></el-table-column>
                <el-table-column label="品牌"
                                 align="center"
                                 prop="brand"
                ></el-table-column>
                <el-table-column label="条形码"
                                 align="center"
                                 prop="barCode"
                                 v-if="upgoodsShow"
                ></el-table-column>
                <el-table-column label="数量"
                                 align="center"
                                 prop="number"
                ></el-table-column>
                <el-table-column label="入库数量"
                                 align="center"
                                 width="150"
                >
                    <template slot-scope="scope">
                        <el-input-number
                                @change="upwarehouseNumberAdd(scope.row)"
                                v-model="scope.row.warehouseNumber" size="mini"
                                controls-position="right" :min="1" :max="scope.row.number">

                        </el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="入库单位"
                                 align="center"
                                 prop="unit"
                ></el-table-column>
                <el-table-column label="入库金额"
                                 align="center"
                                 width="120"
                                 prop="totalPrice"
                ></el-table-column>
                <el-table-column label="入库金额(税)"
                                 align="center"
                                 width="120"
                                 prop="taxTotalPrice"
                ></el-table-column>
                <el-table-column label="运费分摊"
                                 align="center"
                                 width="130"
                >
                    <template slot-scope="scope">
                        <el-input type="number" size="mini" :disabled="upfreightShow"
                                  v-model="scope.row.freightShare" @blur="upFreightallocation(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="其他费用总分摊"
                                 width="130"
                                 align="center"
                >
                    <template slot-scope="scope">
                        <el-input type="number" size="mini" @blur="upOtherFreightallocation(scope.row)"
                                  :disabled="upexpensesShow"
                                  v-model="scope.row.expenses"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin: 0.5em;text-align: right">
                <el-button size="mini" type="primary" @click="upsubmitForm('upNewWarehousing')">提交</el-button>
                <el-button size="mini" @click="upNewpurchaseorder=false">取消</el-button>
            </div>


        </el-dialog>

        <!--修改引入单号-->
        <el-dialog
                title="引入单号"
                :visible.sync="upintroductionNumber"
                :show-close="false"
                width="80%">
            <div style="text-align: right;margin: 0.5em">
                <el-input size="mini" style="width: 200px" placeholder="采购单号" clearable
                          v-model="purchaseNumbers"></el-input>

                <el-button type="primary" size="mini" icon="el-icon-edit">
                    重置
                </el-button>

                <el-button type="primary" size="mini" icon="el-icon-search" @click="factorylistpag()">查询
                </el-button>
                <el-button type="primary" size="mini" icon="el-icon-search" @click="upalternative">引入</el-button>
            </div>
            <el-table
                    :data="purchaseList"
                    border
                    stripe
                    highlight-current-row

                    @row-dblclick="upDobleIn"
                    @current-change="upMultipleselection"
            >
                <el-table-column
                        align="center"
                        type="index"
                        width="40">
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        prop="createTime"
                        v-if="upcreateTime"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="修改时间"
                        prop="updateTime"
                        v-if="upupdateTime"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="purchaseNumber"
                        label="采购单号"
                        width="200"
                        v-if="uppurchaseNumber"
                >
                </el-table-column>
                <el-table-column
                        label="供应商"
                        prop="supplier"
                        align="center"
                        width="150"
                        v-if="upoperation"
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="purchaseSource"
                        label="采购订单来源"
                        v-if="uppurchaseSource"
                        width="150"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="submitStatus"
                        label="提交状态"
                        width="150"
                        v-if="upsubmitStatus"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.submitStatus=='tj01'?'已提交':'未提交'}}</span>
                    </template>
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="submitTime"
                        label="提交时间"
                        width="150"
                        v-if="upsubmitTime"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="auditStatus"
                        label="审核状态"
                        v-if="upauditStatus"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.auditStatus=='sh01'?'已审核':'未审核'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="auditTime"
                        label="审核时间"
                        width="150"
                        v-if="upauditTime"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="receiveStatus"
                        v-if="upreceiveStatus"
                        label="收货状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.receiveStatus=='sh01'?'已收货':(scope.row.receiveStatus=='sh02'?'部分收货':'未收货')}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="invoice"
                        v-if="upinvoice"
                        width="120"
                        label="发票">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="freight"
                        v-if="upfreightOn"
                        label="运费">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="freightTransportation"
                        v-if="upfreightTransportation"
                        label="货运方式">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="frequency"
                        v-if="upfrequency"
                        width="120"
                        label="已入库数量">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="type"
                        width="180"
                        v-if="uptype"
                        label="采购订单类型">
                </el-table-column>
                <el-table-column
                        prop="commodityType"
                        label="商品类型"
                        align="center"
                        width="120"
                        v-if="upcommodityType"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="receiveAddress"
                        label="收货地址"
                        width="180"
                        v-if="upreceiveAddress"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="contractTerm"
                        label="合同条款"
                        v-if="upcontractTerm"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="singlePerson"
                        label="制单人"
                        v-if="upsinglePerson"

                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="submitter"
                        label="提交人"
                        v-if="upsubmitter"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="financialJudge"
                        v-if="upfinancialJudge"
                        label="财审人">

                </el-table-column>
                <el-table-column
                        align="frequency"
                        prop="auditor"
                        v-if="upauditor"
                        label="审核人">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="totalSum"
                        width="180"
                        v-if="uptotalSum"
                        label="总金额(不含税)">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="taxTotalSum"
                        width="180"
                        v-if="uptaxTotalSum"
                        label="总金额(含税)">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="总数量"
                        v-if="uptotalQuantity"
                        width="120"
                        prop="totalQuantity"
                >
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="completeStatus"
                        width="120"
                        v-if="upcompleteStatus"
                        label="采购完成状态">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="taxAmount"
                        width="100"
                        v-if="uptaxAmount"
                        label="税额">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="taxRate"
                        width="100"
                        v-if="uptaxRate"
                        label="税率">
                </el-table-column>
                <el-table-column
                        label="备注"
                        align="center"
                        width="120"
                        v-if="upremark"
                        prop="remark"
                >
                </el-table-column>

            </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            @current-change="factorylistpag"
                            :page-size="5"
                            layout="prev, pager, next, jumper"
                            :total="totalRecordNum">
                    </el-pagination>
                </el-col>
            </el-row>
        </el-dialog>


        <!--显示设置-->
        <el-dialog
                title="显示设置"
                :visible.sync="Settings"
                width="40%"
                :show-close="false"

        >
            <div style="text-align: left">
                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="NumbersShow">入库单号</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="stateShow">入库单提交状态</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="categoryShow">入库类别</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="personShow">经办人</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="WarehouseShow">仓库</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="LogisticscompanyShow">物流公司</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="LogisticsnumberShow">物流单号</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="ReceiptShow">已入库数量</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="TotalShow">入库种类总数</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="moneyShow">入库金额（税)</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="WarehousingtimeShow">入库时间</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="examineShow">审核时间</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="RemarksShow">备注</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="moneyShowTAX">入库金额</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="NowarehousingShow">未入库数量</el-checkbox>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="expensesModeShow">分摊方式(其他费用)</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="expenses_shareShow">分摊运费(其他用费)</el-checkbox>
                    </el-col>

                    <el-col :span="8">
                        <el-checkbox v-model="modeShow">分摊方式(运费)</el-checkbox>
                    </el-col>
                </el-row>
                <el-row>

                    <el-col :span="8">
                        <el-checkbox v-model="freightShareShow">分摊运费</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="warehouseNumberShow">入库总数量</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="stateShowAudit">入库单审核状态</el-checkbox>
                    </el-col>
                </el-row>
            </div>

        </el-dialog>


        <!--入库明细-->
        <el-dialog
                title="入库明细"
                :visible.sync="Details_warehousing"
                width="80%"
                :show-close="false"

        >
            <el-table
                    :data="warehousingGoodsList"
                    border
                    stripe
            >
                <el-table-column
                        align="center"
                        type="index"
                ></el-table-column>
                <el-table-column label="编号"
                                 align="center"
                                 prop="itemCode"
                ></el-table-column>
                <el-table-column label="货品名称"
                                 align="center"
                                 prop="name"
                                 width="150"
                ></el-table-column>
                <el-table-column label="品牌"
                                 align="center"
                                 prop="brand"
                ></el-table-column>
                <el-table-column label="条形码"
                                 align="center"
                                 prop="barCode"
                ></el-table-column>
                <el-table-column label="数量"
                                 align="center"
                                 prop="number"
                ></el-table-column>
                <el-table-column label="入库数量"
                                 align="center"
                                 width="100"
                                 prop="warehouseNumber"
                ></el-table-column>
                <el-table-column label="入库单位"
                                 align="center"
                                 prop="unit"
                ></el-table-column>
                <el-table-column label="入库金额"
                                 align="center"
                                 width="120"
                                 prop="totalPrice"
                ></el-table-column>
                <el-table-column label="入库金额(税)"
                                 align="center"
                                 width="120"
                                 prop="taxTotalPrice"
                ></el-table-column>
                <el-table-column label="运费分摊"
                                 align="center"
                                 width="130"
                                 prop="freightShare"
                ></el-table-column>
                <el-table-column label="其他费用总分摊"
                                 width="130"
                                 align="center"
                                 prop="expenses"
                >
                </el-table-column>
            </el-table>

        </el-dialog>


        <el-table
                :data="WarehouseReceipt"
                style="width: 100%"
                border
                stripe
                @row-dblclick="doubleClickStorage"
                @selection-change="handleStorage"
                height="720"
        >
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" align="center"></el-table-column>
            <el-table-column
                    label="入库单号"
                    align="center"
                    width="160"
                    prop="oddNumber"
                    v-if="NumbersShow"
            ></el-table-column>
            <el-table-column
                    label="入库单提交状态"
                    align="center"
                    width="120"
                    v-if="stateShow"
            >
                <template slot-scope="scope">
                    <span>{{scope.row.submitStatus=='tj01'?'已提交':'未提交'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="入库单审核状态"
                    align="center"
                    width="120"
                    v-if="stateShowAudit"
            >
                <template slot-scope="scope">
                    <span>{{scope.row.auditStatus=='sh01'?'已审核':'未审核'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="入库状态"
                    align="center"
                    width="120"
                    v-if="stateShowAudit"
            >
                <template slot-scope="scope">
                    <span>{{scope.row.warehouseStatus=='ru01'?'已入库':scope.row.warehouseStatus=='ru02'?'未入库':'部分入库'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="入库类别"
                    align="center"
                    prop="category"
                    width="110"
                    v-if="categoryShow"
            ></el-table-column>
            <el-table-column
                    label="分摊方式(运费)"
                    prop="mode"
                    v-if="modeShow"
                    align="center"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    label="分摊运费"
                    prop="freightShare"
                    v-if="freightShareShow"
                    align="center"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    label="分摊方式(其他费用)"
                    prop="expensesMode"
                    v-if="expensesModeShow"
                    align="center"
                    width="150"
            >
            </el-table-column>
            <el-table-column
                    label="分摊其他费用"
                    prop="expenses_share"
                    v-if="expenses_shareShow"
                    align="center"
                    width="120"
            >
            </el-table-column>

            <el-table-column
                    label="仓库"
                    align="center"
                    width="180"
                    prop="factoryName"
                    v-if="WarehouseShow"
            ></el-table-column>
            <el-table-column
                    label="物流公司"
                    align="center"
                    prop="company"
                    width="180"
                    v-if="LogisticscompanyShow"
            ></el-table-column>
            <el-table-column
                    label="物流单号"
                    align="center"
                    width="180"
                    prop="logisticsNumber"
                    v-if="LogisticsnumberShow"
            ></el-table-column>
            <el-table-column
                    label="已入库数量"
                    align="center"
                    width="100"
                    prop="warehouseNumber1"
                    v-if="ReceiptShow"
            ></el-table-column>
            <el-table-column
                    label="未入库数量"
                    align="center"
                    width="100"
                    prop="warehouseNumber2"
                    v-if="NowarehousingShow"
            ></el-table-column>
            <el-table-column
                    label="入库总数量"
                    align="center"
                    width="150"
                    prop="warehouseNumber"
                    v-if="warehouseNumberShow"
            ></el-table-column>
            <el-table-column
                    label="入库种类总数"
                    align="center"
                    width="150"
                    prop="goodQuality"
                    v-if="TotalShow"
            ></el-table-column>
            <el-table-column
                    label="入库金额"
                    align="center"
                    width="150"
                    prop="warehouseAmount"
                    v-if="moneyShowTAX"
            ></el-table-column>
            <el-table-column
                    label="入库金额（税）"
                    align="center"
                    width="180"
                    prop="warehouseTaxamount"
                    v-if="moneyShow"
            ></el-table-column>
            <el-table-column
                    label="入库时间"
                    align="center"
                    width="180"
                    prop="createTime"
                    v-if="WarehousingtimeShow"
            ></el-table-column>
            <el-table-column
                    label="审核时间"
                    align="center"
                    width="180"
                    v-if="examineShow"
            ></el-table-column>
            <el-table-column
                    label="经办人"
                    align="center"
                    v-if="personShow"
                    prop="personCharge"
            ></el-table-column>
            <el-table-column
                    label="备注"
                    align="center"
                    width="100"
                    v-if="RemarksShow"
            ></el-table-column>
            <el-table-column
                    label="操作"
                    align="center"
                    width="120"
                    fixed="right"
            >
                <template slot-scope="scope">
                    <el-button type="text" @click="upStorage(scope.row)">修改</el-button>
                    <el-button type="text" @click="delStoresingle(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-row>
            <el-col :span="10" :offset="14">
                <el-pagination
                        @current-change="factorylistpags"
                        :page-size="10"
                        layout="prev, pager, next, jumper"
                        :total="StoraRecordNum">
                </el-pagination>
            </el-col>
        </el-row>

        </div>
</template>

<script>
    export default {
        name: "storage",
        data() {
            return {
                /**
                 * 显示设置
                 * **/
                Settings: false,//显示设置面板
                NumbersShow: true,//入库单号
                stateShow: true,//入库单状态（提交状态）
                stateShowAudit: true,//入库单审核状态
                categoryShow: true,//入库类别
                personShow: true,//经办人
                WarehouseShow: true,//仓库

                modeShow: true,//分摊方式(运费)
                expensesModeShow: true,//分摊方式其他费用)
                freightShareShow: true,// 分摊运费
                expenses_shareShow: true,//分摊运费(其他用费)

                LogisticscompanyShow: true,//物流公司
                LogisticsnumberShow: true,//物流单号
                ReceiptShow: true,//入库数量
                NowarehousingShow: true,//未入库数量
                TotalShow: true,//入库货品总数（货品类别数量）
                warehouseNumberShow: true,//入库总量
                moneyShow: true,//入库金额（税)
                moneyShowTAX: true,//入库金额
                WarehousingtimeShow: true,//入库时间
                examineShow: true,//审核时间
                RemarksShow: true,//备注

                Newpurchaseorder: false,//入库开单面板
                upNewpurchaseorder: false,//入库开单面板
                NewWarehousing: {
                    //新建入库单
                    category: '',//入库类别
                    factoryName: '',//入库工厂
                    supplier: '',//供应商
                    introduceNumber: '',//引入单号
                    company: '',//物流公司
                    logisticsNumbe: '',//物流单号
                    freight: 0,//运费
                    expenses: 0,//其它费用
                    expensesMode: '',//分摊方式(其他费用)
                    warehouseNumber: 0,//入库数量
                    warehouseAmount: 0,//入库金额
                    warehouseTaxamount: 0,//入库金额(税)
                    mode: '',//分摊方式（运费）
                    freightShare: '',//运费分摊
                    remark: '',//备注
                    goodsList: [],//数据详情


                },
                rules: {
                    //入库单表单验证
                    category: [
                        {required: true, message: '请选择入库类别', trigger: 'change'}
                    ],
                    factoryName: [
                        {required: true, message: '请选择入库仓库', trigger: 'change'}
                    ],
                    supplier: [
                        {required: true, message: '请选择供应商', trigger: 'change'}
                    ],
                    introduceNumber: [
                        {required: true, message: '单号不能为空', trigger: 'change'}
                    ]

                },
                upNewWarehousing: {
                    //修改入库单
                    category: '',//入库类别
                    factoryName: '',//入库工厂
                    supplier: '',//供应商
                    introduceNumber: '',//引入单号
                    company: '',//物流公司
                    logisticsNumbe: '',//物流单号
                    freight: 0,//运费
                    expenses: 0,//其它费用
                    expensesMode: '',//分摊方式(其他费用)
                    warehouseNumber: '',//入库数量
                    warehouseAmount: 0,//入库金额
                    warehouseTaxamount: 0,//入库金额(税)
                    mode: '',//分摊方式（运费）
                    freightShare: '',//运费分摊
                    remark: '',//备注
                    goodsList: [],//数据详情


                },
                uprules: {
                    //入库单表单验证
                    category: [
                        {required: true, message: '请选择入库类别', trigger: 'change'}
                    ],
                    factoryName: [
                        {required: true, message: '请选择入库仓库', trigger: 'change'}
                    ],
                    supplier: [
                        {required: true, message: '请选择供应商', trigger: 'change'}
                    ],
                    introduceNumber: [
                        {required: true, message: '单号不能为空', trigger: 'change'}
                    ]

                },
                category: [
                    //入库类别
                    {
                        value: '原材料入库',
                        label: '原材料入库'
                    },
                    {
                        value: '半成品入库',
                        label: '半成品入库'
                    }
                ],
                Share_way: [
                    //分摊方式（运费）
                    {
                        value: '均摊',
                        label: '均摊'
                    },
                    {
                        value: '手动',
                        label: '手动'
                    }
                ],
                Apportionment_method: [
                    //分摊方式（其他费用）
                    {
                        value: '均摊',
                        label: '均摊'
                    },
                    {
                        value: '手动',
                        label: '手动'
                    }
                ],


                upShare_way: [
                    //修改分摊方式（运费）
                    {
                        value: '均摊',
                        label: '均摊'
                    },
                    {
                        value: '手动',
                        label: '手动'
                    }
                ],
                upApportionment_method: [
                    //修改分摊方式（其他费用）
                    {
                        value: '均摊',
                        label: '均摊'
                    },
                    {
                        value: '手动',
                        label: '手动'
                    }
                ],
                upcategory: [
                    //修改*入库类别
                    {
                        value: '原材料入库',
                        label: '原材料入库'
                    },
                    {
                        value: '半成品入库',
                        label: '半成品入库'
                    }
                ],


                factorylist: [],//工厂查询数据
                options: [],//供应商查询数据
                purchaseList: [],//商品信息列表
                purchasePageNum: 1,//采购单默认显示页数(商品)
                purchasePageSize: 5,//采购单默认显示条目数
                totalRecordNum: 0,//总条目数（采购单添加商品条目数）
                purchaseNumbers: '',//采购单号查询
                introductionNumber: false,//引入单号面板
                upintroductionNumber: false,//引入修改单号面板

                /**
                 * 引入单号显示设置(商品)
                 * **/
                purchaseCode: true,//"采购编码",
                operation: true,//"供应商",
                purchaseNumber: true,//"采购单号",
                updateTime: true,//修改时间
                createTime: true,//创建时间
                purchaseSource: true,//"采购订单来源",
                submitTime: true,//提交时间
                submitStatus: true,//提交状态
                auditStatus: true,//"审核状态",
                auditTime: true,//审核时间
                receiveStatus: true,//"收货状态",
                invoice: true,//发票
                freightTransportation: true,//货运方式
                freightOn: true,//运费
                frequency: true,//"入库次数",
                type: true,//"采购订单类型",
                commodityType: true,// "商品类型",
                receiveAddress: true,//"收货地址",
                contractTerm: true,//"合同条款",
                singlePerson: true,//"制单人",
                submitter: true,//"提交人",
                financialJudge: true,//"财审人",
                auditor: true,//"审核人",
                totalSum: true,//"总金额（不含税）",
                taxTotalSum: true,//总金额（含税）
                totalQuantity: true,//"总数量",
                completeStatus: true,//"采购完成状态",
                distanceDates: true,//"距离下单时间",
                taxRate: true,//税率
                taxAmount: true,//税额
                remark: true,//备注

                WarehousingCategory: '',//入库类别具体类别
                showIntrodw: true,//引入单号按钮可用不可用
                alternativeList: [],//引入单号数据


                goodsShow: true,//显示条形码
                freightShow: true,//运费分摊
                freightInput: true,//运费文本框

                expensesInput: true,//其他费用文本框
                expensesShow: true,//其他费用分摊


                /**
                 * 修改
                 * **/
                upWarehousingCategory: '',//入库类别具体类别
                upshowIntrodw: true,//引入单号按钮可用不可用
                upalternativeList: [],//引入单号数据
                upgoodsShow: true,//显示条形码
                upfreightShow: true,//运费分摊
                upfreightInput: true,//运费文本框

                upexpensesInput: true,//其他费用文本框
                upexpensesShow: true,//其他费用分摊


                /**
                 * 修改引入单号显示设置(商品)
                 * **/
                uppurchaseCode: true,//"采购编码",
                upoperation: true,//"供应商",
                uppurchaseNumber: true,//"采购单号",
                upupdateTime: true,//修改时间
                upcreateTime: true,//创建时间
                uppurchaseSource: true,//"采购订单来源",
                upsubmitTime: true,//提交时间
                upsubmitStatus: true,//提交状态
                upauditStatus: true,//"审核状态",
                upauditTime: true,//审核时间
                upreceiveStatus: true,//"收货状态",
                upinvoice: true,//发票
                upfreightTransportation: true,//货运方式
                upfreightOn: true,//运费
                upfrequency: true,//"入库次数",
                uptype: true,//"采购订单类型",
                upcommodityType: true,// "商品类型",
                upreceiveAddress: true,//"收货地址",
                upcontractTerm: true,//"合同条款",
                upsinglePerson: true,//"制单人",
                upsubmitter: true,//"提交人",
                upfinancialJudge: true,//"财审人",
                upauditor: true,//"审核人",
                uptotalSum: true,//"总金额（不含税）",
                uptaxTotalSum: true,//总金额（含税）
                uptotalQuantity: true,//"总数量",
                upcompleteStatus: true,//"采购完成状态",
                updistanceDates: true,//"距离下单时间",
                uptaxRate: true,//税率
                uptaxAmount: true,//税额
                upremark: true,//备注

                storageQueryPageNum: 1,//入库单分页查询默认页数
                PurchaseOrder: '',//采购单号
                WarehouseReceipt: [],//入库单数据
                submitStatusBut: true,//审核按钮
                auditStatusBut: true,//提交按钮
                delStatusBut: true,//删除按钮
                StoraRecordNum: 0,//入库单列表总条目数
                factoryName: '',//仓库查询
                categorys: '',//入库类别
                oddNumber: '',//入库单号
                StorageIds: [],//入库单ID
                Details_warehousing: false,//入库明细面板
                warehousingGoodsList: [],//入库明细详情

            }
        },
        methods: {
            DobleIn(data) {

                //双击引入
                console.log(data)
                this.alternativeList.length = 0
                this.NewWarehousing.introduceNumber = data.purchaseNumber
                this.NewWarehousing.warehouseNumber = 0

                data.goodsList.forEach(item => {
                    this.alternativeList.push(item)
                    this.NewWarehousing.warehouseNumber += item.number
                })
                this.NewWarehousing.goodsList = this.alternativeList
                this.introductionNumber = false

            },
            upDobleIn(data) {
                //修改引入单双击引入
                console.log(data)
                this.upalternativeList.length = 0
                this.upNewWarehousing.introduceNumber = data.purchaseNumber
                this.NewWarehousing.warehouseNumber = 0
                data.goodsList.forEach(item => {
                    this.upalternativeList.push(item)
                    this.upNewWarehousing.warehouseNumber += item.number
                })
                this.upNewWarehousing.goodsList = this.upalternativeList
                this.upintroductionNumber = false
                // Multipleselection,alternative
            },
            delStoresingle(data) {
                //删除入库单（单个删除）
                this.StorageIds.length = 0;
                this.StorageIds.push(data.id)
                this.delStorage()
            },
            doubleClickStorage(data) {
                //双击表格
                this.Details_warehousing = true
                this.warehousingGoodsList = data.goodsList
                console.log(data)
            },
            handleStorage(data) {
                //入库单列表多选
                console.log(data)
                data.forEach(item => {
                    this.StorageIds.push(item.id)
                })

                //采购单多选
                if (data.length == 0) {
                    this.submitStatusBut = true
                    this.auditStatusBut = true
                    this.delStatusBut = true
                } else {
                    this.delStatusBut = false
                    let list = data.map(item => {
                        return item.submitStatus
                    })
                    let num = list.indexOf('tj02')
                    let nums = list.indexOf('sh02')
                    if (num == -1) {
                        this.submitStatusBut = false
                        this.auditStatusBut = true
                    } else if (num != -1) {
                        this.submitStatusBut = true
                        this.auditStatusBut = false
                    }
                }


            },
            factorylistpags(val) {
                //入库单分页查询
                this.storageQueryPageNum = val
                this.storageQuery()
            },
            upStorage(data) {
                //修改入库单
                this.NewWarehousing.warehouseNumber = 0
                this.upNewpurchaseorder = true
                this.upNewWarehousing = data
                data.goodsList.forEach(item => {
                    this.upNewWarehousing.warehouseNumber += item.warehouseNumber
                })


            },
            upFreightallocation(data) {
                //商品明细运费分摊文本框离开焦点事件
                this.upNewWarehousing.freight += Number(data.freightShare)
            },
            upfreightIn() {
                //运费输入框文本框离开焦点事件
                let data = this.upNewWarehousing.goodsList //具体货品数据
                let freight = this.upNewWarehousing.freight//货品运费
                data.forEach(item => {
                    item.freightShare = freight / data.length
                })
            },
            upfreightBut(data) {
                //运费分摊类别选择

                if (data != '手动') {
                    this.upfreightShow = true//运费分摊
                    this.upfreightInput = false//运费文本框
                } else {
                    this.upfreightShow = false//运费分摊
                    this.upfreightInput = true//运费文本框
                    this.upNewWarehousing.freight = 0
                }
            },
            upOtherFreightallocation(data) {
                //商品明细运费分摊文本框离开焦点事件
                console.log(data)
                console.log(data.expenses)
                this.upNewWarehousing.expenses += Number(data.expenses)
            },
            upOtherfreightIn() {
                //其他费用输入框文本框离开焦点事件
                let data = this.upNewWarehousing.goodsList //具体货品数据
                let freight = this.upNewWarehousing.expenses//其他费用
                data.forEach(item => {
                    item.expenses = freight / data.length
                })

            },
            upOtherfreightBut(data) {
                //其他分摊类别选择
                if (data != '手动') {
                    this.upexpensesShow = true//运费分摊
                    this.upexpensesInput = false//运费文本框
                } else {
                    this.upexpensesShow = false//运费分摊
                    this.upexpensesInput = true//运费文本框
                    this.upNewWarehousing.expenses = 0
                }
            },
            upwarehouseNumberAdd(data) {
                //入库单数量控制

                this.upNewWarehousing.warehouseNumber = 0 //入库数量
                this.upNewWarehousing.warehouseAmount = 0//入库金额

                data.spare02 = data.unitPrice * data.warehouseNumber//入库金额(单条数据)


                this.upNewWarehousing.goodsList.forEach(item => {
                    this.upNewWarehousing.warehouseNumber += item.warehouseNumber //入库数量
                    this.upNewWarehousing.warehouseAmount += item.spare02 //入库金额
                })
                this.upNewWarehousing.warehouseTaxamount = this.upNewWarehousing.warehouseAmount * 1.15
            },
            upsubmitForm(upNewWarehousing) {
                //修改新建入库单
                this.$refs[upNewWarehousing].validate((valid) => {
                    if (valid) {
                        console.log(this.upNewWarehousing)
                        this.$axios.post(this.$store.state.Upstorage, this.upNewWarehousing).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '修改成功',
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
            upalternative() {
                //修改将选择的数据添加到表单
                this.upNewWarehousing.goodsList = this.upalternativeList
                this.upintroductionNumber = false
                console.log(this.NewWarehousing)

                this.upNewWarehousing.warehouseNumber = 0
                // this.NewWarehousing.warehouseNumber
                this.upalternativeList.forEach(item => {
                    this.upNewWarehousing.warehouseNumber += item.number
                })


            },
            upMultipleselection(data) {
                //修改引入单号单选
                this.upNewWarehousing.introduceNumber = data.purchaseNumber
                this.upalternativeList.length = 0
                data.goodsList.forEach(item => {
                    this.upalternativeList.push(item)
                })

            },
            upWareSelect(data) {
                //修改入库类别选择
                this.upWarehousingCategory = data
                this.upshowIntrodw = false
                if (data == '原材料入库') {
                    this.upgoodsShow = false
                    this.materialQueryPage()
                } else if (data == '半成品入库') {
                    this.upgoodsShow = true
                    this.purchaseQueryPage()
                }

            },

            Freightallocation(data) {
                //商品明细运费分摊文本框离开焦点事件
                this.NewWarehousing.freight += Number(data.freightShare)
            },
            freightIn() {
                //运费输入框文本框离开焦点事件
                let data = this.NewWarehousing.goodsList //具体货品数据
                let freight = this.NewWarehousing.freight//货品运费
                data.forEach(item => {
                    item.freightShare = freight / data.length
                })
            },
            freightBut(data) {
                //运费分摊类别选择

                if (data != '手动') {
                    this.freightShow = true//运费分摊
                    this.freightInput = false//运费文本框
                } else {
                    this.freightShow = false//运费分摊
                    this.freightInput = true//运费文本框
                    this.NewWarehousing.freight = 0
                }
            },
            OtherFreightallocation(data) {
                //商品明细运费分摊文本框离开焦点事件
                console.log(data)
                console.log(data.expenses)
                this.NewWarehousing.expenses += Number(data.expenses)
            },
            OtherfreightIn() {
                //其他费用输入框文本框离开焦点事件
                let data = this.NewWarehousing.goodsList //具体货品数据
                let freight = this.NewWarehousing.expenses//其他费用
                data.forEach(item => {
                    item.expenses = freight / data.length
                })

            },
            OtherfreightBut(data) {
                //其他分摊类别选择
                if (data != '手动') {
                    this.expensesShow = true//运费分摊
                    this.expensesInput = false//运费文本框
                } else {
                    this.expensesShow = false//运费分摊
                    this.expensesInput = true//运费文本框
                    this.NewWarehousing.expenses = 0
                }
            },
            warehouseNumberAdd(data) {
                //入库单数量控制

                this.NewWarehousing.warehouseNumber = 0 //入库数量
                this.NewWarehousing.warehouseAmount = 0//入库金额

                data.spare02 = data.unitPrice * data.warehouseNumber//入库金额(单条数据)


                this.NewWarehousing.goodsList.forEach(item => {
                    this.NewWarehousing.warehouseNumber += item.warehouseNumber //入库数量
                    this.NewWarehousing.warehouseAmount += item.spare02 //入库金额
                })
                this.NewWarehousing.warehouseTaxamount = this.NewWarehousing.warehouseAmount * 1.15
            },
            submitForm(NewWarehousing) {
                //新建入库单
                this.$refs[NewWarehousing].validate((valid) => {
                    if (valid) {
                        console.log(this.NewWarehousing)
                        this.$axios.post(this.$store.state.Addstorage, this.NewWarehousing).then(res => {
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
            alternative() {
                //将选择的数据添加到表单
                this.NewWarehousing.goodsList = this.alternativeList
                this.introductionNumber = false
                this.NewWarehousing.warehouseNumber = 0
                // this.NewWarehousing.warehouseNumber
                this.alternativeList.forEach(item => {
                    this.NewWarehousing.warehouseNumber += item.number
                })
                console.log(this.alternativeList)
                console.log(this.NewWarehousing)

            },
            Multipleselection(data) {
                //引入单号单选
                this.alternativeList.length = 0
                this.NewWarehousing.introduceNumber = data.purchaseNumber
                data.goodsList.forEach(item => {
                    this.alternativeList.push(item)
                })

            },
            factorylistpag(val) {
                //采购信息分页(商品)
                let Category = this.WarehousingCategory
                this.purchasePageNum = val
                if (Category == '原材料入库') {
                    this.goodsShow = false
                    this.materialQueryPage()
                } else if (Category == '半成品入库') {
                    this.purchaseQueryPage()
                    this.goodsShow = true
                }
            },
            introduction() {
                //文本框引入单号
                this.introductionNumber = true
                console.log(this.purchaseList)
            },
            upintroduction() {
                //修改文本框引入单号
                this.upintroductionNumber = true
                console.log(this.purchaseList)
            },
            WareSelect(data) {
                //入库类别选择
                this.WarehousingCategory = data
                this.showIntrodw = false
                if (data == '原材料入库') {
                    this.goodsShow = false
                    this.materialQueryPage()
                } else if (data == '半成品入库') {
                    this.goodsShow = true
                    this.purchaseQueryPage()
                }

            },

            purchaseQueryPage() {
                //采购订单分页查询(商品)
                let querydata = {
                    pageNum: this.purchasePageNum, pageSize: this.purchasePageSize,
                    auditStatus: 'sh01', purchaseNumber: this.purchaseNumbers
                }
                this.$axios.get(this.$store.state.purchaseQueryPage, {
                    params: querydata,
                }).then(res => {
                    this.purchaseList = res.data.list
                    this.totalRecordNum = res.data.totalRecord

                })
            },

            materialQueryPage() {
                //采购订单分页查询(原材料)
                let querydata = {
                    pageNum: this.purchasePageNum, pageSize: this.purchasePageSize,
                    auditStatus: 'sh01', purchaseNumber: this.purchaseNumbers
                }

                this.$axios.get(this.$store.state.materialqueryPage, {
                    params: querydata,
                }).then(res => {
                    this.purchaseList = res.data.list
                    this.totalRecordNum = res.data.totalRecord
                })
            },

            delStorage() {
                //删除入库单
                this.$axios.post(this.$store.state.deleteStorage, {
                    ids: this.StorageIds
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            onClose() {
                                location.reload()
                            }
                        });
                    } else {
                        this.$message.error(res.data.msg);
                    }
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
            supplierQuery() {
                //供应商列表
                this.$axios.get(this.$store.state.suppllierSelect).then(res => {
                    let data = res.data.data
                    data.forEach(item => {
                        this.options.push({value: item.unitCode, label: `${item.unitName}（${item.className}）`})
                    })

                })
            },
            storageQuery() {
                //入库单分页查询
                this.$axios.get(this.$store.state.storageQuery, {
                    params: {
                        pageSize: 10,
                        pageNum: this.storageQueryPageNum,
                        factoryName: this.factoryName,
                        category: this.categorys, oddNumber: this.oddNumber
                    }
                }).then(res => {
                    console.log(res)
                    this.WarehouseReceipt = res.data.list
                    this.StoraRecordNum = res.data.totalRecord
                }).catch(err=>{
                    throw err
                })
            },

        },
        created: function () {
            this.factoryQuery()//工厂列表查询
            this.supplierQuery()//供应商列表查询

            this.storageQuery() //分页列表入库单查询

        }
    }
</script>

<style scoped>
    .formitem {
        display: flex;
        justify-content: space-between
    }
</style>