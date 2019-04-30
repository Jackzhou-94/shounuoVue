<template>
    <div class="deliveryProducts">
        <div class="menuBox">
            <div class="QueryConditions">
                <el-button size="mini" type="primary" class="el-icon-plus" @click="dePro=true">新建
                </el-button>
                <el-button type="primary" icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>
                <el-button size="mini" type="primary" :disabled="auditStatusBut">提交审核</el-button>
                <el-button size="mini" type="primary" :disabled="submitStatusBut">审核通过
                </el-button>
                <el-button size="mini" type="primary" :disabled="submitStatusBut">审核驳回
                </el-button>
                <el-button size="mini" type="danger" :disabled="delStatusBut">批量删除</el-button>
            </div>
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
                height="720px"
                @selection-change="Multipleselection"
        >
            <el-table-column align="center" type="selection"></el-table-column>
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

            <el-table-column label="审核状态" v-if="auditShow" prop="totalNumber"
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
                    <el-button type="text" @click="upDelProdu(scope.row)">修改</el-button>
                    <el-button type="text" :disabled="scope.row.recordState=='rs01'?(true):(false)" @click="delDelProdu(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-row>
            <el-col :span="10" :offset="14">
                <el-pagination
                        @current-change="delProdu"
                        :page-size="15"
                        layout="prev, pager, next, jumper"
                        :total="totalRecordNumdel">
                </el-pagination>
            </el-col>
        </el-row>
        <!--半成品发货显示设置-->
        <el-dialog
                title="显示设置"
                :visible.sync="Settings"
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


        <!--新建半成品发货-->
        <el-dialog
                width="1100px"
                style="padding: 0px;margin: 0px"
                title="半成品发货" :visible.sync="dePro" :show-close="false"
        >
            <el-form :model="addProduData" ref="addProduData"
                     :rules="addProduDatavalidation" size="mini" label-width="110px" label-position="right">

                <div style="display: flex;flex-wrap: nowrap;justify-content: space-between">
                    <el-form-item label="预计发货总量" prop="expectSendGoodsTotal">
                        <el-input onkeyup="value=value.replace(/[^\d]/g,'')"  v-model="addProduData.expectSendGoodsTotal"></el-input>
                    </el-form-item>
                    <el-form-item label="实际发货总量" prop="actualSendGoodsQuantity">
                        <el-input onkeyup="value=value.replace(/[^\d]/g,'')"  v-model="addProduData.actualSendGoodsQuantity"></el-input>
                    </el-form-item>
                    <el-form-item label="已发货数量" prop="shippedQuantity">
                        <el-input onkeyup="value=value.replace(/[^\d]/g,'')"  v-model="addProduData.shippedQuantity"></el-input>
                    </el-form-item>
                </div>
                <div style="display: flex;flex-wrap: nowrap;">
                    <el-form-item label="预计接收时间" prop="accedate">
                        <el-date-picker
                                v-model="addProduData.accedate"
                                type="datetime"
                                placeholder="预计接收时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                align="right"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item style="margin-left: 2em" label="发货时间" prop="sendGoodsTime">
                        <el-date-picker

                                v-model="addProduData.sendGoodsTime"
                                type="datetime"
                                placeholder="发货时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                align="right"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>

                </div>

            </el-form>
            <div class="QueryConditions">
                <!--@click="ImportProduction"-->
                <el-button size="mini" @click="introductionFaDi">引入派工单</el-button>
                <el-button size="mini" @click="dispatchingSettings=true">显示设置</el-button>
            </div>
            <!--:data="FaDidsList"-->
            <el-table
                    border
                    stripe
                    :data="addProduData.dispatchSheetList"
                    style="width: 100%"

            >
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column type="index" align="center"></el-table-column>
                <el-table-column label="派工单编号" width="160px" prop="dispatchCode" v-if="DistributionNumberShow"
                                 align="center"></el-table-column>
                <el-table-column label="工厂" v-if="factoryShow" prop="factoryName" align="center"></el-table-column>

                <el-table-column
                        label="工艺流程"
                        width="230"
                        v-if="TechnologyShow"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.processNodeList">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>


                <el-table-column label="预加工时间" width="160px" prop="expectProcessTime" v-if="PreprocessingShow"
                                 align="center"></el-table-column>
                <el-table-column label="预完工时间" width="160px" prop="expectCompleteTime" v-if="PrecompletionShow"
                                 align="center"></el-table-column>
                <el-table-column label="生产计划单编号" width="160px" prop="produceCode" v-if="ProductionOrderShow"
                                 align="center"></el-table-column>
                <el-table-column label="加工数量" v-if="ProcessingQuantityShow" prop="totalNumber"
                                 align="center"></el-table-column>

                <el-table-column label="提交状态" v-if="submitShow" prop="totalNumber"
                                 align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.submitStatus=='tj01'?'已提交':'未提交'}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="审核状态" v-if="auditShow" prop="totalNumber"
                                 align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.auditStatus=='sh01'?'已审核':scope.row.auditStatus=='sh02'?'未审核':'审核驳回'}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="单位" v-if="uintShow" align="center" prop="goodsUnit"></el-table-column>
                <el-table-column label="派工人员" v-if="DispatchedWorkerShow" prop="dispatchWorker"
                                 align="center"></el-table-column>
                <el-table-column label="审批人" v-if="ApproverShow" prop="approver" align="center"></el-table-column>
                <el-table-column label="备注" v-if="RemarksShow" prop="remark" align="center"></el-table-column>
            </el-table>
            <div style="margin-top: 0.5em">
                <el-button size="mini" type="primary" @click="submitFormdeliv('addProduData')">保存</el-button>
                <el-button size="mini" @click="ProLog=false">取消</el-button>
            </div>

        </el-dialog>


        <!--修改半成品发货-->
        <el-dialog
                width="1100px"
                style="padding: 0px;margin: 0px"
                title="修改半成品发货" @closed="closeFun" :visible.sync="updePro" :show-close="false"
        >
            <el-form :model="upaddProduData" ref="upaddProduData"
                     :rules="upaddProduDatavalidation" size="mini" label-width="110px" label-position="right">

                <div style="display: flex;flex-wrap: nowrap;justify-content: space-between">
                    <el-form-item label="预计发货总量" prop="expectSendGoodsTotal">
                        <el-input onkeyup="value=value.replace(/[^\d]/g,'')"  v-model="upaddProduData.expectSendGoodsTotal"></el-input>
                    </el-form-item>
                    <el-form-item label="实际发货总量" prop="actualSendGoodsQuantity">
                        <el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="upaddProduData.actualSendGoodsQuantity"></el-input>
                    </el-form-item>
                    <el-form-item label="已发货数量" prop="shippedQuantity">
                        <el-input onkeyup="value=value.replace(/[^\d]/g,'')" v-model="upaddProduData.shippedQuantity"></el-input>
                    </el-form-item>
                </div>
                <div style="display: flex;flex-wrap: nowrap;">
                    <el-form-item label="预计接收时间" prop="accedate">
                        <el-date-picker
                                v-model="upaddProduData.accedate"
                                type="datetime"
                                placeholder="预计接收时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                align="right"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item style="margin-left: 2em" label="发货时间" prop="sendGoodsTime">
                        <el-date-picker

                                v-model="upaddProduData.sendGoodsTime"
                                type="datetime"
                                placeholder="发货时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                align="right"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>

                </div>

            </el-form>
            <div class="QueryConditions">
                <!--@click="ImportProduction"-->
                <el-button size="mini" @click="upintroductionFaDi">引入派工单</el-button>
                <el-button size="mini" @click="dispatchingSettings=true">显示设置</el-button>
            </div>
            <!--:data="FaDidsList"-->
            <el-table
                    border
                    stripe
                    :data="upaddProduData.dispatchSheetList"
                    style="width: 100%"

            >
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column type="index" align="center"></el-table-column>
                <el-table-column label="派工单编号" width="160px" prop="dispatchCode" v-if="DistributionNumberShow"
                                 align="center"></el-table-column>
                <el-table-column label="工厂" v-if="factoryShow" prop="factoryName" align="center"></el-table-column>

                <el-table-column
                        label="工艺流程"
                        width="230"
                        v-if="TechnologyShow"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.processNodeList">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>


                <el-table-column label="预加工时间" width="160px" prop="expectProcessTime" v-if="PreprocessingShow"
                                 align="center"></el-table-column>
                <el-table-column label="预完工时间" width="160px" prop="expectCompleteTime" v-if="PrecompletionShow"
                                 align="center"></el-table-column>
                <el-table-column label="生产计划单编号" width="160px" prop="produceCode" v-if="ProductionOrderShow"
                                 align="center"></el-table-column>
                <el-table-column label="加工数量" v-if="ProcessingQuantityShow" prop="totalNumber"
                                 align="center"></el-table-column>

                <el-table-column label="提交状态" v-if="submitShow" prop="totalNumber"
                                 align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.submitStatus=='tj01'?'已提交':'未提交'}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="审核状态" v-if="auditShow" prop="totalNumber"
                                 align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.auditStatus=='sh01'?'已审核':scope.row.auditStatus=='sh02'?'未审核':'审核驳回'}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="单位" v-if="uintShow" align="center" prop="goodsUnit"></el-table-column>
                <el-table-column label="派工人员" v-if="DispatchedWorkerShow" prop="dispatchWorker"
                                 align="center"></el-table-column>
                <el-table-column label="审批人" v-if="ApproverShow" prop="approver" align="center"></el-table-column>
                <el-table-column label="备注" v-if="RemarksShow" prop="remark" align="center"></el-table-column>
            </el-table>
            <div style="margin-top: 0.5em">
                <el-button size="mini" type="primary" @click="upsubmitFormdeliv('upaddProduData')">保存</el-button>
                <el-button size="mini" @click="updePro=false">取消</el-button>
            </div>

        </el-dialog>


        <!--新建半成品引入派工单-->
        <el-dialog
                width="1200px"
                style="padding: 0px;margin: 0px"
                title="新建派工单" :visible.sync="addProuLog" :show-close="false"
        >

            <div class=" QueryConditions QueryInput">
                <div>
                    <el-input size="mini" placeholder="派工单编号" v-model="dispatchCode"></el-input>
                    <el-input size="mini" placeholder="工厂名称" v-model="factoryName"></el-input>
                    <!--<el-input size="mini" placeholder="工艺" v-model="processNode"></el-input>-->

                    <el-input size="mini" placeholder="生产计划单编号" v-model="produceCode"></el-input>
                    <div class="produ">
                        <el-select clearable placeholder="工艺流程" multiple size="mini" v-model="processNodeList">
                            <el-option
                                    v-for="item in ProcessFunction"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>


                </div>
                <div>
                    <el-button type="primary" size="mini"
                               @click="dispatchCode='',factoryName='',processNode='',produceCode=''">重置
                    </el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search" @click="dispatchPageQuery()">查询
                    </el-button>
                </div>
            </div>


            <el-table
                    border
                    stripe
                    :data="FaDidsList"
                    style="width: 100%"

            >
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column type="index" align="center"></el-table-column>
                <el-table-column label="派工单编号" width="160px" prop="dispatchCode" v-if="DistributionNumberShow"
                                 align="center"></el-table-column>
                <el-table-column label="工厂" v-if="factoryShow" prop="factoryName" align="center"></el-table-column>

                <el-table-column
                        label="工艺流程"
                        width="230"
                        v-if="TechnologyShow"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.processNodeList">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>


                <el-table-column label="预加工时间" width="160px" prop="expectProcessTime" v-if="PreprocessingShow"
                                 align="center"></el-table-column>
                <el-table-column label="预完工时间" width="160px" prop="expectCompleteTime" v-if="PrecompletionShow"
                                 align="center"></el-table-column>
                <el-table-column label="生产计划单编号" width="160px" prop="produceCode" v-if="ProductionOrderShow"
                                 align="center"></el-table-column>
                <el-table-column label="加工数量" v-if="ProcessingQuantityShow" prop="totalNumber"
                                 align="center"></el-table-column>

                <el-table-column label="提交状态" v-if="submitShow" prop="totalNumber"
                                 align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.submitStatus=='tj01'?'已提交':'未提交'}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="审核状态" v-if="auditShow" prop="totalNumber"
                                 align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.auditStatus=='sh01'?'已审核':scope.row.auditStatus=='sh02'?'未审核':'审核驳回'}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="单位" v-if="uintShow" align="center" prop="goodsUnit"></el-table-column>
                <el-table-column label="派工人员" v-if="DispatchedWorkerShow" prop="dispatchWorker"
                                 align="center"></el-table-column>
                <el-table-column label="审批人" v-if="ApproverShow" prop="approver" align="center"></el-table-column>
                <el-table-column label="备注" v-if="RemarksShow" prop="remark" align="center"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="introductionFactory(scope.row)">引入</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            @current-change="productionpag"
                            :page-size="5"
                            layout="prev, pager, next, jumper"
                            :total="totalRecordNum">
                    </el-pagination>
                </el-col>
            </el-row>

        </el-dialog>


        <!--修改半成品引入派工单-->
        <el-dialog
                width="1200px"
                style="padding: 0px;margin: 0px"
                title="修改派工单" :visible.sync="upaddProuLog" :show-close="false"
        >

            <div class=" QueryConditions QueryInput">
                <div>
                    <el-input size="mini" placeholder="派工单编号" v-model="dispatchCode"></el-input>
                    <el-input size="mini" placeholder="工厂名称" v-model="factoryName"></el-input>
                    <!--<el-input size="mini" placeholder="工艺" v-model="processNode"></el-input>-->

                    <el-input size="mini" placeholder="生产计划单编号" v-model="produceCode"></el-input>
                    <div class="produ">
                        <el-select clearable placeholder="工艺流程" multiple size="mini" v-model="processNodeList">
                            <el-option
                                    v-for="item in ProcessFunction"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>


                </div>
                <div>
                    <el-button type="primary" size="mini"
                               @click="dispatchCode='',factoryName='',processNode='',produceCode=''">重置
                    </el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search" @click="dispatchPageQuery()">查询
                    </el-button>
                </div>
            </div>


            <el-table
                    border
                    stripe
                    :data="upFaDidsList"
                    style="width: 100%"

            >
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column type="index" align="center"></el-table-column>
                <el-table-column label="派工单编号" width="160px" prop="dispatchCode" v-if="DistributionNumberShow"
                                 align="center"></el-table-column>
                <el-table-column label="工厂" v-if="factoryShow" prop="factoryName" align="center"></el-table-column>

                <el-table-column
                        label="工艺流程"
                        width="230"
                        v-if="TechnologyShow"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.processNodeList">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>


                <el-table-column label="预加工时间" width="160px" prop="expectProcessTime" v-if="PreprocessingShow"
                                 align="center"></el-table-column>
                <el-table-column label="预完工时间" width="160px" prop="expectCompleteTime" v-if="PrecompletionShow"
                                 align="center"></el-table-column>
                <el-table-column label="生产计划单编号" width="160px" prop="produceCode" v-if="ProductionOrderShow"
                                 align="center"></el-table-column>
                <el-table-column label="加工数量" v-if="ProcessingQuantityShow" prop="totalNumber"
                                 align="center"></el-table-column>

                <el-table-column label="提交状态" v-if="submitShow" prop="totalNumber"
                                 align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.submitStatus=='tj01'?'已提交':'未提交'}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="审核状态" v-if="auditShow" prop="totalNumber"
                                 align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.auditStatus=='sh01'?'已审核':scope.row.auditStatus=='sh02'?'未审核':'审核驳回'}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="单位" v-if="uintShow" align="center" prop="goodsUnit"></el-table-column>
                <el-table-column label="派工人员" v-if="DispatchedWorkerShow" prop="dispatchWorker"
                                 align="center"></el-table-column>
                <el-table-column label="审批人" v-if="ApproverShow" prop="approver" align="center"></el-table-column>
                <el-table-column label="备注" v-if="RemarksShow" prop="remark" align="center"></el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="upintroductionFactory(scope.row)">引入</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            @current-change="productionpag"
                            :page-size="5"
                            layout="prev, pager, next, jumper"
                            :total="totalRecordNum">
                    </el-pagination>
                </el-col>
            </el-row>

        </el-dialog>

        <!--派工单显示设置-->
        <el-dialog
                title="显示设置"
                :visible.sync="dispatchingSettings"
                width="450px"
                :show-close="false"
        >
            <div style="text-align: left">
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="DistributionNumberShow">派工单编号</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="ProductionOrderShow">生产计划单编号</el-checkbox>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="factoryShow">工厂</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="TechnologyShow">工艺流程</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="PreprocessingShow">预加工时间</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="PrecompletionShow">预完工时间</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="ProcessingQuantityShow">加工数量</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="ApproverShow">审批人</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="DispatchedWorkerShow">派工人员</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="RemarksShow">备注</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="submitShow">提交状态</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="auditShow">审核状态</el-checkbox>
                    </el-col>

                </el-row>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "deliveryProducts",
        data() {
            return {
                submitStatusBut: true,//审核按钮
                auditStatusBut: true,//提交按钮
                delStatusBut: true,//删除按钮

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
                dePro: false,//新建半成品发货单
                updePro: false,//新建半成品发货单
                dispatchingSettings: false,//派工显示设置
                /**
                 * 半成品发货显示设置
                 * */
                Settings: false,//生产日志显示设置
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
                 * 派工单显示设置
                 * */
                ProductionOrderShow: true,//生产计划单编号
                DistributionNumberShow: true,//派工单编号
                factoryShow: true,//工厂
                TechnologyShow: true,//工艺
                PreprocessingShow: true,//预加工时间
                PrecompletionShow: true,//预完工时间
                ProcessingQuantityShow: true,//加工数量
                submitShow: true,//提交状态
                auditShow: true,//审核状态
                uintShow: true,//单位
                ApproverShow: true,//审批人
                DispatchedWorkerShow: true,//派工人员
                RemarksShow: true,//备注

                /**
                 * 派工单分页查询字符
                 * */
                addProuLog: false,//新建生产日志单引入派工单
                upaddProuLog: false,//修改生产日志单引入派工单
                FaDidsList: [],//派工单数据
                upFaDidsList: [],//修改派工单数据
                totalRecordNum: 0,//派工单分页查询总条目数
                pageNum: 1,//默认查询页数
                str: '',
                dispatchCode: '',//派工单编号
                factoryName: '',//工厂名称
                processNodeList: [],//工艺
                produceCode: '',//生产计划单编号
                ProcessFunction: [
                    //工艺流程
                    {
                        label: '织造',
                        value: 'weave'
                    },
                    {
                        label: '缝头',
                        value: 'seamHead'
                    }
                    ,
                    {
                        label: '定型',
                        value: 'stereoType'
                    }
                    ,
                    {
                        label: '包装',
                        value: 'pack'
                    }
                ],

                /*
               * 新建半成品发货数据
               * **/
                addProduData: {
                    expectSendGoodsTotal: '',//预计发货总量
                    actualSendGoodsQuantity: '',//实际发货总量
                    shippedQuantity: '',//已发货数量
                    sendGoodsTime: '',//发货时间
                    accedate: '',//预计接收时间
                    dispatchSheetList: [],//派工单数据
                },
                /*
                * 新建半成品发货表单验证
                * ***/
                addProduDatavalidation: {
                    expectSendGoodsTotal: [
                        {required: true, message: '请输入预计发货总量', trigger: 'blur'},
                    ],
                    actualSendGoodsQuantity: [
                        {required: true, message: '请输入实际发货总量', trigger: 'blur'},
                    ],
                    shippedQuantity: [
                        {required: true, message: '请选择发货时间', trigger: 'blur'},
                    ],
                    sendGoodsTime: [
                        {required: true, message: '请选择预计接收时间', trigger: 'blur'},
                    ],
                    accedate: [
                        {required: true, message: '请选择预计接收时间', trigger: 'blur'},
                    ],
                },

                /*
             * 修改半成品发货数据
             * **/
                upaddProduData: {
                    expectSendGoodsTotal: '',//预计发货总量
                    actualSendGoodsQuantity: '',//实际发货总量
                    shippedQuantity: '',//已发货数量
                    sendGoodsTime: '',//发货时间
                    accedate: '',//预计接收时间
                    dispatchSheetList: [],//派工单数据
                },
                /*
                * 修改半成品发货表单验证
                * ***/
                upaddProduDatavalidation: {
                    expectSendGoodsTotal: [
                        {required: true, message: '请输入预计发货总量', trigger: 'blur'},
                    ],
                    actualSendGoodsQuantity: [
                        {required: true, message: '请输入实际发货总量', trigger: 'blur'},
                    ],
                    shippedQuantity: [
                        {required: true, message: '请选择发货时间', trigger: 'blur'},
                    ],
                    sendGoodsTime: [
                        {required: true, message: '请选择预计接收时间', trigger: 'blur'},
                    ],
                    accedate: [
                        {required: true, message: '请选择预计接收时间', trigger: 'blur'},
                    ],
                },
                /**
                 * 半成品发货查询数据
                 * **/
                pageNumdel: 1,//分页查询默认显示页数
                deliveryProductsList: [],//半成品分页查询数据
                totalRecordNumdel: 0,//半成品分页查询总条目数
                sendCodedel: '',//发货单编号
                dispatchCodedel: '',//派工单编号
                goodsNamedel: '',//商品名称
                produceCodedel: '',//生产计划单编号

                uuidList: [],//删除时用于储存ID
                typedata: '',//用于储存数据，当表单发生改变时校验
            }
        },
        methods: {
            closeFun() {
                let obj = JSON.stringify(this.upaddProduData)
                let state = (obj == this.typedata)
                let that = this
                if (!state) {
                    this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '保存',
                        cancelButtonText: '放弃修改'
                    })
                        .then(() => {
                            that.upsubmitFormdeliv('upaddProduData')
                        })

                }

            },
            upDelProdu(data) {
                //修改半成品发货单数据按钮
                this.$axios.get(this.$store.state.selectSendgoods, {
                    params: {
                        uuid: data.uuid
                    }
                }).then(res => {
                    console.log(res)
                    this.upaddProduData=res.data.data
                    this.updePro=true
                    this.typedata = JSON.stringify(this.upaddProduData)//将数据转为字符串，进行修改验证
                })

            },
            // async selsecDetails(id = 'a56662c787f34c8e94fe2ec9c6bd2425') {
            //     /**
            //      * 封装一个方法
            //      * 根据uuid查询改条记录详情
            //      * **/
            //
            //     this.$axios.get(this.$store.state.selectSendgoods, {
            //         params: {
            //             uuid: id
            //         }
            //     }).then(res => {
            //         return res
            //     })
            //
            //
            // },

            delDelProdu(data) {
                //单条删除半成品发货单数据
                this.uuidList = []
                this.uuidList.push(data.uuid)
                this.deleteProducts()
            },
            deleteProducts() {
                //删除半成品发货单数据
                let that = this
                this.$axios.post(this.$store.state.deleteSendgoods, {
                    uuidList: this.uuidList
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            onClose() {
                                that.sendgoodsQuery()//分页(半成品发货管理)

                            }
                        });
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            Multipleselection(data) {
                //半成品发货多选
                // console.log(data)
                this.uuidList.length = 0
                data.forEach(item => {
                    this.uuidList.push(item.uuid)
                })

                //派工单
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

                    if (num == -1) {
                        this.submitStatusBut = false
                        this.auditStatusBut = true
                    } else if (num != -1) {
                        this.submitStatusBut = true
                        this.auditStatusBut = false
                    }
                    if (nums != -1) {
                        this.submitStatusBut = true
                        this.auditStatusBut = true
                        this.delStatusBut = true
                    }
                }

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
                        pageSize: 15,
                        pageNum: this.pageNumdel,
                        sendCode: this.sendCodedel,
                        dispatchCode: this.dispatchCodedel,
                        goodsName: this.goodsNamedel,
                        produceCode: this.produceCodedel
                    }
                }).then(res => {
                    this.deliveryProductsList = res.data.list
                    this.totalRecordNumdel = res.data.totalRecord

                })
            },
            submitFormdeliv(addProduData) {
                //提交半成品发货
                let that = this
                this.$refs[addProduData].validate((valid) => {
                    if (valid) {
                        console.log(this.addProduData)
                        if (this.addProduData.dispatchSheetList.length != 0) {
                            this.$axios.post(this.$store.state.addDelivProucts, this.addProduData).then(res => {
                                if (res.data.code == 200) {
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success',
                                        onClose() {
                                            that.sendgoodsQuery()
                                            that.dePro = false
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
            upsubmitFormdeliv(upaddProduData) {
                //提交半成品发货
                this.typedata = JSON.stringify(this.upaddProduData)
                let that = this
                this.$refs[upaddProduData].validate((valid) => {
                    if (valid) {

                        if (this.upaddProduData.dispatchSheetList.length!=0){
                            this.$axios.post(this.$store.state.upDelivProucts,this.upaddProduData).then(res=>{
                                if (res.data.code == 200) {
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success',
                                        onClose() {
                                            that.sendgoodsQuery()
                                            that.updePro = false
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
            introductionFactory(data) {
                //引入派工单数据
                console.log(data)
                this.addProduData.dispatchSheetList.length = 0
                this.addProduData.dispatchSheetList.push(data)
                this.addProuLog = false
            },
            upintroductionFactory(data) {
                //修改引入派工单数据
                console.log(data)
                this.upaddProduData.dispatchSheetList.length = 0
                this.upaddProduData.dispatchSheetList.push(data)
                this.upaddProuLog = false
            },
            introductionFaDi() {
                //引入派工单按钮
                this.dispatchPageQuery()
                this.addProuLog = true
            },
            upintroductionFaDi() {
                //引入派工单按钮
                this.dispatchPageQuery()
                this.upaddProuLog = true
            },
            productionpag(val) {
                //派工单分页按钮
                this.pageNum = val
                this.dispatchPageQuery()
            },
            dispatchPageQuery() {
                //派工单分页查询
                this.str = ''//流程查询，将数组转拼接成字符串
                this.processNodeList.forEach(item => {
                    this.str += item + ','
                })
                this.str = this.str.substring(0, this.str.length - 1)


                this.$axios.get(this.$store.state.dispatchPage, {
                    params: {
                        pageSize: 15,
                        pageNum: this.pageNum,
                        dispatchCode: this.dispatchCode,
                        factoryName: this.factoryName,
                        processNode: this.str,
                        produceCode: this.produceCode
                    }
                }).then(res => {
                    console.log(res.data.list)
                    this.FaDidsList = res.data.list
                    this.upFaDidsList = res.data.list
                    this.totalRecordNum = res.data.totalRecord
                })
            }
        },
        created: function () {
            this.sendgoodsQuery()//半成品分页查询

        }
    }
</script>

<style scoped>

</style>