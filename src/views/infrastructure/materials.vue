<template>
    <div class="materials">
        <div class="leftmen">
            <!--左侧菜单分类-->

            <el-tree
                    :data="data"
                    :props="defaultProps"
                    highlight-current
                    node-key="id"
                    :default-expanded-keys="[1,1]"
                    @node-click="handleNodeClick"></el-tree>
        </div>

        <div class="rightdata">
            <!--新建与查询-->
            <div class="menuBox">
                <div>
                    <el-button size="mini" class="fontFamily hhtx-icon-test1" @click="dialogTableVisible=true">新建
                    </el-button>
                    <el-button size="mini" class="fontFamily hhtx-qiyong1">启用</el-button>
                    <el-button size="mini" class="fontFamily hhtx-jinyong1">禁用</el-button>
                    <el-button size="mini" class="fontFamily hhtx-shanchu">删除</el-button>
                </div>

                <div class="selsectInput">
                    <el-cascader
                            size="mini"
                            :options="options"
                            v-model="selectedOptions"
                            @change="supplierChange">
                    </el-cascader>
                    <!-- 搜索条件-->
                    <el-input size="mini" v-if="conditions" v-model="Queryconditions"></el-input>


                    <el-select size="mini" v-model="value" placeholder="状态">
                        <el-option
                                v-for="item in state"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-search" size="mini">查询</el-button>

                </div>

            </div>
            <!--右侧表格数据-->
            <el-table
                    style="width: 100%"
                    border
                    :height="MaxHeight"
                    highlight-current-row
                    @current-change="tablechoose">
                <el-table-column
                        type="index"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="编号"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="名称"
                        width="180"
                        align="center"
                ></el-table-column>
                <el-table-column
                        label="成分规格"
                        width="150"
                        align="center"
                ></el-table-column>
                <el-table-column
                        label="类型"
                        width="150"
                        align="center"
                ></el-table-column>
                <el-table-column
                        label="默认损耗"
                        width="150"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="品牌"
                        width="150"
                        align="center"
                ></el-table-column>
                <el-table-column
                        label="厂商"
                        width="150"
                        align="center"
                ></el-table-column>
                <el-table-column
                        label="基本单位"
                        width="120"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="起订量"
                        width="120"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="进货价"
                        width="120"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="备注"
                        width="120"
                        align="center"
                ></el-table-column>
            </el-table>
            <el-tag type="info" size="mini">
                <i :class="openIcon" @click="open"></i>
            </el-tag>
        </div>

        <!--添加-->
        <el-dialog title="新建物料" :visible.sync="dialogTableVisible">
            <el-form :model="addmaterial" ref="addmaterial" :inline="true" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="物料名称" prop="name">
                            <el-input size="mini" v-model="addmaterial.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="物料编码" prop="num">
                            <el-input size="mini" v-model="addmaterial.num"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="物料分类" prop="materials">
                            <el-cascader
                                    size="mini"
                                    :options="materialclassification"
                                    v-model="addmaterial.materials"
                                    @change="addclassification">
                            </el-cascader>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="默认损耗" prop="loss">
                            <el-input size="mini" type="number" v-model="addmaterial.loss" placeholder="%"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="厂商">
                            <el-select size="mini" v-model="value" placeholder="请选择">
                                <el-option
                                        v-for="item in vendor"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="成本价" prop="cost">
                            <el-input size="mini" type="number" v-model="addmaterial.cost" placeholder="元"></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="基本计量单位" prop="measurement">
                            <el-input size="mini" v-model="addmaterial.measurement" placeholder="双/盒"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="成份" prop="ingredients">
                            <el-input size="mini" v-model="addmaterial.ingredients"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="note">
                            <el-input size="mini" v-model="addmaterial.note"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col>
                        <el-form-item>
                            <el-button type="primary" size="mini" @click="submitForm('addmaterial')">立即创建</el-button>
                            <el-button size="mini" @click="dialogTableVisible=false">取消</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>


            </el-form>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "materials",
        data() {
            return {
                addmaterial: {
                    name: '',
                    num: '',
                    materials: [],//物料选择
                    cost: '',//成本价
                    loss: '',//损耗
                    measurement: '',//基本计量单位
                    ingredients: '',//成份
                    note: '',//备注
                    detection: '',//检测
                },
                rules: {
                    name: [
                        {required: true, message: '请输入物料名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在3到5个字符之间', trigger: 'blur'}
                    ],
                    num: [
                        {required: true, message: '请输入物料编码', trigger: 'blur'},
                    ],
                    materials: [
                        {required: true, message: '请选择物料', trigger: 'change'}
                    ],
                    loss: [
                        {required: true, message: '请输入默认损耗', trigger: 'blur'}
                    ],
                    measurement: [
                        {required: true, message: '请输入基本计量单位', trigger: 'blur'}
                    ]
                },
                conditions: true,//搜索条件
                data: [{
                    label: '全部',
                    children: [
                        {
                            label: '原材料',
                        },
                        {
                            label: '辅料',
                            children: [{
                                label: '包装'
                            }, {
                                label: '一般辅料'
                            }]
                        }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                options: [
                    {
                        label: '编码',
                        value: 'bianma',
                    },
                    {
                        label: '名称',
                        value: 'mingcheng'
                    },
                    {
                        value: 'zhinan',
                        label: '厂商',
                        children: [{
                            value: 'yizhi',
                            label: '一致'
                        }, {
                            value: 'fankui',
                            label: '反馈'
                        }, {
                            value: 'xiaolv',
                            label: '效率'
                        }, {
                            value: 'kekong',
                            label: '可控'
                        }]
                    }],
                materialclassification: [
                    {
                        label: '全部',
                        value: 'bianma',
                    },
                    {
                        value: 'fuliao',
                        label: '辅料',
                        children: [{
                            value: 'baozhuang',
                            label: '包装'
                        }, {
                            value: 'yibanfuliao',
                            label: '一般辅料'
                        }]
                    }],//新建物料分类
                selectedOptions: [],
                classification: [],
                state: [
                    {
                        value: '选项1',
                        label: '未启用'
                    }, {
                        value: '选项2',
                        label: '启用'
                    }],
                value: '',
                Queryconditions: '',
                MaxHeight: 300,//默认表格数据最大高度
                openIcon: 'fontFamily hhtx-zhankai',//默认为展开的按钮
                dialogTableVisible: false,//添加面板
                vendor: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                    }]//厂商
            }
        },
        methods: {
            submitForm(addmaterial) {
                /**
                 * 创建原料
                 * */
                this.$refs[addmaterial].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //展开按钮
            open() {
                let tableHeight = this.MaxHeight
                if (tableHeight == 900) {
                    this.openIcon = 'fontFamily hhtx-zhankai'
                    this.MaxHeight = 300
                } else {
                    this.openIcon = 'fontFamily hhtx-shouqi'
                    this.MaxHeight = 900
                }
            },
            addclassification(value) {
                /**
                 * 新建辅料选择
                 * */

                console.log(value);
                console.log(this.addmaterial.materials)
            },
            supplierChange(value) {
                /**
                 * 供应商选择
                 * */
                console.log(value);
                console.log(this.selectedOptions)

            },
            //树形空间选中后的回调
            handleNodeClick(data) {
                console.log(data);
            },
            //表格选中某行的回调
            tablechoose(data) {
                console.log(data)
            }
        }

    }
</script>

<style scoped>
    .materials {
        width: 98%;
        height: 100%;
        /*padding: 1%;*/
        display: flex;
        justify-content: space-around;
    }

    .leftmen {
        width: 12%;
        height: 100%;
        text-align: left;
        border: 1px solid #f8f8f8;
    }

    .rightdata {
        text-align: center;
        width: 88%;
        height: 100%;
    }

    .menuBox {
        display: flex;
        background-color: #f8f8f8;
        justify-content: space-between;
        align-items: center;
    }

    .selsectInput .el-input, .selsectInput .el-cascader .selsectInput .el-select {
        width: 150px;
    }
</style>