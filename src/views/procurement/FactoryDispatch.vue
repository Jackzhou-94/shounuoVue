<template>
    <div class="FactoryDispatch">
        <div class="menuBox">
            <div class="QueryConditions">
                <el-button size="mini" type="primary" class="el-icon-plus" @click="addfactoryDispath=true">新建
                </el-button>
                <el-button type="primary" icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>
                <el-button size="mini" type="primary" :disabled="auditStatusBut" >提交审核</el-button>
                <el-button size="mini" type="primary" :disabled="submitStatusBut">审核通过
                </el-button>
                <el-button size="mini" type="primary" :disabled="submitStatusBut" >审核驳回
                </el-button>
                <el-button size="mini" type="danger" :disabled="delStatusBut" @click="delFactory" >批量删除</el-button>
            </div>
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

                    <el-button type="primary" size="mini" icon="el-icon-search" @click="dispatchPageQuery()">查询</el-button>
                </div>
            </div>
        </div>
        <el-table
                border
                stripe
                :data="FaDidsList"
                style="width: 100%"
                height="720px"
                @selection-change="Multipleselection"
        >
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" align="center"></el-table-column>
            <el-table-column label="派工单编号" width="160px" prop="dispatchCode" v-if="DistributionNumberShow"
                             align="center"></el-table-column>
            <el-table-column label="工厂" v-if="factoryShow" prop="factoryName" align="center"></el-table-column>
            <!--<el-table-column label="工艺" v-if="TechnologyShow" prop="processNode" align="center">-->

                <!--<template slot-scope="scope">-->

                    <!--{{scope.row.processNode}}-->
                <!--</template>-->


            <!--</el-table-column>-->
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
        <!--分页-->
        <el-row>
            <el-col :span="10" :offset="14">
                <el-pagination
                        @current-change="Factorypag"
                        :page-size="15"
                        layout="prev, pager, next, jumper"
                        :total="totalRecordNum">
                </el-pagination>
            </el-col>
        </el-row>

        <!--新建派工单-->
        <el-dialog
                width="1100px"
                style="padding: 0px;margin: 0px"
                title="新建派工单" :visible.sync="addfactoryDispath" :show-close="false"
        >

            <div class="QueryConditions">
                <el-button size="mini" @click="ImportProduction">引入计划单</el-button>
                <el-button size="mini" @click="DispatchingSet" :disabled="DispatchingSetBut">派工设置</el-button>
                <el-button size="mini" @click="ProductionSettings=true">显示设置</el-button>
            </div>

            <el-table
                    border
                    stripe
                    :data="addFactoryData.productionList"
            >

                <el-table-column align="center" v-if="ProductionOrderShows" label="生产计划单编号" prop="produceCode"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="styleNumberShow" label="款式编号" prop="styleCode"
                                 width="170px"></el-table-column>
                <el-table-column align="center" v-if="MerchantNumberShow" label="商家编号" prop="merchantCode"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="MerchantNameShow" label="商品名称" prop="goodsName"></el-table-column>
                <el-table-column align="center" v-if="specificationsShow" label="规格(颜色)" prop="colour"
                                 width="100px"></el-table-column>
                <el-table-column align="center" v-if="NumberShow" label="数量" prop="craftNumber"></el-table-column>
                <el-table-column align="center" v-if="unitShow" label="单位" prop="unit"></el-table-column>
                <el-table-column align="center" v-if="bandShow" label="品牌" prop="brand"></el-table-column>
                <el-table-column align="center" width="100px" v-if="categoryShow" label="类别"
                                 prop="category"></el-table-column>
                <el-table-column
                        label="工艺流程"
                        width="230"
                        v-if="processShow"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.processNodeList">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <!--<el-table-column align="center" v-if="processShow" label="工艺流程" prop="processNodeList"-->
                <!--width="150px"></el-table-column>-->

                <el-table-column align="center" v-if="noteShow" label="备注" prop="remark"></el-table-column>
                <el-table-column align="center" label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="rmProductionList">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div style="margin-top: 0.5em">
                <el-button size="mini" type="primary" @click="addFactoryDispatch">保存</el-button>
                <el-button size="mini" type="primary" @click="addfactoryDispath=false">取消</el-button>
            </div>

        </el-dialog>

        <!--新建派工单引入生产计划单-->
        <el-dialog
                width="1200px"
                style="padding: 0px;margin: 0px"
                title="新建派工单" :visible.sync="addfactoryProduction" :show-close="false"
        >

            <div class=" QueryConditions QueryInput">
                <div>
                    <el-input size="mini" clearable v-model="conditionproduceCode" placeholder="生产计划单编号"></el-input>
                    <el-input size="mini" clearable v-model="conditionsstyleCode" placeholder="款式编号"></el-input>
                    <el-input size="mini" clearable v-model="conditionmerchantCode" placeholder="商家编号"></el-input>
                    <el-input size="mini" clearable v-model="conditionName" placeholder="商品名称"></el-input>
                    <div class="produ">
                        <el-select clearable placeholder="工艺流程" multiple size="mini" v-model="conditionprocessNode">
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
                               @click="conditionproduceCode='',conditionsstyleCode='',conditionmerchantCode='',conditionName='',conditionprocessNode=[]">
                        重置
                    </el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search"
                               @click="ProduQueryPage()">查询
                    </el-button>
                </div>
            </div>


            <el-table
                    border
                    stripe
                    :data="ProductionList"
            >
                <el-table-column align="center" type="index"></el-table-column>
                <el-table-column align="center" v-if="ProductionOrderShows" label="生产计划单编号" prop="produceCode"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="styleNumberShow" label="款式编号" prop="styleCode"
                                 width="170px"></el-table-column>
                <el-table-column align="center" v-if="MerchantNumberShow" label="商家编号" prop="merchantCode"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="MerchantNameShow" label="商品名称" prop="goodsName"></el-table-column>
                <el-table-column align="center" v-if="specificationsShow" label="规格(颜色)" prop="colour"
                                 width="100px"></el-table-column>
                <el-table-column align="center" v-if="NumberShow" label="数量" prop="craftNumber"></el-table-column>
                <el-table-column align="center" v-if="unitShow" label="单位" prop="unit"></el-table-column>
                <el-table-column align="center" v-if="bandShow" label="品牌" prop="brand"></el-table-column>
                <el-table-column align="center" width="100px" v-if="categoryShow" label="类别"
                                 prop="category"></el-table-column>
                <el-table-column
                        label="工艺流程"
                        width="230"
                        v-if="processShow"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.processNodeList">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <!--<el-table-column align="center" v-if="processShow" label="工艺流程" prop="processNodeList"-->
                <!--width="150px"></el-table-column>-->

                <el-table-column align="center" v-if="noteShow" label="备注" prop="remark"></el-table-column>
                <el-table-column align="center" label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="text" @click="IntroduceSingle(scope.row)">引入</el-button>
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

        <!--生产计划单显示设置-->
        <el-dialog
                title="显示设置"
                :visible.sync="ProductionSettings"
                width="450px"
                :show-close="false"
        >
            <div style="text-align: left">
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="ProductionOrderShows">生产计划单编号</el-checkbox>
                    </el-col>

                    <el-col :span="12">
                        <el-checkbox v-model="styleNumberShow">款式编号</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="MerchantNumberShow">商家编号</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="MerchantNameShow">商品名称</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="specificationsShow">规格(颜色)</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="NumberShow">数量</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="unitShow">单位</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="bandShow">品牌</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="categoryShow">类别</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="processShow">工艺流程</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="noteShow">备注</el-checkbox>
                    </el-col>


                </el-row>
            </div>

        </el-dialog>


        <!--派工设置面板-->
        <el-dialog
                width="900px"
                style="padding: 0px;margin: 0px"
                title="派工设置" :visible.sync="DispatchingSetPanel" :show-close="false"
        >
            <!--<el-divider content-position="left">织造</el-divider>-->

            <div class="QueryConditions">
                <el-select size="mini" @change="ProcessSelection" v-model="addFactoryData.processType">
                    <el-option
                            v-for="item in ProcessCategory"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <div>


                <el-table
                        :data="factoryList"
                        border
                        stripe
                >
                    <el-table-column
                            align="center"
                            type="index"
                            width="50">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            width="150"
                            label="名称">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="code"
                            label="编码"
                            width="200"
                    >
                    </el-table-column>
                    <el-table-column
                            label="工厂职能"
                            width="230"
                            align="center">
                        <template slot-scope="scope">
                            <el-tag type="danger" v-for="item in scope.row.technologys">
                                {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="操作"
                            fixed="right"
                    >
                        <template slot-scope="scope">
                            <el-button type="text" @click="PlantSelection(scope.row)">选择</el-button>
                        </template>
                    </el-table-column>


                </el-table>
                <el-divider content-position="left">工艺流程详情</el-divider>

                <el-table
                        :data="Processdetails"
                        border
                        stripe
                >

                    <el-table-column
                            align="center"
                            prop="process"
                            label="工艺详情">
                        <template slot-scope="scope">

                            {{scope.row.processNode=='weave'?'织造':scope.row.processNode=='seamHead'?'缝头':scope.row.processNode=='stereoType'?'定型':'包装'}}

                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="factoryName"
                            label="派工工厂"
                    >
                    </el-table-column>


                </el-table>
            </div>

            <div style="margin-top: 0.5em">
                <el-button size="mini" type="primary" @click="saveProcessSet">保存</el-button>
                <el-button size="mini" type="primary" @click="DispatchingSetPanel=false">关闭</el-button>
            </div>

        </el-dialog>


        <!--显示设置-->
        <el-dialog
                title="显示设置"
                :visible.sync="Settings"
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
                        <el-checkbox v-model="CreationTimeShow">创建时间</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="ModifyTimeShow">修改时间</el-checkbox>
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
        name: "FactoryDispatch",
        data() {
            return {
                Settings: false,//显示设置面板
                addfactoryDispath: false,//新建派工单面板


                submitStatusBut: true,//审核按钮
                auditStatusBut: true,//提交按钮
                delStatusBut: true,//删除按钮


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
                submitShow:true,//提交状态
                auditShow:true,//审核状态
                uintShow: true,//单位
                ApproverShow: true,//审批人
                DispatchedWorkerShow: true,//派工人员
                RemarksShow: true,//备注
                CreationTimeShow: true,//创建时间
                ModifyTimeShow: true,//修改时间
                /**
                 * 新建派工单时生产计划显示设置
                 * */
                ProductionOrderShows: true,// 生产计划单编号
                styleNumberShow: true,//款式编号
                MerchantNumberShow: true,//商家编号
                MerchantNameShow: true,// 商品名称
                specificationsShow: true,// 规格
                NumberShow: true,//数量
                unitShow: true,//单位
                bandShow: true,//品牌
                categoryShow: true,//类别
                processShow: true,//工艺流程
                noteShow: true,//备注
                pageNumQuery: 1,//生产计划单分页查询默认显示
                /**
                 * 引入生产计划单对应数据
                 * **/
                ProductionSettings: false,//生产计划单显示设置面板
                addfactoryProduction: false,//引入生产计划单面板
                conditionprocessNode: [],//生产计划单生产工艺查询
                ProductionList: [],//生产计划单数据
                str: '',//生产计划单 工艺查询将数组转字符串
                conditionsstyleCode: '',//生产计划单查询（款式编号）
                conditionproduceCode: '',//生产计划单编号
                conditionmerchantCode: '',//商家编号
                conditionName: '',//商品名称
                totalRecordNum: 0,//生产计划单查询总条目数
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

                //时间选择
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                value2: '',
                /**
                 * 新建工厂派单数据
                 * **/
                addFactoryData: {
                    processType: [],//流程类型
                    productionList: [],//生产计划单
                    dispatchedDetailList: [],//派工详情
                },
                DispatchingSetPanel: false,//派工设置面板
                DispatchingSetBut: true,//派工设置按钮

                /**
                 * 根据生产计划单的工艺流程
                 * 来判断显示工艺下拉框
                 * */
                weaveShow: false,//织造
                seamHeadShow: false,//缝头
                stereoTypeShow: false,//定型
                packShow: false,//包装

                weaveFactory: [],//工厂织造信息
                seamHeadFactory: [],//工厂缝头信息
                stereoTypeFactory: [],//工厂定型信息
                packShowFactory: [],//工厂包装信息

                ProcessCategory: [],//工艺流程
                ProcessSelectionType: '',//用于接收工艺流程变量
                factoryList: [],//工艺选择时工厂信息
                Processdetails: [],//工艺流程详情

                /**
                 * 派工单分页查询字符
                 * */
                FaDidsList: [],//派工单数据
                pageNum: 1,//默认查询页数
                str:'',
                dispatchCode: '',//派工单编号
                factoryName: '',//工厂名称
                processNodeList: [],//工艺
                produceCode: '',//生产计划单编号

                uuidList:[],//删除IDs
            }
        },
        methods: {
            delFactory(){
              //删除派工单
                let that=this
              this.$axios.post(this.$store.state.delFaDisp,{
                  uuidList:this.uuidList
              }).then(res=>{
                  if (res.data.code == 200) {
                      this.$message({
                          message: '删除成功',
                          type: 'success',
                          onClose() {
                              that.dispatchPageQuery()//分页(原材料)

                          }
                      });
                  } else {
                      this.$message.error(res.data.msg);
                  }
              })
            },
            Multipleselection(data) {
                //派工单多选
                console.log(data)
                this.uuidList.length=0
                data.forEach(item=>{
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
                    if (nums != -1) {
                        this.submitStatusBut = true
                        this.auditStatusBut = true
                        this.delStatusBut = true
                    }
                }

            },
            Factorypag(val) {
                //派工单分页模块
                this.pageNum = val
                this.dispatchPageQuery()//派工单分页查询
            },
            addFactoryDispatch() {
                let that=this
                //确认添加派工单按钮
                if (this.addFactoryData.productionList.length == 0 || this.addFactoryData.dispatchedDetailList.length == 0) {
                    this.$message.error('信息填写不完善！');
                } else {
                    this.$axios.post(this.$store.state.addDispatch, this.addFactoryData).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: '添加成功',
                                type: 'success',
                                onClose() {
                                    that.dispatchPageQuery()
                                    that.addfactoryDispath = false
                                }
                            });
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                }


            },
            saveProcessSet() {
                //保存工艺设置
                /**
                 * 判断工艺详情对应派工工厂是否为空
                 * */
                let state = this.Processdetails.map(item => {
                    return item.factory != ''
                })
                let states = state.every(item => {
                    return item == true
                })

                if (states) {
                    this.addFactoryData.dispatchedDetailList = this.Processdetails
                    this.DispatchingSetPanel = false
                } else {
                    this.$message.error('信息填写不完善！');
                }
            },
            PlantSelection(data) {
                //工厂选择
                //获取当前选择是哪个工艺流程
                let a = this.Processdetails.filter(item => {
                    return item.processNode == this.addFactoryData.processType
                })
                a.forEach(item => {
                    item.factoryName = data.name
                    item.factoryUuid = data.id
                })

            },
            ProcessSelection(val) {
                //派工设置流程选择
                this.ProcessSelectionType = val
                this.addFactoryData[val] = '';//自动添加工艺流程字段

                //根据用户选择只能进行符合该职能的工厂进行筛选
                this.$axios.get(this.$store.state.factTechno, {
                    params: {technology: val}
                }).then(res => {
                    this.factoryList = res.data.data
                })

            },
            DispatchingSet() {
                //派工设置按钮
                this.DispatchingSetPanel = true
                let process = this.addFactoryData.productionList[0].processNodeList
                this.ProcessCategory = []
                process.forEach(item => {
                    if (item == 'weave') {
                        let a = {
                            label: '织造',
                            value: item
                        }
                        this.ProcessCategory.push(a)
                    }
                    if (item == 'seamHead') {
                        let a = {
                            label: '缝头',
                            value: item
                        }
                        this.ProcessCategory.push(a)
                    }
                    if (item == 'stereoType') {
                        let a = {
                            label: '定型',
                            value: item
                        }
                        this.ProcessCategory.push(a)
                    }
                    if (item == 'pack') {
                        let a = {
                            label: '包装',
                            value: item
                        }
                        this.ProcessCategory.push(a)
                    }
                })

                /**
                 * 设置默认显示工艺流程中的第一个
                 * **/
                this.addFactoryData.processType = this.ProcessCategory[0].label
                let vals = this.addFactoryData.processType = this.ProcessCategory[0].value
                this.$axios.get(this.$store.state.factTechno, {
                    params: {technology: vals}
                }).then(res => {
                    this.factoryList = res.data.data
                })

                //Processdetails该条派工单需要的工艺流程信息
                this.Processdetails.length = 0
                process.forEach((item, index) => {
                    let details = {
                        processNode: item,
                        factoryName: ''
                    }
                    this.Processdetails.push(details)

                })
                // console.log(process)
            },
            rmProductionList() {
                //移除生产计划单
                this.addFactoryData.productionList = []
                this.DispatchingSetBut = true

            },
            IntroduceSingle(data) {
                //引入单条生产计划单
                this.addFactoryData.productionList.length = 0
                this.addFactoryData.productionList.push(data)
                this.addfactoryProduction = false
                if (this.addFactoryData.productionList.length != 0) {
                    this.DispatchingSetBut = false
                }
                // DispatchingSetBut
                console.log(data)
            },
            ImportProduction() {
                //引入生产计划单按钮
                this.addfactoryProduction = true
                this.ProduQueryPage()
            }
            ,
            productionpag(val) {
                //工艺单信息分页
                this.pageNumQuery = val
                this.ProduQueryPage()
            }
            ,
            ProduQueryPage() {
                //生产计划单分页查询

                this.str = ''//流程查询，将数组转拼接成字符串
                this.conditionprocessNode.forEach(item => {
                    this.str += item + ','
                })
                this.str = this.str.substring(0, this.str.length - 1)


                this.$axios.get(this.$store.state.ProductionQueryPage, {
                    params: {
                        pageSize: 5,
                        pageNum: this.pageNumQuery,
                        styleCode: this.conditionsstyleCode,
                        produceCode: this.conditionproduceCode,
                        merchantCode: this.conditionmerchantCode,
                        name: this.conditionName,
                        processNode: this.str
                    }
                }).then(res => {
                    this.ProductionList = res.data.list
                    this.totalRecordNum = res.data.totalRecord
                    console.log(res)
                })
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
                    this.totalRecordNum = res.data.totalRecord
                })
            }

        },
        created: function () {
            this.dispatchPageQuery()//派工单分页查询

        }
    }
</script>

<style scoped>
    .el-select, .el-input {
        width: 500px
    }
</style>