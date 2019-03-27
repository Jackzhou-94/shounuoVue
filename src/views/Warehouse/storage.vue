<template>
    <div class="storage">
        <div style="text-align: left;margin-bottom: 0.5em">
            <el-button size="mini" type="primary" class="el-icon-plus" @click="Newpurchaseorder=true">新建</el-button>
            <el-button icon="el-icon-view" type="primary" size="mini" @click="Settings=true">显示设置
            </el-button>
            <!--<el-button size="mini" type="primary" :disabled="auditStatusBut">提交审核</el-button>-->
            <!--<el-button size="mini" type="primary" :disabled="submitStatusBut">审核通过</el-button>-->
            <!--<el-button size="mini" type="primary" :disabled="submitStatusBut">审核驳回</el-button>-->
            <!--<el-button size="mini" type="danger" @click="delpurchaseList()">批量删除</el-button>-->
            <!--<el-button size="mini">导出</el-button>-->
        </div>

        <!--入库开单-->
        <el-dialog
                title="入库开单"
                :visible.sync="Newpurchaseorder"
                :show-close="false"
                width="80%">
            <el-form :model="NewWarehousing" inline label-width="150">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="入库类别">
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
                        <el-form-item label="引入单号">
                            <el-input size="mini" v-model="NewWarehousing.introduceNumber" :disabled="showIntrodw" @focus="introduction"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="入库工厂">
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
            </el-form>

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
                <el-button type="primary" size="mini" icon="el-icon-search" @click="alternative">添加</el-button>
            </div>
            <el-table
                    :data="purchaseList"
                    border
                    stripe
                    highlight-current-row
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
                width="30%"
                :show-close="false"

        >
            <div style="text-align: left">
                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="NumbersShow">入库单号</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="stateShow">入库单状态</el-checkbox>
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
                        <el-checkbox v-model="ReceiptShow">入库数量</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="TotalShow">入库货品总数</el-checkbox>
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

                </el-row>

            </div>

        </el-dialog>
        <el-table
                style="width: 100%"
                border
                height="720"
        >
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" align="center"></el-table-column>
            <el-table-column
                    label="入库单号"
                    align="center"
                    width="150"
                    v-if="NumbersShow"
            ></el-table-column>
            <el-table-column
                    label="入库单状态"
                    align="center"
                    width="100"
                    v-if="stateShow"
            ></el-table-column>
            <el-table-column
                    label="入库类别"
                    align="center"
                    v-if="categoryShow"
            ></el-table-column>
            <el-table-column
                    label="经办人"
                    align="center"
                    v-if="personShow"
            ></el-table-column>
            <el-table-column
                    label="仓库"
                    align="center"
                    width="180"
                    v-if="WarehouseShow"
            ></el-table-column>
            <el-table-column
                    label="物流公司"
                    align="center"
                    width="180"
                    v-if="LogisticscompanyShow"
            ></el-table-column>
            <el-table-column
                    label="物流单号"
                    align="center"
                    width="180"
                    v-if="LogisticsnumberShow"
            ></el-table-column>
            <el-table-column
                    label="入库数量"
                    align="center"
                    width="100"
                    v-if="ReceiptShow"
            ></el-table-column>
            <el-table-column
                    label="入库货品总数"
                    align="center"
                    width="150"
                    v-if="TotalShow"
            ></el-table-column>
            <el-table-column
                    label="入库金额（税）"
                    align="center"
                    width="180"
                    v-if="moneyShow"
            ></el-table-column>
            <el-table-column
                    label="入库时间"
                    align="center"
                    width="180"
                    v-if="WarehousingtimeShow"
            ></el-table-column>
            <el-table-column
                    label="审核时间"
                    align="center"
                    width="180"
                    v-if="examineShow"
            ></el-table-column>
            <el-table-column
                    label="备注"
                    align="center"
                    width="100"
                    v-if="RemarksShow"
            ></el-table-column>
        </el-table>

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
                stateShow: true,//入库单状态
                categoryShow: true,//入库类别
                personShow: true,//经办人
                WarehouseShow: true,//仓库
                LogisticscompanyShow: true,//物流公司
                LogisticsnumberShow: true,//物流单号
                ReceiptShow: true,//入库数量
                TotalShow: true,//入库货品总数
                moneyShow: true,//入库金额（税)
                WarehousingtimeShow: true,//入库时间
                examineShow: true,//审核时间
                RemarksShow: true,//备注

                Newpurchaseorder: false,//入库开单面板
                NewWarehousing: {
                    //新建入库单
                    category: '',//入库类别
                    factoryName: '',//入库工厂
                    supplier: '',//供应商
                    introduceNumber:'',//引入单号
                    goodsList:[],//数据详情

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
                factorylist: [],//工厂查询数据
                options: [],//供应商查询数据
                purchaseList:[],//商品信息列表
                purchasePageNum: 1,//采购单默认显示页数(商品)
                purchasePageSize: 5,//采购单默认显示条目数
                totalRecordNum: 0,//总条目数（采购单添加商品条目数）
                purchaseNumbers:'',//采购单号查询
                introductionNumber:false,//引入单号面板

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

                WarehousingCategory:'',//入库类别具体类别
                showIntrodw:true,//引入单号按钮可用不可用
                alternativeList:[],//引入单号数据
            }
        },
        methods: {
            alternative(){
              //将选择的数据添加到表单
                this.NewWarehousing.goodsList=this.alternativeList
                this.introductionNumber=false
                console.log( this.NewWarehousing)
            },
            Multipleselection(data) {
               //引入单号单选
                console.log(data)
                this.NewWarehousing.introduceNumber=data.purchaseNumber
                this.alternativeList.push(data.goodsList)

            },
            factorylistpag(val) {
                //采购信息分页(商品)
                let Category=this.WarehousingCategory
                this.purchasePageNum = val
                if (Category=='原材料入库'){
                    this.materialQueryPage()
                } else if (Category=='半成品入库') {
                    this.purchaseQueryPage()
                }
            },
            introduction(){
                //文本框引入单号
                this.introductionNumber=true
                console.log(this.purchaseList)
            },
            WareSelect(data){
              //入库类别选择
                this.WarehousingCategory=data
                this.showIntrodw=false
                if (data=='原材料入库'){
                    this.materialQueryPage()
                } else if (data=='半成品入库') {
                    this.purchaseQueryPage()
                }

            },

            purchaseQueryPage() {
                //采购订单分页查询(商品)
                let querydata = {
                    pageNum: this.purchasePageNum, pageSize: this.purchasePageSize,
                    auditStatus:'sh01',purchaseNumber:this.purchaseNumbers
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
                    auditStatus:'sh01',purchaseNumber:this.purchaseNumbers
                }

                this.$axios.get(this.$store.state.materialqueryPage, {
                    params: querydata,
                }).then(res => {
                    this.purchaseList = res.data.list
                    this.totalRecordNum = res.data.totalRecord
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

        },
        created: function () {
            this.factoryQuery()//工厂列表查询
            this.supplierQuery()//供应商列表查询

        }
    }
</script>

<style scoped>

</style>