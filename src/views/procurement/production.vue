<template>
    <div class="production">
        <div class="menuBox">
            <div class="QueryConditions">
                <el-button size="mini" type="primary" class="el-icon-plus" @click="addProductionBtn">新建</el-button>
                <el-button type="primary" icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>
                <!--:disabled="auditStatusBut" 提交审核显示控制-->
                <el-button size="mini" type="primary">提交审核</el-button>

                <!--:disabled="submitStatusBut" 审核通过显示控制-->
                <el-button size="mini" type="primary">审核通过</el-button>
                <!--:disabled="submitStatusBut" 审核驳回显示控制-->
                <el-button size="mini" type="primary">审核驳回</el-button>

                <!--:disabled="delStatusButGoods" 批量删除显示控制-->
                <el-button type="danger" size="mini" class="el-icon-delete">批量删除
                </el-button>
            </div>
            <div class=" QueryConditions QueryInput">
                <div>
                    <el-input size="mini" placeholder="生产计划单编号"></el-input>
                    <el-input size="mini" placeholder="款式编号"></el-input>
                    <el-input size="mini" placeholder="商家编号"></el-input>
                    <el-input size="mini" placeholder="商品名称"></el-input>
                    <div class="produ">
                        <el-select placeholder="工艺流程" multiple size="mini" v-model="technology">
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
                               @click="queryspare01='',queryname='',querycompany=''">
                        重置
                    </el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search"
                               @click="factoryquery()">查询
                    </el-button>
                </div>
            </div>
        </div>

        <el-table
                border
                stripe
                height="750px"
        >
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column align="center" type="index"></el-table-column>
            <el-table-column align="center" v-if="ProductionOrderShow" label="生产计划单编号" width="120px"></el-table-column>
            <el-table-column align="center" v-if="styleNumberShow" label="款式编号" width="120px"></el-table-column>
            <el-table-column align="center" v-if="MerchantNumberShow" label="商家编号" width="120px"></el-table-column>
            <el-table-column align="center" v-if="MerchantNameShow" label="商品名称"></el-table-column>
            <el-table-column align="center" v-if="specificationsShow" label="规格(颜色)" width="100px"></el-table-column>
            <el-table-column align="center" v-if="NumberShow" label="数量"></el-table-column>
            <el-table-column align="center" v-if="unitShow" label="单位"></el-table-column>
            <el-table-column align="center" v-if="bandShow" label="品牌"></el-table-column>
            <el-table-column align="center" v-if="categoryShow" label="类别"></el-table-column>
            <el-table-column align="center" v-if="processShow" label="工艺流程" width="150px"></el-table-column>
            <el-table-column align="center" v-if="CreationTimeShow" label="创建时间" width="150px"></el-table-column>
            <el-table-column align="center" v-if="ModifyTimeShow" label="修改时间" width="150px"></el-table-column>
            <el-table-column align="center" v-if="noteShow" label="备注"></el-table-column>
            <el-table-column align="center" label="操作" fixed="right"></el-table-column>
        </el-table>
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
                        <el-checkbox v-model="ProductionOrderShow">生产计划单编号</el-checkbox>
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
                        <el-checkbox v-model="CreationTimeShow">创建时间</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="ModifyTimeShow">修改时间</el-checkbox>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="noteShow">备注</el-checkbox>
                    </el-col>


                </el-row>
            </div>

        </el-dialog>

        <!--工艺引入面板-->
        <el-dialog
                title="工艺引入"
                :visible.sync="ProcessIntroduction"
                :show-close="false"
                width="1100px">
            <div class="QueryConditions QueryInput">
                <div>

                    <el-input clearable size="mini" v-model="styleCodeQuery" placeholder="款式编号"></el-input>
                    <el-input clearable size="mini" v-model="merchantCodeQuery" placeholder="商家编码"></el-input>
                    <el-input clearable size="mini" v-model="nameQuery" placeholder="名称"></el-input>

                    <el-select size="mini" clearable v-model="categoryQuery" placeholder="类别">
                        <el-option
                                v-for="item in categorySelect"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </div>

                <div>
                    <el-button type="primary" size="mini"
                               @click="categoryQuery='',nameQuery='',merchantCodeQuery='',styleCodeQuery=''">重置
                    </el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search" @click="PricessQuery()">查询</el-button>
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="BatchIntroduction()">批量引入</el-button>
                </div>

            </div>

            <el-table
                    border
                    stripe
                    ref="multipleTable"
                    :data="ProcessList"
                    highlight-current-row
                    @selection-change="MultiplePro"
                >

                <el-table-column
                        type="index"
                        align="center">
                </el-table-column>
                <el-table-column
                        :selectable="selectable"
                        type="selection"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="款式编号"
                        width="200"
                        prop="styleCode"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="商家编码"
                        prop="merchantCode"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="工艺名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="流程节点"
                        width="230"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.processNodeList">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                        label="颜色"
                        prop="colour"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="品牌"
                        prop="brand"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="类别"
                        prop="category"
                        width="100"
                        align="center">
                </el-table-column>


                <el-table-column
                        label="操作"
                        align="center"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="Introduce(scope.row)" :disabled="scope.row.show">引入
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            @current-change="Processlistpag"
                            :total="totalRecordNum"
                            :page-size="5"
                    >
                    </el-pagination>


                    <!---->
                    <!--<el-pagination-->
                    <!--@current-change="Processlistpag"-->
                    <!--:page-size="5"-->
                    <!--layout="prev, pager, next, jumper"-->
                    <!--:total="totalRecordNum">-->
                    <!--</el-pagination>-->
                </el-col>
            </el-row>


        </el-dialog>

        <!--新建工艺单面板-->
        <el-dialog
                title="新建工艺单"
                :visible.sync="addProduction"
                :show-close="false"
                width="1100px">
            <div class="QueryConditions">
                <el-button size="mini" type="primary" @click="ProcessIntroductionBtn">工艺信息引入</el-button>
                <el-button size="mini" type="primary" @click="delProdufuns">批量移除</el-button>


            </div>
            <el-table
                    border
                    :data="ScheduleList"
                    stripe
                    @selection-change="addProductionMultiple"
            >
                <el-table-column
                        type="index"
                        align="center">
                </el-table-column>
                <el-table-column
                        type="selection"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="款式编号"
                        width="165"
                        prop="styleCode"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="商家编码"
                        prop="merchantCode"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="工艺名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="数量"
                        width="100px"
                        align="center">
                    <template slot-scope="scope">

                        <el-input v-model="scope.row.craftNumber"
                                  size="mini"
                                  style="width: 75px"
                                  oninput = "value=value.replace(/[^\d]/g,'')"
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="流程节点"
                        width="205"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.processNodeList">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                        label="颜色"
                        prop="colour"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="品牌"
                        prop="brand"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="类别"
                        prop="category"
                        width="90"
                        align="center">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="rmproduction(scope.row)">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="btnBox">
                <el-button size="mini" type="primary" @click="addProductiondata">添加</el-button>
                <el-button size="mini" type="primary">取消</el-button>
            </div>


        </el-dialog>
    </div>
</template>

<script>

    import {regionDataPlus, CodeToText} from 'element-china-area-data'


    export default {
        name: "production",
        data() {
            return {
                ProcessFunction: [
                    //工艺流程
                    {
                        label: '织造',
                        value: '织造'
                    },
                    {
                        label: '缝头',
                        value: '缝头'
                    }
                    ,
                    {
                        label: '定型',
                        value: '定型'
                    }
                    ,
                    {
                        label: '包装',
                        value: '包装'
                    }
                ],
                technology: [],//工艺流程Value值

                addProduction: false,//新建生产计划单面板
                ProcessIntroduction: false,//工艺引入面板
                Settings: false,//显示设置面板
                /**
                 * 显示设置
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

                pageNumQuery: 1,//分页查询默认显示页数
                ProcessList: [],//工艺单数据

                styleCodeQuery: '',//款式编号
                merchantCodeQuery: '',//商家编码
                nameQuery: '',//工艺名称
                categoryQuery: '',//类别
                totalRecordNum: 0,//总条目数
                categorySelect: [
                    //工艺单类别
                    {
                        value: '中筒',
                        label: '中筒'
                    },
                    {
                        value: '短袜',
                        label: '短袜'
                    },
                    {
                        value: '隐形袜',
                        label: '隐形袜'
                    },
                    {
                        value: '船袜',
                        label: '船袜'
                    }
                ],
                ScheduleList: [],//新建生产计划单数据
                MultipleProList:[],//添加时多选工艺单数据（准备添加到数组的数据）
                addProductionMultipleList:[],//新建生产计划单数据多选

            }
        },

        methods: {
            addProductiondata(){
              //添加生产计划单
                console.log(this.ScheduleList)
            },
            delProdufuns(){
              //批量移除  新建生产计单 工艺单信息多选
                //批量移除原材料信息
                /**
                 * 1.当匹配到想同数据时，进行删除
                 * 2.先将原材料数据全部选中，再取消选中，从而达到刷新效果
                 * **/

                this.addProductionMultipleList.forEach(item => {
                    this.ScheduleList.forEach(j => {
                        if (item == j) {
                            this.ScheduleList[this.ScheduleList.indexOf(item)].show = false
                            this.ScheduleList.splice(this.ScheduleList.indexOf(item), 1)
                            this.$refs.multipleTable.toggleRowSelection();
                            this.$refs.multipleTable.clearSelection();
                        }

                    })
                })
            },
            addProductionMultiple(data){
              //新建生产计单 工艺单信息多选
                this.addProductionMultipleList=[]
                this.addProductionMultipleList = data
            },
            rmproduction(data) {
                //移除工艺单信息（单个移除）
                let index = this.ScheduleList.indexOf(data)
                delete data.show
                this.ScheduleList.splice(index, 1)

                let listArr = this.ProcessList.filter(item => {
                    return data.styleCode === item.styleCode
                })
                listArr.forEach(item => {
                    item.show = false
                })
                this.$refs.multipleTable.toggleRowSelection();
                this.$refs.multipleTable.clearSelection();


            },
            MultiplePro(data){
                //多选工艺单信息
                this.MultipleProList=[]
                this.MultipleProList=data

                console.log( this.MultipleProList)

            },

            BatchIntroduction(){
              //批量引入
                //ScheduleList: [],//新建生产计划单数据



                this.MultipleProList.forEach(item => {
                    if (item.show != true) {
                        this.ScheduleList.push(item)
                        item.show = true
                    } else {
                        this.$message.error('同一条记录无法重复添加哦！');
                    }

                })

                //取消选中状态
                this.$refs.multipleTable.clearSelection();





            },
            selectable(row, index) {
                //判断是否可选
                if (row.show !== true) {
                    return true
                } else {
                    return false
                }
            },
            Introduce(data) {
                //工艺信息引入(单个)
                data.show = true
                this.ScheduleList.push(data)
            },
            addProductionBtn() {
                //新建生产计划单
                this.addProduction = true

            },
            ProcessIntroductionBtn() {
                //工艺信息引入按钮
                this.ProcessIntroduction = true
                this.PricessQuery()//工艺单信息查询
            },
            Processlistpag(val) {
                //工艺单分页
                this.pageNumQuery = val
                this.PricessQuery()
            },
            PricessQuery() {
                //工艺单分页查询

                this.$axios.get(this.$store.state.PricessQueryPage, {
                    params: {
                        pageSize: 10,
                        pageNum: this.pageNumQuery,
                        styleCode: this.styleCodeQuery,
                        merchantCode: this.merchantCodeQuery,
                        name: this.nameQuery,
                        category: this.categoryQuery
                    }
                }).then(res => {
                    this.ProcessList = res.data.list
                    this.totalRecordNum = res.data.totalRecord


                    /**
                     * 新建部分
                     * */
                    let materArr = this.ProcessList
                    let mArr = this.ScheduleList
                    let items = []
                    mArr.forEach(item => {
                        items.push(item.styleCode)
                    })
                    let list = materArr.filter(item => {
                        return items.indexOf(item.styleCode) != -1
                    });
                    list.forEach(item => {
                        item.show = true
                    })

                })
            },
        }


    }
</script>

<style scoped>
    .el-select, .el-input {
        width: 500px
    }
    .btnBox{
        text-align: right;
        margin-top: 0.5em;
    }

</style>