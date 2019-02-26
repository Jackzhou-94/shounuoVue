<template>
    <div class="goods">
        <div>
            <!--新建与查询-->
            <div class="menuBox">
                <div style="display: flex;justify-content: space-around">

                    <el-button size="mini" class="el-icon-plus" @click="addgoods=true">新建</el-button>

                    <el-button size="mini" class="el-icon-delete" @click="delgoodsfun">删除</el-button>

                    <el-button size="mini" class="el-icon-delete" @click="goodsrecycleopen">回收站</el-button>

                    <el-button icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>

                    <el-button size="mini" @click="printContent">打印</el-button>
                </div>


                <div>
                    <!--<el-input size="mini" placeholder="商家编码" v-model="querymerchantCode"></el-input>-->
                    <!--<el-input size="mini" placeholder="商品名称" v-model="queryname"></el-input>-->
                    <!--<el-input size="mini" placeholder="货品编号" v-model="queryitemCode"></el-input>-->
                    <!--<el-input size="mini" placeholder="盒装SKU" v-model="querysku"></el-input>-->
                    <!--<el-input size="mini" placeholder="其他" v-model="queryother"></el-input>-->
                    <el-row>
                        <el-col :span="3">
                            <el-input size="mini" placeholder="商家编码" v-model="querymerchantCode"></el-input>
                        </el-col>
                        <el-col :span="3">
                            <el-input size="mini" placeholder="商品名称" v-model="queryname"></el-input>
                        </el-col>
                        <el-col :span="3">
                            <el-input size="mini" placeholder="货品编号" v-model="queryitemCode"></el-input>
                        </el-col>
                        <el-col :span="3">
                            <el-input size="mini" placeholder="盒装SKU" v-model="querysku"></el-input>
                        </el-col>
                        <el-col :span="3">
                            <el-input size="mini" placeholder="其他" v-model="queryother"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="primary" size="mini"
                                       @click="queryother='',querysku='',queryitemCode='',queryname='',querymerchantCode=''">
                                重置
                            </el-button>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="queryGoods()">查询
                            </el-button>
                        </el-col>
                    </el-row>
                </div>


            </div>
        </div>

        <div>
            <el-table
                    id="aaa"
                    :data="quireGoodsData"
                    border
                    @selection-change="goodsSelection"
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
                        prop="merchantCode"
                        v-if="merchantCode"
                        label="商家编码"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        v-if="name"
                        label="商品名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="itemCode"
                        v-if="itemCode"
                        label="货品编号"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="type"
                        v-if="type"
                        label="分类"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="sku"
                        v-if="sku"
                        width="180"
                        label="盒装SKU">

                </el-table-column>
                <el-table-column
                        align="center"
                        prop="brand"
                        v-if="brand"
                        width="180"
                        label="品牌">
                </el-table-column>
                <el-table-column
                        align="center"
                        v-if="process"
                        prop="process"
                        width="180"
                        label="工艺流程">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="season"
                        v-if="season"
                        width="180"
                        label="季节">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="costPrice"
                        v-if="costPrice"
                        width="180"
                        label="商品成本价">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="unit"
                        v-if="unit"
                        width="180"
                        label="基本单位">
                </el-table-column>
                <el-table-column
                        align="center"
                        v-if="packag"
                        prop="packag"
                        width="180"
                        label="包装材料">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="weight"
                        v-if="weight"
                        width="180"
                        label="重量">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="barCode"
                        v-if="barCode"
                        width="180"
                        label="条形码">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="ingredients"
                        v-if="ingredients"
                        width="180"
                        label="面料成份">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="standard"
                        v-if="standard"
                        width="180"
                        label="执行工艺标准">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="remark"
                        v-if="remark"
                        width="180"
                        label="备注">
                </el-table-column>
                <el-table-column
                        align="center"
                        width="100"
                        label="操作"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="upgoodspanel(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            @current-change="goodslistpag"
                            :page-size="10"
                            layout="prev, pager, next, jumper"
                            :total="totalRecordNum">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>

        <!--新建商品信息-->
        <el-dialog
                title="新建商品信息"
                :visible.sync="addgoods"
                width="60%"
        >

            <el-form :model="addgoodsForm" ref="addgoodsForm" :rules="addgoodsrules" :inline="true">

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="商品名称" prop="name">
                            <el-input size="mini" v-model="addgoodsForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="盒装SKU" prop="sku">
                            <el-input size="mini" v-model="addgoodsForm.sku"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="条形码" prop="barCode">
                            <el-input size="mini" v-model="addgoodsForm.barCode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>



                    <el-col :span="8">
                        <el-form-item label="商家编码" prop="merchantCode">
                            <el-input size="mini" v-model="addgoodsForm.merchantCode"></el-input>
                        </el-form-item>
                    </el-col>


                    <el-col :span="8">
                        <el-form-item label="工艺流程" prop="process">
                            <el-input size="mini" v-model="addgoodsForm.process"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="品牌" prop="brand">
                            <el-input size="mini" v-model="addgoodsForm.brand"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="基本单位">
                            <el-input size="mini" v-model="addgoodsForm.unit"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="包装材料">
                            <el-input size="mini" v-model="addgoodsForm.packag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="面料成分">
                            <el-input size="mini" v-model="addgoodsForm.ingredients"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="分类">
                            <el-cascader
                                    size="mini"
                                    @change="Classificationchoice"
                                    :options="addgoodsclassification"
                                    :show-all-levels="false"
                            ></el-cascader>
                        </el-form-item>
                    </el-col>


                    <el-col :span="8">
                        <el-form-item label="重量">
                            <el-input size="mini" v-model="addgoodsForm.weight"></el-input>
                        </el-form-item>

                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="商品成本">
                            <el-input size="mini" v-model="addgoodsForm.costPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>


                    <el-col :span="8">
                        <el-form-item label="工艺标准">
                            <el-input size="mini" v-model="addgoodsForm.standard"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="季节">
                            <el-input size="mini" v-model="addgoodsForm.season"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注">
                            <el-input size="mini" v-model="addgoodsForm.remark"></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>
                <el-row>




                    <el-form-item>
                        <el-button size="mini" type="primary" @click="submitForm('addgoodsForm')">立即创建</el-button>
                        <el-button size="mini" @click="addgoods=false">取消</el-button>
                    </el-form-item>
                </el-row>
            </el-form>

        </el-dialog>
        <!--修改商品信息-->
        <el-dialog
                title="修改商品信息"
                :visible.sync="upgoods"
                width="60%"
        >
            <el-form :model="upgoodsForm" ref="upgoodsForm" :rules="upgoodsrules" :inline="true">

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="商品名称" prop="name">
                            <el-input size="mini" v-model="upgoodsForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="盒装SKU" prop="sku">
                            <el-input size="mini" v-model="upgoodsForm.sku"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="条形码" prop="barCode">
                            <el-input size="mini" v-model="upgoodsForm.barCode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>



                    <el-col :span="8">
                        <el-form-item label="商家编码" prop="merchantCode">
                            <el-input size="mini" v-model="upgoodsForm.merchantCode"></el-input>
                        </el-form-item>
                    </el-col>


                    <el-col :span="8">
                        <el-form-item label="工艺流程" prop="process">
                            <el-input size="mini" v-model="upgoodsForm.process"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="品牌" prop="brand">
                            <el-input size="mini" v-model="upgoodsForm.brand"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="基本单位">
                            <el-input size="mini" v-model="upgoodsForm.unit"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="包装材料">
                            <el-input size="mini" v-model="upgoodsForm.packag"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="面料成分">
                            <el-input size="mini" v-model="upgoodsForm.ingredients"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="分类">
                            <el-cascader
                                    size="mini"
                                    @change="Classificationchoice"
                                    :options="upgoodsclassification"
                                    :show-all-levels="false"
                            ></el-cascader>
                        </el-form-item>
                    </el-col>


                    <el-col :span="8">
                        <el-form-item label="重量">
                            <el-input size="mini" v-model="upgoodsForm.weight"></el-input>
                        </el-form-item>

                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="商品成本">
                            <el-input size="mini" v-model="upgoodsForm.costPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>


                    <el-col :span="8">
                        <el-form-item label="工艺标准">
                            <el-input size="mini" v-model="upgoodsForm.standard"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="季节">
                            <el-input size="mini" v-model="upgoodsForm.season"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注">
                            <el-input size="mini" v-model="upgoodsForm.remark"></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>
                <el-row>




                    <el-button size="mini" type="primary" @click="upsubmitForm('upgoodsForm')">立即修改</el-button>
                    <el-button size="mini" @click="upgoods=false">取消</el-button>
                </el-row>
            </el-form>


        </el-dialog>

        <!--回收站-->
        <el-dialog
                title="回收站"
                :visible.sync="goodsrecycle"
                width="80%"
        >
            <div style="display: flex;justify-content: flex-start;margin-bottom: 0.5em">
                <el-button size="mini" type="primary" @click="batchgoods">批量恢复</el-button>
                <el-input size="mini" placeholder="商家编码" v-model="querygoodsmerchantCode"></el-input>
                <el-input size="mini" placeholder="商品名称" v-model="querygoodsname"></el-input>
                <el-input size="mini" placeholder="其他" v-model="queryspare"></el-input>
                <el-button size="mini" type="primary"
                           @click="querygoodsmerchantCode='',querygoodsname='',queryspare=''">重置
                </el-button>
                <el-button size="mini" type="primary" @click="queryGoodsRecycle()">查询</el-button>

            </div>

            <el-table
                    :border="true"
                    :data="goodsrecycleData"
                    @selection-change="goodsSelection"
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
                        prop="merchantCode"
                        label="商家编码"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        label="商品名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="itemCode"
                        label="货品编号"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="type"
                        label="分类"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="sku"
                        width="180"
                        label="盒装SKU">

                </el-table-column>
                <el-table-column
                        align="center"
                        prop="brand"
                        width="180"
                        label="品牌">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="process"
                        width="180"
                        label="工艺流程">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="season"
                        width="180"
                        label="季节">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="costPrice"
                        width="180"
                        label="商品成本价">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="unit"
                        width="180"
                        label="基本单位">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="packag"
                        width="180"
                        label="包装材料">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="weight"
                        width="180"
                        label="重量">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="barCode"
                        width="180"
                        label="条形码">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="ingredients"
                        width="180"
                        label="面料成份">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="standard"
                        width="180"
                        label="执行工艺标准">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="remark"
                        width="180"
                        label="备注">
                </el-table-column>
                <el-table-column
                        align="center"
                        width="100"
                        label="操作"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="singlegoods(scope.row)">恢复</el-button>
                    </template>
                </el-table-column>
            </el-table>


            <!--分页-->
            <el-row :gutter="24">
                <el-col :span="12" :offset="12"></el-col>
                <el-col :span="12" :offset="12">
                    <el-pagination
                            @current-change="recycCurrentChange"
                            :page-size="recycpageSize"
                            layout="prev, pager, next, jumper"
                            :total="recyctotalRecord">
                    </el-pagination>
                </el-col>

            </el-row>


        </el-dialog>

        <!--显示设置-->
        <el-dialog
                title="显示设置"
                :visible.sync="Settings"
                width="30%"

        >
            <div style="text-align: left">
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="merchantCode">商家编码</el-checkbox>
                    </el-col>

                    <el-col :span="12">
                        <el-checkbox v-model="name">商品名称</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="itemCode">货品编号</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="type">分类</el-checkbox>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="sku">盒装SKU</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="brand">品牌</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="process">工艺流程</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="season">季节</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="costPrice">商品成本价</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="unit">基本单位</el-checkbox>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="packag">包装材料</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="weight">重量</el-checkbox>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="barCode">条形码</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="ingredients">面料成分</el-checkbox>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="standard">执行工艺标准</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="remark">备注</el-checkbox>
                    </el-col>
                </el-row>


            </div>

        </el-dialog>
    </div>


</template>

<script>
    export default {
        name: "goods",
        data() {
            return {
                queryname: '',//查询商品名称
                querysku: '',//查询盒装SKU
                queryitemCode: '',//查询货品编号
                querymerchantCode: '',//查询商家编码
                queryother: '',//查询其他
                quireGoodspagesize: 10,//商品信息分页大小
                quireGoodspageNum: 1,//商品信息分页页数
                quireGoodsData: [],//商品信息
                totalRecordNum: 0,//总条目数
                addgoods: false,//新建商品信息面板
                upgoods: false,//修改商品信息面板
                addgoodsForm: {
                    //新建商品信息表单数据
                    name: '',
                    sku: '',
                    merchantCode: '',//商家编码
                    brand: '',//品牌
                    process: '',//工艺流程
                    season: '',//季节
                    costPrice: '',//成本
                    unit: '',//基本单位
                    packag: '',//包装材料
                    weight: '',//重量
                    barCode: '',//条形码
                    ingredients: '',//面料成分
                    standard: '',//工艺标准
                    remark: '',//备注
                    type: '',//分类
                },
                addgoodsrules: {
                    //新建商品信息表单验证
                    name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur'}
                    ],
                    sku: [
                        {required: true, message: '请输入盒装SKU', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur'}
                    ],
                    brand: [
                        {required: true, message: '请输入品牌', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur'}
                    ],
                    process: [
                        {required: true, message: '请输入对应工艺流程', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur'}
                    ],
                    barCode: [
                        {required: true, message: '请输入条形码', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请输入条形码', trigger: 'change'},
                    ],
                    merchantCode: [
                        {required: true, message: '请输入商家编码', trigger: 'change'}
                    ]
                },
                addgoodsclassification: [
                    //新建商品信息分类
                    {
                        value: '商务袜',
                        label: '商务袜',
                        children: [
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
                            },
                        ]
                    },
                    {
                        value: '168针',
                        label: '168针',
                        children: [
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
                            },
                        ]
                    }, {
                        value: '53棉',
                        label: '53棉',
                        children: [
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
                            },
                        ]
                    }, {
                        value: '中筒',
                        label: '中筒',
                        children: [
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
                            },
                        ]
                    }
                ],


                upgoodsForm: {
                    //修改商品信息表单数据
                    name: '',
                    sku: '',
                    brand: '',//品牌
                    process: '',//工艺流程
                    season: '',//季节
                    costPrice: '',//成本
                    unit: '',//基本单位
                    packag: '',//包装材料
                    weight: '',//重量
                    barCode: '',//条形码
                    ingredients: '',//面料成分
                    standard: '',//工艺标准
                    remark: '',//备注
                    type: '',//分类
                },
                upgoodsrules: {
                    //修改商品信息表单验证
                    name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur'}
                    ],
                    sku: [
                        {required: true, message: '请输入盒装SKU', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur'}
                    ],
                    brand: [
                        {required: true, message: '请输入品牌', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur'}
                    ],
                    process: [
                        {required: true, message: '请输入对应工艺流程', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur'}
                    ],
                    barCode: [
                        {required: true, message: '请输入条形码', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请输入条形码', trigger: 'change'},
                    ],
                    merchantCode: [
                        {required: true, message: '请输入商家编码', trigger: 'change'}
                    ]
                },
                upgoodsclassification: [
                    //修改商品信息分类
                    {
                        value: '商务袜',
                        label: '商务袜',
                        children: [
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
                            },
                        ]
                    },
                    {
                        value: '168针',
                        label: '168针',
                        children: [
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
                            },
                        ]
                    }, {
                        value: '53棉',
                        label: '53棉',
                        children: [
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
                            },
                        ]
                    }, {
                        value: '中筒',
                        label: '中筒',
                        children: [
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
                            },
                        ]
                    }
                ],
                goodsids: [],//商品信息id
                goodsrecycle: false,//回收站面板
                goodsrecycleData: [],//回收站数据
                recyctotalRecord: 0,//回收站总条目数
                recycpageSize: 0,//回收站单页个数
                Settings: false,//显示设置面板
                /**
                 * 显示字段设置
                 * **/
                name: true,//商品名称
                sku: true,//盒装SKU
                itemCode: true,//货品编号
                merchantCode: true,//商家编码
                barCode: true,//条形码
                brand: true,//品牌
                costPrice: true,//商品成本价
                ingredients: true,//面料成分
                packag: true,//包装材料
                process: true,//对应工艺流程
                season: true,//季节
                remark: true,//备注
                standard: true,//执行工艺标准
                type: true,//分类
                unit: true,//基本单位
                weight: true,//重量

                querygoodsmerchantCode: '',//回收站查询商家编码
                querygoodsname: '',//回收站查询商品名称
                queryspare: '',//回收站查询其他
            }
        },
        methods: {
            printContent() {
                //打印模块
                let div_print = document.getElementById('aaa');
                let newstr = div_print.innerHTML;
                let oldstr = document.body.innerHTML;
                document.body.innerHTML = newstr;
                window.print();
                window.location.reload();
                return false
            },
            goodsrecycleopen() {
                //回收站点击事件
                this.goodsrecycle = true
                this.queryGoodsRecycle()
            },
            restoregoods() {
                //恢复回收站可用信息
                this.$axios.post(this.$store.state.goodsByOpen, {ids: this.goodsids}).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            onClose() {
                                location.reload()
                            }
                        });
                    } else {
                        this.$message.error('操作错误！');
                    }
                })
            },
            singlegoods(data) {
                //回收站单条恢复
                this.goodsids.length = 0
                this.goodsids.push(data.id)
                this.restoregoods()
            },
            batchgoods() {
                //批量恢复回收站数据
                this.restoregoods()
            },
            Classificationchoice(val) {
                //新建商品信息分类选择
                this.addgoodsForm.type = ''
                val.forEach(item => {
                    this.addgoodsForm.type += item
                })

            },
            UPificationchoice(val) {
                //修改商品信息分类选择
                this.upgoodsForm.type = ''
                val.forEach(item => {
                    this.upgoodsForm.type += item
                })

            },
            goodsSelection(val) {
                //商品信息多选
                this.goodsids.length = 0
                val.forEach(item => {
                    this.goodsids.push(item.id)
                })
                console.log(this.goodsids)
            },
            delgoodsfun() {
                //删除商品信息
                this.$axios.post(this.$store.state.delgoods, {ids: this.goodsids}).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            onClose() {
                                location.reload()
                            }
                        });
                    }
                    else {
                        this.$message.error('删除失败！');
                    }
                })
            },

            submitForm(addgoodsForm) {
                //新建商品信息
                this.$refs[addgoodsForm].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.$store.state.addgoods, this.addgoodsForm).then(res => {
                            console.log(res)
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success',
                                    onClose() {
                                        location.reload()
                                    }
                                });
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                    } else {
                        this.$message({
                            message: '信息填写不完全',
                            type: 'warning'
                        });
                    }
                });
            },

            upgoodspanel(data) {
                //打开修改信息面板
                this.upgoods = true
                this.upgoodsForm = data

            },

            upsubmitForm(upgoodsForm) {
                //修改商品信息
                this.$refs[upgoodsForm].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.$store.state.upgoods, this.upgoodsForm).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    onClose() {
                                        location.reload()
                                    }
                                });
                            }
                            else {
                                this.$message.error(res.data.msg);
                            }
                        })
                    } else {
                        this.$message({
                            message: '信息填写不完全',
                            type: 'warning'
                        });
                    }
                });
            },

            goodslistpag(val) {
                //商品信息分页
                this.quireGoodspageNum = val
                this.queryGoods()
            },
            recycCurrentChange(val) {
                //回收站分页

                this.queryGoodsRecycle(6, val)
            },


            queryGoodsRecycle(size = 6, page = 1) {
                //回收站信息分页查询
                this.$axios.get(this.$store.state.goodsqueryRecycle, {
                    params: {
                        pageSize: size,
                        pageNum: page,
                        merchantCode: this.querygoodsmerchantCode,
                        name: this.querygoodsname,
                        spare02: this.queryspare
                    }
                }).then(res => {
                    this.goodsrecycleData = res.data.list
                    this.recyctotalRecord = res.data.totalRecord
                    this.recycpageSize = res.data.pageSize
                })
            },

            queryGoods() {
                //商品信息分页查询
                this.$axios.get(this.$store.state.goodsmessage,
                    {
                        params:
                            {
                                pageSize: this.quireGoodspagesize, pageNum: this.quireGoodspageNum,
                                name: this.queryname, sku: this.querysku,
                                itemCode: this.queryitemCode, merchantCode: this.querymerchantCode,
                                spare02: this.queryother
                            }
                    }).then(res => {
                    this.quireGoodsData = res.data.list
                    this.totalRecordNum = res.data.totalRecord
                    console.log(res.data.list)
                })
            },

        },
        created: function () {
            this.queryGoods()

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

    .goods {
        width: 100%;
        height: 100%;
        /*padding: 1%;*/
        /*display: flex;*/
        /*justify-content: space-around;*/

    }


</style>