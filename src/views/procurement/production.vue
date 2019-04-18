<template>
    <div class="production">
        <div class="menuBox">
            <div class="QueryConditions">
                <el-button size="mini" type="primary" class="el-icon-plus">新建</el-button>
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
            }
        }


    }
</script>

<style scoped>
    .el-select, .el-input {
        width: 500px
    }

</style>