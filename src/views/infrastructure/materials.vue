<template>
    <div class="materials">
        <div class="leftmen">
            <!--左侧菜单分类-->

            <el-tree
                    :data="data"
                    :props="defaultProps"
                    highlight-current
                    node-key="id"
                    :default-expanded-keys="[1, 3]"
                    @node-click="handleNodeClick"></el-tree>
        </div>

        <div class="rightdata">
            <!--新建与查询-->
            <div class="menuBox">
                <div>
                    <el-button size="mini" class="fontFamily hhtx-icon-test1" @click="dialogTableVisible=true">新建
                    </el-button>
                    <el-button size="mini" class="fontFamily hhtx-qiyong1" @click="Delmateropen">启用</el-button>
                    <el-button size="mini" class="fontFamily hhtx-jinyong1">禁用</el-button>
                    <el-button size="mini" class="fontFamily hhtx-xiugai1" @click="UpdatableVisible=true">修改</el-button>
                    <el-button size="mini" class="fontFamily hhtx-shanchu" @click="delmaterials">删除</el-button>
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


                    <el-select size="mini" v-model="value" placeholder="状态" @change="spareSelect">
                        <el-option
                                v-for="item in state"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" icon="el-icon-delete" size="mini" @click="reset">重置</el-button>
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="queryMaterials">查询</el-button>
                    <el-button type="primary" icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>


                    <el-dialog
                            title="显示设置"
                            :visible.sync="Settings"
                            width="30%"

                    >

                        <!--<el-tree-->
                        <!--:data="menu"-->
                        <!--show-checkbox-->
                        <!--node-key="id"-->
                        <!--@check="selectmenu"-->
                        <!--:props="defaultProps">-->
                        <!--</el-tree>-->
                        <div style="text-align: left">
                            <el-row>
                                <el-col :span="12">
                                    <el-checkbox v-model="materialCode">物料编号</el-checkbox>
                                </el-col>

                                <el-col :span="12">
                                    <el-checkbox v-model="name">物料名称</el-checkbox>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="12">
                                    <el-checkbox v-model="ingredients">成分规格</el-checkbox>
                                </el-col>
                                <el-col :span="12">
                                    <el-checkbox v-model="type">物料分类</el-checkbox>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="12">
                                    <el-checkbox v-model="zhuangtai">状态</el-checkbox>
                                </el-col>
                                <el-col :span="12">
                                    <el-checkbox v-model="defaultLoss">默认损耗</el-checkbox>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="12">
                                    <el-checkbox v-model="manufacturer">厂商</el-checkbox>
                                </el-col>
                                <el-col :span="12">
                                    <el-checkbox v-model="unit">基本计量单位</el-checkbox>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="12">
                                    <el-checkbox v-model="costPrice">成本价</el-checkbox>
                                </el-col>
                            </el-row>
                            <el-col :span="12">
                                <el-checkbox v-model="note">备注</el-checkbox>
                            </el-col>
                        </div>


                        <span slot="footer" class="dialog-footer">
     <el-button @click="Settings = false">取 消</el-button>
     <el-button type="primary" @click="Settings = false">确 定</el-button>
    </span>
                    </el-dialog>


                </div>

            </div>
            <!--右侧表格数据-->
            <el-table
                    style="width: 100%"
                    border
                    :data="materialsList"
                    :row-class-name="tableRowClassName"
                    :height="MaxHeight"
                    highlight-current-row
                    @selection-change="handleSelectionChange"
                    @current-change="tablechoose">
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column
                        type="index"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="materialCode"
                        label="物料编号"
                        prop="materialCode"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="name"
                        label="物料名称"
                        prop="name"
                        width="200"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="ingredients"
                        prop="ingredients"
                        label="成分规格"
                        width="180"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="type"
                        label="物料分类"
                        prop="type"
                        width="180"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="zhuangtai"
                        label="状态"
                        width="180"
                        align="center"
                >
                    <template slot-scope="scope">
                        {{scope.row.spare=='01'?'启用':'未启用'}}
                    </template>
                </el-table-column>
                <el-table-column
                        v-if="defaultLoss"
                        label="默认损耗"
                        prop="defaultLoss"
                        width="160"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="manufacturer"
                        label="厂商"
                        prop="manufacturer"
                        width="180"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="unit"
                        label="基本计量单位"
                        prop="unit"
                        width="150"
                        align="center"
                        sortable
                ></el-table-column>
                <!--<el-table-column-->
                <!--label="起订量"-->
                <!--width="120"-->
                <!--align="center"-->
                <!--sortable-->
                <!--&gt;</el-table-column>-->
                <el-table-column
                        v-if="costPrice"
                        label="成本价"
                        prop="costPrice"
                        width="120"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="note"
                        label="备注"
                        prop="note"
                        width="150"
                        align="center"
                ></el-table-column>
            </el-table>
            <!--分页-->
            <el-row :gutter="24">
                <el-col :span="8" :offset="8"></el-col>
                <el-col :span="8" :offset="8">
                    <el-tag type="info" size="mini">
                        <i :class="openIcon" @click="open"></i>
                    </el-tag>
                </el-col>
                <el-col :span="8">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :page-size="pageSize"
                            layout="prev, pager, next, jumper"
                            :total="totalRecord">
                    </el-pagination>
                </el-col>

            </el-row>
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
                        <el-form-item label="物料编码" prop="materialCode">
                            <el-input size="mini" v-model="addmaterial.materialCode"></el-input>
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
                        <el-form-item label="默认损耗" prop="defaultLoss">
                            <el-input size="mini" type="number" v-model="addmaterial.defaultLoss"
                                      placeholder="%"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="厂商">
                            <el-select size="mini" v-model="value" placeholder="请选择" @change="selectChange">
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
                            <el-input size="mini" type="number" v-model="addmaterial.costPrice"
                                      placeholder="元"></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="基本计量单位" prop="unit">
                            <el-input size="mini" v-model="addmaterial.unit" placeholder="双/盒"></el-input>
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


        <!--修改-->
        <el-dialog title="修改物料信息" :visible.sync="UpdatableVisible">
            <el-form :model="updaData" ref="updaData" :inline="true" :rules="ruless" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="物料名称" prop="name">
                            <el-input size="mini" v-model="updaData.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="物料编码" prop="materialCode">
                            <el-input size="mini" v-model="updaData.materialCode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="12">
                        <el-form-item label="物料分类" prop="materials">
                            <el-cascader
                                    size="mini"
                                    :options="materialclassification"
                                    v-model="updaData.materials"
                                    @change="addclassification">
                            </el-cascader>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="默认损耗" prop="defaultLoss">
                            <el-input size="mini" type="number" v-model="updaData.defaultLoss"
                                      placeholder="%"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="12">
                        <el-form-item label="厂商">
                            <el-select size="mini" v-model="value" placeholder="请选择" @change="selectChange">
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
                            <el-input size="mini" type="number" v-model="updaData.costPrice"
                                      placeholder="元"></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="基本计量单位" prop="unit">
                            <el-input size="mini" v-model="updaData.unit" placeholder="双/盒"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="成份" prop="ingredients">
                            <el-input size="mini" v-model="updaData.ingredients"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="note">
                            <el-input size="mini" v-model="updaData.note"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col>
                        <el-form-item>
                            <el-button type="primary" @click="upsubmitForm('updaData')">立即修改</el-button>
                            <el-button size="mini" @click="UpdatableVisible=false">取消</el-button>
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
                UpdatableVisible: false,//修改面板
                materialsList: [],//原材料数据
                totalPage: 0,//总页数
                pageSize: 0,//单页个数
                totalRecord: 0,//总条数
                addmaterial: {
                    //新建物料
                    name: '',
                    materialCode: '',//物料编码
                    type: '',//物料选择
                    costPrice: '',//成本价
                    defaultLoss: '',//损耗
                    unit: '',//基本计量单位
                    ingredients: '',//成份
                    manufacturer: '',//厂商
                    note: '',//备注
                    detection: '',//检测
                },
                updaData: {
                    //修改
                    name: '',
                    materialCode: '',//物料编码
                    type: '',//物料选择
                    costPrice: '',//成本价
                    defaultLoss: '',//损耗
                    unit: '',//基本计量单位
                    ingredients: '',//成份
                    manufacturer: '',//厂商
                    note: '',//备注
                    detection: '',//检测
                },

                rules: {
                    name: [
                        {required: true, message: '请输入物料名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在3到5个字符之间', trigger: 'blur'}
                    ],
                    materialCode: [
                        {required: true, message: '请输入物料编码', trigger: 'blur'},
                    ],
                    materials: [
                        {required: true, message: '请选择物料', trigger: 'change'}
                    ],
                    defaultLoss: [
                        {required: true, message: '请输入默认损耗', trigger: 'blur'}
                    ],
                    unit: [
                        {required: true, message: '请输入基本计量单位', trigger: 'blur'}
                    ]
                },
                ruless: {
                    name: [
                        {required: true, message: '请输入物料名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在3到5个字符之间', trigger: 'blur'}
                    ],
                    materialCode: [
                        {required: true, message: '请输入物料编码', trigger: 'blur'},
                    ],
                    materials: [
                        {required: true, message: '请选择物料', trigger: 'change'}
                    ],
                    defaultLoss: [
                        {required: true, message: '请输入默认损耗', trigger: 'blur'}
                    ],
                    unit: [
                        {required: true, message: '请输入基本计量单位', trigger: 'blur'}
                    ]
                },
                conditions: true,//搜索条件
                data: [{
                    label: '全部',
                    id: 1,
                    children: [
                        {
                            id: 2,
                            label: '原材料',
                        },
                        {
                            id: 3,
                            label: '辅料',
                            children: [{
                                id: 4,
                                label: '包装'
                            }, {
                                id: 5,
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
                        value: 'name'
                    },
                    {
                        value: 'manufacturer',
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
                        value: '全部',
                    },
                    {
                        value: '辅料',
                        label: '辅料',
                        children: [{
                            value: '包装',
                            label: '包装'
                        }, {
                            value: '一般辅料',
                            label: '一般辅料'
                        }]
                    }],//新建物料分类
                selectedOptions: [],
                classification: [],
                state: [
                    {
                        value: '02',
                        label: '未启用'
                    }, {
                        value: '01',
                        label: '启用'
                    }],
                value: '',
                Queryconditions: '',//查询具体值
                MaxHeight: 600,//默认表格数据最大高度
                openIcon: 'fontFamily hhtx-zhankai',//默认为展开的按钮
                dialogTableVisible: false,//添加面板
                vendor: [
                    {
                        value: '黄金糕',
                        label: '黄金糕'
                    }, {
                        value: '双皮奶',
                        label: '双皮奶'
                    }, {
                        value: '蚵仔煎',
                        label: '蚵仔煎'
                    }, {
                        value: '龙须面',
                        label: '龙须面'
                    }, {
                        value: '北京烤鸭',
                        label: '北京烤鸭'
                    }],//厂商
                selsetType: '全部',//树形控件默认选择原料，辅料，
                QueryField: '',//查询字段
                spare: '',//状态
                materialsIDs: '',//原材料ID


                //物料编号
                materialCode: true,
                //物料名称
                name: true,
                //成分规格
                ingredients: true,
                //物料分类
                type: true,
                ////状态
                zhuangtai: true,
                //默认损耗
                defaultLoss: true,
                //厂商
                manufacturer: true,
                //基本计量单位
                unit: true,
                //成本价
                costPrice: true,
                //备注
                note: true,
                //设置菜单显示隐藏
                menu: [
                    {
                        id: this.materialCode,
                        label: '物料编号',
                    },
                    {
                        id: this.name,
                        label: '物料名称',
                    },
                    {
                        id: this.ingredients,
                        label: '成分规格',
                    },
                    {
                        id: this.type,
                        label: '物料分类',
                    },
                    {
                        id: this.zhuangtai,
                        label: '状态',
                    }, {
                        id: this.defaultLoss,
                        label: '默认损耗',
                    },
                    {
                        id: this.manufacturer,
                        label: '厂商',
                    },
                    {
                        id: this.unit,
                        label: '基本计量单位',
                    },
                    {
                        id: this.costPrice,
                        label: '成本价',
                    },
                    {
                        id: this.note,
                        label: '备注',
                    },
                ],
                Settings: false,//显示设置面板
                delmaterID: [],//原材料启用停用

            }
        },
        methods: {
            //修改原材料信息
            upsubmitForm(updaData) {
                this.$refs[updaData].validate((valid) => {
                    if (valid) {
                        let data = {
                            id: this.updaData.id,//原材料ID
                            name: this.updaData.name,
                            materialCode: this.updaData.materialCode,//物料编码
                            type: this.updaData.type,//物料选择
                            costPrice: this.updaData.costPrice,//成本价
                            defaultLoss: this.updaData.defaultLoss,//损耗
                            unit: this.updaData.unit,//基本计量单位
                            ingredients: this.updaData.ingredients,//成份
                            manufacturer: this.updaData.manufacturer,//厂商
                            note: this.updaData.note//备注
                        }
                        this.$axios.post(this.$store.state.upmaterial, data).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.UpdatableVisible = false
                            } else {
                                this.$message.error('修改失败');
                            }
                        })

                    } else {
                        this.$message({
                            message: '数据填写不完全',
                            type: 'warning'
                        })
                        return false;
                    }
                });
            },
            //表格选中某行的回调
            tablechoose(data) {
                this.updaData = data
                console.log(this.updaData)
            },

            Delmateropen() {
                /**
                 * 原材料启用
                 * */
                console.log(this.delmaterID)
                this.$axios.post(this.$store.state.delmateropen, {
                    ids: this.delmaterID
                }).then(res => {
                    console.log(res)
                })
            },
            selectmenu(keys, a) {
                console.log(keys)
                console.log(a)
                //  let data = a.checkedKeys
                // console.log(data)
                //  console.log(a)
                //  a.checkedKeys[0]=false
                // this.materialCode=false
                //  console.log(this.materialCode)

            },
            delmaterials() {
                /**
                 * 根据ID删除原材料信息*/
                this.$axios.get(this.$store.state.delmaterials, {
                    params: {ids: this.materialsIDs}
                }).then(res => {
                    console.log(res.data)
                })
            },
            handleSelectionChange(val) {
                /**
                 * 多选
                 * */
                //将每项选择的id保存
                this.delmaterID.length = 0
                val.forEach(item => {
                    this.delmaterID.push(item.id)
                })

                this.materialsIDs = ''
                val.forEach(item => {
                    this.materialsIDs += `${item.id},`
                })
                let a = this.materialsIDs.length - 1
                this.materialsIDs = this.materialsIDs.substring(0, a)
            },
            //数据未启用高亮颜色
            tableRowClassName({row, rowIndex}) {
                if (row.spare == '02') {
                    return 'success-row';
                }
                return ''
            },
            spareSelect(val) {
                /**
                 * 状态查询
                 * */
                this.spare = val
            },
            reset() {
                /**
                 * 搜索重置
                 * */
                this.Queryconditions = ''
                this.QueryField = ''

            },
            queryMaterials() {
                /**
                 * 查询
                 * */
                this.queryPage(1, 10, this.selsetType, this.Queryconditions, this.spare)
            },
            handleCurrentChange(val) {
                /**
                 * 分页
                 * */
                this.queryPage(val, 10, this.selsetType, this.Queryconditions, this.spare)
            },
            selectChange(val) {
                /**
                 * 选择厂商
                 * */
                this.addmaterial.manufacturer = val
                console.log(this.addmaterial)
            },
            //新建物料
            submitForm(addmaterial) {

                /**
                 * 创建原料
                 * */
                this.$refs[addmaterial].validate((valid) => {
                    if (valid) {
                        let data = {
                            name: this.addmaterial.name,
                            materialCode: this.addmaterial.materialCode,//物料编码
                            type: this.addmaterial.type,//物料选择
                            costPrice: this.addmaterial.costPrice,//成本价
                            defaultLoss: this.addmaterial.defaultLoss,//损耗
                            unit: this.addmaterial.unit,//基本计量单位
                            ingredients: this.addmaterial.ingredients,//成份
                            manufacturer: this.addmaterial.manufacturer,//厂商
                            note: this.addmaterial.note//备注
                        }
                        this.$axios.post(this.$store.state.addmaterial, data).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.dialogTableVisible = false
                            } else {
                                this.$message.error('添加失败');
                            }
                        })

                    } else {
                        this.$message({
                            message: '数据填写不完全',
                            type: 'warning'
                        })
                        return false;
                    }
                });
            },

            //展开按钮
            open() {
                let tableHeight = this.MaxHeight
                if (tableHeight == 600) {
                    this.openIcon = 'fontFamily hhtx-zhankai'
                    this.MaxHeight = 300
                } else {
                    this.openIcon = 'fontFamily hhtx-shouqi'
                    this.MaxHeight = 600
                }
            },
            addclassification(value) {
                /**
                 * 新建辅料选择
                 * */
                this.addmaterial.type = ''
                value.forEach(item => {
                    this.addmaterial.type += `${item}/`
                })
                console.log(this.addmaterial.type);
                // console.log(this.addmaterial.materials)
            },

            supplierChange(value) {
                /**
                 * 供应商查询选择
                 * */
                this.QueryField = value[0]
                if (value[0] != 'bianma' && value[0] != 'name') {
                    this.conditions = false
                } else {
                    this.conditions = true
                }
            },
            //树形空间选中后的回调
            handleNodeClick(data) {
                this.selsetType = data.label
                this.queryPage(1, 10, this.selsetType, this.Queryconditions)

            },

            /**
             * 原材料分页查询
             * **/
            queryPage(Num = 1, Size = 10, type = '全部', Queryconditions = '', spare = '03') {
                let data = {pageNum: Num, pageSize: Size, type: type, spare: spare}
                data[this.QueryField] = Queryconditions //无法确定查询的字段，将键做活
                console.log(data)
                this.$axios.get(this.$store.state.queryPage, {
                    params: data
                }).then(res => {
                    // return res.data
                    console.log(res.data)
                    this.materialsList = res.data.list
                    this.totalPage = res.data.totalPage//总页数
                    this.pageSize = res.data.pageSize//单页个数
                    this.totalRecord = res.data.totalRecord//总条数
                })

            }
        },
        created: function () {
            /**
             * 在组件渲染之前，请求接口
             * */
            this.queryPage()


        }

    }
</script>

<style>

    .el-table .success-row {
        background: oldlace;
    }

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