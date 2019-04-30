<template>
    <div class="ProductionLog">
        <div class="menuBox">
            <div class="QueryConditions">
                <el-button size="mini" type="primary" class="el-icon-plus" @click="ProLog=true">新建
                </el-button>
                <el-button type="primary" icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>
                <el-button size="mini" type="primary" :disabled="auditStatusBut">提交审核</el-button>
                <el-button size="mini" type="primary" :disabled="submitStatusBut">审核通过
                </el-button>

                <el-button size="mini" type="primary" :disabled="submitStatusBut">审核驳回
                </el-button>
                <el-button size="mini" type="danger" :disabled="delStatusBut" @click="producelogDelete">批量删除</el-button>
            </div>
            <div class=" QueryConditions QueryInput">

                <div>
                    <el-input size="mini" placeholder="派工单编号" v-model="dispatchCodelog"></el-input>
                    <el-input size="mini" placeholder="工厂名称" v-model="factoryNamelog"></el-input>
                    <!--<el-input size="mini" placeholder="工艺" v-model="processNode"></el-input>-->

                    <el-input size="mini" placeholder="生产计划单编号" v-model="produceCodelog"></el-input>
                    <div class="produ">
                        <el-select clearable placeholder="工艺流程" multiple size="mini" v-model="processNodeListlog">
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
                    <el-button type="primary" size="mini">重置
                    </el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search" @click="producelogQuery()">查询
                    </el-button>
                </div>

            </div>
        </div>
        <el-table
                border
                stripe
                :data="ProductionLogData"
                style="width: 100%"
                height="720px"
                @selection-change="Multipleselection"
        >
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column align="center" type="index"></el-table-column>
            <el-table-column align="center" v-if="logCodeShow" label="生产日志编号" prop="logCode" width="160px"></el-table-column>
            <el-table-column align="center" v-if="fatoryNameShow" prop="fatoryName" label="工厂"></el-table-column>
            <el-table-column align="center" v-if="merchantCodeShow" prop="merchantCode" label="商家编号" width="160px"></el-table-column>
            <el-table-column align="center" v-if="itemCodeShow" prop="itemCode" label="货品编号"></el-table-column>
            <el-table-column align="center" v-if="goodsNameShow" prop="goodsName" label="商品名称"></el-table-column>
            <el-table-column align="center" v-if="expectProduceQuantityShow" prop="expectProduceQuantity" label="预计生产总量"
                             width="130px"></el-table-column>
            <el-table-column align="center" v-if="actualProduceQuantityShow" prop="actualProduceQuantity" label="实际生产总量"
                             width="130px"></el-table-column>
            <el-table-column label="提交状态" v-if="submitShows" prop="totalNumber"
                             align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.submitStatus=='tj01'?'已提交':'未提交'}}</span>
                </template>
            </el-table-column>

            <el-table-column label="审核状态" v-if="auditSshow" prop="totalNumber"
                             align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.auditStatus=='sh01'?'已审核':scope.row.auditStatus=='sh02'?'未审核':'审核驳回'}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" v-if="actualProduceTimeShow" prop="actualProduceTime" label="实际生产时间" width="160px"></el-table-column>
            <el-table-column align="center" v-if="produceCodeShow" prop="produceCode" label="生产计划单编号" width="160px"></el-table-column>
            <el-table-column align="center" v-if="dispatchCodeShow" prop="dispatchCode" label="派工单号" width="160px"></el-table-column>
            <el-table-column align="center" v-if="applicantShow" prop="applicant" label="填报人"></el-table-column>
            <el-table-column align="center" v-if="remarkShow" prop="remark" label="备注"></el-table-column>
            <el-table-column align="center" label="操作" fixed="right" width="100px">
                <template slot-scope="scope">
                    <el-button type="text" @click="upProdulog(scope.row)">修改</el-button>
                    <el-button type="text" @click="proLogDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-row>
            <el-col :span="10" :offset="14">
                <el-pagination
                        @current-change="ProdLog"
                        :page-size="15"
                        layout="prev, pager, next, jumper"
                        :total="totalRecordNumLog">
                </el-pagination>
            </el-col>
        </el-row>


        <!--新建生产日志-->
        <el-dialog
                width="1100px"
                style="padding: 0px;margin: 0px"
                title="生产日志" :visible.sync="ProLog" :show-close="false"
        >
            <el-form :model="addProduData" ref="addProduData"
                     :rules="addProduDatavalidation" size="mini" label-width="110px" label-position="right">

                <div style="display: flex;flex-wrap: nowrap;justify-content: space-between">
                    <el-form-item label="预计生产数量" prop="expectProduceQuantity">
                        <el-input v-model="addProduData.expectProduceQuantity"></el-input>
                    </el-form-item>
                    <el-form-item label="实际生产数量" prop="actualProduceQuantity">
                        <el-input v-model="addProduData.actualProduceQuantity"></el-input>
                    </el-form-item>
                    <el-form-item label="实际生产时间" prop="actualProduceTime">
                        <el-date-picker
                                v-model="addProduData.actualProduceTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="实际生产时间"
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
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="addProduData.dispatchSheetList=[]">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 0.5em">
                <el-button size="mini" type="primary" @click="submitForm('addProduData')">保存</el-button>
                <el-button size="mini" @click="ProLog=false">取消</el-button>
            </div>

        </el-dialog>


        <!--修改生产日志-->
        <el-dialog
                width="1100px"
                style="padding: 0px;margin: 0px"
                title="生产日志" :visible.sync="upProLog" :show-close="false"
        >
            <el-form :model="upaddProduData" ref="upaddProduData"
                     :rules="upaddProduDatavalidation" size="mini" label-width="110px" label-position="right">

                <div style="display: flex;flex-wrap: nowrap;justify-content: space-between">
                    <el-form-item label="预计生产数量" prop="expectProduceQuantity">
                        <el-input v-model="upaddProduData.expectProduceQuantity"></el-input>
                    </el-form-item>
                    <el-form-item label="实际生产数量" prop="actualProduceQuantity">
                        <el-input v-model="upaddProduData.actualProduceQuantity"></el-input>
                    </el-form-item>
                    <el-form-item label="实际生产时间" prop="actualProduceTime">
                        <el-date-picker
                                v-model="upaddProduData.actualProduceTime"
                                type="datetime"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                placeholder="实际生产时间"
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
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="upaddProduData.dispatchSheetList=[]">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 0.5em">
                <el-button size="mini" type="primary" @click="upsubmitForm('upaddProduData')">保存</el-button>
                <el-button size="mini" @click="upProLog=false">取消</el-button>
            </div>

        </el-dialog>


        <!--新建生产日志引入派工单-->
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


        <!--修改生产日志引入派工单-->
        <el-dialog
                width="1200px"
                style="padding: 0px;margin: 0px"
                title="新建派工单" :visible.sync="upaddProuLog" :show-close="false"
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


        <!--生产日志显示设置-->
        <el-dialog
                title="显示设置"
                :visible.sync="Settings"
                width="450px"
                :show-close="false"
        >
            <div style="text-align: left">
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="logCodeShow">生产日志编号</el-checkbox>
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
                        <el-checkbox v-model="fatoryNameShow">工厂</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="actualProduceTimeShow">实际生产时间</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="expectProduceQuantityShow">预计生产总量</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="actualProduceQuantityShow">实际生产数量</el-checkbox>
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
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="submitShows">提交状态</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="auditSshow">审核状态</el-checkbox>
                    </el-col>

                </el-row>

            </div>

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
        name: "ProductionLog",
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
                Settings: false,//生产日志显示设置
                dispatchingSettings: false,//派工显示设置
                ProLog: false,//新建生产日志
                upProLog:false,//修改生产日志
                /**
                 * 生产日志显示设置
                 * */
                logCodeShow: true,// 生产日志编号
                dispatchCodeShow: true,// 派工单编码
                produceCodeShow: true,//  生产计划单编码
                merchantCodeShow: true,//   商家编号
                itemCodeShow: true,// 货品编号
                goodsNameShow: true,// 商品名称
                fatoryNameShow: true,//  工厂名称
                actualProduceTimeShow: true,// 实际生产时间
                expectProduceQuantityShow: true,// 预计生产总量
                actualProduceQuantityShow: true,// 实际生产数量
                submitShows:true,//提交状态
                auditSshow:true,//审s核状态
                applicantShow: true,//  填报人
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
                upaddProuLog:false,//修改生产日志单引入派工单
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
                * 新建生产日志数据
                * **/
                addProduData: {
                    expectProduceQuantity: '',//预计生产数量
                    actualProduceQuantity: '',//实际生产数量
                    actualProduceTime: '',//实际生产时间
                    dispatchSheetList: [],//派工单数据
                },
                /*
                * 新建生产日志表单验证
                * ***/
                addProduDatavalidation: {
                    expectProduceQuantity: [
                        {required: true, message: '请输入预计生产数量', trigger: 'blur'},
                    ],
                    actualProduceQuantity: [
                        {required: true, message: '请输入实际生产数量', trigger: 'blur'},
                    ],
                    actualProduceTime: [
                        {required: true, message: '请选择实际生产时间', trigger: 'blur'},
                    ],
                },
                /*
              * 修改生产日志数据
              * **/
                upaddProduData: {
                    expectProduceQuantity: '',//预计生产数量
                    actualProduceQuantity: '',//实际生产数量
                    actualProduceTime: '',//实际生产时间
                    dispatchSheetList: [],//派工单数据
                },
                /*
                * 修改生产日志表单验证
                * ***/
                upaddProduDatavalidation: {
                    expectProduceQuantity: [
                        {required: true, message: '请输入预计生产数量', trigger: 'blur'},
                    ],
                    actualProduceQuantity: [
                        {required: true, message: '请输入实际生产数量', trigger: 'blur'},
                    ],
                    actualProduceTime: [
                        {required: true, message: '请选择实际生产时间', trigger: 'blur'},
                    ],
                },
                pageNumLog: 1,//生产日志查询默认显示页数
                totalRecordNumLog: 0,//生产日志总条目数
                strlog: '',
                dispatchCodelog: '',//派工单编号
                factoryNamelog: '',//工厂名称
                processNodeListlog: [],//工艺
                produceCodelog: '',//生产计划单编号
                ProductionLogData: [],//生产日志数据
                ids:[],//生产日志ids用于删除
            }
        },
        methods: {
            upProdulog(data){
              //生产日志修改按钮
                console.log(data)
                this.upaddProduData=data
                this.upProLog=true
            },
            proLogDelete(data){
              //删除单条生产日志
                this.ids=[]
                this.ids.push(data.uuid)
                this.producelogDelete()
            },
            producelogDelete(){
              //删除生产日志单
                let that=this
                this.$axios.post(this.$store.state.producelogDel,{
                    ids:this.ids
                }).then(res=>{
                    if (res.data.code == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            onClose() {
                                that.producelogQuery()//分页(生产日志)

                            }
                        });
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            Multipleselection(data) {
                //生产日志多选
                // console.log(data)
                this.uuidList.length = 0
                data.forEach(item => {
                    this.ids.push(item.uuid)
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
            ProdLog(val) {
                //生产日志分页查询
                this.pageNumLog = val
                this.producelogQuery()
            },
            producelogQuery() {
                //生产日志查询
                // dispatchCode: '',//派工单编号
                //     factoryName: '',//工厂名称
                //     processNodeList: [],//工艺
                //     produceCode: '',//生产计划单编号
                this.strlog = ''//流程查询，将数组转拼接成字符串
                this.processNodeListlog.forEach(item => {
                    this.strlog += item + ','
                })
                this.strlog = this.strlog.substring(0, this.strlog.length - 1)

                this.$axios.get(this.$store.state.producelogQueryPage, {
                    params: {
                        pageSize: 15,
                        pageNum: this.pageNumLoglog,
                        dispatchCode: this.dispatchCodelog,
                        factoryName: this.factoryNamelog,
                        processNodeList: this.strlog,
                        produceCode: this.produceCodelog
                    }
                }).then(res => {
                    console.log(res)
                    this.ProductionLogData = res.data.list
                    this.totalRecordNumLog = res.data.totalRecord
                })
            },
            upsubmitForm(upaddProduData){
                //修改生产日志
                let that = this
                this.$refs[upaddProduData].validate((valid) => {
                    if (valid) {

                        if (this.upaddProduData.dispatchSheetList.length != 0) {
                            this.$axios.post(this.$store.state.upproducelog, this.upaddProduData).then(res => {
                                if (res.data.code == 200) {
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success',
                                        onClose() {
                                            that.producelogQuery()
                                            that.upProLog = false
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
            submitForm(addProduData) {
                //提交生产日志
                let that = this
                this.$refs[addProduData].validate((valid) => {
                    if (valid) {

                        if (this.addProduData.dispatchSheetList.length != 0) {
                            this.$axios.post(this.$store.state.addproducelog, this.addProduData).then(res => {
                                if (res.data.code == 200) {
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success',
                                        onClose() {
                                            that.producelogQuery()
                                            that.ProLog = false
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
            upintroductionFactory(data){
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
                //修改引入派工单按钮
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
            this.producelogQuery()//生产日志查询

        }
    }
</script>

<style scoped>

</style>