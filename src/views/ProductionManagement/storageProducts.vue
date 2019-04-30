<template>
    <div class="storageProducts">
        <div class="menuBox">
            <div class="QueryConditions">
                <el-button size="mini" type="primary" class="el-icon-plus" @click="storePro=true">新建
                </el-button>


                <el-button type="primary" icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>
                <el-button size="mini" type="primary" :disabled="auditStatusstoreBut">提交审核</el-button>
                <el-button size="mini" type="primary" :disabled="submitStatusstoreBut">审核通过
                </el-button>
                <el-button size="mini" type="primary" :disabled="submitStatusstoreBut">审核驳回
                </el-button>
                <el-button size="mini" type="danger" :disabled="delStatusstoreBut" @click="delStockins">批量删除</el-button>
            </div>
            <div class=" QueryConditions QueryInput">
                <div>
                    <el-input size="mini" clearable placeholder="入库单编号" v-model="stockinCodeStorag"></el-input>
                    <el-input size="mini" clearable placeholder="发货单编号" v-model="sendCodeStorag"></el-input>
                    <el-input size="mini" clearable placeholder="派工单编号" v-model="dispatchCodeStorag"></el-input>
                    <el-input size="mini" clearable placeholder="商品名称" v-model="goodsNameStorag"></el-input>
                    <el-input size="mini" clearable placeholder="生产计划单编号" v-model="produceCodeStorag"></el-input>
                </div>
                <div>
                    <el-button type="primary" size="mini"
                               @click="conditionproduceCode='',conditionsstyleCode='',conditionmerchantCode='',conditionName='',conditionprocessNode=[]">
                        重置
                    </el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search"
                               @click="ProduQueryPage()">查询
                    </el-button>
                </div>
            </div>
        </div>
        <el-table
                border
                stripe
                :data="storeDataList"
                style="width: 100%"
                height="720px"
                @selection-change="Multipleselection"
        >
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column align="center" type="index"></el-table-column>
            <el-table-column align="center" v-if="WarehouseReceiptShow" label="入库单号" prop="stockinCode"
                             width="160px"></el-table-column>
            <el-table-column align="center" v-if="InvoiceNoShow" label="发货单号" prop="sendCode"
                             width="160px"></el-table-column>
            <el-table-column align="center" v-if="ProductionPlanningShow" label="生产计划单编号" prop="produceCode"
                             width="160px"></el-table-column>
            <el-table-column align="center" v-if="DispatchedNumberShow" label="派工单编号" prop="dispatchCode"
                             width="160px"></el-table-column>
            <el-table-column align="center" v-if="MerchantNumberShow" label="商家编号" prop="merchantCode"
                             width="160px"></el-table-column>
            <el-table-column align="center" v-if="ItemCodeShow" label="货品编号" prop="itemCode"
                             width="160px"></el-table-column>
            <el-table-column align="center" v-if="TradeNameShow" label="商品名称" prop="goodsName"
                             width="120px"></el-table-column>
            <el-table-column align="center" v-if="ExpectedWarehousingShow" label="预计入库总量" prop="expectStockinTotal"
                             width="120px"></el-table-column>
            <el-table-column align="center" v-if="ActualDeliveryShow" label="实际发货数量" prop="actualSendGoodsQuantity"
                             width="120px"></el-table-column>
            <el-table-column align="center" v-if="ActualQuantityShow" label="实际入库数量" prop="actualStockinQuantity"
                             width="120px"></el-table-column>
            <el-table-column align="center" v-if="ShippedShow" label="已发货数量" prop="shippedQuantity"
                             width="120px"></el-table-column>
            <el-table-column label="提交状态" v-if="submitShowStorage" prop="totalNumber"
                             align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.submitStatus=='tj01'?'已提交':'未提交'}}</span>
                </template>
            </el-table-column>

            <el-table-column label="审核状态" v-if="auditShowStorage" prop="totalNumber"
                             align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.auditStatus=='sh01'?'已审核':scope.row.auditStatus=='sh02'?'未审核':'审核驳回'}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" v-if="EstimatedStorageTimeShow" label="预计入库时间" prop="expectTime"
                             width="160px"></el-table-column>
            <el-table-column align="center" v-if="ActualStorageTimeShow" prop="actualTime" label="实际入库时间"
                             width="160px"></el-table-column>
            <el-table-column align="center" v-if="SinglePersonShow" label="制单人" prop="documentMaker"
                             width="100px"></el-table-column>
            <el-table-column align="center" v-if="RemarksShow" label="备注" width="100px" prop="remark"></el-table-column>
            <el-table-column align="center" label="操作" width="100px" fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" @click="upStoreProducts(scope.row)">修改</el-button>
                    <el-button type="text" @click="delStore(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-row>
            <el-col :span="10" :offset="14">
                <el-pagination
                        @current-change="storageQuery"
                        :page-size="15"
                        layout="prev, pager, next, jumper"
                        :total="totalRecordNumStorag">
                </el-pagination>
            </el-col>
        </el-row>

        <!--新建半成品入库-->
        <el-dialog
                width="1100px"
                style="padding: 0px;margin: 0px"
                title="半成品入库" :visible.sync="storePro" :show-close="false"
        >
            <el-form :model="addstorageProductsData" ref="addstorageProductsData" :rules="addStroevalidation"
                     size="mini" label-width="110px" label-position="right">
                <div style="display: flex;flex-wrap: nowrap;justify-content: space-between">
                    <el-form-item label="预计入库总量" prop="expectStockinTotal">
                        <el-input onkeyup="value=value.replace(/[^\d]/g,'')"
                                  v-model="addstorageProductsData.expectStockinTotal"></el-input>
                    </el-form-item>

                    <el-form-item label="实际入库总量" prop="actualStockinQuantity">
                        <el-input onkeyup="value=value.replace(/[^\d]/g,'')"
                                  v-model="addstorageProductsData.actualStockinQuantity"></el-input>
                    </el-form-item>


                    <el-form-item label="实际发货总量" prop="actualSendGoodsQuantity">
                        <el-input onkeyup="value=value.replace(/[^\d]/g,'')"
                                  v-model="addstorageProductsData.actualSendGoodsQuantity"></el-input>
                    </el-form-item>
                </div>

                <div style="display: flex;flex-wrap: nowrap;">

                    <el-form-item label="预计入库时间" prop="expectTime">
                        <el-date-picker

                                v-model="addstorageProductsData.expectTime"
                                type="datetime"
                                placeholder="预计入库时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                align="right"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item style="margin-left: 4em" label="实际入库时间" prop="actualTime">
                        <el-date-picker

                                v-model="addstorageProductsData.actualTime"
                                type="datetime"
                                placeholder="实际入库时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                align="right"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </div>
            </el-form>

            <div class="QueryConditions">
                <el-button size="mini" @click="introductionDelPro">引入半成品发货单</el-button>
                <el-button size="mini" @click="Settingsdel=true">显示设置</el-button>
            </div>

            <el-table
                    border
                    stripe
                    :data="addstorageProductsData.sendGoodsBeanList"
                    style="width: 100%"
            >
                <el-table-column align="center" v-if="productsShow" prop="sendCode" label="发货单号"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="produceCodeShow" prop="produceCode" label="生产计划单编号"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="dispatchCodeShow" prop="dispatchCode" label="派工单号"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="merchantCodeShow" prop="merchantCode" label="商家编号"
                                 width="160px"></el-table-column>
                <!--<el-table-column align="center" v-if="fatoryNameShow" label="工厂"></el-table-column>-->

                <el-table-column align="center" v-if="itemCodeShow" prop="itemCode" label="货品编号"></el-table-column>
                <el-table-column align="center" v-if="goodsNameShow" prop="goodsName" label="商品名称"></el-table-column>
                <el-table-column align="center" v-if="shipmentQuantityShow" prop="expectSendGoodsTotal" label="预计发货总量"
                                 width="130px"></el-table-column>
                <el-table-column align="center" v-if="actualDeliveryQuantityShow" prop="actualSendGoodsQuantity"
                                 label="实际发货总量"
                                 width="130px"></el-table-column>
                <el-table-column label="提交状态" v-if="submitShows" prop="totalNumber"
                                 align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.submitStatus=='tj01'?'已提交':'未提交'}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="审核状态" v-if="auditShows" prop="totalNumber"
                                 align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.auditStatus=='sh01'?'已审核':scope.row.auditStatus=='sh02'?'未审核':'审核驳回'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" v-if="actualProduceTimeShow" prop="sendGoodsTime" label="发货时间"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="expectedAcceptance" prop="accedate" label="预计接收时间"
                                 width="160px"></el-table-column>

                <el-table-column align="center" v-if="applicantShow" prop="documentMaker" label="制单人"></el-table-column>
                <el-table-column align="center" v-if="remarkShow" prop="remark" label="备注"></el-table-column>
                <el-table-column align="center" label="操作" fixed="right" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" @click="addstorageProductsData.sendGoodsBeanList=[]">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>


            <div style="margin-top: 0.5em">
                <el-button size="mini" type="primary" @click="submitFormstore('addstorageProductsData')">保存</el-button>
                <el-button size="mini" @click="storePro=false">取消</el-button>
            </div>

        </el-dialog>


        <!--修改半成品入库-->
        <el-dialog
                width="1100px"
                style="padding: 0px;margin: 0px"
                title="修改半成品入库" @closed="closeFun"  :visible.sync="upstorePro" :show-close="false"
        >
            <el-form :model="upaddstorageProductsData" ref="upaddstorageProductsData" :rules="upaddStroevalidation"
                     size="mini" label-width="110px" label-position="right">
                <div style="display: flex;flex-wrap: nowrap;justify-content: space-between">
                    <el-form-item label="预计入库总量" prop="expectStockinTotal">
                        <el-input onkeyup="value=value.replace(/[^\d]/g,'')"
                                  v-model="upaddstorageProductsData.expectStockinTotal"></el-input>
                    </el-form-item>

                    <el-form-item label="实际入库总量" prop="actualStockinQuantity">
                        <el-input onkeyup="value=value.replace(/[^\d]/g,'')"
                                  v-model="upaddstorageProductsData.actualStockinQuantity"></el-input>
                    </el-form-item>


                    <el-form-item label="实际发货总量" prop="actualSendGoodsQuantity">
                        <el-input onkeyup="value=value.replace(/[^\d]/g,'')"
                                  v-model="upaddstorageProductsData.actualSendGoodsQuantity"></el-input>
                    </el-form-item>
                </div>

                <div style="display: flex;flex-wrap: nowrap;">

                    <el-form-item label="预计入库时间" prop="expectTime">
                        <el-date-picker

                                v-model="upaddstorageProductsData.expectTime"
                                type="datetime"
                                placeholder="预计入库时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                align="right"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item style="margin-left: 4em" label="实际入库时间" prop="actualTime">
                        <el-date-picker

                                v-model="upaddstorageProductsData.actualTime"
                                type="datetime"
                                placeholder="实际入库时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                align="right"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                </div>
            </el-form>

            <div class="QueryConditions">
                <el-button size="mini" @click="upintroductionDelPro">引入半成品发货单</el-button>
                <el-button size="mini" @click="upSettingsdel=true">显示设置</el-button>
            </div>

            <el-table
                    border
                    stripe
                    :data="upaddstorageProductsData.sendGoodsBeanList"
                    style="width: 100%"
            >
                <el-table-column align="center" v-if="productsShow" prop="sendCode" label="发货单号"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="produceCodeShow" prop="produceCode" label="生产计划单编号"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="dispatchCodeShow" prop="dispatchCode" label="派工单号"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="merchantCodeShow" prop="merchantCode" label="商家编号"
                                 width="160px"></el-table-column>
                <!--<el-table-column align="center" v-if="fatoryNameShow" label="工厂"></el-table-column>-->

                <el-table-column align="center" v-if="itemCodeShow" prop="itemCode" label="货品编号"></el-table-column>
                <el-table-column align="center" v-if="goodsNameShow" prop="goodsName" label="商品名称"></el-table-column>
                <el-table-column align="center" v-if="shipmentQuantityShow" prop="expectSendGoodsTotal" label="预计发货总量"
                                 width="130px"></el-table-column>
                <el-table-column align="center" v-if="actualDeliveryQuantityShow" prop="actualSendGoodsQuantity"
                                 label="实际发货总量"
                                 width="130px"></el-table-column>
                <el-table-column label="提交状态" v-if="submitShows" prop="totalNumber"
                                 align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.submitStatus=='tj01'?'已提交':'未提交'}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="审核状态" v-if="auditShows" prop="totalNumber"
                                 align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.auditStatus=='sh01'?'已审核':scope.row.auditStatus=='sh02'?'未审核':'审核驳回'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" v-if="actualProduceTimeShow" prop="sendGoodsTime" label="发货时间"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="expectedAcceptance" prop="accedate" label="预计接收时间"
                                 width="160px"></el-table-column>

                <el-table-column align="center" v-if="applicantShow" prop="documentMaker" label="制单人"></el-table-column>
                <el-table-column align="center" v-if="remarkShow" prop="remark" label="备注"></el-table-column>
                <el-table-column align="center" label="操作" fixed="right" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" @click="upaddstorageProductsData.sendGoodsBeanList=[]">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>


            <div style="margin-top: 0.5em">
                <el-button size="mini" type="primary" @click="upsubmitFormstore('upaddstorageProductsData')">保存</el-button>
                <el-button size="mini" @click="upstorePro=false">取消</el-button>
            </div>

        </el-dialog>

        <!--新建半成品入库引入半成品发货单-->
        <el-dialog
                width="1100px"
                style="padding: 0px;margin: 0px"
                title="半成品入库" :visible.sync="storeProDel" :show-close="false"
        >
            <div class="menuBox">

                <div class=" QueryConditions QueryInput">

                    <div>
                        <el-input size="mini" clearable placeholder="发货单编号" v-model="sendCodedel"></el-input>
                        <el-input size="mini" clearable placeholder="派工单编号" v-model="dispatchCodedel"></el-input>
                        <el-input size="mini" clearable placeholder="生产计划单编号" v-model="produceCodedel"></el-input>
                        <el-input size="mini" clearable placeholder="商品名称" v-model="goodsNamedel"></el-input>

                    </div>

                    <div>
                        <el-button type="primary" size="mini"
                                   @click="sendCodedel='',dispatchCodedel='',produceCodedel='',goodsNamedel=''">重置
                        </el-button>

                        <el-button type="primary" size="mini" icon="el-icon-search" @click="sendgoodsQuery()">查询
                        </el-button>
                    </div>

                </div>
            </div>
            <el-table
                    border
                    stripe
                    :data="deliveryProductsList"
                    style="width: 100%"
            >

                <el-table-column align="center" type="index"></el-table-column>
                <el-table-column align="center" v-if="productsShow" prop="sendCode" label="发货单号"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="produceCodeShow" prop="produceCode" label="生产计划单编号"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="dispatchCodeShow" prop="dispatchCode" label="派工单号"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="merchantCodeShow" prop="merchantCode" label="商家编号"
                                 width="160px"></el-table-column>
                <!--<el-table-column align="center" v-if="fatoryNameShow" label="工厂"></el-table-column>-->

                <el-table-column align="center" v-if="itemCodeShow" prop="itemCode" label="货品编号"></el-table-column>
                <el-table-column align="center" v-if="goodsNameShow" prop="goodsName" label="商品名称"></el-table-column>
                <el-table-column align="center" v-if="shipmentQuantityShow" prop="expectSendGoodsTotal" label="预计发货总量"
                                 width="130px"></el-table-column>
                <el-table-column align="center" v-if="actualDeliveryQuantityShow" prop="actualSendGoodsQuantity"
                                 label="实际发货总量"
                                 width="130px"></el-table-column>
                <el-table-column label="提交状态" v-if="submitShows" prop="totalNumber"
                                 align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.submitStatus=='tj01'?'已提交':'未提交'}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="审核状态" v-if="auditShows" prop="totalNumber"
                                 align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.auditStatus=='sh01'?'已审核':scope.row.auditStatus=='sh02'?'未审核':'审核驳回'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" v-if="actualProduceTimeShow" prop="sendGoodsTime" label="发货时间"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="expectedAcceptance" prop="accedate" label="预计接收时间"
                                 width="160px"></el-table-column>

                <el-table-column align="center" v-if="applicantShow" prop="documentMaker" label="制单人"></el-table-column>
                <el-table-column align="center" v-if="remarkShow" prop="remark" label="备注"></el-table-column>
                <el-table-column align="center" label="操作" fixed="right" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" @click="introductionDeliveryProducts(scope.row)">引入</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            @current-change="delProdu"
                            :page-size="5"
                            layout="prev, pager, next, jumper"
                            :total="totalRecordNumdel">
                    </el-pagination>
                </el-col>
            </el-row>

        </el-dialog>

        <!--修改半成品入库引入半成品发货单-->
        <el-dialog
                width="1100px"
                style="padding: 0px;margin: 0px"
                title="半成品入库" :visible.sync="upstoreProDel" :show-close="false"
        >
            <div class="menuBox">

                <div class=" QueryConditions QueryInput">

                    <div>
                        <el-input size="mini" clearable placeholder="发货单编号" v-model="sendCodedel"></el-input>
                        <el-input size="mini" clearable placeholder="派工单编号" v-model="dispatchCodedel"></el-input>
                        <el-input size="mini" clearable placeholder="生产计划单编号" v-model="produceCodedel"></el-input>
                        <el-input size="mini" clearable placeholder="商品名称" v-model="goodsNamedel"></el-input>

                    </div>

                    <div>
                        <el-button type="primary" size="mini"
                                   @click="sendCodedel='',dispatchCodedel='',produceCodedel='',goodsNamedel=''">重置
                        </el-button>

                        <el-button type="primary" size="mini" icon="el-icon-search" @click="sendgoodsQuery()">查询
                        </el-button>
                    </div>

                </div>
            </div>
            <el-table
                    border
                    stripe
                    :data="deliveryProductsList"
                    style="width: 100%"
            >

                <el-table-column align="center" type="index"></el-table-column>
                <el-table-column align="center" v-if="productsShow" prop="sendCode" label="发货单号"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="produceCodeShow" prop="produceCode" label="生产计划单编号"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="dispatchCodeShow" prop="dispatchCode" label="派工单号"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="merchantCodeShow" prop="merchantCode" label="商家编号"
                                 width="160px"></el-table-column>
                <!--<el-table-column align="center" v-if="fatoryNameShow" label="工厂"></el-table-column>-->

                <el-table-column align="center" v-if="itemCodeShow" prop="itemCode" label="货品编号"></el-table-column>
                <el-table-column align="center" v-if="goodsNameShow" prop="goodsName" label="商品名称"></el-table-column>
                <el-table-column align="center" v-if="shipmentQuantityShow" prop="expectSendGoodsTotal" label="预计发货总量"
                                 width="130px"></el-table-column>
                <el-table-column align="center" v-if="actualDeliveryQuantityShow" prop="actualSendGoodsQuantity"
                                 label="实际发货总量"
                                 width="130px"></el-table-column>
                <el-table-column label="提交状态" v-if="submitShows" prop="totalNumber"
                                 align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.submitStatus=='tj01'?'已提交':'未提交'}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="审核状态" v-if="auditShows" prop="totalNumber"
                                 align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.auditStatus=='sh01'?'已审核':scope.row.auditStatus=='sh02'?'未审核':'审核驳回'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" v-if="actualProduceTimeShow" prop="sendGoodsTime" label="发货时间"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="expectedAcceptance" prop="accedate" label="预计接收时间"
                                 width="160px"></el-table-column>

                <el-table-column align="center" v-if="applicantShow" prop="documentMaker" label="制单人"></el-table-column>
                <el-table-column align="center" v-if="remarkShow" prop="remark" label="备注"></el-table-column>
                <el-table-column align="center" label="操作" fixed="right" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" @click="upintroductionDeliveryProducts(scope.row)">引入</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            @current-change="delProdu"
                            :page-size="5"
                            layout="prev, pager, next, jumper"
                            :total="totalRecordNumdel">
                    </el-pagination>
                </el-col>
            </el-row>

        </el-dialog>

        <!--半成品入库显示设置-->
        <el-dialog
                title="显示设置"
                :visible.sync="Settings"
                width="450px"
                :show-close="false"
        >
            <div style="text-align: left">
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="WarehouseReceiptShow">入库单号</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="InvoiceNoShow">发货单号</el-checkbox>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="ProductionPlanningShow">生产计划单号</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="DispatchedNumberShow">派工单号</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model=" MerchantNumberShow">商家编号</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="ItemCodeShow">货品编号</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="TradeNameShow">商品名称</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="ExpectedWarehousingShow">预计入库总量</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="ActualDeliveryShow">实际发货数量</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="ActualQuantityShow">实际入库数量</el-checkbox>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="ShippedShow">已发货数量</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="EstimatedStorageTimeShow">预计入库时间</el-checkbox>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="ActualStorageTimeShow">实际入库时间</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="SinglePersonShow">制单人</el-checkbox>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model=" submitShowStorage">提交状态</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="auditShowStorage">审核状态</el-checkbox>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model=" RemarksShow">备注</el-checkbox>
                    </el-col>
                </el-row>
            </div>

        </el-dialog>


        <!--半成品发货显示设置-->
        <el-dialog
                title="显示设置"
                :visible.sync="Settingsdel"
                width="450px"
                :show-close="false"
        >
            <div style="text-align: left">
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="productsShow">发货单号</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="dispatchCodeShow">派工单编号</el-checkbox>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model=" produceCodeShow">生产计划单编号</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="merchantCodeShow">商家编号</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="itemCodeShow">货品编号</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="goodsNameShow">商品名称</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="actualDeliveryQuantityShow">实际发货数量</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="actualProduceTimeShow">发货时间</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="expectedAcceptance">预计接收时间</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="shipmentQuantityShow">预计发货总量</el-checkbox>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="applicantShow">填报人</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="remarkShow">备注</el-checkbox>
                    </el-col>

                </el-row>

            </div>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "storageProducts",
        data() {
            return {
                submitStatusstoreBut: true,//审核按钮
                auditStatusstoreBut: true,//提交按钮
                delStatusstoreBut: true,//删除按钮
                //时间选择
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                value2: '',
                storePro: false,//半成品入库新建面板
                storeProDel: false,//半成品入库引入半成品发货单面板
                upstorePro: false,//修改半成品入库新建面板
                upstoreProDel: false,//修改半成品入库引入半成品发货单面板
                /**
                 * 半成品入库管理显示设置
                 * */
                Settings: false,//半成品入库管理显示设置面板
                WarehouseReceiptShow: true,//入库单号
                InvoiceNoShow: true,//发货单号
                ProductionPlanningShow: true,// 生产计划单号
                DispatchedNumberShow: true,//派工单号
                MerchantNumberShow: true,//商家编号
                ItemCodeShow: true,//货品编号
                TradeNameShow: true,//商品名称
                ExpectedWarehousingShow: true,//预计入库总量
                ActualDeliveryShow: true,//实际发货数量
                ActualQuantityShow: true,//实际入库数量
                ShippedShow: true,//已发货数量
                submitShowStorage:true,//提交状态
                auditShowStorage:true,//审核状态
                EstimatedStorageTimeShow: true,//预计入库时间
                ActualStorageTimeShow: true,//实际入库时间
                SinglePersonShow: true,//制单人
                RemarksShow: true,//备注


                /**
                 * 半成品发货显示设置
                 * */
                Settingsdel: false,//半成品发货显示设置面板
                upSettingsdel:false,//修改半成品发货显示设置面板
                productsShow: true,// 发货单号
                dispatchCodeShow: true,// 派工单编码
                produceCodeShow: true,//  生产计划单编码
                merchantCodeShow: true,//   商家编号
                itemCodeShow: true,// 货品编号
                goodsNameShow: true,// 商品名称
                fatoryNameShow: true,//  工厂名称
                actualProduceTimeShow: true,// 发货时间
                expectedAcceptance: true, //预计接收时间
                shipmentQuantityShow: true,// 预计发货总量
                actualDeliveryQuantityShow: true,// 实际发货数量
                submitShows: true,//提交状态
                auditShows: true,//审核状态
                applicantShow: true,// 制单人
                remarkShow: true,// 备注

                /**
                 * 半成品发货查询数据
                 * **/
                pageNumdel: 1,//分页查询默认显示页数
                deliveryProductsList: [],//半成品分页查询数据
                updeliveryProductsList:[],//修改半成品分页查询数据
                totalRecordNumdel: 0,//半成品分页查询总条目数
                sendCodedel: '',//发货单编号
                dispatchCodedel: '',//派工单编号
                goodsNamedel: '',//商品名称
                produceCodedel: '',//生产计划单编号

                /***
                 * 新建半成品入库单数据
                 * */
                addstorageProductsData: {
                    expectStockinTotal: '',//预计入库总量
                    actualSendGoodsQuantity: '',//实际发货数量
                    actualStockinQuantity: '',//实际入库总量
                    expectTime: '',//预计入库时间
                    actualTime: '',//实际入库时间
                    sendGoodsBeanList: [],//发货单数据
                },
                /***
                 * 新建半成品入库单表单验证
                 * */
                addStroevalidation: {
                    expectStockinTotal: [
                        {required: true, message: '请输入预计入库总量', trigger: 'blur'},
                    ],
                    actualSendGoodsQuantity: [
                        {required: true, message: '请输入实际发货数量', trigger: 'blur'},
                    ],
                    actualStockinQuantity: [
                        {required: true, message: '请输入实际入库总量', trigger: 'blur'},
                    ],
                    expectTime: [
                        {required: true, message: '请选择预计入库时间', trigger: 'blur'},
                    ],
                    actualTime: [
                        {required: true, message: '请选择实际入库时间', trigger: 'blur'},
                    ],
                },

                /***
                 * 修改半成品入库单数据
                 * */
                upaddstorageProductsData: {
                    expectStockinTotal: '',//预计入库总量
                    actualSendGoodsQuantity: '',//实际发货数量
                    actualStockinQuantity: '',//实际入库总量
                    expectTime: '',//预计入库时间
                    actualTime: '',//实际入库时间
                    sendGoodsBeanList: [],//发货单数据
                },
                /***
                 * 修改半成品入库单表单验证
                 * */
                upaddStroevalidation: {
                    expectStockinTotal: [
                        {required: true, message: '请输入预计入库总量', trigger: 'blur'},
                    ],
                    actualSendGoodsQuantity: [
                        {required: true, message: '请输入实际发货数量', trigger: 'blur'},
                    ],
                    actualStockinQuantity: [
                        {required: true, message: '请输入实际入库总量', trigger: 'blur'},
                    ],
                    expectTime: [
                        {required: true, message: '请选择预计入库时间', trigger: 'blur'},
                    ],
                    actualTime: [
                        {required: true, message: '请选择实际入库时间', trigger: 'blur'},
                    ],
                },


                /**
                 * 入库单分页查询数据
                 * */
                stroeIds:[],//ids删除时传入对应ID
                pageNUmstore: 1,//入库单查询默认显示页数
                storeDataList: [],//入库单查询数据
                stockinCodeStorag: '',//入库单编号
                sendCodeStorag: '',//发货单编号
                dispatchCodeStorag: '',//派工单编号
                goodsNameStorag: '',//商品名称
                produceCodeStorag: '',//生产计划单编号
                totalRecordNumStorag: 0,//生产计划单总条目数
                typedata: '',//用于储存数据，当表单发生改变时校验
            }
        },
        methods: {
            closeFun() {
                let obj = JSON.stringify(this.upaddstorageProductsData)
                let state = (obj == this.typedata)
                let that = this
                if (!state) {
                    this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '保存',
                        cancelButtonText: '放弃修改'
                    })
                        .then(() => {
                            that.upsubmitFormstore('upaddstorageProductsData')
                        })

                }

            },
            delStore(data){
              //删除单条半成品入库单信息
                this.stroeIds=[];
                this.stroeIds.push(data.uuid)
                this.delStockins()

            },
            delStockins(){
              //半成品入库单删除
                let that=this
                this.$axios.post(this.$store.state.delStockin,{
                    uuidList:this.stroeIds
                }).then(res=>{
                    if (res.data.code == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            onClose() {
                                that.stockinQueryPage()//分页(半成品入库管理)

                            }
                        });
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            upStoreProducts(data){
              //入库管理修改按钮
                this.$axios.get(this.$store.state.selectstockin,{
                    params:{uuid:data.uuid}
                }).then(res=>{
                    this.upaddstorageProductsData=res.data.data
                    this.typedata = JSON.stringify(this.upaddstorageProductsData)//将数据转为字符串，进行修改验证
                })

                this.upstorePro=true
            },
            Multipleselection(data) {
                //半成品发货多选
                // console.log(data)
                this.stroeIds.length = 0
                data.forEach(item => {
                    this.stroeIds.push(item.uuid)
                })

                //派工单
                if (data.length == 0) {
                    this.submitStatusstoreBut = true
                    this.auditStatusstoreBut = true
                    this.delStatusstoreBut = true
                } else {
                    this.delStatusstoreBut = false
                    let list = data.map(item => {
                        return item.submitStatus
                    })
                    let lists = data.map(item => {
                        return item.auditStatus
                    })
                    let num = list.indexOf('tj02')
                    let nums = lists.indexOf('sh01')

                    if (num == -1) {
                        this.submitStatusstoreBut = false
                        this.auditStatusstoreBut = true
                    } else if (num != -1) {
                        this.submitStatusstoreBut = true
                        this.auditStatusstoreBut = false
                    }
                    if (nums != -1) {
                        this.submitStatusstoreBut = true
                        this.auditStatusstoreBut = true
                        this.delStatusstoreBut = true
                    }
                }

            },
            storageQuery(val) {
                //入库单分页查询
                this.pageNUmstore = val
                this.stockinQueryPage()
            },
            stockinQueryPage() {
                //半成品入库单查询
                this.$axios.get(this.$store.state.stockinQuery, {
                    params: {
                        pageSize: 15,
                        pageNum: this.pageNUmstore,
                        stockinCode: this.stockinCodeStorag,
                        sendCode: this.sendCodeStorag,
                        dispatchCode: this.dispatchCodeStorag,
                        goodsName: this.goodsNameStorag,
                        produceCode: this.produceCodeStorag
                    }
                }).then(res => {
                    this.storeDataList = res.data.list
                    this.totalRecordNumStorag = res.data.totalRecord
                })
            },
            submitFormstore(addstorageProductsData) {
                //新建入库单提交
                //提交半成品发货
                let that = this
                this.$refs[addstorageProductsData].validate((valid) => {
                    if (valid) {
                        console.log(this.addstorageProductsData)
                        if (this.addstorageProductsData.sendGoodsBeanList.length != 0) {
                            this.$axios.post(this.$store.state.addStockin, this.addstorageProductsData).then(res => {
                                if (res.data.code == 200) {
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success',
                                        onClose() {
                                            that.stockinQueryPage()
                                            that.storePro = false
                                        }
                                    });
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            })
                        } else {
                            this.$message.error('派工单信息不能为空');
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }

                });
            },
            upsubmitFormstore(upaddstorageProductsData) {
                //新建入库单提交
                //提交半成品发货
                this.typedata = JSON.stringify(this.upaddstorageProductsData)
                let that = this
                this.$refs[upaddstorageProductsData].validate((valid) => {
                    if (valid) {
                        console.log(this.upaddstorageProductsData)
                        if (this.upaddstorageProductsData.sendGoodsBeanList.length != 0) {
                            this.$axios.post(this.$store.state.upselectstockin, this.upaddstorageProductsData).then(res => {
                                if (res.data.code == 200) {
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success',
                                        onClose() {
                                            that.stockinQueryPage()
                                            that.upstorePro = false
                                        }
                                    });
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            })
                        } else {
                            this.$message.error('派工单信息不能为空');
                        }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }

                });
            },
            upintroductionDeliveryProducts(data) {
                //引入半成品发货单数据到新建半成品入库
                console.log(data)
                data.createTime
                this.upaddstorageProductsData.expectTime = data.accedate
                this.upaddstorageProductsData.expectStockinTotal = data.actualSendGoodsQuantity
                this.upaddstorageProductsData.actualSendGoodsQuantity = data.actualSendGoodsQuantity
                this.upaddstorageProductsData.sendGoodsBeanList = []
                this.upaddstorageProductsData.sendGoodsBeanList.push(data)
                this.upstoreProDel = false
            },
            introductionDeliveryProducts(data) {
                //引入半成品发货单数据到新建半成品入库
                console.log(data)
                data.createTime
                this.addstorageProductsData.expectTime = data.accedate
                this.addstorageProductsData.expectStockinTotal = data.actualSendGoodsQuantity
                this.addstorageProductsData.actualSendGoodsQuantity = data.actualSendGoodsQuantity
                this.addstorageProductsData.sendGoodsBeanList = []
                this.addstorageProductsData.sendGoodsBeanList.push(data)
                this.storeProDel = false
            },
            introductionDelPro() {
                //引入半成品发货单按钮
                this.sendgoodsQuery()
                this.storeProDel = true
            },
            upintroductionDelPro() {
                //修改引入半成品发货单按钮
                this.sendgoodsQuery()
                this.upstoreProDel = true
            },
            delProdu(val) {
                //半成品发货分页查询
                this.pageNumdel = val
                this.sendgoodsQuery()
            },
            sendgoodsQuery() {
                //半成品发货分页查询
                this.$axios.get(this.$store.state.sendgoodsQueryPage, {
                    params: {
                        pageSize: 5,
                        pageNum: this.pageNumdel,
                        sendCode: this.sendCodedel,
                        dispatchCode: this.dispatchCodedel,
                        goodsName: this.goodsNamedel,
                        produceCode: this.produceCodedel
                    }
                }).then(res => {
                    this.deliveryProductsList = res.data.list
                    this.updeliveryProductsList = res.data.list
                    this.totalRecordNumdel = res.data.totalRecord

                })
            },
        },
        created: function () {
            this.stockinQueryPage()//入库单分页查询

        }
    }
</script>

<style scoped>

</style>