<template>
    <div class="FactoryDispatch">
        <div class="menuBox">
            <div class="QueryConditions">
                <el-button size="mini" type="primary" class="el-icon-plus" @click="addfactoryDispath=true">新建
                </el-button>
                <el-button type="primary" icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>
            </div>
            <div class=" QueryConditions QueryInput">

            </div>
        </div>
        <el-table
                border
                stripe
                style="width: 100%"
                height="720px"
        >
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" align="center"></el-table-column>
            <el-table-column label="派工单编号" width="160px" v-if="DistributionNumberShow" align="center"></el-table-column>
            <el-table-column label="工厂" v-if="factoryShow" align="center"></el-table-column>
            <el-table-column label="工艺" v-if="TechnologyShow" align="center"></el-table-column>
            <el-table-column label="预加工时间" width="160px" v-if="PreprocessingShow" align="center"></el-table-column>
            <el-table-column label="预完工时间" width="160px" v-if="PrecompletionShow" align="center"></el-table-column>
            <el-table-column label="生产计划单编号" width="160px" v-if="ProductionOrderShow" align="center"></el-table-column>
            <el-table-column label="加工数量" v-if="ProcessingQuantityShow" align="center"></el-table-column>
            <el-table-column label="单位" v-if="uintShow" align="center"></el-table-column>
            <el-table-column label="派工人员" v-if="DispatchedWorkerShow" align="center"></el-table-column>
            <el-table-column label="审批人" v-if="ApproverShow" align="center"></el-table-column>
            <el-table-column label="备注" v-if="RemarksShow" align="center"></el-table-column>
        </el-table>


        <!--新建派工单-->
        <el-dialog
                width="1100px"
                style="padding: 0px;margin: 0px"
                title="新建派工单" :visible.sync="addfactoryDispath" :show-close="false"
        >

            <el-form :model="addFactoryData" size="mini" label-width="100px" label-position="right">
                <div style="display: flex;flex-wrap: nowrap">
                    <el-form-item>
                        <el-date-picker
                                v-model="value2"
                                type="datetimerange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                start-placeholder="预加工时间"
                                end-placeholder="预完工时间"
                                align="right">
                        </el-date-picker>
                    </el-form-item>
                </div>
            </el-form>


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
                width="450px"
                style="padding: 0px;margin: 0px"
                title="派工设置" :visible.sync="DispatchingSetPanel" :show-close="false"
        >
            <el-divider content-position="left">织造</el-divider>
            <!--<el-form :model="addFactoryData" size="mini">-->
                <!--<el-form-item label="织造">-->
                    <!--<el-select :disabled="weaveShow" clearable v-model="addFactoryData.weave">-->
                        <!--<el-option-->
                                <!--v-for="item in weaveFactory"-->
                                <!--:label="item.label"-->
                                <!--:value="item.value">-->
                        <!--</el-option>-->


                    <!--</el-select>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="缝头">-->
                    <!--<el-select :disabled="seamHeadShow" clearable v-model="addFactoryData.seamHead">-->
                        <!--<el-option-->
                                <!--v-for="item in seamHeadFactory"-->
                                <!--:label="item.label"-->
                                <!--:value="item.value">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="定型">-->
                    <!--<el-select :disabled="stereoTypeShow" clearable v-model="addFactoryData.stereoType">-->
                        <!--<el-option-->
                                <!--v-for="item in stereoTypeFactory"-->
                                <!--:label="item.label"-->
                                <!--:value="item.value">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="包装">-->
                    <!--<el-select :disabled="packShow" clearable v-model="addFactoryData.pack">-->
                        <!--<el-option-->
                                <!--v-for="item in packShowFactory"-->
                                <!--:label="item.label"-->
                                <!--:value="item.value">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
            <div>
                <el-button size="mini" type="primary" @click="DispatchingSetPanel=false">保存</el-button>
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
                        <el-checkbox v-model="TechnologyShow">工艺</el-checkbox>
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
                    weave: '',//织造
                    seamHead: '',//缝头
                    stereoType: '',//定型
                    pack: '',// 包装
                    time: [],
                    productionList: []
                },
                DispatchingSetPanel: false,//派工设置面板
                DispatchingSetBut: true,//派工设置按钮

                /**
                 * 根据生产计划单的工艺流程
                 * 来判断显示工艺下拉框
                 * */
                weaveShow: true,//织造
                seamHeadShow: true,//缝头
                stereoTypeShow: true,//定型
                packShow: true,//包装

                weaveFactory: [],//工厂织造信息
                seamHeadFactory: [],//工厂缝头信息
                stereoTypeFactory: [],//工厂定型信息
                packShowFactory: [],//工厂包装信息
            }
        },
        methods: {
            DispatchingSet() {
                //派工设置按钮
                this.DispatchingSetPanel = true
                let process = this.addFactoryData.productionList[0].processNodeList
                process.forEach(item => {
                    if (item == 'weave') {
                        this.weaveShow = false
                    }
                    if (item == 'seamHead') {
                        this.seamHeadShow = false
                    }
                    if (item == 'stereoType') {
                        this.stereoTypeShow = false
                    }
                    if (item == 'pack') {
                        this.packShow = false
                    }
                })

                // factTechno
                /**
                 * 根据四种职能状态查询对应职能工厂
                 * */
                this.$axios.get(this.$store.state.factTechno, {
                    params: {technology: '织造'}
                }).then(res => {
                    // weaveFactory
                    res.data.data.forEach(item => {
                        let a = {
                            label: item.name,
                            value: item.id
                        }
                        this.weaveFactory.push(a)
                    })
                })

                this.$axios.get(this.$store.state.factTechno, {
                    params: {technology: '缝头'}
                }).then(res => {
                    // weaveFactory
                    res.data.data.forEach(item => {
                        let a = {
                            label: item.name,
                            value: item.id
                        }
                        this.seamHeadFactory.push(a)
                    })
                })

                this.$axios.get(this.$store.state.factTechno, {
                    params: {technology: '定型'}
                }).then(res => {
                    // weaveFactory
                    res.data.data.forEach(item => {
                        let a = {
                            label: item.name,
                            value: item.id
                        }
                        this.stereoTypeFactory.push(a)
                    })
                })

                this.$axios.get(this.$store.state.factTechno, {
                    params: {technology: '包装'}
                }).then(res => {
                    // weaveFactory
                    console.log(res)
                    res.data.data.forEach(item => {
                        let a = {
                            label: item.name,
                            value: item.id
                        }
                        this.packShowFactory.push(a)
                    })
                })

            },
            rmProductionList() {
                //移除生产计划单
                this.addFactoryData.productionList = []
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
            }
            ,
        }
    }
</script>

<style scoped>

</style>