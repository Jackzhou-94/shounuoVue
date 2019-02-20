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
                    <el-button size="mini" class="el-icon-plus" @click="dialogTableVisible=true">新建
                    </el-button>
                    <el-button size="mini" class="el-icon-circle-check-outline" @click="Delmateropen">启用</el-button>
                    <el-button size="mini" class="el-icon-circle-close-outline" @click="DelmaterOUT">禁用</el-button>
                    <el-button size="mini" class="el-icon-delete" @click="delmaterials">删除</el-button>
                    <el-button size="mini" class="el-icon-delete" @click="recyclepanel">回收站</el-button>
                    <el-button size="mini" class="el-icon-download" @click="exportExcel">导出</el-button>
                    <!--<el-upload-->
                            <!--class="upload-demo"-->
                            <!--action="http://192.168.1.199:8099/supplychain/importExcel/readExcel"-->
                            <!--:multiple="false"-->
                            <!--:on-success="upfile"-->
                            <!--name="file"-->
                            <!--accept=".xlsx,.xls"-->
                    <!--&gt;-->
                        <!--<el-button size="small" type="primary">导入</el-button>-->
                    <!--</el-upload>-->


                </div>

                <div class="selsectInput">
                    <!--<el-cascader-->
                            <!--size="mini"-->
                            <!--:options="options"-->
                            <!--v-model="selectedOptions"-->
                            <!--@change="supplierChange">-->
                    <!--</el-cascader>-->
                    <!-- 搜索条件-->

                    <el-input placeholder="物料编号"  size="mini"  v-model="materialsNum"></el-input>
                    <el-input placeholder="物料名称"  size="mini"  v-model="materialsName"></el-input>


                    <el-select v-model="VendorQueries" placeholder="厂商" size="mini">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
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
                    id="out-table"
                    :data="materialsList"
                    :row-class-name="tableRowClassName"
                    highlight-current-row
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column
                        type="index"
                        align="center"
                        sortable
                ></el-table-column>
                <!--createTime-->
                <el-table-column

                        label="时间"
                        prop="createTime"
                        width="180"
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
                <el-table-column
                        label="操作"
                        align="center"
                        fixed="right"
                >
                    <template
                            slot-scope="scope"
                    >
                        <el-button type="text" size="small" @click="uppanel(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-row :gutter="24">
                <el-col :span="16" :offset="8"></el-col>
                <el-col :span="8" :offset="16">
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
                            <el-input size="mini" :disabled="true" v-model="updaData.materialCode"></el-input>
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
                                    @change="upclassification">
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
                            <el-select size="mini" v-model="value" placeholder="请选择" @change="upselectChange">
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
                            <el-button type="primary" size="mini" @click="upsubmitForm('updaData')">立即修改</el-button>
                            <el-button size="mini" @click="UpdatableVisible=false">取消</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
        <!--回收站-->
        <el-dialog
                title="回收站"
                :visible.sync="recycle"
                width="80%"
        >
            <div style="display: flex;justify-content: flex-start;margin-bottom: 0.5em">
                <el-button size="mini" type="primary" @click="BatchRecovery">批量恢复</el-button>
            </div>


            <el-table
                    style="width: 100%"
                    border
                    :data="recycleData"
                    highlight-current-row
                    @selection-change="recyclingSelectionChange"
            >
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
                <el-table-column
                        label="操作"
                        width="120"
                        align="center"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="restoreDatasingle(scope.row)">恢复</el-button>
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

    </div>
</template>

<script>
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'

    export default {
        name: "materials",
        data() {
            return {
                recycle: false,//回收站面板
                recycleData: [],//回收站数据
                recycleDataID: [],//回收站数据id
                UpdatableVisible: false,//修改面板
                recycletotalPage: 0,//回收站总页数
                recyctotalRecord: 0,//回收站总条目数
                recycpageSize: 0,//回收站单页个数
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
                querymanufacturer: '',//搜索厂商
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
                value: '',
                values: '',
                materialsNum: '',//物料编码
                materialsName:'',//物料名称
                VendorQueries:'',//厂商查询
                MaxHeight: 650,//默认表格数据最大高度
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
            export4Excel() {
                /**
                 * 导出
                 * **/
                /* generate workbook object from table */
                // var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
                // /* get binary string as output */
                // console.log(wb)
                // var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                // try {
                //     FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
                // } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
                // return wbout
            },
            exportExcel() {
                // 设置当前日期
                let time = new Date();
                let year = time.getFullYear();
                let month = time.getMonth() + 1;
                let day = time.getDate();
                let name = year + "" + month + "" + day;
                // console.log(name)
                /* generate workbook object from table */
                //  .table要导出的是哪一个表格
                var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
                /* get binary string as output */

                console.log(wb)
                var wbout = XLSX.write(wb, {
                    bookType: "xlsx",
                    bookSST: true,
                    type: "array"
                });
                try {
                    //  name+'.xlsx'表示导出的excel表格名字
                    FileSaver.saveAs(
                        new Blob([wbout], {type: "application/octet-stream"}),
                        name + ".xlsx"
                    );
                } catch (e) {
                    if (typeof console !== "undefined") console.log(e, wbout);
                }
                return wbout;

        },


        upfile(file, fileList) {
            /**
             * 导入
             * **/
            console.log(file)
            console.log(fileList)
        },
        recyclepanel() {
            /**
             * 回收站面板
             * **/
            this.recycle = true;
            this.recyclingList();
        },
        recyclingSelectionChange(val) {
            /**
             * 回收站多选
             * **/
            this.recycleDataID.length = 0;
            val.forEach(item => {
                this.recycleDataID.push(item.id)
            })
        },
        restoreDatasingle(data) {
            /**
             * 回收站单条恢复
             * **/
            this.recycleDataID.length = 0;
            this.recycleDataID.push(data.id)
            this.restoreData(this.recycleDataID)
        },
        BatchRecovery() {
            /**
             * 回收站批量恢复
             * **/
            this.restoreData(this.recycleDataID)
        },
        restoreData(ids) {
            /**
             * 恢复
             * */
            this.$axios.post(this.$store.state.updateByOpen, {
                ids: ids
            }).then(res => {
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

        recyclingList(size = 6, page = 1) {
            /***
             * 回收站数据列表查询
             * **/
            this.$axios.get(this.$store.state.selectRecycle, {
                params: {pageSize: size, pageNum: page}
            }).then(res => {
                this.recycleData = res.data.list
                this.recyctotalRecord = res.data.totalRecord
                this.recycpageSize = res.data.pageSize

            })
        },
        recycCurrentChange(val) {
            /**
             * 回收站分页
             * */
            this.recyclingList(6, val)
        },

        uppanel(data) {
            /**
             * 修改原材料想信息面板
             * */
            this.UpdatableVisible = true
            this.updaData = data

        },
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
                        type: 'warning',

                    })
                    return false;
                }
            });
        },
        Delmateropen() {
            /**
             * 原材料启用
             * */
            this.$axios.post(this.$store.state.delmateropen, {ids: this.delmaterID}).then(res => {
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
        DelmaterOUT() {
            /**
             * 原材料停用
             * */
            this.$axios.post(this.$store.state.delmaterout, {ids: this.delmaterID}).then(res => {
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
             * 根据ID移除原材料信息*/
            this.$axios.post(this.$store.state.delmaterials, {ids: this.delmaterID}).then(res => {
                if (res.data.code == 200) {
                    this.$message({
                        message: '操作成功，请至回收站查看',
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
            this.materialsNum = ''
            this.materialsName=''
            this.QueryField = ''
            this.VendorQueries=''
        },
        queryMaterials() {
            /**
             * 查询
             * */
            this.queryPage(1, 10, this.selsetType, this.materialsNum,this.materialsName)
            console.log(this.selsetType)
            console.log(this.spare)
        },
        handleCurrentChange(val) {
            /**
             * 分页
             * */
            this.queryPage(val, 10, this.selsetType)
        },
        selectChange(val) {
            /**
             * 新建原材料选择厂商
             * */
            this.addmaterial.manufacturer = val
            console.log(this.addmaterial)
        },
        upselectChange(val) {
            /**
             * 修改原材料选择厂商
             * */
            this.updaData.manufacturer = val
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
                            this.$message.error(res.data.msg);
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
            this.addmaterial.type += value[value.length - 1]
            // value.forEach(item => {
            //     this.addmaterial.type += `${item}/`
            // })


        },
        upclassification(value) {
            /**
             * 修改辅料选择
             * */
            this.updaData.type = ''
            this.updaData.type += value[value.length - 1]
            // value.forEach(item => {
            //     this.updaData.type += `${item} `
            // })
        },
        // supplierChange(value) {
        //     /**
        //      * 供应商查询选择
        //      * */
        //     this.QueryField = value[0]
        //     if (value[0] != 'materialCode' && value[0] != 'name') {
        //         this.conditions = false
        //         this.Queryconditions = value[value.length - 1] //厂商
        //     } else {
        //         this.conditions = true
        //         this.Queryconditions = ''
        //
        //     }
        // },
        //树形空间选中后的回调
        handleNodeClick(data) {
            this.selsetType = data.label
            this.queryPage(1, 10, this.selsetType)

        },

        /**
         * 原材料分页查询
         * **/
        queryPage(Num = 1, Size = 10, type = '全部') {
            let data = {pageNum: Num, pageSize: Size, type: type,
                materialCode:this.materialsNum,name:this.materialsName,
                manufacturer:this.VendorQueries}

            console.log(data)
            this.$axios.get(this.$store.state.queryPage, {
                params: data
            }).then(res => {
                console.log(res.data)
                this.materialsList = res.data.list
                this.totalPage = res.data.totalPage//总页数
                this.pageSize = res.data.pageSize//单页个数
                this.totalRecord = res.data.totalRecord//总条数
            })

        }
    }
    ,
    created: function () {
        /**
         * 在组件渲染之前，请求接口
         * */
        this.queryPage()


    }

    }
</script>

<style scoped>

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