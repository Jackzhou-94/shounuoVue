<template>
    <div class="purchase">
        <div>
            <!--新建与查询-->
            <div class="menuBox">
                <div style="display: flex;justify-content: space-around">

                    <el-button size="mini" class="el-icon-plus">新建</el-button>
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
                       

                            <el-col :span="12">
                                <el-checkbox v-model="operation">供应商</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="purchaseNumber">采购单号</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="purchaseSource">采购订单来源</el-checkbox>
                            </el-col>
                        </el-row>


                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="auditStatus">审核状态</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="receiveStatus">收货状态</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="frequency">入库次数</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="type">采购订单类型</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="commodityType">商品类型</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="receiveAddress">收货地址</el-checkbox>
                            </el-col>
                        </el-row>


                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="contractTerm">合同条款</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="singlePerson">制单人</el-checkbox>
                            </el-col>
                        </el-row>


                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="submitter">提交人</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="financialJudge">财审人</el-checkbox>
                            </el-col>
                        </el-row>


                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="auditor">审核人</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="totalSum">总金额</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="totalQuantity">总数量</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="completeStatus">采购完成状态</el-checkbox>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="distanceDate">距离下单时间</el-checkbox>
                            </el-col>
                            <el-col :span="12">
                                <el-checkbox v-model="remark">备注</el-checkbox>
                            </el-col>
                        </el-row>


                    </div>

                </el-dialog>



                <div>

                    <el-row>
                        <el-col :span="8">
                            <el-date-picker
                                    size="mini"
                                    v-model="purchaseTime"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-col>
                        <el-col :span="4">
                            <el-select size="mini" v-model="AuditStatuss" placeholder="审核状态">
                                <el-option
                                        v-for="item in Audit"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-select size="mini" v-model="ReceivingStatus" placeholder="收货状态">
                                <el-option
                                        v-for="item in Receiving"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-input size="mini" placeholder="采购单号"></el-input>
                        </el-col>

                        <el-col :span="2">
                            <el-button type="primary" size="mini">
                                重置
                            </el-button>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search">查询</el-button>
                        </el-col>
                    </el-row>
                </div>


            </div>

            <div>
                <el-table
                        :data="purchaseList"
                        border
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
                            prop="purchaseNumber"
                            label="采购单号"
                            v-if="purchaseNumber"
                    >
                    </el-table-column>
                    <el-table-column
                    label="供应商"
                    prop="operation"
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
                            prop="frequency"
                            v-if="frequency"
                            label="入库次数">
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
                            prop="distanceDate"
                            width="180"
                            v-if="distanceDate"
                            label="距离下单时间">
                    </el-table-column>
                    <el-table-column
                            align="remark"
                            label="备注"
                            width="120"
                            v-if="remark"
                            prop="totalQuantity"
                    >
                    </el-table-column>

                    <el-table-column
                            label="操作"
                            fixed="right"
                            width="120"
                            align="center"
                    >
                        <template slot-scope="scope">
                            <el-button type="text">修改</el-button>
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
    export default {
        name: "purchase",
        data() {
            return {
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
                ReceivingStatus: '',//收货状态

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
                totalRecordNum:0,
                /**
                 * 显示设置
                 * **/
                purchaseCode: true,//"采购编码",
                operation:true ,//"供应商",
                purchaseNumber:true ,//"采购单号",
                purchaseSource: true,//"采购订单来源",
                submitTime:true,//提交时间
                auditStatus: true,//"审核状态",
                auditTime:true,//审核时间
                receiveStatus:true ,//"收货状态",
                frequency:true ,//"入库次数",
                type: true,//"采购订单类型",
                commodityType:true,// "商品类型",
                receiveAddress:true ,//"收货地址",
                contractTerm: true,//"合同条款",
                singlePerson: true,//"制单人",
                submitter:true,//"提交人",
                financialJudge:true ,//"财审人",
                auditor:true,//"审核人",
                totalSum: true,//"总金额",
                totalQuantity:true ,//"总数量",
                completeStatus:true ,//"采购完成状态",
                distanceDate:true ,//"距离下单时间",
                remark:true,//备注
                Settings:false,//显示设置面板
            }
        },
        methods: {
            factorylistpag(val) {
                //工厂信息分页
                this.purchasePageNum = val
                this.purchaseQueryPage()
            },
            purchaseQueryPage() {
                //采购订单分页查询
                this.$axios.get(this.$store.state.purchaseQueryPage, {
                    params: {
                        pageNum: this.purchasePageNum, pageSize: this.purchasePageSize
                    }
                }).then(res => {
                    this.purchaseList = res.data.list
                    this.totalRecordNum = res.data.totalRecord
                    console.log(this.purchaseList)
                })
            }
        },
        created: function () {
            this.purchaseQueryPage()
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
</style>