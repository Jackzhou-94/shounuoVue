<template>
    <div class="dispatchManagement">
        <div class="menuBox">

            <div class=" QueryConditions QueryInput">
                <div>
                    <el-input size="mini" clearable v-model="conditionproduceCode" placeholder="生产计划单编号"></el-input>
                    <!--<el-input size="mini" clearable v-model="conditionsstyleCode" placeholder="款式编号"></el-input>-->
                    <!--<el-input size="mini" clearable v-model="conditionmerchantCode" placeholder="商家编号"></el-input>-->
                    <!--<el-input size="mini" clearable v-model="conditionName" placeholder="商品名称"></el-input>-->

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
                :data="ProductionList"
                ref="table"
                :height="tableHeight"
            >
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column align="center" type="index"></el-table-column>
            <el-table-column align="center" label="生产计划单编号" prop="produceCode"
                             width="160px"></el-table-column>
            <el-table-column align="center" label="预加工时间" prop="expectProcessTime"
                             width="170px"></el-table-column>
            <el-table-column align="center" label="预完工时间" prop="expectCompleteTime"
                             width="160px"></el-table-column>
            <el-table-column
                    align="center"
                    prop="submitStatus"
                    label="提交状态"
                    width="150"
            >
                <template slot-scope="scope">
                    <span>{{scope.row.submitStatus=='tj01'?'已提交':'未提交'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="auditStatus"
                    label="审核状态"
            >
                <template slot-scope="scope">
                    <span>{{scope.row.auditStatus=='sh01'?'已审核':scope.row.auditStatus=='sh02'?'未审核':'审核驳回'}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" prop="createTime"
                             width="180px"></el-table-column>
            <el-table-column align="center" label="修改时间" prop="updateTime"
                             width="180px"></el-table-column>
            <el-table-column align="center" label="备注" prop="remark"></el-table-column>
            <el-table-column align="center" label="操作" fixed="right">
                <template slot-scope="scope">

                    <el-button type="text" @click="detailedQuery(scope.row)">操作</el-button>

                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-row>
            <el-col :span="10" :offset="14">
                <el-pagination
                        @current-change="productionpag"
                        :page-size="15"
                        layout="prev, pager, next, jumper"
                        :total="totalRecordNum">
                </el-pagination>
            </el-col>
        </el-row>




        <!--生产计划详情-->
        <el-dialog
                title="生产计划详情"
                :visible.sync="DetailsPlan"
                :show-close="false"
                width="1100px">
            <div class="QueryConditions">
                <!--:disabled="stateButton"-->
                <el-button type="primary" icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>
                <el-button type="primary" icon="el-icon-view" size="mini"
                           :disabled="produState" @click="batcworkerSettingsBtn">派工设置
                </el-button>
            </div>

            <el-table
                    border
                    stripe
                    :data="DetailsPlanList"
                    @cell-click="dispatchingDetailsButton"
                    @selection-change="selectionDetailsPlanList"
            >
                <el-table-column align="center" fixed="left" type="selection"></el-table-column>
                <el-table-column align="center" type="index"></el-table-column>
                <el-table-column align="center" v-if="ProductionOrderShow" label="生产计划单编号" prop="produceCode"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="styleNumberShow" label="工艺编号" prop="styleCode"
                                 width="170px"></el-table-column>
                <el-table-column align="center" v-if="MerchantNumberShow" label="商家编号" prop="merchantCode"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="MerchantNameShow" label="商品名称" prop="goodsName"></el-table-column>
                <el-table-column
                        label="工艺流程"
                        width="230"
                        v-if="processShow"
                        align="center">
                    <template slot-scope="scope">

                        <el-tag v-for="(item,index) in scope.row.processNodeMapList" :type="item.state===1?'success':''"
                                @click="factoryQueryProduction(scope.row.processNodeMapList[index].node,index,scope.row)">
                            {{item.node=='weave'?'织造':item.node=='seamHead'?'缝头':item.node=='stereoType'?'定型':'包装'}}
                        </el-tag>

                    </template>
                </el-table-column>
                <el-table-column align="center" v-if="specificationsShow" label="规格(颜色)" prop="colour"
                                 width="100px"></el-table-column>
                <el-table-column align="center" v-if="NumberShow" label="数量" prop="craftNumber"></el-table-column>
                <el-table-column align="center" v-if="unitShow" label="单位" prop="unit"></el-table-column>
                <el-table-column align="center" v-if="bandShow" label="品牌" prop="brand"></el-table-column>
                <el-table-column align="center" width="100px" v-if="categoryShow" label="类别"
                                 prop="category"></el-table-column>

                <!--<el-table-column align="center" v-if="processShow" label="工艺流程" prop="processNodeList"-->
                <!--width="150px"></el-table-column>-->
                <el-table-column align="center" v-if="CreationTimeShow" label="创建时间" prop="createTime"
                                 width="180px"></el-table-column>
                <el-table-column align="center" v-if="ModifyTimeShow" label="修改时间" prop="updateTime"
                                 width="180px"></el-table-column>
                <el-table-column align="center" v-if="noteShow" label="备注" prop="remark"></el-table-column>
                <!--<el-table-column align="center" label="操作" fixed="right">-->
                <!--<template slot-scope="scope">-->
                <!--<el-button type="text" @click="upProceBtn(scope.row)">修改</el-button>-->
                <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <el-divider>派工详情</el-divider>

            <div class="QueryConditions">


                <el-button type="primary" icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>
                <!--:disabled="auditStatusBut" 提交审核显示控制-->
                <el-button size="mini" :disabled="pruauditStatusBut" type="primary" @click="dispatchSubmitAudit">提交审核
                </el-button>

                <!--:disabled="submitStatusBut" 审核通过显示控制-->
                <el-button size="mini" :disabled="prusubmitStatusBut" type="primary" @click="dispatchapproved">审核通过
                </el-button>
                <!--:disabled="submitStatusBut" 审核驳回显示控制-->
                <el-button size="mini" :disabled="prusubmitStatusBut" type="primary" @click="dispatchapprovedRejected">
                    审核驳回
                </el-button>
                <el-button type="danger" size="mini" class="el-icon-delete" :disabled="prudelStatusBut"
                           @click="batchDel">批量删除
                </el-button>
            </div>
            <el-table
                    border
                    stripe
                    :data="dispatchingDetailsData"
                    @selection-change="dispatchingDetails"

            >
                <el-table-column align="center" fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" :disabled="scope.row.submitState=='tj01'?(true):(false)" @click="singledelRepairOrder(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" type="index"></el-table-column>
                <el-table-column align="center" type="selection"></el-table-column>
                <el-table-column align="center" v-if="ProductionOrderShow" label="生产计划单编号" prop="produceCode"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="styleNumberShow" label="派工单号" prop="produceCode"
                                 width="170px"></el-table-column>
                <el-table-column align="center" v-if="MerchantNumberShow" label="款式编号" prop="styleCode"
                                 width="170px"></el-table-column>
                <el-table-column
                        align="center"
                        prop="submitStatus"
                        label="提交状态"
                        width="150"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.submitState=='tj01'?'已提交':'未提交'}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="auditStatus"
                        label="审核状态"
                >
                    <template slot-scope="scope">
                        <span>{{scope.row.auditState=='sh01'?'已审核':scope.row.auditState=='sh02'?'未审核':'审核驳回'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" v-if="MerchantNameShow" label="工厂" prop="factoryName"></el-table-column>
                <el-table-column
                        label="工序"
                        width="120"
                        prop="processNode"
                        v-if="processShow"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger">
                            {{scope.row.processNode=='weave'?'织造':scope.row.processNode=='seamHead'?'缝头':scope.row.processNode=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" v-if="CreationTimeShow" label="创建时间" prop="createTime"
                                 width="180px"></el-table-column>
                <el-table-column align="center" v-if="noteShow" label="备注" prop="remark"></el-table-column>

            </el-table>



        </el-dialog>


        <!--生产计划单 单条派工设置-->
        <el-dialog
                title="派工设置"
                :visible.sync="workerSettings"
                width="1000px"
                :show-close="false"
        >
            <div class="QueryConditions QueryInput">

                <div>
                    <el-input size="mini" placeholder="所属公司" v-model="querycompany"></el-input>

                    <el-input size="mini" placeholder="名称" v-model="queryname"></el-input>

                    <el-input size="mini" placeholder="其他" v-model="queryspare01"></el-input>
                </div>

                <div>
                    <el-button size="mini" type="primary" @click="factorySettings=true">显示设置</el-button>
                    <el-button type="primary" size="mini"
                               @click="queryspare01='',queryname='',querycompany=''">
                        重置
                    </el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search"
                               @click="factoryquery()">查询
                    </el-button>
                </div>


            </div>
            <el-table
                    :data="factoryList"
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
                        prop="name"
                        v-if="nameShow"
                        width="150"
                        label="名称">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="code"
                        v-if="codeShow"
                        label="编码"
                        width="100"
                >
                </el-table-column>
                <el-table-column
                        label="工厂职能"
                        v-if="functionShow"
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
                        prop="address"
                        v-if="addressShow"
                        label="城市"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        v-if="detailedAddressShow"
                        prop="detailedAddress"
                        label="详细地址"
                        width="180"
                >
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="company"
                        v-if="companyShow"
                        label="所属公司"

                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="contact"
                        v-if="contactShow"
                        label="联系人"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="phoneNumber"
                        width="150"
                        v-if="phoneNumberShow"
                        label="手机号码">
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        prop="createTime"
                        width="180"
                        v-if="createTimeShow"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="修改时间"
                        prop="updateTime"
                        width="180"
                        v-if="updateTimeShow"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="remark"
                        width="100"
                        v-if="remarkShow"
                        label="备注">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作"
                        width="120"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="plantSelection(scope.row)">选择</el-button>

                    </template>
                </el-table-column>


            </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            @current-change="factorylistpag"
                            :page-size="5"
                            layout="prev, pager, next, jumper"
                            :total="totalRecordNumFactory">
                    </el-pagination>
                </el-col>
            </el-row>


        </el-dialog>

        <!--生产计划单 批量派工设置-->
        <el-dialog
                title="派工设置"
                :visible.sync="batchworkerSettings"
                width="1000px"
                :show-close="false"
        >
            <div class="QueryConditions QueryInput">

                <div>
                    <el-input size="mini" placeholder="所属公司" v-model="querycompany"></el-input>

                    <el-input size="mini" placeholder="名称" v-model="queryname"></el-input>

                    <el-input size="mini" placeholder="其他" v-model="queryspare01"></el-input>
                </div>

                <div>
                    <el-button size="mini" type="primary" @click="factorySettings=true">显示设置</el-button>
                    <el-button type="primary" size="mini"
                               @click="queryspare01='',queryname='',querycompany=''">
                        重置
                    </el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search"
                               @click="factoryquery()">查询
                    </el-button>
                </div>


            </div>
            <el-table
                    :data="factoryList"
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
                        prop="name"
                        v-if="nameShow"
                        width="150"
                        label="名称">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="code"
                        v-if="codeShow"
                        label="编码"
                        width="100"
                >
                </el-table-column>
                <el-table-column
                        label="工厂职能"
                        v-if="functionShow"
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
                        prop="address"
                        v-if="addressShow"
                        label="城市"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        v-if="detailedAddressShow"
                        prop="detailedAddress"
                        label="详细地址"
                        width="180"
                >
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="company"
                        v-if="companyShow"
                        label="所属公司"

                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="contact"
                        v-if="contactShow"
                        label="联系人"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="phoneNumber"
                        width="150"
                        v-if="phoneNumberShow"
                        label="手机号码">
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        prop="createTime"
                        width="180"
                        v-if="createTimeShow"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="修改时间"
                        prop="updateTime"
                        width="180"
                        v-if="updateTimeShow"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="remark"
                        width="100"
                        v-if="remarkShow"
                        label="备注">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作"
                        width="120"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="batchplantSelection(scope.row)">选择</el-button>

                    </template>
                </el-table-column>


            </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            @current-change="factorylistpag"
                            :page-size="5"
                            layout="prev, pager, next, jumper"
                            :total="totalRecordNumFactory">
                    </el-pagination>
                </el-col>
            </el-row>


        </el-dialog>


        <!--派工单选择工厂职能-->
        <el-dialog
                title="工厂职能选择"
                class="functions"
                :show-close="false"
                :visible.sync="functionsSelect"
                width="400px">
            <!--technologys-->
            <el-checkbox-group v-model="checkList" v-for="city in  DispatchedFactory.selectState">

                <el-checkbox
                        style="display: flex;justify-content: space-between"
                        :disabled="city.state"
                        :label="city.technology=='weave'?'织造':city.technology=='seamHead'?'缝头':city.technology=='stereoType'?'定型':'包装'">
                </el-checkbox>

            </el-checkbox-group>
            <el-button size="mini" @click="seave">保存</el-button>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "dispatchManagement",
        data() {
            return {
                screenWidth: document.body.clientWidth,
                tableHeight: 0,//表格高度
                produState: true,//派工按钮状态
                Settings: false,//显示设置面板
                Dispatched: [],//选择需要派单的信息
                proNodeMapList: [],//选中需要派单的单据需要的工艺

                /**
                 * 生产计划显示设置
                 * */
                ProductionOrderShow: true,// 生产计划单编号
                styleNumberShow: true,//款式编号
                MerchantNumberShow: true,//商家编号
                MerchantNameShow: true,// 商品名称
                specificationsShow: true,// 规格
                NumberShow: true,//数量
                unitShow: true,//单位
                bandShow: true,//品牌
                categoryShow: true,//类别
                processShow: true,//工艺流程
                CreationTimeShow: true,//创建时间
                ModifyTimeShow: true,//修改时间
                noteShow: true,//备注

                stateButton: false,//派工按钮


                pageNumQuery: 1,//生产计划单分页查询默认显示页数
                conditionsstyleCode: '',//生产计划单查询（款式编号）
                conditionproduceCode: '',//生产计划单编号
                conditionmerchantCode: '',//商家编号
                conditionName: '',//商品名称
                conditionprocessNode: [],//工艺流程
                ProductionList: [],//生产计划单数据
                typedata: '',//用于储存数据，当表单发生改变时校验
                DetailsPlanList: [],//生产计划详情数据
                dispatchingDetailsData: [],//派工详情数据
                totalRecordNum: 0,//生产计划单总条目数
                DetailsPlan: false,//生产计划详情面板

                prusubmitStatusBut: true,//派工审核按钮
                pruauditStatusBut: true,//派工提交按钮
                prudelStatusBut: true,//删除按钮
                uuidListArr: [],//批量删除uuid
                dispatchingList: [],//选择派工单的信息
                workerSettings: false,//单条派工设置面板
                batchworkerSettings: false,//批量派工设置面板
                functionsSelect: false,//选择工厂职能面板
                technologyQuery: '',//根据工艺职能查询
                DispatchedFactory: '',//选择的工厂数据


                /**
                 * 派工设置工厂查询信息
                 * **/
                pageSizeFactory: 5,//每页条目数
                pageNumFactory: 1,//当前页数
                factoryList: [],//工厂数据集合
                queryspare01: '',//查询其他
                queryname: '',//查询名称
                querycompany: '',//查询所属公司
                totalRecordNumFactory: 0,//派工设置工厂总条目数
                checkList: [],//选择工厂时选中的工厂职能
                /**
                 * 派工设置显示设置
                 * **/
                factorySettings: false,//派工设置工厂信息显示设置面板
                nameShow: true,//名称
                codeShow: true,//编码
                functionShow: true,//工厂职能
                addressShow: true,//城市
                detailedAddressShow: true,//详细地址
                companyShow: true,//所属公司
                contactShow: true,//联系人
                phoneNumberShow: true,//手机号码
                createTimeShow: true,//创建时间
                updateTimeShow: true,//修改时间
                remarkShow: true,//备注
            }
        },
        mounted() {

            const that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                })()
            }
        },
        watch: {
            screenWidth(val) {
                if (!this.timer) {
                    this.screenWidth = val
                    this.timer = true
                    let that = this
                    setTimeout(function () {
                        that.size()
                        that.timer = false
                        console.log(1)
                    }, 400)
                }
            }
        },
        methods: {
            batchplantSelection(data) {
                //批量派工
                this.functionsSelect = true
                this.DispatchedFactory = data
                console.log(data)
            },
            seave() {
                //保存选中的工厂职能
                let dataArr = []
                // dataArr = this.checkList//选中工厂职能数据转换
                let that = this
                this.checkList.forEach(l => {
                    let a = l === '织造' ? 'weave' : l === '缝头' ? 'seamHead' : l === '定型' ? 'stereoType' : 'pack'
                    dataArr.push(a)
                })

                this.functionsSelect = false
                let data = this.Dispatched//选择需要派单的信息

                let factory = this.DispatchedFactory//选择的工厂数据


                this.Dispatched.forEach(item => {
                    item.dispatchedDetailList = []

                    console.log(item)
                    dataArr.forEach(j => {
                        let param = {processNode: j, factoryUuid: factory.uuid};
                        item.dispatchedDetailList.push(param)
                    })
                })
                /**
                 * 生成派工单
                 * **/
                this.$axios.post(this.$store.state.addDispatch, this.Dispatched).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            onClose() {
                                that.batchworkerSettings = false;
                                that.detailedQuery()
                            }
                        });
                    }
                    else {
                        this.$message.error(res.data.msg);
                    }
                })


                console.log(this.Dispatched)
            },
            plantSelection(data) {
                console.log(data)
                //派工设置选择工厂,单条派工

                let that = this
                let logy = this.technologyQuery == 'weave' ? '织造' : this.technologyQuery == 'seamHead' ? '缝头' : this.technologyQuery == 'stereoType' ? '定型' : '包装'
                this.$confirm(`是否将工序 ${logy} 派给该工厂？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let val = {
                        factoryUuid: data.uuid,
                        processNode: this.technologyQuery
                    }

                    this.selectProcessData.forEach(item => {
                        item.dispatchedDetailList = []
                        item.dispatchedDetailList.push(val)
                    })
                    this.$axios.post(this.$store.state.addDispatch, this.selectProcessData).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                onClose() {
                                    that.workerSettings = false;
                                    that.detailedQuery()
                                }
                            });
                            console.log(res.data)
                        }
                        else {
                            this.$message.error(res.data.msg);
                        }
                    })


                })


            },
            factorylistpag(val) {
                //工厂信息分页
                this.pageNumFactory = val
                this.factoryquery()
            },
            factoryquery() {
                //工厂信息分页查询
                this.$axios.get(this.$store.state.factoryPage, {
                    params: {
                        pageSize: this.pageSizeFactory, pageNum: this.pageNumFactory,
                        company: this.querycompany, name: this.queryname, spare01: this.queryspare01,
                        technology: this.technologyQuery
                    }
                }).then(res => {
                    console.log(res)
                    this.factoryList = res.data.list
                    this.totalRecordNumFactory = res.data.totalRecord
                    // proNodeMapList
                    console.log(this.proNodeMapList)
                    /**
                     * 根据派工单工序选择派工工厂，给最后派单选择工厂时做限定
                     * 没有改条工序的无法选择对应这条工厂的工序
                     * false 可选
                     * true 禁用，不可选
                     * **/
                    this.factoryList.forEach(item => {
                        item.selectState = []
                        item.technologys.forEach(j => {
                            let data
                            if (this.proNodeMapList.indexOf(j) != -1) {
                                data = {
                                    technology: j,
                                    state: false
                                }
                            } else {
                                data = {
                                    technology: j,
                                    state: true
                                }
                            }
                            item.selectState.push(data)
                        })
                    })
                    console.log(this.factoryList)
                })
            },
            factoryQueryProduction(list, index, data) {
                //工序标签点击事件
                /**
                 * list 当前工艺单所有工艺
                 * index 当前选择工艺索引
                 * data 当前选中工艺单所有信息
                 * **/
                this.workerSettings = true
                this.technologyQuery = list
                this.selectProcessData = []
                this.selectProcessData.push(data)

                this.factoryquery()

            },
            dispatchSubmitAudit() {
                //生产计划单提交审核
                let data = {
                    dispatchDetailBeanList: this.dispatchingList,
                    submitState: 'tj01'
                }
                let that = this
                this.$axios.post(this.$store.state.dispatchSaveState, data).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            onClose() {
                                that.detailedQuery()
                            }
                        });
                    }
                    else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            dispatchapprovedRejected() {
                //审核驳回
                let data = {
                    dispatchDetailBeanList: this.dispatchingList,
                    auditState: 'sh03',
                    submitState: 'tj02'
                }
                let that = this
                this.$axios.post(this.$store.state.dispatchSaveState, data).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            onClose() {
                                that.detailedQuery()
                            }
                        });
                    }
                    else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            dispatchapproved() {
                //生产计划单通过审核
                let data = {
                    dispatchDetailBeanList: this.dispatchingList,
                    auditState: 'sh01'
                }
                let that = this
                this.$axios.post(this.$store.state.dispatchSaveState, data).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            onClose() {
                                that.detailedQuery()
                            }
                        });
                    }
                    else {
                        this.$message.error(res.data.msg);
                    }
                })

            },
            batchDel() {
                //批量删除派工单信息
                this.uuidListArr = []
                this.dispatchingList.forEach(item => {
                    this.uuidListArr.push(item.uuid)
                })
                this.delRepairOrder()
            },
            delRepairOrder() {
                //删除派工单信息
                let that = this
                this.$axios.post(this.$store.state.delFaDisp, {
                    uuidList: this.uuidListArr
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            onClose() {
                                that.dispatchingDetailsFun(that.DetailsPlanList[0].uuid)
                            }
                        });
                    }
                    else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            productionpag(val) {
                //工艺单信息分页
                this.pageNumQuery = val
                this.ProduQueryPage()
            },
            size() {
                //监听窗口函数
                setTimeout(() => {
                    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 150;
                }, 100)
            },
            selectionDetailsPlanList(data) {
                //选中需要派单的信息
                this.Dispatched = data
                this.proNodeMapList = []
                this.Dispatched.forEach(item => {
                    // 0不可以派工，1可以派工
                    console.log(item.processNodeMapList)
                    /**
                     * 选择需要派单的信息
                     * 并记录下选中这些信息所需的工艺
                     * proNodeMapList
                     * **/
                    item.processNodeMapList.forEach(j => {
                        if (j.auditState !== 0) {
                            this.produState = false
                            console.log()
                            this.proNodeMapList.push(j.node)//选中需要派单的单据需要的工艺
                        } else {
                            this.produState = true
                        }
                    })
                })
            },
            batcworkerSettingsBtn() {
                //批量派工设置按钮

                /**
                 * 先判断选中的信息是否有包含已经派过单的
                 * **/
                let arr = []
                let that = this
                let isTrue = true
                this.Dispatched.forEach((item, index) => {
                    item.processNodeMapList.forEach(j => {
                        arr.push(j.state)
                    })
                })
                /**
                 * 判断选中的数据，需要派工的工艺是否一样
                 * */
                for (let i = 0; i < arr.length; i++) {
                    if (arr.indexOf(arr[i]) != 0) {
                        isTrue = false
                        break
                    }
                }

                if (isTrue) {

                    this.batchworkerSettings = true
                    this.factoryquery()
                } else {
                    this.$message.error('所选择的工艺单不符合派单规则');
                }

                console.log(this.Dispatched)


            },
            dispatchingDetailsButton(data) {
                //获取当前工艺派单信息
                this.dispatchingDetailsFun(data.uuid)
            },
            dispatchingDetails(data) {
                //选择派工详情
                //采购单多选
                this.dispatchingList = data
                if (data.length == 0) {
                    this.prusubmitStatusBut = true
                    this.pruauditStatusBut = true
                    this.prudelStatusBut = true

                } else {
                    this.prudelStatusBut = false
                    let list = data.map(item => {
                        return item.submitState
                    })
                    let lists = data.map(item => {
                        return item.auditState
                    })
                    let num = list.indexOf('tj02')
                    let nums = lists.indexOf('sh01')
                    if (num == -1) {
                        this.prusubmitStatusBut = false
                        this.pruauditStatusBut = true
                    } else if (num != -1) {
                        this.prusubmitStatusBut = true
                        this.pruauditStatusBut = false
                    }
                    if (nums != -1) {
                        this.prusubmitStatusBut = true
                        this.pruauditStatusBut = true
                        this.prudelStatusBut = true
                    }
                }
            },
            detailedQuery(data) {
                //生产计划单双击事件
                if (data) {
                    this.producitonUUID = data.uuid
                    this.DetailsPlan = true
                }
                /**
                 *
                 * 生产计划单明细
                 * */
                this.$axios.get(this.$store.state.produceplanselect, {
                    params: {uuid: this.producitonUUID}
                }).then(res => {
                    if (res.data.data.auditStatus !== 'sh01') {
                        this.stateButton = true
                    } else {
                        this.stateButton = false
                    }
                    this.DetailsPlanList = res.data.data.producePlanDetailBeanList
                    console.log(this.DetailsPlanList)
                    this.dispatchingDetailsFun(this.DetailsPlanList[0].uuid)
                })
                // this.dispatchingDetailsFun()
                console.log(data)
            },
            dispatchingDetailsFun(uuid) {
                /**
                 *
                 * 生产计划单明细派工信息
                 * */
                this.$axios.get(this.$store.state.dispatchPage, {
                    params: {produceDeatailUuid: uuid}
                }).then(res => {
                    console.log(res)
                    this.dispatchingDetailsData = res.data.list

                    // this.dispatchingDetailsNum = res.data.totalRecord
                })
            },
            detailedQuery(data) {
                //生产计划单双击事件
                if (data) {
                    this.producitonUUID = data.uuid
                    this.DetailsPlan = true
                }
                /**
                 *
                 * 生产计划单明细
                 * */
                this.$axios.get(this.$store.state.produceplanselect, {
                    params: {uuid: this.producitonUUID}
                }).then(res => {
                    if (res.data.data.auditStatus !== 'sh01') {
                        this.stateButton = true
                    } else {
                        this.stateButton = false
                    }
                    this.DetailsPlanList = res.data.data.producePlanDetailBeanList
                    console.log(this.DetailsPlanList)
                    this.dispatchingDetailsFun(this.DetailsPlanList[0].uuid)
                })
                // this.dispatchingDetailsFun()
                console.log(data)
            },
            ProduQueryPage() {
                //生产计划单分页查询


                this.$axios.get(this.$store.state.ProductionQueryPage, {
                    params: {
                        pageSize: 15,
                        pageNum: this.pageNumQuery,
                        styleCode: this.conditionsstyleCode,
                        produceCode: this.conditionproduceCode,
                        merchantCode: this.conditionmerchantCode,
                        name: this.conditionName,
                        auditStatus:'sh02',
                    }
                }).then(res => {
                    this.ProductionList = res.data.list
                    this.totalRecordNum = res.data.totalRecord
                    console.log(res)
                })
            },
        },
        created: function () {
            this.size();
            this.ProduQueryPage()//生产计划单分页查询
        }
    }
</script>

<style scoped>
    .el-dialog .el-checkbox-group {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        padding: 10px;
    }
</style>