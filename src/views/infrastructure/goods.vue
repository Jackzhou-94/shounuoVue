<template>
    <div class="goods">
        <div>
            <!--新建与查询-->
            <div class="menuBox">
                <div>
                    <el-button size="mini" class="el-icon-plus" @click="addgoods=true">新建</el-button>
                    <el-button size="mini" class="el-icon-delete">删除</el-button>
                    <el-button size="mini" class="el-icon-delete">回收站</el-button>
                </div>
            </div>
        </div>

        <div>
            <el-table
                    :data="quireGoodsData"
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
                    <el-col :span="12">
                        <el-form-item label="商品名称" prop="name">
                            <el-input v-model="addgoodsForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="盒装SKU" prop="sku">
                            <el-input v-model="addgoodsForm.sku"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>


                    <el-col :span="12">
                        <el-form-item label="条形码" prop="barCode">
                            <el-input v-model="addgoodsForm.barCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工艺流程" prop="process">
                            <el-input v-model="addgoodsForm.process"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>


                    <el-col :span="12">
                        <el-form-item label="分类">
                            <el-cascader
                                    @change="Classificationchoice"
                                    :options="addgoodsclassification"
                                    :show-all-levels="false"
                            ></el-cascader>
                        </el-form-item>
                    </el-col>




                    <el-col :span="12">
                        <el-form-item label="品牌" prop="brand">
                            <el-input v-model="addgoodsForm.brand"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="基本单位">
                            <el-input v-model="addgoodsForm.unit"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="包装材料">
                            <el-input v-model="addgoodsForm.packag"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>

                    <el-col :span="12">
                        <el-form-item label="面料成分">
                            <el-input v-model="addgoodsForm.ingredients"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商品成本">
                            <el-input v-model="addgoodsForm.costPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>


                    <el-col :span="12">
                        <el-form-item label="工艺标准">
                            <el-input v-model="addgoodsForm.standard"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="季节">
                            <el-input v-model="addgoodsForm.season"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注">
                            <el-input v-model="addgoodsForm.remark"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="重量">
                            <el-input v-model="addgoodsForm.weight"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-form-item>
                        <el-button size="mini" type="primary" @click="submitForm('addgoodsForm')">立即创建</el-button>
                        <el-button size="mini"  @click="addgoods=false">取消</el-button>
                    </el-form-item>
                </el-row>
            </el-form>

        </el-dialog>


    </div>


</template>

<script>
    export default {
        name: "goods",
        data() {
            return {
                quireGoodspagesize: 10,//商品信息分页大小
                quireGoodspageNum: 1,//商品信息分页页数
                quireGoodsData: [],//商品信息
                totalRecordNum: 0,//总条目数
                addgoods: false,//新建商品信息面板
                addgoodsForm: {
                    //新建商品信息表单数据
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
                    type:'',//分类
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

                    ]
                },
                addgoodsclassification: [
                    //新建商品信息分类
                    {
                        value: '商务袜',
                        label: '商务袜',
                        children:[
                            {value:'中筒',
                            label:'中筒'},
                            {value:'短袜',
                                label:'短袜'},
                            {value:'隐形袜',
                                label:'隐形袜'},
                            {value:'船袜',
                                label: '船袜'
                            },
                        ]
                    },
                    {
                        value: '168针',
                        label: '168针',
                        children:[
                            {value:'中筒',
                                label:'中筒'},
                            {value:'短袜',
                                label:'短袜'},
                            {value:'隐形袜',
                                label:'隐形袜'},
                            {value:'船袜',
                                label: '船袜'
                            },
                        ]
                    }, {
                        value: '53棉',
                        label: '53棉',
                        children:[
                            {value:'中筒',
                                label:'中筒'},
                            {value:'短袜',
                                label:'短袜'},
                            {value:'隐形袜',
                                label:'隐形袜'},
                            {value:'船袜',
                                label: '船袜'
                            },
                        ]
                    },{
                        value: '中筒',
                        label: '中筒',
                        children:[
                            {value:'中筒',
                                label:'中筒'},
                            {value:'短袜',
                                label:'短袜'},
                            {value:'隐形袜',
                                label:'隐形袜'},
                            {value:'船袜',
                                label: '船袜'
                            },
                        ]
                    }
                ]
            }
        },
        methods: {
            Classificationchoice(val){
                this.addgoodsForm.type=''
                val.forEach(item=>{
                    this.addgoodsForm.type+=item
                })

            },
            //新建商品信息
            submitForm(addgoodsForm) {
                this.$refs[addgoodsForm].validate((valid) => {
                    if (valid) {
                       this.$axios.post(this.$store.state.addgoods,this.addgoodsForm).then(res=>{
                            console.log(res)
                           if (res.data.code==200){
                               this.$message({
                                   message: '添加成功',
                                   type: 'success',
                                   onClose() {
                                       location.reload()
                                   }
                               });
                           }else {
                               this.$message.error('添加失败！');
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
            //分类选择
            // ClassificationChoice(val){
            //     this.addgoodsForm.type=''
            //     val.forEach(item=>{
            //         this.addgoodsForm.type+=item
            //     })
            //
            // },
            //商品信息分页
            goodslistpag(val) {
                console.log(val)
                this.quireGoodspageNum = val
                this.queryGoods()
            },
            //商品信息分页查询
            queryGoods() {
                this.$axios.get(this.$store.state.goodsmessage,
                    {params: {pageSize: this.quireGoodspagesize, pageNum: this.quireGoodspageNum}}).then(res => {
                    this.quireGoodsData = res.data.list
                    this.totalRecordNum = res.data.totalRecord
                    console.log(res.data)
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