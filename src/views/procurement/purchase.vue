<template>
    <div class="purchase">
        <el-tabs v-model="activeName2" tabPosition="left">
            <el-tab-pane label="原材料采购" name="second">
                <div>
                    <!--新建与查询-->
                    <div style="padding: 0.5em">

                        <div style="text-align: left;margin-bottom: 0.5em">
                            <el-button size="mini" type="primary" class="el-icon-plus"
                                       @click="Newpurchaseorder_mater=true">新建
                            </el-button>
                            <el-button icon="el-icon-view" type="primary" size="mini" @click="SettingsMater=true">显示设置
                            </el-button>
                            <el-button size="mini" type="primary" :disabled="auditStatusBut" @click="SubmitAudit">提交审核</el-button>
                            <el-button size="mini" type="primary" :disabled="submitStatusBut" @click="AuditPass">审核通过</el-button>
                            <el-button size="mini" type="primary" :disabled="submitStatusBut" @click="AuditReject">审核驳回</el-button>
                            <el-button size="mini" type="danger" :disabled="delStatusBut" @click="delMaterPur()">批量删除
                            </el-button>
                            <!--<el-button size="mini">导出</el-button>-->
                        </div>
                        <div style="display: flex;justify-content:space-between">

                            <el-select size="mini" v-model="materTimeType" placeholder="时间类型">
                                <el-option
                                        v-for="item in TimeTypelist"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <el-date-picker
                                    size="mini"
                                    v-model="materpurchaseTime"
                                    type="daterange"
                                    range-separator="至"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>

                            <el-select size="mini" clearable v-model="materAuditStatuss" placeholder="审核状态">
                                <el-option
                                        v-for="item in Audit"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <el-select size="mini" clearable v-model="materSubmitstate" placeholder="提交状态">
                                <el-option
                                        v-for="item in Submit"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>

                            <el-select size="mini" clearable v-model="materReceivingStatus" placeholder="收货状态">
                                <el-option
                                        v-for="item in Receiving"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>


                            <el-input size="mini" style="width: 200px" placeholder="采购单号" clearable
                                      v-model="materpurchaseNumbers"></el-input>

                            <el-button type="primary" size="mini" icon="el-icon-edit"
                                       @click="materpurchaseNumbers='',materSubmitstate='',materReceivingStatus='',materAuditStatuss='',materpurchaseTime='',materTimeType=''">
                                重置
                            </el-button>

                            <el-button type="primary" size="mini" icon="el-icon-search" @click="materialQueryPage()">查询
                            </el-button>

                        </div>
                        <!--显示设置-->
                        <el-dialog
                                title="显示设置"
                                :visible.sync="SettingsMater"
                                width="30%"
                                :show-close="false"

                        >
                            <div style="text-align: left">


                                <el-row>
                                    <el-col :span="8">
                                        <el-checkbox v-model="purchaseNumbermaterSet">采购单号</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="purchaseSourcematerSet">采购订单来源</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="frequencymaterSet">入库次数</el-checkbox>
                                    </el-col>
                                </el-row>


                                <el-row>
                                    <el-col :span="8">
                                        <el-checkbox v-model="auditStatusmaterSet">审核状态</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="receiveStatusmaterSet">收货状态</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="typematerSet">采购订单类型</el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="8">
                                        <el-checkbox v-model="commodityTypematerSet">商品类型</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="receiveAddressmaterSet">收货地址</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="submittermaterSet">提交人</el-checkbox>
                                    </el-col>
                                </el-row>


                                <el-row>
                                    <el-col :span="8">
                                        <el-checkbox v-model="contractTermmaterSet">合同条款</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="singlePersonmaterSet">制单人</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="financialJudgematerSet">财审人</el-checkbox>
                                    </el-col>
                                </el-row>


                                <el-row>
                                    <el-col :span="8">
                                        <el-checkbox v-model="auditormaterSet">审核人</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="totalSummaterSet">总金额(不含税)</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="taxTotalSummaterSet">总金额（含税）</el-checkbox>
                                    </el-col>

                                </el-row>

                                <el-row>
                                    <el-col :span="8">
                                        <el-checkbox v-model="totalQuantitymaterSet">总数量</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="completeStatusmaterSet">采购完成状态</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="remarkmaterSet">备注</el-checkbox>
                                    </el-col>
                                </el-row>


                                <el-row>
                                    <el-col :span="8">
                                        <el-checkbox v-model="createTimematerSet">创建时间</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="updateTimematermaterSet">修改时间</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="freightmaterSet">运费</el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">

                                        <el-checkbox v-model="invoicematerSet">发票</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="freightTransportationmaterSet">货运方式</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="taxRatematerSet">税率</el-checkbox>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="8">
                                        <el-checkbox v-model="taxAmountmaterSet">税额</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="operationmaterSet">供应商</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="submitStatusmaterSet">提交状态</el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                        <el-checkbox v-model="submitTimematerSet">提交时间</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="auditTimematerSet">审核时间</el-checkbox>
                                    </el-col>


                                </el-row>

                            </div>

                        </el-dialog>


                        <!--新建采购单-->
                        <el-dialog
                                title="新建采购单(原材料)"
                                :visible.sync="Newpurchaseorder_mater"
                                :show-close="false"
                                width="85%">
                            <el-form :model="addProcurementMater" ref="addProcurementMater"
                                     :rules="addProcurementsMater" label-width="100px" label-position="right"
                                     >


                                <el-row>
                                    <el-col :span="6">
                                    <el-form-item
                                            label="供应商"
                                            prop="supplier"
                                    >
                                        <!--供应商选择-->
                                        <el-select size="mini" filterable clearable
                                                   v-model="addProcurementMater.supplier"
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
                                        <el-select filterable size="mini" clearable
                                                   v-model="addProcurementMater.factoryName"
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
                                    <el-form-item label="发票" prop="invoice">
                                        <el-select @change="materchoose" size="mini"
                                                   v-model="addProcurementMater.invoice"
                                                   placeholder="请选择发票">
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
                                                      v-model="addProcurementMater.freightTransportation"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="运费" prop="freight">
                                            <el-input size="mini" v-model="addProcurementMater.freight"></el-input>
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="6">
                                    <el-form-item label="备注">
                                        <el-input size="mini" placeholder="备注"
                                                  v-model="addProcurementMater.remark"></el-input>
                                    </el-form-item>
                                    </el-col>
                                </el-row>




                            </el-form>
                            <div style="text-align: left">
                                <el-button size="mini" @click="PurchasingAddmaterial_material=true">添加商品</el-button>
                                <el-button size="mini" @click="batchMaterTime">批量添加预计入库时间</el-button>
                                <el-date-picker
                                        size="mini"
                                        v-model="timematerData"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        type="datetime"
                                        placeholder="批量添加预计入库时间">
                                </el-date-picker>
                            </div>

                            <el-table
                                    :data="addProcurementMater.goodsList"
                                    border
                                    stripe
                                    @selection-change="goodsmaterSelection"
                                    style="width: 100%">

                                <el-table-column align="center" type="selection"></el-table-column>
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

                                        <!--<el-input-number :min="0" @change="containtax(scope.row)"-->
                                        <!--size="mini"-->
                                        <!--@change="materNumber(scope.row)"-->
                                        <!--v-model="scope.row.number"-->
                                        <!--label="描述文字"></el-input-number>-->

                                        <el-input-number size="mini"
                                                         v-model="scope.row.number" @change="materNumber(scope.row)"
                                                         :min="1" label="描述文字">

                                        </el-input-number>

                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        fixed="left"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <!--删除from表单中商品数据-->
                                        <el-button type="text" @click="deltetmaterPurchase(scope.row)">删除</el-button>
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
                                        label="含税单价（元）"
                                        width="200"
                                        align="center"

                                >
                                    <template slot-scope="scope">

                                        <el-input-number :min="0" @change="matercontaintax(scope.row)"
                                                         :disabled="matercontaining"
                                                         size="mini"
                                                         v-model="scope.row.taxPrice"
                                                         label="描述文字"></el-input-number>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        label="不含税单价（元）"
                                        width="200"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-input-number :min="0" :disabled="maternocontaining" size="mini"
                                                         v-model="scope.row.unitPrice"
                                                         @change="materaddprocure(scope.row)"></el-input-number>
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
                                        label="物料编号"
                                        prop="materialCode"
                                        width="180"
                                        align="center"
                                        sortable
                                ></el-table-column>
                                <el-table-column
                                        label="物料名称"
                                        prop="name"
                                        width="200"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="ingredients"
                                        label="成分规格"
                                        width="180"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        label="物料分类"
                                        prop="type"
                                        width="180"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        label="品牌"
                                        prop="brand"
                                        width="120"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        label="状态"
                                        width="180"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        {{scope.row.spare=='01'?'启用':'未启用'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="默认损耗"
                                        prop="defaultLoss"
                                        width="160"
                                        align="center"
                                        sortable
                                ></el-table-column>
                                <el-table-column
                                        label="厂商"
                                        prop="manufacturer"
                                        width="180"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        label="基本计量单位"
                                        prop="unit"
                                        width="150"
                                        align="center"
                                        sortable
                                ></el-table-column>
                                <el-table-column
                                        label="成本价"
                                        prop="costPrice"
                                        width="120"
                                        align="center"
                                        sortable
                                ></el-table-column>
                                <el-table-column
                                        label="备注"
                                        prop="note"
                                        width="150"
                                        align="center"
                                ></el-table-column>


                            </el-table>


                            <div style="display: flex;justify-content: space-between;margin: 0.2em">
                                <div>

                                    总数量:{{matergoodsNum}},
                                    总金额（含税）:{{matertaxgoodsMoney.toFixed(4)}},
                                    总金额（不含税）:{{matergoodsMoney.toFixed(4)}}
                                </div>
                                <div>
                                    <el-button type="primary" size="mini"
                                               @click="SubmissionMater('addProcurementMater')">
                                        保存
                                    </el-button>
                                    <el-button size="mini" @click="Newpurchaseorder_mater=false">取消</el-button>
                                </div>

                            </div>

                        </el-dialog>

                        <!--采购订单添加商品(原材料)-->
                        <el-dialog
                                title="采购订单添加原材料"
                                :visible.sync="PurchasingAddmaterial_material"
                                width="80%"
                                :show-close="false"
                        >
                            <!--新建与查询-->
                            <div class="menuBox">
                                <div>
                                    <el-row>
                                        <el-col :span="5">
                                            <el-input placeholder="物料编号" size="mini" v-model="materialsNum"></el-input>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-input placeholder="物料名称" size="mini" v-model="materialsName"></el-input>
                                        </el-col>

                                        <el-col :span="4">
                                            <el-select v-model="VendorQueries" placeholder="厂商" size="mini">
                                                <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                >
                                                </el-option>
                                            </el-select>
                                        </el-col>

                                        <el-col :span="4">
                                            <el-button type="primary" icon="el-icon-delete" size="mini">重置</el-button>
                                        </el-col>
                                        <el-col :span="2">
                                            <el-button type="primary" icon="el-icon-search" size="mini"
                                                       @click="queryPage">查询
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                            <div>
                                <el-table
                                        style="width: 100%"
                                        border
                                        stripe
                                        :data="materialsList"
                                        highlight-current-row
                                >
                                    <el-table-column
                                            align="center"
                                            label="操作"
                                            width="80"
                                            fixed="left"
                                    >
                                        <template slot-scope="scope">

                                            <el-button type="text" @click="addmateTopurchase(scope.row)">添加</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            type="index"
                                            align="center"
                                            sortable
                                    ></el-table-column>

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
                                            label="物料编号"
                                            prop="materialCode"
                                            width="180"
                                            align="center"
                                            sortable
                                    ></el-table-column>
                                    <el-table-column
                                            label="物料名称"
                                            prop="name"
                                            width="200"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            prop="ingredients"
                                            label="成分规格"
                                            width="180"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            label="物料分类"
                                            prop="type"
                                            width="180"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            label="品牌"
                                            prop="brand"
                                            width="120"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            label="状态"
                                            width="180"
                                            align="center"
                                    >
                                        <template slot-scope="scope">
                                            {{scope.row.spare=='01'?'启用':'未启用'}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="默认损耗"
                                            prop="defaultLoss"
                                            width="160"
                                            align="center"
                                            sortable
                                    ></el-table-column>
                                    <el-table-column
                                            label="厂商"
                                            prop="manufacturer"
                                            width="180"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            label="基本计量单位"
                                            prop="unit"
                                            width="150"
                                            align="center"
                                            sortable
                                    ></el-table-column>
                                    <el-table-column
                                            label="成本价"
                                            prop="costPrice"
                                            width="120"
                                            align="center"
                                            sortable
                                    ></el-table-column>
                                    <el-table-column
                                            label="备注"
                                            prop="note"
                                            width="150"
                                            align="center"
                                    ></el-table-column>

                                </el-table>
                                <!--分页-->
                                <el-row :gutter="24">
                                    <el-col :span="12" :offset="12"></el-col>
                                    <el-col :span="8" :offset="8">
                                        <el-pagination
                                                @current-change="handleCurrentChange"
                                                :page-size="pageSize"
                                                layout="prev, pager, next, jumper"
                                                :total="totalRecord">
                                        </el-pagination>
                                    </el-col>

                                </el-row>

                                <el-table
                                        :data="quiremateDataBox"
                                        border
                                        stripe
                                        @selection-change="goodsSelection"
                                        style="width: 100%">

                                    <el-table-column
                                            type="index"
                                            align="center"
                                            sortable
                                    ></el-table-column>

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
                                            label="物料编号"
                                            prop="materialCode"
                                            width="180"
                                            align="center"
                                            sortable
                                    ></el-table-column>
                                    <el-table-column
                                            label="物料名称"
                                            prop="name"
                                            width="200"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            prop="ingredients"
                                            label="成分规格"
                                            width="180"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            label="物料分类"
                                            prop="type"
                                            width="180"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            label="品牌"
                                            prop="brand"
                                            width="120"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            label="状态"
                                            width="180"
                                            align="center"
                                    >
                                        <template slot-scope="scope">
                                            {{scope.row.spare=='01'?'启用':'未启用'}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="默认损耗"
                                            prop="defaultLoss"
                                            width="160"
                                            align="center"
                                            sortable
                                    ></el-table-column>
                                    <el-table-column
                                            label="厂商"
                                            prop="manufacturer"
                                            width="180"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            label="基本计量单位"
                                            prop="unit"
                                            width="150"
                                            align="center"
                                            sortable
                                    ></el-table-column>
                                    <el-table-column
                                            label="成本价"
                                            prop="costPrice"
                                            width="120"
                                            align="center"
                                            sortable
                                    ></el-table-column>
                                    <el-table-column
                                            label="备注"
                                            prop="note"
                                            width="150"
                                            align="center"
                                    ></el-table-column>

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


                                </el-table>
                                <div style="text-align: right;margin: 0.2em">
                                    <el-button type="primary" size="mini" @click="PreservationMater">保存</el-button>
                                    <el-button size="mini" @click="PurchasingAddmaterial_material=false">取消</el-button>
                                </div>

                            </div>


                        </el-dialog>


                        <!--修改采购单-->
                        <el-dialog
                                title="修改采购单(原材料)"
                                :visible.sync="upNewpurchaseorder_mater"
                                :show-close="false"
                                width="80%">
                            <el-form :model="upaddProcurementMater" ref="upaddProcurementMater"
                                     :rules="upaddProcurementsMater"
                                     label-position="right"
                                     label-width="100px">
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item
                                                label="供应商"
                                                prop="supplier"
                                        >
                                            <!--供应商选择-->
                                            <el-select size="mini" filterable clearable
                                                       v-model="upaddProcurementMater.supplier"
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
                                            <el-select filterable size="mini" clearable
                                                       v-model="upaddProcurementMater.factoryName"
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
                                            <el-input size="mini" v-model="upaddProcurementMater.freight"></el-input>
                                        </el-form-item>

                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="备注">
                                            <el-input size="mini" placeholder="备注"
                                                      v-model="upaddProcurementMater.remark"></el-input>
                                        </el-form-item>
                                    </el-col>

                                </el-row>


                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="发票" prop="invoice">
                                            <el-select @change="upmaterupchoose" size="mini"
                                                       v-model="upaddProcurementMater.invoice"
                                                       placeholder="请选择发票">
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
                                                      v-model="upaddProcurementMater.freightTransportation"></el-input>
                                        </el-form-item>
                                    </el-col>

                                </el-row>


                            </el-form>
                            <div style="text-align: left">
                                <el-button size="mini" @click="upPurchasingAddmaterial_material=true">添加商品</el-button>
                                <el-button size="mini" @click="upbatchMaterTime">批量添加预计入库时间</el-button>
                                <el-date-picker
                                        size="mini"
                                        v-model="uptimematerData"
                                        type="datetime"
                                        placeholder="批量添加预计入库时间">
                                </el-date-picker>
                            </div>

                            <el-table
                                    :data="upaddProcurementMater.goodsList"
                                    border
                                    stripe
                                    @selection-change="upgoodsmaterSelection"
                                    style="width: 100%">

                                <el-table-column align="center" type="selection"></el-table-column>
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

                                        <!--<el-input-number :min="0" @change="containtax(scope.row)"-->
                                        <!--size="mini"-->
                                        <!--@change="materNumber(scope.row)"-->
                                        <!--v-model="scope.row.number"-->
                                        <!--label="描述文字"></el-input-number>-->

                                        <el-input-number size="mini"
                                                         v-model="scope.row.number" @change="materNumber(scope.row)"
                                                         :min="1" label="描述文字">

                                        </el-input-number>

                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="操作"
                                        fixed="left"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <!--删除from表单中商品数据-->
                                        <el-button type="text" @click="deltetmaterPurchase(scope.row)">删除</el-button>
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
                                        label="含税单价（元）"
                                        width="200"
                                        align="center"

                                >
                                    <template slot-scope="scope">
                                        <el-input-number :min="0" @change="upmatercontaintax(scope.row)"
                                                         :disabled="upmatercontaining"
                                                         size="mini"
                                                         v-model="scope.row.taxPrice"
                                                         label="描述文字"></el-input-number>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        label="不含税单价（元）"
                                        width="200"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-input-number :min="0" :disabled="upmaternocontaining" size="mini"
                                                         v-model="scope.row.unitPrice"
                                                         @change="upmateraddprocure(scope.row)"></el-input-number>
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
                                        label="物料编号"
                                        prop="materialCode"
                                        width="180"
                                        align="center"
                                        sortable
                                ></el-table-column>
                                <el-table-column
                                        label="物料名称"
                                        prop="name"
                                        width="200"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        prop="ingredients"
                                        label="成分规格"
                                        width="180"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        label="物料分类"
                                        prop="type"
                                        width="180"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        label="品牌"
                                        prop="brand"
                                        width="120"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        label="状态"
                                        width="180"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        {{scope.row.spare=='01'?'启用':'未启用'}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="默认损耗"
                                        prop="defaultLoss"
                                        width="160"
                                        align="center"
                                        sortable
                                ></el-table-column>
                                <el-table-column
                                        label="厂商"
                                        prop="manufacturer"
                                        width="180"
                                        align="center"
                                ></el-table-column>
                                <el-table-column
                                        label="基本计量单位"
                                        prop="unit"
                                        width="150"
                                        align="center"
                                        sortable
                                ></el-table-column>
                                <el-table-column
                                        label="成本价"
                                        prop="costPrice"
                                        width="120"
                                        align="center"
                                        sortable
                                ></el-table-column>
                                <el-table-column
                                        label="备注"
                                        prop="note"
                                        width="150"
                                        align="center"
                                ></el-table-column>


                            </el-table>


                            <div style="display: flex;justify-content: space-between;margin: 0.2em">
                                <div>

                                    总数量:{{upmatergoodsNum}},
                                    总金额（含税）:{{upmatergoodsMoney.toFixed(4)}},
                                    总金额（不含税）:{{upmatertaxgoodsMoney.toFixed(4)}}

                                </div>
                                <div>
                                    <el-button type="primary" size="mini"
                                               @click="upSubmissionMater('upaddProcurementMater')">
                                        保存
                                    </el-button>
                                    <el-button size="mini" @click="upNewpurchaseorder_mater=false">取消</el-button>
                                </div>

                            </div>

                        </el-dialog>

                        <!--修改采购订单添加商品-->
                        <el-dialog
                                title="采购订单添加原材料"
                                :visible.sync="upPurchasingAddmaterial_material"
                                width="80%"
                                :show-close="false"
                        >
                            <!--新建与查询-->
                            <div class="menuBox">
                                <div>
                                    <el-row>
                                        <el-col :span="5">
                                            <el-input placeholder="物料编号" size="mini" v-model="materialsNum"></el-input>
                                        </el-col>
                                        <el-col :span="5">
                                            <el-input placeholder="物料名称" size="mini" v-model="materialsName"></el-input>
                                        </el-col>

                                        <el-col :span="4">
                                            <el-select v-model="VendorQueries" placeholder="厂商" size="mini">
                                                <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value"
                                                >
                                                </el-option>
                                            </el-select>
                                        </el-col>

                                        <el-col :span="4">
                                            <el-button type="primary" icon="el-icon-delete" size="mini">重置</el-button>
                                        </el-col>
                                        <el-col :span="2">
                                            <el-button type="primary" icon="el-icon-search" size="mini"
                                                       @click="queryPage">查询
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                            <div>
                                <el-table
                                        style="width: 100%"
                                        border
                                        stripe
                                        :data="materialsList"
                                        highlight-current-row
                                >
                                    <el-table-column type="selection" align="center"></el-table-column>
                                    <el-table-column
                                            align="center"
                                            label="操作"
                                            width="80"
                                            fixed="left"
                                    >
                                        <template slot-scope="scope">

                                            <el-button type="text" @click="addmateTopurchase(scope.row)">添加</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            type="index"
                                            align="center"
                                            sortable
                                    ></el-table-column>

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
                                            label="物料编号"
                                            prop="materialCode"
                                            width="180"
                                            align="center"
                                            sortable
                                    ></el-table-column>
                                    <el-table-column
                                            label="物料名称"
                                            prop="name"
                                            width="200"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            prop="ingredients"
                                            label="成分规格"
                                            width="180"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            label="物料分类"
                                            prop="type"
                                            width="180"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            label="品牌"
                                            prop="brand"
                                            width="120"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            label="状态"
                                            width="180"
                                            align="center"
                                    >
                                        <template slot-scope="scope">
                                            {{scope.row.spare=='01'?'启用':'未启用'}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="默认损耗"
                                            prop="defaultLoss"
                                            width="160"
                                            align="center"
                                            sortable
                                    ></el-table-column>
                                    <el-table-column
                                            label="厂商"
                                            prop="manufacturer"
                                            width="180"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            label="基本计量单位"
                                            prop="unit"
                                            width="150"
                                            align="center"
                                            sortable
                                    ></el-table-column>
                                    <el-table-column
                                            label="成本价"
                                            prop="costPrice"
                                            width="120"
                                            align="center"
                                            sortable
                                    ></el-table-column>
                                    <el-table-column
                                            label="备注"
                                            prop="note"
                                            width="150"
                                            align="center"
                                    ></el-table-column>

                                </el-table>
                                <!--分页-->
                                <el-row :gutter="24">
                                    <el-col :span="12" :offset="12"></el-col>
                                    <el-col :span="8" :offset="8">
                                        <el-pagination
                                                @current-change="handleCurrentChange"
                                                :page-size="pageSize"
                                                layout="prev, pager, next, jumper"
                                                :total="totalRecord">
                                        </el-pagination>
                                    </el-col>

                                </el-row>


                                <el-table
                                        :data="upquiremateDataBox"
                                        border
                                        stripe
                                        @selection-change="upgoodsSelection"
                                        style="width: 100%">
                                    <el-table-column type="selection" align="center"></el-table-column>

                                    <el-table-column
                                            type="index"
                                            align="center"
                                            sortable
                                    ></el-table-column>

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
                                            label="物料编号"
                                            prop="materialCode"
                                            width="180"
                                            align="center"
                                            sortable
                                    ></el-table-column>
                                    <el-table-column
                                            label="物料名称"
                                            prop="name"
                                            width="200"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            prop="ingredients"
                                            label="成分规格"
                                            width="180"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            label="物料分类"
                                            prop="type"
                                            width="180"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            label="品牌"
                                            prop="brand"
                                            width="120"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            label="状态"
                                            width="180"
                                            align="center"
                                    >
                                        <template slot-scope="scope">
                                            {{scope.row.spare=='01'?'启用':'未启用'}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            label="默认损耗"
                                            prop="defaultLoss"
                                            width="160"
                                            align="center"
                                            sortable
                                    ></el-table-column>
                                    <el-table-column
                                            label="厂商"
                                            prop="manufacturer"
                                            width="180"
                                            align="center"
                                    ></el-table-column>
                                    <el-table-column
                                            label="基本计量单位"
                                            prop="unit"
                                            width="150"
                                            align="center"
                                            sortable
                                    ></el-table-column>
                                    <el-table-column
                                            label="成本价"
                                            prop="costPrice"
                                            width="120"
                                            align="center"
                                            sortable
                                    ></el-table-column>
                                    <el-table-column
                                            label="备注"
                                            prop="note"
                                            width="150"
                                            align="center"
                                    ></el-table-column>

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


                                </el-table>
                                <div style="text-align: right;margin: 0.2em">
                                    <el-button type="primary" size="mini" @click="upPreservationMater">保存</el-button>
                                    <el-button size="mini" @click="upPurchasingAddGoods=false">取消</el-button>
                                </div>

                            </div>


                        </el-dialog>


                    </div>

                    <!--采购明细-->
                    <el-dialog
                            title="采购明细"
                            :visible.sync="Purchasedetailmater"
                            width="80%"
                            :show-close="false"
                    >
                        <div style="display: flex;justify-content: space-between;padding: 0.5em">
                            <el-button icon="el-icon-view" size="mini" @click="detailSettingsmater=true">显示设置
                            </el-button>
                        </div>

                        <el-table
                                :data="selsectdetailsListmater"
                                border
                                stripe
                                style="width: 100%">

                            <el-table-column
                                    align="center"
                                    type="index"
                                    width="50">
                            </el-table-column>
                            <el-table-column
                                    label="预计入库时间"
                                    width="200"
                                    v-if="warehouseTimemater"
                                    align="center"
                                    prop="warehouseTime"
                            >

                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="数量"
                                    width="200"
                                    v-if="numbermater"
                                    prop="number"
                            >
                            </el-table-column>


                            <el-table-column
                                    label="创建时间"
                                    prop="createTime"
                                    width="180"
                                    v-if="createTimemater"
                                    align="center"
                                    sortable
                            ></el-table-column>
                            <el-table-column

                                    label="修改时间"
                                    prop="updateTime"
                                    width="180"
                                    v-if="updateTimemater"
                                    align="center"
                                    sortable
                            ></el-table-column>

                            <el-table-column
                                    label="含税单价（元）"
                                    width="150"
                                    align="center"
                                    prop="taxPrice"
                                    v-if="taxPricemater"

                            >
                            </el-table-column>

                            <el-table-column
                                    label="不含税单价（元）"
                                    width="150"
                                    v-if="unitPricemater"
                                    align="center"
                                    prop="unitPrice"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="含税总价（元）"
                                    width="150"
                                    align="center"
                                    v-if="taxTotalPricemater"
                                    prop="taxTotalPrice"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="不含税总价（元）"
                                    width="150"
                                    align="center"
                                    v-if="totalPricemater"
                                    prop="totalPrice"
                            >
                            </el-table-column>


                            <el-table-column
                                    label="物料编号"
                                    prop="materialCode"
                                    width="180"
                                    v-if="materialCodemater"
                                    align="center"
                                    sortable
                            ></el-table-column>
                            <el-table-column
                                    label="物料名称"
                                    prop="name"
                                    v-if="namemater"
                                    width="200"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    prop="ingredients"
                                    label="成分规格"
                                    v-if="ingredientsmater"
                                    width="180"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="物料分类"
                                    prop="type"
                                    v-if="typemater"
                                    width="180"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="品牌"
                                    prop="brand"
                                    v-if="brandmater"
                                    width="120"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="状态"
                                    width="180"
                                    v-if="sparemater"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    {{scope.row.spare=='01'?'启用':'未启用'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="默认损耗"
                                    prop="defaultLoss"
                                    width="160"
                                    v-if="defaultLossmater"
                                    align="center"
                                    sortable
                            ></el-table-column>
                            <el-table-column
                                    label="厂商"
                                    prop="manufacturer"
                                    v-if="manufacturermater"
                                    width="180"
                                    align="center"
                            ></el-table-column>
                            <el-table-column
                                    label="基本计量单位"
                                    prop="unit"
                                    width="150"
                                    v-if="unitmater"
                                    align="center"
                                    sortable
                            ></el-table-column>
                            <el-table-column
                                    label="成本价"
                                    prop="costPrice"
                                    v-if="costPricemater"
                                    width="120"
                                    align="center"
                                    sortable
                            ></el-table-column>
                            <el-table-column
                                    label="备注"
                                    prop="note"
                                    v-if="notemater"
                                    width="150"
                                    align="center"
                            ></el-table-column>

                        </el-table>
                        <div style="text-align: left;margin-top: 0.5em">
                            总数量:{{detailsNumbermater}},
                            总金额（含税）:{{detailstaxgoodsMoneymater.toFixed(4)}},
                            总金额（不含税）:{{detailsgoodsMoneymater.toFixed(4)}}
                            <!--// detailsNumbermater: 0,//明细总数量,-->
                            <!--//     detailsgoodsMoneymater: 0,//明细总金额(不含税)-->
                            <!--//     detailstaxgoodsMoneymater: 0,//明细总金额(含税)-->
                        </div>
                    </el-dialog>


                    <!--采购明细显示设置-->
                    <el-dialog
                            title="显示设置"
                            :visible.sync="detailSettingsmater"
                            width="30%"
                            :show-close="false"

                    >
                        <div style="text-align: left">


                            <el-row>
                                <el-col :span="8">
                                    <el-checkbox v-model="warehouseTimemater">预计入库时间</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="numbermater">数量</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="createTimemater">创建时间</el-checkbox>
                                </el-col>
                            </el-row>


                            <el-row>
                                <el-col :span="8">
                                    <el-checkbox v-model="updateTimemater">修改时间</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="taxPricemater">含税单价</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="taxTotalPricemater">含税总价</el-checkbox>
                                </el-col>
                            </el-row>


                            <el-row>
                                <el-col :span="8">
                                    <el-checkbox v-model="totalPricemater">不含税总价</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="namemater">物料名称</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="ingredientsmater">成分规格</el-checkbox>
                                </el-col>
                            </el-row>


                            <el-row>
                                <el-col :span="8">
                                    <el-checkbox v-model="typemater">物料分类</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="brandmater">品牌</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="sparemater">状态</el-checkbox>
                                </el-col>
                            </el-row>


                            <el-row>
                                <el-col :span="8">
                                    <el-checkbox v-model="defaultLossmater">默认损耗</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="manufacturermater">厂商</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="unitmater">基本计量单位</el-checkbox>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="8">
                                    <el-checkbox v-model="materialCodemater">物料编号</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="costPricemater">成本价</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="notemater">备注</el-checkbox>
                                </el-col>

                            </el-row>


                        </div>

                    </el-dialog>
                    <div>

                        <el-table
                                :data="materpurchaseList"
                                border
                                stripe
                                height="700px"
                                @row-dblclick="Purchasedetailsmater"
                                @selection-change="Multipleselection"

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
                                    v-if="createTimematerSet"
                                    width="180"
                                    align="center"
                                    sortable
                            ></el-table-column>
                            <el-table-column
                                    label="修改时间"
                                    prop="updateTime"
                                    v-if="updateTimematermaterSet"
                                    width="180"
                                    align="center"
                                    sortable
                            ></el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="purchaseNumber"
                                    label="采购单号"
                                    width="200"
                                    v-if="purchaseNumbermaterSet"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="供应商"
                                    prop="supplier"
                                    align="center"
                                    width="150"
                                    v-if="operationmaterSet"
                            ></el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="purchaseSource"
                                    label="采购订单来源"
                                    v-if="purchaseSourcematerSet"
                                    width="150"
                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="submitStatus"
                                    label="提交状态"
                                    width="150"
                                    v-if="submitStatusmaterSet"
                            >
                                <template slot-scope="scope">
                                    <span>{{scope.row.submitStatus=='tj01'?'已提交':'未提交'}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column
                                    align="center"
                                    prop="submitTime"
                                    label="提交时间"
                                    width="160"
                                    v-if="submitTimematerSet"
                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="auditStatus"
                                    label="审核状态"
                                    v-if="auditStatusmaterSet"
                            >
                                <template slot-scope="scope">
                                    <span>{{scope.row.auditStatus=='sh01'?'已审核':scope.row.auditStatus=='sh02'?'未审核':'审核驳回'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="auditTime"
                                    label="审核时间"
                                    width="160"
                                    v-if="auditTimematerSet"
                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="receiveStatus"
                                    v-if="receiveStatusmaterSet"
                                    label="收货状态">
                                <template slot-scope="scope">
                                    <span>{{scope.row.receiveStatus=='sh01'?'已收货':(scope.row.receiveStatus=='sh02'?'部分收货':'未收货')}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="invoice"
                                    v-if="invoicematerSet"
                                    width="120"
                                    label="发票">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="freight"
                                    v-if="freightmaterSet"
                                    label="运费">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="freightTransportation"
                                    v-if="freightTransportationmaterSet"
                                    label="货运方式">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="frequency"
                                    v-if="frequencymaterSet"
                                    width="120"
                                    label="已入库数量">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="type"
                                    width="180"
                                    v-if="typematerSet"
                                    label="采购订单类型">
                            </el-table-column>
                            <el-table-column
                                    prop="commodityType"
                                    label="商品类型"
                                    align="center"
                                    width="120"
                                    v-if="commodityTypematerSet"
                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="receiveAddress"
                                    label="收货地址"
                                    width="180"
                                    v-if="receiveAddressmaterSet"
                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="contractTerm"
                                    label="合同条款"
                                    v-if="contractTermmaterSet"
                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="singlePerson"
                                    label="制单人"
                                    v-if="singlePersonmaterSet"

                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="submitter"
                                    label="提交人"
                                    v-if="submittermaterSet"
                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="financialJudge"
                                    v-if="financialJudgematerSet"
                                    label="财审人">

                            </el-table-column>
                            <el-table-column
                                    align="frequency"
                                    prop="auditor"
                                    v-if="auditormaterSet"
                                    label="审核人">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="totalSum"
                                    width="180"
                                    v-if="totalSummaterSet"
                                    label="总金额(不含税)">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="taxTotalSum"
                                    width="180"
                                    v-if="taxTotalSummaterSet"
                                    label="总金额(含税)">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="总数量"
                                    v-if="totalQuantitymaterSet"
                                    width="120"
                                    prop="totalQuantity"
                            >
                            </el-table-column>

                            <el-table-column
                                    align="center"
                                    prop="completeStatus"
                                    width="120"
                                    v-if="completeStatusmaterSet"
                                    label="采购完成状态">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="taxAmount"
                                    width="100"
                                    v-if="taxAmountmaterSet"
                                    label="税额">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="taxRate"
                                    width="100"
                                    v-if="taxRatematerSet"
                                    label="税率">
                            </el-table-column>
                            <el-table-column
                                    label="备注"
                                    align="center"
                                    width="120"
                                    v-if="remarkmaterSet"
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
                                    <el-button type="text" @click="updatamater(scope.row)">修改</el-button>
                                    <el-button type="text" @click="delpurMaterList(scope.row)">删除</el-button>
                                </template>

                            </el-table-column>
                        </el-table>
                        <!--分页-->
                        <el-row>
                            <el-col :span="10" :offset="14">
                                <el-pagination
                                        @current-change="materfactorylistpag"
                                        :page-size="10"
                                        layout="prev, pager, next, jumper"
                                        :total="totalRecordNum">
                                </el-pagination>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="商品采购" name="first">
                <div>
                    <!--新建与查询-->
                    <div style="padding: 0.5em">


                        <div style="text-align: left;margin-bottom: 0.5em">
                            <el-button size="mini" type="primary" class="el-icon-plus" @click="Newpurchaseorder=true">
                                新建
                            </el-button>
                            <el-button icon="el-icon-view" type="primary" size="mini" @click="Settings=true">显示设置
                            </el-button>
                            <el-button size="mini" type="primary" :disabled="auditStatusButGoods" >提交审核</el-button>
                            <el-button size="mini" type="primary" :disabled="submitStatusButGoods">审核通过</el-button>
                            <el-button size="mini" type="primary" :disabled="submitStatusButGoods">审核驳回</el-button>
                            <el-button size="mini" type="danger" :disabled="delStatusButGoods"
                                       @click="delpurchaseList()">批量删除
                            </el-button>
                            <!--<el-button size="mini">导出</el-button>-->
                        </div>
                        <div style="display: flex;justify-content:space-between">

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
                            <el-select size="mini" clearable v-model="Submitstate" placeholder="提交状态">
                                <el-option
                                        v-for="item in Submit"
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


                            <el-input size="mini" style="width: 200px" placeholder="采购单号" clearable
                                      v-model="purchaseNumbers"></el-input>

                            <el-button type="primary" size="mini" icon="el-icon-edit"
                                       @click="purchaseNumbers='',ReceivingStatus='',AuditStatuss='',purchaseTime='',TimeType=''">
                                重置
                            </el-button>

                            <el-button type="primary" size="mini" icon="el-icon-search" @click="purchaseQueryPage()">查询
                            </el-button>

                        </div>
                        <!--显示设置-->
                        <el-dialog
                                title="显示设置"
                                :visible.sync="Settings"
                                width="30%"
                                :show-close="false"

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
                                        <el-checkbox v-model="totalSum">总金额(不含税)</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="taxTotalSum">总金额（含税）</el-checkbox>
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
                                        <el-checkbox v-model="operation">供应商</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="submitStatus">提交状态</el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                        <el-checkbox v-model="submitTime">提交时间</el-checkbox>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-checkbox v-model="auditTime">审核时间</el-checkbox>
                                    </el-col>


                                </el-row>

                            </div>

                        </el-dialog>


                        <!--新建采购单-->
                        <el-dialog
                                title="新建采购单(商品)"
                                :visible.sync="Newpurchaseorder"
                                :show-close="false"
                                width="80%">
                            <el-form :model="addProcurement" ref="addProcurement" :rules="addProcurements" label-position="right"
                                     label-width="100px">
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item
                                                label="供应商"
                                                prop="supplier"
                                        >
                                            <!--供应商选择-->
                                            <el-select size="mini" filterable clearable
                                                       v-model="addProcurement.supplier"
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
                                            <el-select filterable size="mini" clearable
                                                       v-model="addProcurement.factoryName"
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
                                            <el-input size="mini" placeholder="备注"
                                                      v-model="addProcurement.remark"></el-input>
                                        </el-form-item>
                                    </el-col>

                                </el-row>


                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="发票" prop="invoice">
                                            <el-select @change="choose" size="mini" v-model="addProcurement.invoice"
                                                       placeholder="请选择发票">
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
                                    :data="addProcurement.goodsList"
                                    border
                                    stripe
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
                                        <el-input-number size="mini" :min="1" v-model="scope.row.number"
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
                                        <el-input-number :min="0" @change="containtax(scope.row)" :disabled="containing"
                                                         size="mini"
                                                         v-model="scope.row.taxPrice"
                                                         label="描述文字"></el-input-number>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        label="不含税单价（元）"
                                        width="200"
                                        align="center"
                                >
                                    <template slot-scope="scope">
                                        <el-input-number :min="0" :disabled="nocontaining" size="mini"
                                                         v-model="scope.row.unitPrice"
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
                                        width="150"
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
                                        prop="unit"
                                        width="100"
                                        label="单位">
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
                                    总金额（含税）:{{taxgoodsMoney.toFixed(4)}},
                                    总金额（不含税）:{{goodsMoney.toFixed(4)}}

                                </div>
                                <div>
                                    <el-button type="primary" size="mini" @click="SubmissionPurchase('addProcurement')">
                                        保存
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
                                :show-close="false"
                        >
                            <!--新建与查询-->
                            <div class="menuBox">
                                <div>
                                    <el-row>
                                        <el-col :span="4">
                                            <el-input size="mini" placeholder="商家编码"
                                                      v-model="querymerchantCode"></el-input>
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
                                            <el-button type="primary" size="mini" icon="el-icon-search"
                                                       @click="queryGoods()">查询
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                            <div>
                                <el-table
                                        :data="quireGoodsData"
                                        border
                                        stripe
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
                                            prop="unit"
                                            width="100"
                                            label="单位">
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
                                        stripe
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

                                    <!--<el-table-column-->
                                    <!--label="预计入库时间"-->
                                    <!--width="200"-->
                                    <!--align="center"-->
                                    <!--&gt;-->
                                    <!--<template slot-scope="scope">-->
                                    <!--<el-date-picker-->
                                    <!--style="width: 180px"-->
                                    <!--type="datetime"-->
                                    <!--v-model="scope.row.warehouseTime"-->
                                    <!--size="mini"-->
                                    <!--value-format="yyyy-MM-dd HH:mm:ss"-->
                                    <!--placeholder="预计入库时间">-->
                                    <!--</el-date-picker>-->
                                    <!--</template>-->
                                    <!--</el-table-column>-->


                                    <!--<el-table-column-->
                                    <!--align="center"-->
                                    <!--label="数量"-->
                                    <!--width="200"-->
                                    <!--&gt;-->
                                    <!--<template slot-scope="scope">-->
                                    <!--<el-input-number size="mini" v-model="scope.row.number" :min="1" :max="100000"-->
                                    <!--label="描述文字"></el-input-number>-->
                                    <!--</template>-->
                                    <!--</el-table-column>-->
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


                                    <!--<el-table-column-->
                                    <!--label="不含税单价（元）"-->
                                    <!--width="200"-->
                                    <!--align="center"-->
                                    <!--&gt;-->
                                    <!--<template slot-scope="scope">-->

                                    <!--<el-input-number :change="CalculationPrice(scope.row)" size="mini"-->
                                    <!--v-model="scope.row.unitPrice" :min="1"-->
                                    <!--:max="100000" label="描述文字"></el-input-number>-->

                                    <!--</template>-->
                                    <!--</el-table-column>-->
                                    <!--<el-table-column-->
                                    <!--label="含税单价（元）"-->
                                    <!--width="200"-->
                                    <!--align="center"-->

                                    <!--&gt;-->
                                    <!--<template slot-scope="scope">-->
                                    <!--<el-input-number disabled size="mini" v-model="scope.row.taxPrice"-->
                                    <!--label="描述文字"></el-input-number>-->
                                    <!--</template>-->
                                    <!--</el-table-column>-->
                                    <!--<el-table-column-->
                                    <!--label="含税总价（元）"-->
                                    <!--width="120"-->
                                    <!--align="center"-->
                                    <!--prop="taxTotalPrice"-->
                                    <!--&gt;-->
                                    <!--</el-table-column>-->
                                    <!--<el-table-column-->
                                    <!--label="不含税总价（元）"-->
                                    <!--width="150"-->
                                    <!--align="center"-->
                                    <!--prop="totalPrice"-->
                                    <!--&gt;-->
                                    <!--</el-table-column>-->

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
                                            prop="unit"
                                            width="100"
                                            label="单位">
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


                        <!--修改采购单-->
                        <el-dialog
                                title="修改采购单(商品)"
                                :visible.sync="upNewpurchaseorder"
                                :show-close="false"
                                width="80%">

                            <el-form :model="upaddProcurement" :rules="upaddProcurements" label-width="100px"
                                     ref="upaddProcurement" label-position="right">
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item
                                                label="供应商"
                                                clearable
                                                prop="supplier"
                                        >
                                            <!--供应商选择-->
                                            <el-select size="mini" filterable clearable
                                                       v-model="upaddProcurement.supplier"
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
                                            <el-select size="mini" filterable clearable
                                                       v-model="upaddProcurement.factoryName"
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
                                            <el-input size="mini" placeholder="备注"
                                                      v-model="upaddProcurement.remark"></el-input>
                                        </el-form-item>
                                    </el-col>

                                </el-row>


                                <el-row>
                                    <!--freightTransportation: '',//货运方式-->
                                    <!--invoice: '',//发票-->
                                    <el-col :span="6">
                                        <el-form-item label="发票" prop="invoice">
                                            <el-select @change="upchoose" size="mini" v-model="upaddProcurement.invoice"
                                                       placeholder="请选择发票">
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
                                    :data="upaddProcurement.goodsList"
                                    border
                                    stripe
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


                                <el-table-column
                                        label="含税单价（元）"
                                        width="200"
                                        align="center"

                                >
                                    <template slot-scope="scope">
                                        <el-input-number @change="upcontaintax(scope.row)" :mini="1"
                                                         :disabled="upcontaining" size="mini"
                                                         v-model="scope.row.taxPrice"
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
                                                         :disabled="upnocontaining" :mini="1"
                                                         @change="upaddprocure(scope.row)"></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="含税总价（元）"
                                        width="120"
                                        align="center"
                                        prop="taxTotalPrice"
                                >
                                    <template slot-scope="scope">
                                        {{scope.row.taxTotalPrice.toFixed(2)}}
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        label="不含税总价（元）"
                                        width="120"
                                        align="center"
                                        prop="totalPrice"
                                >
                                    <template slot-scope="scope">
                                        {{scope.row.totalPrice.toFixed(2)}}
                                    </template>
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
                                        prop="unit"
                                        width="100"
                                        label="单位">
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
                                    总金额（含税）{{uptaxgoodsMoney.toFixed(4)}}
                                    总金额（不含税）:{{upgoodsMoney.toFixed(4)}}
                                </div>
                                <div>
                                    <el-button type="primary" size="mini"
                                               @click="upSubmissionPurchase('upaddProcurement')">保存
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
                                :show-close="false"

                        >
                            <!--新建与查询-->
                            <div class="menuBox">
                                <div>
                                    <el-row>
                                        <el-col :span="4">
                                            <el-input size="mini" placeholder="商家编码"
                                                      v-model="querymerchantCode"></el-input>
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
                                            <el-button type="primary" size="mini" icon="el-icon-search"
                                                       @click="queryGoods()">查询
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </div>
                            </div>
                            <div>
                                <el-table
                                        :data="quireGoodsData"
                                        border
                                        stripe
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
                                            <el-button type="text" @click="upaddgoodsTopurchase(scope.row)">添加
                                            </el-button>
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
                                            prop="unit"
                                            width="100"
                                            label="单位">
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
                                        stripe
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
                                            prop="unit"
                                            width="100"
                                            label="单位">
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
                                        <el-button type="primary" size="mini" @click="upPreservationGoods">保存
                                        </el-button>
                                        <el-button size="mini" @click="upPurchasingAddGoods=false">取消</el-button>
                                    </div>

                                </div>

                            </div>


                        </el-dialog>


                    </div>

                    <!--采购明细-->
                    <el-dialog
                            title="采购明细"
                            :visible.sync="Purchasedetail"
                            width="80%"
                            :show-close="false"
                    >
                        <div style="display: flex;justify-content: space-between;padding: 0.5em">
                            <el-button icon="el-icon-view" size="mini" @click="detailSettings=true">显示设置</el-button>
                        </div>

                        <el-table
                                :data="selsectdetailsList"
                                border
                                stripe
                                style="width: 100%">

                            <el-table-column
                                    align="center"
                                    type="index"
                                    width="50">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="merchantCode"
                                    v-if="detailmerchantCode"
                                    label="商家编码"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="name"
                                    v-if="detailname"
                                    label="商品名称"
                                    width="180">
                            </el-table-column>

                            <el-table-column
                                    align="center"
                                    prop="itemCode"
                                    v-if="detailitemCode"
                                    label="货品编号"
                                    width="180"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="预计入库时间"
                                    width="200"
                                    v-if="detailwarehouseTime"
                                    align="center"
                                    prop="warehouseTime"
                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    label="数量"
                                    width="200"
                                    v-if="detailnumber"
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
                                    v-if="detailtaxPrice"
                                    prop="taxPrice"

                            >
                            </el-table-column>

                            <el-table-column
                                    label="不含税单价（元）"
                                    width="200"
                                    align="center"
                                    v-if="detailunitPrice"
                                    prop="unitPrice"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="含税总价（元）"
                                    width="120"
                                    align="center"
                                    v-if="detailtaxTotalPrice"
                                    prop="taxTotalPrice"
                            >
                            </el-table-column>
                            <el-table-column
                                    label="不含税总价（元）"
                                    width="200"
                                    align="center"
                                    v-if="detailtotalPrice"
                                    prop="totalPrice"
                            >
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="type"
                                    v-if="detailtype"
                                    label="分类"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="sku"
                                    v-if="detailsku"
                                    width="180"
                                    label="盒装SKU">

                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="brand"
                                    v-if="detailbrand"
                                    width="180"
                                    label="品牌">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="process"
                                    v-if="detailprocess"
                                    width="180"
                                    label="工艺流程">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="season"
                                    v-if="detailseason"
                                    width="180"
                                    label="季节">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="costPrice"
                                    v-if="detailcostPrice"
                                    width="180"
                                    label="商品成本价">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="unit"
                                    v-if="detailunit"
                                    width="180"
                                    label="基本单位">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="packag"
                                    v-if="detailpackag"
                                    width="180"
                                    label="包装材料">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="weight"
                                    v-if="detailweight"
                                    width="180"
                                    label="重量">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="barCode"
                                    v-if="detailbarCode"
                                    width="180"
                                    label="条形码">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="ingredients"
                                    v-if="detailingredients"
                                    width="180"
                                    label="面料成份">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="standard"
                                    v-if="detailstandard"
                                    width="180"
                                    label="执行工艺标准">
                            </el-table-column>
                            <el-table-column
                                    align="center"
                                    prop="remark"
                                    v-if="detailremark"
                                    width="180"
                                    label="备注">
                            </el-table-column>

                        </el-table>
                        <div style="text-align: left;margin-top: 0.5em">
                            总数量:{{detailsNumber}},
                            总金额（含税）:{{detailstaxgoodsMoney.toFixed(4)}},
                            总金额（不含税）:{{detailsgoodsMoney.toFixed(4)}}

                        </div>
                    </el-dialog>


                    <!--采购明细显示设置-->
                    <el-dialog
                            title="显示设置"
                            :visible.sync="detailSettings"
                            width="30%"
                            :show-close="false"

                    >
                        <div style="text-align: left">


                            <el-row>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailmerchantCode">商家编码</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailname">商品名称</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailitemCode">货品编号</el-checkbox>
                                </el-col>
                            </el-row>


                            <el-row>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailwarehouseTime">预计入库时间</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailnumber">数量</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailtaxPrice">含税单价</el-checkbox>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailunitPrice">不含税单价</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailtaxTotalPrice">含税总价</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailtotalPrice">不含税总价</el-checkbox>
                                </el-col>
                            </el-row>


                            <el-row>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailtype">分类</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailsku">盒装SKU</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailbrand">品牌</el-checkbox>
                                </el-col>
                            </el-row>


                            <el-row>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailprocess">工艺流程</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailseason">季节</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailcostPrice">商品成本价</el-checkbox>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailunit">基本单位</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailpackag">包装材料</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailweight">重量</el-checkbox>
                                </el-col>
                            </el-row>


                            <el-row>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailbarCode">条形码</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailingredients">面料成份</el-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailstandard">执行工艺标准</el-checkbox>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="8">
                                    <el-checkbox v-model="detailremark">备注</el-checkbox>
                                </el-col>
                            </el-row>


                        </div>

                    </el-dialog>
                    <div>
                        <el-table
                                :data="purchaseList"
                                border
                                stripe
                                height="700px"
                                @row-dblclick="Purchasedetails"
                                @selection-change="MultipleselectionGoods"

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
                                    <span>{{scope.row.auditStatus=='sh01'?'已审核':scope.row.auditStatus=='sh02'?'未审核':'审核驳回'}}</span>
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

                            <el-table-column
                                    label="操作"
                                    fixed="right"
                                    width="120"
                                    align="center"
                            >
                                <template slot-scope="scope">
                                    <el-button type="text" @click="updata(scope.row)">修改</el-button>
                                    <el-button type="text" @click="delpurchase(scope.row)">删除</el-button>
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
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
    import {regionDataPlus, CodeToText} from 'element-china-area-data'

    export default {
        name: "purchase",
        data() {
            return {
                a: 1,
                activeName2: 'second',
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
                    value: 'sh03',
                    label: '未收货'
                }, {
                    value: 'sh02',
                    label: '部分收货'
                }, {
                    value: 'sh01',
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
                TimeType: '',//时间类型状态(商品)
                materTimeType: '',//时间类型状态(商品)
                ReceivingStatus: '',//收货状态
                purchaseNumbers: '',//采购单号
                Audit: [{
                    /**
                     * 审核状态
                     * **/
                    value: 'sh01',
                    label: '已审核'
                }, {
                    value: 'sh02',
                    label: '未审核'
                }],
                Submit: [{
                    /**
                     * 提交状态
                     * **/
                    value: 'tj01',
                    label: '已提交'
                }, {
                    value: 'tj02',
                    label: '未提交'
                }],
                AuditStatuss: '',//审核状态
                Submitstate: '',//提交状态
                purchaseTime: '',//查询时间
                purchasePageNum: 1,//采购单默认显示页数(商品)
                purchasePageSize: 10,//采购单默认显示条目数
                purchaseList: [],//采购订单列表信息(商品)
                totalRecordNum: 0,
                matertotalRecordNum: 0,
                /**
                 * 显示设置(商品)
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
                totalSum: true,//"总金额（不含税）",
                taxTotalSum: true,//总金额（含税）
                totalQuantity: true,//"总数量",
                completeStatus: true,//"采购完成状态",
                distanceDates: true,//"距离下单时间",
                taxRate: true,//税率
                taxAmount: true,//税额
                remark: true,//备注
                Settings: false,//显示设置面板（商品）
                SettingsMater: false,//显示设置面板（原材料）
                Newpurchaseorder: false,//新建采购单面板
                upNewpurchaseorder: false,//修改采购单面板
                options: [],//供应商查询数据
                submitStatusBut: true,//审核按钮
                auditStatusBut: true,//提交按钮
                delStatusBut: true,//删除按钮


                submitStatusButGoods: true,//审核按钮
                auditStatusButGoods: true,//提交按钮
                delStatusButGoods: true,//删除按钮


                /**
                 * 显示设置(原材料)
                 * **/
                purchaseCodematerSet: true,//"采购编码",
                operationmaterSet: true,//"供应商",
                purchaseNumbermaterSet: true,//"采购单号",
                updateTimematermaterSet: true,//修改时间
                createTimematerSet: true,//创建时间
                purchaseSourcematerSet: true,//"采购订单来源",
                submitTimematerSet: true,//提交时间
                submitStatusmaterSet: true,//提交状态
                auditStatusmaterSet: true,//"审核状态",
                auditTimematerSet: true,//审核时间
                receiveStatusmaterSet: true,//"收货状态",
                invoicematerSet: true,//发票
                freightTransportationmaterSet: true,//货运方式
                freightmaterSet: true,//运费
                frequencymaterSet: true,//"入库次数",
                typematerSet: true,//"采购订单类型",
                commodityTypematerSet: true,// "商品类型",
                receiveAddressmaterSet: true,//"收货地址",
                contractTermmaterSet: true,//"合同条款",
                singlePersonmaterSet: true,//"制单人",
                submittermaterSet: true,//"提交人",
                financialJudgematerSet: true,//"财审人",
                auditormaterSet: true,//"审核人",
                totalSummaterSet: true,//"总金额（不含税）",
                taxTotalSummaterSet: true,//总金额（含税）
                totalQuantitymaterSet: true,//"总数量",
                completeStatusmaterSet: true,//"采购完成状态",
                distanceDatesmaterSet: true,//"距离下单时间",
                taxRatematerSet: true,//税率
                taxAmountmaterSet: true,//税额
                remarkmaterSet: true,//备注


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
                    supplier: '',//供应商选择信息
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
                goodsMoney: 0,//总金额(含税)
                taxgoodsMoney: 0,//总金额(不含税)
                upgoodsNum: 0,//总数量,
                upgoodsMoney: 0,//总金额(不含税)
                uptaxgoodsMoney: 0,//总金额(含税)

                detailsNumber: 0,//明细总数量,
                detailsgoodsMoney: 0,//明细总金额(不含税)
                detailstaxgoodsMoney: 0,//明细总金额(含税)

                purchaseNum: '',//采购单号
                purchaseNummater: '',//采购单号(原材料)
                selsectdetailsList: [],//采购明细数据(商品)
                selsectdetailsListmater: [],//采购明细数据(原材料)
                Purchasedetail: false,//采购明细面板


                /**
                 * 采购单商品详情显示设置
                 * **/
                detailSettings: false,//明细显示设置面板
                detailmerchantCode: true,//商家编码
                detailname: true,//商品名称
                detailitemCode: true,//货品编号
                detailwarehouseTime: true,//预计入库时间
                detailnumber: true,//数量
                detailtaxPrice: true,//含税单价
                detailunitPrice: true,//不含税单价
                detailtaxTotalPrice: true,//含税总价
                detailtotalPrice: true,//不含税总价
                detailtype: true,//分类
                detailsku: true,//盒装SKU
                detailbrand: true,//品牌
                detailprocess: true,//工艺流程
                detailseason: true,//季节
                detailcostPrice: true,//商品成本价
                detailunit: true,//基本单位
                detailpackag: true,//包装材料
                detailweight: true,//重量
                detailbarCode: true,//条形码
                detailingredients: true,//面料成份
                detailstandard: true,//执行工艺标准
                detailremark: true,//备注
                purchaseIds: [],//采购单信息多选id（商品）
                purchasematerIds: [],//采购单信息多选id（原材料）

                containing: true,//含税
                nocontaining: true,//不含税

                matercontaining: true,//含税(原材料)
                maternocontaining: true,//不含税(原材料)

                upmatercontaining: true,//修改含税(原材料)
                upmaternocontaining: true,//修改不含税(原材料)

                upcontaining: true,//修改含税
                upnocontaining: true,//修改不含税


                materialsList: [],//新建采购单（原材料）
                materialsNum: '',//物料编码（原材料）
                materialsName: '',//物料名称（原材料）
                VendorQueries: '',//厂商查询（原材料）
                totalPage: 0,//总页数（原材料）
                pageSize: 0,//单页个数（原材料）
                totalRecord: 0,//总条数（原材料）
                timematerData: '',//时间数据
                uptimematerData: '',//修改时间数据


                matergoodsNum: 0,//总数量,（原材料）
                matergoodsMoney: 0,//总金额(不含税)（原材料）
                matertaxgoodsMoney: 0,//总金额(含税)（原材料）

                upmatergoodsNum: 0,//总数量,（原材料）(修改)
                upmatergoodsMoney: 0,//总金额(不含税)（原材料）(修改)
                upmatertaxgoodsMoney: 0,//总金额(含税)（原材料）(修改)

                batchmaterTimelist: [],//批量添加时间数据
                upbatchmaterTimelist: [],//批量修改添加时间数据
                PurchasingAddmaterial: false,//采购单添加原料面板
                PurchasingAddmaterial_material: false,//添加原料面板
                Newpurchaseorder_mater: false,//新建采购单面板
                Purchasedetailmater: false,//原材料采购明细

                detailsNumbermater: 0,//明细总数量,
                detailsgoodsMoneymater: 0,//明细总金额(不含税)
                detailstaxgoodsMoneymater: 0,//明细总金额(含税)


                /**
                 * 采购明细显示设置(物料)
                 * */
                warehouseTimemater: true,//预计入库时间
                numbermater: true,//数量
                createTimemater: true,//创建时间
                updateTimemater: true,//修改时间
                taxPricemater: true,//含税单价
                unitPricemater: true,//不含税单价
                taxTotalPricemater: true,//含税总价
                totalPricemater: true,//不含税总价
                materialCodemater: true,//物料编号
                namemater: true,//物料名称
                ingredientsmater: true,//成分规格
                typemater: true,//物料分类
                brandmater: true,//品牌
                sparemater: true,//状态
                defaultLossmater: true,//默认损耗
                manufacturermater: true,//厂商
                unitmater: true,//基本计量单位
                costPricemater: true,//成本价
                notemater: true,//备注

                upPurchasingAddmaterial_material: false,//添加原料面板
                upNewpurchaseorder_mater: false,//新建采购单面板

                quiremateDataBox: [],//选中的物料信息
                upquiremateDataBox: [],//修改选中的物料信息


                materAuditStatuss: '',//审核状态(原材料)
                materpurchaseNumbers: '',//采购单号(原材料)
                materSubmitstate: '',//提交状态(原材料)
                materpurchaseTime: '',//查询时间(原材料)
                materpurchasePageNum: 1,//采购单默认显示页数
                materpurchasePageSize: 10,//采购单默认显示条目数
                materpurchaseList: [],//采购订单列表信息(原材料)
                materReceivingStatus: '',//采购订单列表信息(原材料)
                detailSettingsmater: false,//显示设置（原材料明细）

                addProcurementMater: {
                    //新建采购单(原材料)
                    supplier: '',//供应商选择信息
                    factoryName: '',//工厂选择信息
                    remark: '',//备注
                    freightTransportation: '',//货运方式
                    freight: '',//运费
                    invoice: '',//发票
                    goodsList: [],//采购单中的商品信息
                },
                addProcurementsMater: {
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

                upaddProcurementMater: {
                    //修改采购单(原材料)
                    supplier: '',//供应商选择信息
                    factoryName: '',//工厂选择信息
                    remark: '',//备注
                    freightTransportation: '',//货运方式
                    freight: '',//运费
                    invoice: '',//发票
                    goodsList: [],//采购单中的商品信息
                },
                upaddProcurementsMater: {
                    //修改采购单表单验证
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
            }
        },

        methods: {
            SubmitAudit(){
             //原材料提交审核
                this.$axios.post(this.$store.state.ProcurAudit,{
                    ids:this.purchasematerIds
                }).then(res=>{
                    if (res.data.code == 200) {
                        this.$message({
                            message: '提交成功',
                            type: 'success',
                            onClose() {
                                location.reload()
                            }
                        });
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
                console.log(this.purchasematerIds)
            },

            AuditPass(){
                // 原材料采购审核通过
                this.$axios.post(this.$store.state.ProcurementAudit,{
                    ids:this.purchasematerIds
                }).then(res=>{
                    if (res.data.code == 200) {
                    this.$message({
                        message: '提交成功',
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
            AuditReject(){
                //审核驳回
                this.$axios.post(this.$store.state.RejectMater,{
                    ids:this.purchasematerIds
                }).then(res=>{
                    if (res.data.code == 200) {
                        this.$message({
                            message: '操作成功',
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
            delpurMaterList(data) {
                //批量删除采购单信息（原材料）
                this.purchasematerIds.length = 0
                this.purchasematerIds.push(data.id)
                this.delMaterPur()
            },
            delMaterPur() {
                //删除采购单信息
                this.$axios.post(this.$store.state.delmater, {
                    ids: this.purchasematerIds
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '删除',
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
            updata(data) {
                //修改采购单信息
                this.upgoodsNum = 0
                this.upgoodsMoney = 0
                this.uptaxgoodsMoney = 0
                // upgoodsNum: 0,//总数量,
                //     upgoodsMoney: 0,//总金额(不含税)
                //     uptaxgoodsMoney: 0,//总金额(含税)
                this.upNewpurchaseorder = true
                this.upaddProcurement = data
                console.log(data)
                data.goodsList.forEach(item => {
                    this.upgoodsNum += item.number
                    this.upgoodsMoney += item.totalPrice
                    this.uptaxgoodsMoney += item.taxTotalPrice
                })

            },
            updatamater(data) {
                //修改采购单信息
                this.upmatergoodsNum = 0
                this.upmatergoodsMoney = 0
                this.upmatertaxgoodsMoney = 0

                // upgoodsNum: 0,//总数量,
                //     upgoodsMoney: 0,//总金额(不含税)
                //     uptaxgoodsMoney: 0,//总金额(含税)
                this.upNewpurchaseorder_mater = true
                this.upaddProcurementMater = data
                console.log(data)
                data.goodsList.forEach(item => {
                    this.upmatergoodsNum += item.number
                    this.upmatergoodsMoney += item.totalPrice
                    this.upmatertaxgoodsMoney += item.taxTotalPrice
                })

            },
            handleCurrentChange(val) {
                /**
                 * 原材料信息分页
                 * */
                this.queryPage(val, 5, this.selsetType)
            },
            queryPage(Num = 1, Size = 5, type = '全部') {
                //原材料信息分页查询
                let data = {
                    pageNum: Num, pageSize: Size, type: type,
                    materialCode: this.materialsNum, name: this.materialsName,
                    manufacturer: this.VendorQueries
                }

                this.$axios.get(this.$store.state.queryPage, {
                    params: data
                }).then(res => {
                    console.log(res.data)
                    this.materialsList = res.data.list
                    this.totalPage = res.data.totalPage//总页数
                    this.pageSize = res.data.pageSize//单页个数
                    this.totalRecord = res.data.totalRecord//总条数
                })

            },
            Multipleselection(data) {
                //原材料列表多选
                this.purchaseIds.length = 0
                this.purchasematerIds.length = 0
                data.forEach(item => {
                    this.purchaseIds.push(item.id)
                    this.purchasematerIds.push(item.id)
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
                    let lists = data.map(item => {
                        return item.auditStatus
                    })
                    let num = list.indexOf('tj02')
                    let nums = lists.indexOf('sh01')
                    console.log(data)
                    console.log(list)
                    console.log(nums)
                    if (num == -1) {
                        this.submitStatusBut = false
                        this.auditStatusBut = true
                    } else if (num != -1) {
                        this.submitStatusBut = true
                        this.auditStatusBut = false
                    }
                    if (nums!=-1){
                        this.submitStatusBut = true
                        this.auditStatusBut = true
                        this.delStatusBut = true
                    }
                }

            },
            MultipleselectionGoods(data) {
                //商品列表多选
                this.purchaseIds.length = 0
                this.purchasematerIds.length = 0
                data.forEach(item => {
                    this.purchaseIds.push(item.id)
                    this.purchasematerIds.push(item.id)
                })

                // submitStatusButGoods: true,//审核按钮
                //     auditStatusButGoods: true,//提交按钮
                //     delStatusButGoods:true,//删除按钮
                //采购单多选
                if (data.length == 0) {
                    this.submitStatusButGoods = true
                    this.auditStatusButGoods = true
                    this.delStatusButGoods = true
                } else {
                    this.delStatusButGoods = false
                    let list = data.map(item => {
                        return item.submitStatus
                    })
                    let num = list.indexOf('tj02')
                    let nums = list.indexOf('sh02')
                    if (num == -1) {
                        this.submitStatusButGoods = false
                        this.auditStatusButGoods = true
                    } else if (num != -1) {
                        this.submitStatusButGoods = true
                        this.auditStatusButGoods = false
                    }
                }

            },
            choose(data) {
                //选择发票回调
                if (data != '收据') {
                    this.containing = false;//含税
                    this.nocontaining = false;//不含税
                } else {
                    let list = this.addProcurement.goodsList
                    list.forEach(item => {
                        item.taxTotalPrice = 0
                        item.taxPrice = 0
                    })
                    this.taxgoodsMoney = 0,//总金额(含税)
                        this.containing = true;//含税
                    this.nocontaining = false;//不含税
                }

            },
            upchoose(data) {
                //修改选择发票回调
                if (data != '收据') {
                    this.upcontaining = false;//含税
                    this.upnocontaining = false;//不含税
                } else {
                    let list = this.upaddProcurement.goodsList
                    list.forEach(item => {
                        item.taxTotalPrice = 0
                        item.taxPrice = 0
                    })
                    this.uptaxgoodsMoney = 0,//总金额(含税)
                        this.upcontaining = true;//含税
                    this.upnocontaining = false;//不含税
                }

            },
            materchoose(data) {
                //选择发票回调
                // matercontaining: true,//含税(原材料)
                //     maternocontaining: true,//不含税(原材料)
                if (data != '收据') {
                    this.matercontaining = false;//含税
                    this.maternocontaining = false;//不含税
                } else {
                    let list = this.addProcurementMater.goodsList
                    list.forEach(item => {
                        item.taxTotalPrice = 0
                        item.taxPrice = 0
                    })
                    this.matergoodsMoney = 0,//总金额(含税)
                        this.matercontaining = true;//含税
                    this.maternocontaining = false;//不含税

                }

            },
            upmaterupchoose(data) {
                //修改选择发票回调
                if (data != '收据') {
                    this.upmatercontaining = false;//含税
                    this.upmaternocontaining = false;//不含税
                } else {
                    let list = this.upaddProcurementMater.goodsList
                    list.forEach(item => {
                        item.taxTotalPrice = 0
                        item.taxPrice = 0
                    })
                    //
                    // upmatercontaining: true,//修改含税(原材料)
                    //     upmaternocontaining: true,//修改不含税(原材料)
                    this.upmatertaxgoodsMoney = 0,//总金额(含税)
                        this.upmatercontaining = true;//含税
                    this.upmaternocontaining = false;//不含税
                }

            },
            selsectdetails() {
                //根据采购单号查询当前采购详情
                this.$axios.get(this.$store.state.queruPNumber, {
                    params: {purchaseNumber: this.purchaseNum}
                }).then(res => {
                    this.selsectdetailsList = res.data.data
                })
            },
            Purchasedetails(row) {
                //采购明细
                this.Purchasedetail = true
                this.purchaseNum = row.purchaseNumber
                this.detailsgoodsMoney = row.totalSum//明细总金额(不含税),
                this.detailsNumber = row.totalQuantity//明细总数量
                this.detailstaxgoodsMoney = row.taxTotalSum//明细总金额(含税)
                // this.selsectdetails()
                this.selsectdetailsList = row.goodsList
            },
            Purchasedetailsmater(row) {
                //采购明细(原材料)

                this.Purchasedetailmater = true
                this.purchaseNummater = row.purchaseNumber
                this.detailsgoodsMoneymater = row.totalSum//明细总金额(不含税),
                this.detailsNumbermater = row.totalQuantity//明细总数量
                this.detailstaxgoodsMoneymater = row.taxTotalSum//明细总金额(含税)
                this.selsectdetailsListmater = row.goodsList


            },
            batchTime() {
                //批量添加入库时间
                // this.timeData
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
            batchMaterTime() {
                //批量添加入库时间
                // this.timeData
                if (this.timematerData == '') {
                    this.$message.error('请先选择批量添加的时间');
                } else if (this.batchmaterTimelist.length == 0) {
                    this.$message.error('还未选择数据，无法添加');
                } else {
                    this.batchmaterTimelist.forEach(item => {
                        item.warehouseTime = this.timematerData
                        console.log(item.warehouseTime)
                    })

                    console.log(this.timematerData)
                }

            },
            upbatchMaterTime() {
                //批量添加入库时间
                // this.timeData
                if (this.uptimematerData == '') {
                    this.$message.error('请先选择批量添加的时间');
                } else if (this.upbatchmaterTimelist.length == 0) {
                    this.$message.error('还未选择数据，无法添加');
                } else {
                    this.upbatchmaterTimelist.forEach(item => {
                        item.warehouseTime = this.uptimematerData
                        console.log(item.warehouseTime)
                    })

                }

            },
            containtax(data) {
                //最后调整含税单价
                this.nocontaining = true;//不含税
                data.unitPrice = (data.taxPrice / (1 + 0.15)).toFixed(2)//计算不含税单价

                data.totalPrice = (data.unitPrice * data.number).toFixed(2)//不含税总价
                data.taxTotalPrice = (data.taxPrice * data.number).toFixed(2)//含税总价

                this.goodsMoney = 0//总金额(不含税)
                this.taxgoodsMoney = 0//总金额(含税)
                let list = this.addProcurement.goodsList

                list.forEach(item => {
                    // this.goodsMoney += item.unitPrice //不含税总价
                    this.goodsMoney += item.unitPrice * item.number
                    // this.taxgoodsMoney += item.taxTotalPrice
                })

                this.taxgoodsMoney = this.goodsMoney + this.goodsMoney * 0.15

            },
            addprocure(data) {
                //最后调整不含税单价
                // data.totalPrice

                if (this.addProcurement.invoice != '收据') {
                    this.containing = true;//含税
                    data.taxPrice = (data.unitPrice + data.unitPrice * 0.15).toFixed(2)
                    data.totalPrice = (data.unitPrice * data.number).toFixed(2)//不含税总价
                    data.taxTotalPrice = (data.taxPrice * data.number).toFixed(2)//含税总价

                    this.goodsMoney = 0//总金额(不含税)
                    this.taxgoodsMoney = 0//总金额(含税)
                    console.log(this.addProcurement.goodsList)
                    let list = this.addProcurement.goodsList
                    list.forEach(item => {
                        // this.goodsMoney += item.unitPrice //不含税总价
                        this.goodsMoney += item.unitPrice * item.number
                        // this.taxgoodsMoney += item.taxTotalPrice
                    })
                    this.taxgoodsMoney = this.goodsMoney + this.goodsMoney * 0.15
                } else {
                    data.totalPrice = data.unitPrice * data.number//不含税总价
                    this.goodsMoney = 0//总金额(不含税)
                    let list = this.addProcurement.goodsList
                    list.forEach(item => {
                        this.goodsMoney += item.unitPrice * item.number
                    })

                }


            },
            matercontaintax(data) {
                //最后调整含税单价(原材料)
                this.maternocontaining = true;//不含税
                data.unitPrice = (data.taxPrice / (1 + 0.15)).toFixed(2)//计算不含税单价

                data.totalPrice = (data.unitPrice * data.number).toFixed(2)//不含税总价
                data.taxTotalPrice = (data.taxPrice * data.number).toFixed(2)//含税总价

                this.matergoodsMoney = 0//总金额(不含税)
                this.matertaxgoodsMoney = 0//总金额(含税)
                let list = this.addProcurementMater.goodsList

                list.forEach(item => {
                    // this.goodsMoney += item.unitPrice //不含税总价
                    this.matergoodsMoney += item.unitPrice * item.number
                    // this.taxgoodsMoney += item.taxTotalPrice
                })

                this.matertaxgoodsMoney = this.matergoodsMoney * (1 + 0.15)

            },
            materaddprocure(data) {
                //最后调整不含税单价(原材料)

                // matercontaining: true,//含税(原材料)
                //     maternocontaining: true,//不含税(原材料)
                if (this.addProcurementMater.invoice != '收据') {
                    this.matercontaining = true;//含税
                    data.taxPrice = (data.unitPrice + data.unitPrice * 0.15).toFixed(2)
                    data.totalPrice = (data.unitPrice * data.number).toFixed(2)//不含税总价
                    data.taxTotalPrice = (data.taxPrice * data.number).toFixed(2)//含税总价

                    this.matergoodsMoney = 0//总金额(不含税)
                    this.matertaxgoodsMoney = 0//总金额(含税)

                    let list = this.addProcurementMater.goodsList
                    list.forEach(item => {
                        // this.goodsMoney += item.unitPrice //不含税总价
                        this.matergoodsMoney += item.unitPrice * item.number
                        // this.taxgoodsMoney += item.taxTotalPrice
                    })
                    this.matertaxgoodsMoney = this.matergoodsMoney * (1 + 0.15)
                } else {
                    data.totalPrice = data.unitPrice * data.number//不含税总价
                    this.matergoodsMoney = 0//总金额(不含税)
                    let list = this.addProcurementMater.goodsList
                    list.forEach(item => {
                        this.matergoodsMoney += item.unitPrice * item.number
                    })

                }


            },

            upmatercontaintax(data) {
                //修改最后调整含税单价(原材料)
                // upmatercontaining: true,//修改含税(原材料)
                //     upmaternocontaining: true,//修改不含税(原材料)

                this.upmaternocontaining = true;//不含税
                data.unitPrice = (data.taxPrice / (1 + 0.15))//计算不含税单价
                data.totalPrice = (data.unitPrice * data.number)//不含税总价
                data.taxTotalPrice = (data.taxPrice * data.number)//含税总价


                this.upmatergoodsMoney = 0//总金额(不含税)
                this.upmatertaxgoodsMoney = 0//总金额(含税)
                let list = this.upaddProcurementMater.goodsList
                console.log(list)
                list.forEach(item => {

                    this.upmatergoodsMoney += item.unitPrice * item.number
                    this.upmatertaxgoodsMoney += item.taxTotalPrice

                })


            },
            upmateraddprocure(data) {
                //修改最后调整单价(原材料)

                if (this.upaddProcurementMater.invoice != '收据') {
                    this.upmatercontaining = true;//含税
                    data.taxPrice = (data.unitPrice + data.unitPrice * 0.15)
                    data.totalPrice = (data.unitPrice * data.number)//不含税总价
                    data.taxTotalPrice = (data.taxPrice * data.number)//含税总价


                    this.upmatergoodsMoney = 0//总金额(不含税)
                    this.upmatertaxgoodsMoney = 0//总金额(含税)
                    console.log(this.addProcurement.goodsList)
                    let list = this.upaddProcurement.goodsList
                    list.forEach(item => {
                        // this.goodsMoney += item.unitPrice //不含税总价
                        this.upmatergoodsMoney += item.unitPrice * item.number
                        this.upmatertaxgoodsMoney += item.taxTotalPrice
                    })
                    // this.uptaxgoodsMoney = this.upgoodsMoney + this.upgoodsMoney * 0.15
                } else {
                    data.totalPrice = data.unitPrice * data.number//不含税总价
                    this.upmatergoodsMoney = 0//总金额(不含税)
                    let list = this.upaddProcurementMater.goodsList
                    list.forEach(item => {
                        this.upgoodsMoney += item.unitPrice * item.number
                    })

                }


            },


            upcontaintax(data) {
                //修改最后调整含税单价

                this.upnocontaining = true;//不含税
                data.unitPrice = (data.taxPrice / (1 + 0.15))//计算不含税单价
                data.totalPrice = (data.unitPrice * data.number)//不含税总价
                data.taxTotalPrice = (data.taxPrice * data.number)//含税总价


                this.upgoodsMoney = 0//总金额(不含税)
                this.uptaxgoodsMoney = 0//总金额(含税)
                let list = this.upaddProcurement.goodsList
                console.log(list)
                list.forEach(item => {

                    this.upgoodsMoney += item.unitPrice * item.number
                    this.uptaxgoodsMoney += item.taxTotalPrice

                })


            },
            upaddprocure(data) {
                //修改最后调整单价

                if (this.upaddProcurement.invoice != '收据') {
                    this.upcontaining = true;//含税
                    data.taxPrice = (data.unitPrice + data.unitPrice * 0.15)
                    data.totalPrice = (data.unitPrice * data.number)//不含税总价
                    data.taxTotalPrice = (data.taxPrice * data.number)//含税总价


                    this.upgoodsMoney = 0//总金额(不含税)
                    this.uptaxgoodsMoney = 0//总金额(含税)
                    console.log(this.addProcurement.goodsList)
                    let list = this.upaddProcurement.goodsList
                    list.forEach(item => {
                        // this.goodsMoney += item.unitPrice //不含税总价
                        this.upgoodsMoney += item.unitPrice * item.number
                        this.uptaxgoodsMoney += item.taxTotalPrice
                    })
                    // this.uptaxgoodsMoney = this.upgoodsMoney + this.upgoodsMoney * 0.15
                } else {
                    data.totalPrice = data.unitPrice * data.number//不含税总价
                    this.upgoodsMoney = 0//总金额(不含税)
                    let list = this.upaddProcurement.goodsList
                    list.forEach(item => {
                        this.upgoodsMoney += item.unitPrice * item.number
                    })

                }


                // this.upgoodsMoney = 0//总金额(不含税)
                // this.uptaxgoodsMoney = 0//总金额(含税)
                //
                // let list = this.upaddProcurement.goodsList
                // list.forEach(item => {
                //     this.upgoodsMoney += item.unitPrice * item.number//不含税总价
                // })
                // this.uptaxgoodsMoney = this.upgoodsMoney + this.upgoodsMoney * 0.15


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
                data.totalPrice = data.number * data.unitPrice //不含税单条记录总价
                data.taxTotalPrice = data.number * data.taxPrice//含税单条记录总价
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
            materNumber(data) {
                //最后调整原材料数量

                this.matergoodsNum = 0,//总数量,
                    this.matergoodsMoney = 0//总金额(不含税)
                this.matertaxgoodsMoney = 0//总金额(含税)
                let list = this.addProcurementMater.goodsList
                data.totalPrice = data.number * data.unitPrice //不含税单条记录总价
                data.taxTotalPrice = data.number * data.taxPrice//含税单条记录总价
                list.forEach(item => {
                    this.matergoodsNum += item.number //总数量
                    this.matergoodsMoney += item.number * item.unitPrice  //不含税总价
                    this.matertaxgoodsMoney += item.number * item.taxPrice  //含税总价
                })


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
                data.totalPrice = data.number * data.unitPrice //不含税单条记录总价
                data.taxTotalPrice = data.number * data.taxPrice//含税单条记录总价
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
            SubmissionMater(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //提交采购单数据（原材料）

                        this.$axios.post(this.$store.state.addmaterPurchase, this.addProcurementMater).then(res => {
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
                        console.log(this.addProcurementMater)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            upSubmissionMater(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //提交采购单数据(原材料 修改)
                        this.$axios.post(this.$store.state.upmaterPurchase, this.upaddProcurementMater).then(res => {
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
                        console.log(this.upaddProcurementMater)
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

                        this.$axios.post(this.$store.state.upaddsavePurchase, this.upaddProcurement).then(res => {
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
                // this.distanceDate

            },
            delpurchase(data) {
                //删除采购单信息
                this.purchaseIds.length = 0
                this.purchaseIds.push(data.id)
                this.delpurchaseList();
            },
            delpurchaseList() {
                //删除采购单
                this.$axios.post(this.$store.state.deletepur, {
                    ids: this.purchaseIds
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
            deltetPurchase(data) {
                //删除from表单数组中信息
                let a = this.addProcurement.goodsList.indexOf(data)
                console.log(data)
                this.quireGoodsDataBox.splice(a, 1)
                // goodsNum:0,//总数量,
                //     goodsMoney:0,//总金额
                // this.goodsNum = this.goodsNum - data.spare02
                // this.goodsMoney = this.goodsMoney - (data.spare02 * data.spare04)

                this.goodsNum = this.goodsNum - data.number
                this.goodsMoney = this.goodsMoney - (data.number * data.unitPrice)
                this.taxgoodsMoney = this.taxgoodsMoney - (data.number * data.taxPrice)
            },
            updeltetPurchase(data) {
                //删除from表单数组中信息
                let a = this.upaddProcurement.goodsList.indexOf(data)
                this.upaddProcurement.goodsList.splice(a, 1)
                //     upgoodsMoney: 0,//总金额(不含税)
                //     uptaxgoodsMoney: 0,//总金额(含税)
                // goodsNum:0,//总数量,
                //     goodsMoney:0,//总金额


                this.upgoodsNum = this.upgoodsNum - data.number
                this.upgoodsMoney = this.upgoodsMoney - (data.number * data.unitPrice)
                this.uptaxgoodsMoney = this.uptaxgoodsMoney - (data.number * data.taxPrice)
            },
            deltetmaterPurchase(data) {
                //删除from表单原材料数组中信息
                let a = this.addProcurementMater.goodsList.indexOf(data)
                console.log(data)
                this.quiremateDataBox.splice(a, 1)
                // goodsNum:0,//总数量,
                //     goodsMoney:0,//总金额
                // this.goodsNum = this.goodsNum - data.spare02
                // this.goodsMoney = this.goodsMoney - (data.spare02 * data.spare04)

                this.goodsNum = this.goodsNum - data.number
                this.goodsMoney = this.goodsMoney - (data.number * data.unitPrice)
                this.taxgoodsMoney = this.taxgoodsMoney - (data.number * data.taxPrice)
            },
            PreservationGoods() {
                //保存商品信息
                this.addProcurement.goodsList = this.quireGoodsDataBox
                this.goodsNum = 0;
                // this.goodsMoney = 0
                // this.taxgoodsMoney = 0;
                this.quireGoodsDataBox.forEach(item => {
                    this.goodsNum += item.number//总数量
                    // this.goodsMoney += item.number * item.unitPrice  //总金额
                })
                console.log(this.quireGoodsDataBox)
                // this.taxgoodsMoney = this.goodsMoney + this.goodsMoney * 0.15
                // console.log(this.addProcurement.goodsList)
                this.PurchasingAddGoods = false
            },
            upPreservationGoods() {
                //保存商品信息
                //   goodsList
                this.upgoodsNum = 0;
                // this.upgoodsMoney = 0
                // this.upaddProcurement.goodsList = this.upquireGoodsDataBox
                this.upquireGoodsDataBox.forEach(item => {
                    this.upaddProcurement.goodsList.push(item)
                })

                this.upquireGoodsDataBox.forEach(item => {
                    this.upgoodsNum += item.number//总数量
                    // this.upgoodsMoney += item.number * item.unitPrice//总金额(不含税)
                })
                // this.uptaxgoodsMoney = this.upgoodsMoney + this.upgoodsMoney * 0.15//总金额(含税)
                this.upPurchasingAddGoods = false
            },
            PreservationMater() {
                // matergoodsNum: 0,//总数量,（原材料）
                //     matergoodsMoney: 0,//总金额(不含税)（原材料）
                //     matertaxgoodsMoney: 0,//总金额(含税)（原材料）
                //保存商品信息(原材料)
                this.addProcurementMater.goodsList = this.quiremateDataBox
                this.goodsNum = 0;
                // this.goodsMoney = 0
                // this.taxgoodsMoney = 0;
                this.quiremateDataBox.forEach(item => {
                    this.matergoodsNum += item.number//总数量
                    // this.goodsMoney += item.number * item.unitPrice  //总金额
                })

                // this.taxgoodsMoney = this.goodsMoney + this.goodsMoney * 0.15
                // console.log(this.addProcurement.goodsList)
                this.PurchasingAddmaterial_material = false
            },
            upPreservationMater() {

                //修改商品信息(原材料)
                this.upaddProcurementMater.goodsList = this.upquiremateDataBox
                this.upgoodsNum = 0;
                // this.goodsMoney = 0
                // this.taxgoodsMoney = 0;
                this.upquiremateDataBox.forEach(item => {
                    this.upmatergoodsNum += item.number//总数量
                    // this.goodsMoney += item.number * item.unitPrice  //总金额
                })

                // this.taxgoodsMoney = this.goodsMoney + this.goodsMoney * 0.15
                // console.log(this.addProcurement.goodsList)
                this.upPurchasingAddmaterial_material = false
            },
            delpruchase(data) {
                //删除备选数组中信息
                let a = this.quireGoodsDataBox.indexOf(data)
                this.quireGoodsDataBox.splice(a, 1)
            },
            addgoodsTopurchase(data) {
                //添加商品信息至备选数组
                // this.quireGoodsDataBox.push(data)
                if (this.quireGoodsDataBox.indexOf(data) == -1) {
                    this.quireGoodsDataBox.push(data)
                    data.number = 1
                }


                // let a = JSON.stringify(this.quireGoodsDataBox).indexOf(JSON.stringify(data))
                // if (a != -1) {
                //     data.number++
                // } else {
                //     this.quireGoodsDataBox.push(data)
                //     data.number = 1
                // }
                // data.unitPrice = 1 //不含税单价

            },
            addmateTopurchase(data) {
                //添加商品信息至备选数组
                // this.quireGoodsDataBox.push(data)
                if (this.quiremateDataBox.indexOf(data) == -1) {
                    this.quiremateDataBox.push(data)
                    data.number = 1
                }
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
                })
            },
            goodsSelection(val) {
                //商品信息多选
                this.batchTimelist = val
            },
            upgoodsSelection(val) {
                //修改商品信息多选
                this.upbatchTimelist = val
            },
            goodsmaterSelection(val) {
                //原材料信息多选
                this.batchmaterTimelist = val
            },
            upgoodsmaterSelection(val) {
                //修改原材料信息多选
                this.upbatchmaterTimelist = val
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
                //采购信息分页(商品)
                this.purchasePageNum = val
                this.purchaseQueryPage()
            },
            materfactorylistpag(val) {
                //采购信息分页（原材料）
                this.materpurchasePageNum = val
                this.materialQueryPage()
            },

            purchaseQueryPage() {
                //采购订单分页查询(商品)
                let querydata = {
                    pageNum: this.purchasePageNum, pageSize: this.purchasePageSize,
                    auditStatus: this.AuditStatuss, submitStatus: this.Submitstate, receiveStatus: this.ReceivingStatus,
                    purchaseNumber: this.purchaseNumbers, typeTime: this.TimeType,
                    startTime: this.purchaseTime[0], endTime: this.purchaseTime[1]
                }

                this.$axios.get(this.$store.state.purchaseQueryPage, {
                    params: querydata,
                }).then(res => {
                    this.purchaseList = res.data.list
                    this.totalRecordNum = res.data.totalRecord
                    console.log(res.data.list)

                })
            },
            materialQueryPage() {
                //采购订单分页查询(原材料)

                let querydata = {
                    pageNum: this.materpurchasePageNum,
                    pageSize: this.materpurchasePageSize,
                    auditStatus: this.materAuditStatuss,
                    submitStatus: this.materSubmitstate,
                    receiveStatus: this.materReceivingStatus,
                    purchaseNumber: this.materpurchaseNumbers,
                    typeTime: this.materTimeType,
                    startTime: this.materpurchaseTime[0],
                    endTime: this.materpurchaseTime[1]

                }

                this.$axios.get(this.$store.state.materialqueryPage, {
                    params: querydata,
                }).then(res => {
                    this.materpurchaseList = res.data.list
                    this.matertotalRecordNum = res.data.totalRecord
                    console.log(res.data.list)

                })
            }
        },
        created: function () {
            // materialqueryPage
            this.purchaseQueryPage()//分页(商品)
            this.supplierQuery()//供应商列表
            this.factoryQuery()//工厂列表
            this.queryGoods()//商品信息查询
            this.queryPage()//原材料信息查询

            this.materialQueryPage()//分页(原材料)
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

    .el-dialog .el-dialog__body {
        margin: 0;
        padding: 0;
    }


</style>