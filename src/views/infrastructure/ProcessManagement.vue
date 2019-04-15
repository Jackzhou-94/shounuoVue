<template>
    <div class="ProcessManagement">

        <div style="display:flex;flex-wrap: nowrap;justify-content: left;margin-bottom: 0.5em">
            <el-button size="mini" type="primary" class="el-icon-plus" @click="addprocess=true">新建</el-button>

        </div>
        <div class="selectBox">

            <div style="display: flex;flex-wrap: nowrap;">
                <el-input clearable size="mini" placeholder="款式编号"></el-input>
                <el-input clearable size="mini" placeholder="商家编码"></el-input>
                <el-input clearable size="mini" placeholder="名称"></el-input>

                <el-select size="mini" clearable v-model="category" placeholder="类别">
                    <el-option
                            v-for="item in categorySelect"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>

                <el-select size="mini" clearable v-model="selectState" placeholder="状态">
                    <el-option
                            v-for="item in SelectOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>

            <div style="display: flex;flex-wrap: nowrap;">
                <el-button type="primary" size="mini">重置</el-button>

                <el-button type="primary" size="mini" icon="el-icon-search">查询</el-button>
            </div>


        </div>

        <!--新建工艺单-->
        <el-dialog
                width="1100px"
                title="新建工艺单" :visible.sync="addprocess" :show-close="false"
        >
            <el-form style="text-align: left" :model="addprocessData" ref="addprocessData" :rules="addprocessrules"
                     label-width="100px" label-position="right">

                <div style="display: flex;flex-wrap: nowrap">
                    <el-form-item label="工艺名称" prop="name">
                        <el-input size="mini" v-model="addprocessData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="商家编码" prop="merchantCode">
                        <el-input size="mini" v-model="addprocessData.merchantCode" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="品牌" prop="brand">
                        <el-input size="mini" v-model="addprocessData.brand"></el-input>
                    </el-form-item>
                    <el-form-item label="类别" prop="category">
                        <el-select size="mini" clearable v-model="addprocessData.category" placeholder="类别">
                            <el-option
                                    v-for="item in categorySelect"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>


                    </el-form-item>

                </div>

                <div style="display: flex;flex-wrap: nowrap">
                    <el-form-item label="颜色">
                        <el-input size="mini" v-model="addprocessData.colour"></el-input>
                    </el-form-item>
                    <el-form-item label="工艺设置" prop="processNode">
                        <el-select style="width: 300px" placeholder="请选择" size="mini" multiple
                                   v-model="addprocessData.processNode">
                            <el-option
                                    v-for="item in ProcessFunction"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>


            <el-tabs  v-model="activeName">
                <el-tab-pane label="新品管理" name="first">
                    <div style="text-align: left">

                    <el-button size="mini" @click="addGoods">添加新品</el-button>

                    <el-table
                            :data="addprocessData.goodsList"
                            border
                            stripe
                            style="width: 100%">


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
                                prop="remark"
                                v-if="remark"
                                width="180"
                                label="备注">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                fixed="right"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="rmGoods(scope.row)">移除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>


                </div>
                </el-tab-pane>
                <el-tab-pane label="原材料管理" name="second">配置管理</el-tab-pane>

            </el-tabs>






        </el-dialog>


        <!--添加商品面板-->
        <el-dialog
                width="1100px"
                title="添加商品" :visible.sync="addGoodsPanel" :show-close="false"
        >
            <div style="display: flex;justify-content: left;flex-wrap: nowrap;margin-bottom: 0.5em">
                <el-button icon="el-icon-view" type="primary" size="mini" @click="Settings=true">显示设置</el-button>
                <el-button type="primary" size="mini"
                           @click="queryother='',querysku='',queryitemCode='',queryname='',querymerchantCode=''">
                    重置
                </el-button>

                <el-button type="primary" size="mini" icon="el-icon-search" @click="queryGoods()">查询
                </el-button>

            </div>
            <div style="display: flex;justify-content: space-around">

                <el-input size="mini" placeholder="商家编码" v-model="querymerchantCode"></el-input>

                <el-input size="mini" placeholder="商品名称" v-model="queryname"></el-input>

                <el-input size="mini" placeholder="货品编号" v-model="queryitemCode"></el-input>

                <el-input size="mini" placeholder="盒装SKU" v-model="querysku"></el-input>

                <el-input size="mini" placeholder="其他" v-model="queryother"></el-input>

            </div>

            <el-table
                    :data="quireGoodsData"
                    border
                    stripe
                    height="360px"
                    style="width: 100%">

                <el-table-column
                        align="center"
                        type="index"
                        width="50">
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
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="introductionGoods(scope.row)">引入</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            @current-change="goodslistpag"
                            :page-size="5"
                            layout="prev, pager, next, jumper"
                            :total="totalRecordNum">
                    </el-pagination>
                </el-col>
            </el-row>


        </el-dialog>

        <!--添加商品显示设置-->
        <el-dialog
                title="显示设置"
                :visible.sync="Settings"
                width="450px"
                :show-close="false"

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
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="createTime">创建时间</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="updateTime">修改时间</el-checkbox>
                    </el-col>

                </el-row>

            </div>

        </el-dialog>

        <el-table
                border
                height="750px"
                stripe
                style="width: 100%"
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
                    align="center">
            </el-table-column>
            <el-table-column
                    label="商家编码"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="颜色"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="流程节点"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="工艺名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="品牌"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="类别"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="启用状态"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    export default {
        name: "ProcessManagement",
        data() {
            return {
                addprocess: false,//新建工艺单面板
                processSet: false,//流程节点设置面板
                addprocessData: {
                    merchantCode: '',//商家编码
                    colour: '',//颜色
                    processFlow: '',//工艺流程（用于展示）
                    processNode: [],//流程节点
                    name: '',//工艺名称
                    brand: '',//品牌
                    category: '',//类别
                    goodsList: [],//商品信息
                },//新建工艺单数据
                addprocessrules: {
                    name: [
                        {required: true, message: '请输入物料名称', trigger: 'blur'},
                    ],
                    merchantCode: [
                        {required: true, message: '还未引入对应商品信息', trigger: 'blur'},
                    ],
                    brand: [
                        {required: true, message: '请选择品牌', trigger: 'blur'},
                    ],
                    category:[
                        {required: true, message: '请选择类别', trigger: 'change'}
                    ],
                    processNode: [
                        {required: true, message: '请选择工艺设置', trigger: 'change'},
                    ],
                },//新建工艺单表单验证
                categorySelect: [
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
                category: [],//搜素类别
                selectState: '',//搜素状态
                SelectOptions: [{
                    label: '启用',
                    value: '1',
                }, {
                    label: '停用',
                    value: '2',
                }],
                ProcessFunction: [
                    //工艺职能
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
                addGoodsPanel: false,//添加商品面板
                /**
                 * 商品信息数据
                 * */
                queryname: '',//查询商品名称
                querysku: '',//查询盒装SKU
                queryitemCode: '',//查询货品编号
                querymerchantCode: '',//查询商家编码
                queryother: '',//查询其他
                Settings: false,//商品信息显示设置
                quireGoodspagesize: 5,//商品信息分页大小
                quireGoodspageNum: 1,//商品信息分页页数
                quireGoodsData: [],//商品信息
                totalRecordNum: 0,//总条目数
                activeName:'first',//tabs默认页

                /**
                 * 商品信息显示字段设置
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
                createTime: true,//创建时间
                updateTime: true,//修改时间
            }
        },
        methods: {
            introductionGoods(data) {
                //引入商品信息
                this.addprocessData.goodsList.length = 0;
                this.addprocessData.merchantCode = data.merchantCode
                this.addGoodsPanel = false
                this.addprocessData.goodsList.push(data)
                // this.addprocessData.goodsList
            },
            rmGoods() {
                //移除商品信息
                this.addprocessData.goodsList=[];
            },
            goodslistpag(val) {
                //商品信息分页
                this.quireGoodspageNum = val
                this.queryGoods()
            },
            addGoods() {
                //新建工艺单添加商品按钮
                this.addGoodsPanel = true
                this.queryGoods()
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
                                other: this.queryother
                            }
                    }).then(res => {
                    this.quireGoodsData = res.data.list
                    this.totalRecordNum = res.data.totalRecord
                    console.log(res.data.list)
                })
            },
        }
    }
</script>

<style scoped>
    .selectBox {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5em;

    }

    .selectBox .el-input {
        width: 200px;

    }
</style>