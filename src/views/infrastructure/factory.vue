<template>
    <div class="factory">
        <div>
            <!--新建与查询-->
            <div class="menuBox">
                <div style="display: flex;justify-content: space-around">

                    <el-button size="mini" class="el-icon-plus" @click="addfactory=true">新建</el-button>

                    <el-button size="mini" class="el-icon-delete" @click="delfactory">删除</el-button>
                    <el-button size="mini">打印</el-button>
                </div>

                <div>

                    <el-row>
                        <el-col :span="6">
                            <el-input size="mini" placeholder="所属公司" v-model="querycompany"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input size="mini" placeholder="名称" v-model="queryname"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input size="mini" placeholder="其他" v-model="queryspare01"></el-input>
                        </el-col>

                        <el-col :span="3">
                            <el-button type="primary" size="mini"
                                       @click="queryspare01='',queryname='',querycompany=''">
                                重置
                            </el-button>
                        </el-col>
                        <el-col :span="3">
                            <el-button type="primary" size="mini" icon="el-icon-search"
                                       @click="factoryquery()">查询
                            </el-button>
                        </el-col>
                    </el-row>
                </div>


            </div>
        </div>

        <div>
            <el-table
                    :data="factoryList"
                    border
                    stripe
                    height="760px"
                    @selection-change="factorySelection"
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
                        prop="name"
                        width="150"
                        label="名称">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="code"
                        label="编码"
                        width="100"
                >
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        prop="createTime"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="修改时间"
                        prop="updateTime"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>

                <el-table-column
                        align="center"
                        prop="address"
                        label="城市"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="detailedAddress"
                        label="详细地址"
                        width="180"
                >
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="company"
                        label="所属公司"

                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="contact"
                        label="联系人"
                >
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="phoneNumber"
                        width="150"
                        label="手机号码">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="remark"
                        width="100"
                        label="备注信息">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作"
                        width="120"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="upfactoryspanel(scope.row)">修改</el-button>
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

        <!--新建厂商信息-->
        <el-dialog
                title="新建厂商信息"
                :show-close="false"
                :visible.sync="addfactory"
                width="60%"
        >

            <el-form :model="addfactoryForm" ref="addfactoryForm" :rules="addfactorysrules" :inline="true">

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="编码" prop="code">
                            <el-input placeholder="厂商编码" size="mini" v-model="addfactoryForm.code"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item  label="名称" prop="name">
                            <el-input placeholder="厂商名称" size="mini" v-model="addfactoryForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">

                        <el-form-item label="收货城市" prop="address">
                            <el-cascader
                                    placeholder="收货城市"
                                    size="mini"
                                    :options="option"
                                    v-model="address"
                                    @change="handleChange">
                            </el-cascader>
                        </el-form-item>

                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="收货地址" prop="detailedAddress">
                            <el-input placeholder="收货地址"  size="mini" v-model="addfactoryForm.detailedAddress"></el-input>
                        </el-form-item>
                    </el-col>


                </el-row>

                <el-row>

                    <el-col :span="12">
                        <el-form-item  label="所属公司" prop="company">
                            <el-input placeholder="所属公司" size="mini" v-model="addfactoryForm.company"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="手机号码">
                            <el-input placeholder="手机号码" size="mini" v-model="addfactoryForm.phoneNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="联系人">
                            <el-input placeholder="联系人" size="mini" v-model="addfactoryForm.contact"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注信息">
                            <el-input placeholder="备注信息" size="mini" v-model="addfactoryForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-form-item>
                    <el-button size="mini" type="primary" @click="submitForm('addfactoryForm')">立即创建</el-button>
                    <el-button size="mini" @click="addfactory=false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>

        <!--修改厂商信息-->
        <el-dialog
                title="修改厂商信息"
                :visible.sync="upfactory"
                :show-close="false"
                width="60%"
        >

            <el-form :model="upfactoryForm" ref="upfactoryForm" :rules="upfactorysrules" :inline="true">

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="编码" prop="code">
                            <el-input placeholder="厂商编码" size="mini" v-model="upfactoryForm.code"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="名称" prop="name">
                            <el-input placeholder="厂商名称" size="mini" v-model="upfactoryForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>



                    <el-col :span="12">
                        <!--<el-form-item label="地址" prop="address">-->
                            <!--<el-input size="mini" v-model="upfactoryForm.address"></el-input>-->
                        <!--</el-form-item>-->


                        <el-form-item label="收货城市" prop="address">
                            <el-cascader
                                    placeholder="收货城市"
                                    size="mini"
                                    :options="option"
                                    v-model="upaddress"
                                    @change="handleChange">
                            </el-cascader>
                        </el-form-item>

                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="收货地址" prop="detailedAddress">
                            <el-input  placeholder="收货地址" size="mini" v-model="upfactoryForm.detailedAddress"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属公司" prop="company">
                            <el-input placeholder="所属公司" size="mini" v-model="upfactoryForm.company"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="手机号码">
                            <el-input placeholder="手机号码" size="mini" v-model="upfactoryForm.phoneNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="联系人">
                            <el-input placeholder="联系人" size="mini" v-model="upfactoryForm.contact"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注信息">
                            <el-input placeholder="备注信息" size="mini" v-model="upfactoryForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>



                <el-form-item>
                    <el-button size="mini" type="primary" @click="upsubmitForm('upfactoryForm')">立即修改</el-button>
                    <el-button size="mini" @click="upfactory=false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>

    </div>
</template>

<script>
    import {regionData,CodeToText,TextToCode} from 'element-china-area-data'
    export default {
        name: "factory",
        data() {
            return {
                pageSizeFactory: 10,//每页条目数
                pageNumFactory: 1,//当前页数
                factoryList: [],//工厂数据集合
                factoryIds: [],//工厂信息ID
                totalRecordNum: 0,
                addfactory: false,//新建厂商面板
                upfactory: false,//修改厂商面板
                addfactoryForm: {
                    //新建厂商信息表单数据
                    name: '',//名称
                    code: '',//编码
                    company: '',//所属公司
                    address: '',//地址
                    detailedAddress:'',//详细地址信息
                    contact: '',//联系人
                    phoneNumber: '',//手机号码
                    remark: '',//备注信息

                },
                addfactorysrules: {
                    //新建厂商信息表单验证
                    name: [
                        {required: true, message: '请输入厂商名称', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入厂商编码', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur'}
                    ],
                    address:[
                        {required:true,message:'请选择收货城市',trigger:'blur'}
                    ],
                    detailedAddress:[
                        {required:true,message:'收货地址不能为空',trigger:'blur'}
                    ]
                },
                option: regionData,//城市选择
                address: [],//地址
                upaddress: [],//修改地址
                upfactoryForm: {
                    //新建厂商信息表单数据
                    name: '',//名称
                    code: '',//编码
                    company: '',//所属公司
                    address: '',//地址
                    detailedAddress:'',//详细地址信息
                    contact: '',//联系人
                    phoneNumber: '',//手机号码
                    remark: '',//备注信息

                },
                upfactorysrules: {
                    //新建厂商信息表单验证
                    name: [
                        {required: true, message: '请输入厂商名称', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur'}
                    ],
                    code: [
                        {required: true, message: '请输入厂商编码', trigger: 'blur'},
                        {min: 3, max: 8, message: '长度在3到8个字符', trigger: 'blur'}
                    ],
                    address:[
                        {required:true,message:'请选择收货城市',trigger:'blur'}
                    ],
                    detailedAddress:[
                        {required:true,message:'收货地址不能为空',trigger:'blur'}
                    ]
                },
                queryspare01: '',//查询其他
                queryname: '',//查询名称
                querycompany: '',//查询所属公司
            }
        },
        methods: {
            handleChange(value) {
                //城市选择
                console.log(value)
                this.addfactoryForm.address = ''
                this.addfactoryForm.address += `${CodeToText[value[0]]}-${CodeToText[value[1]]}-${CodeToText[value[2]]}`

                this.upfactoryForm.address = ''
                this.upfactoryForm.address += `${CodeToText[value[0]]}-${CodeToText[value[1]]}-${CodeToText[value[2]]}`
            },
            submitForm(addfactoryForm) {
                //新建厂商信息
                this.$refs[addfactoryForm].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.$store.state.addfactory, this.addfactoryForm).then(res => {
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
            upsubmitForm(upfactoryForm) {
                //修改厂商信息
                this.$refs[upfactoryForm].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.$store.state.upfactory, this.upfactoryForm).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '修改成功',
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
            upfactoryspanel(data) {
                //打开修改信息面板
                this.upfactory = true
                this.upfactoryForm = data
                this.upaddress.length=0
                // TextToCode

                let cti=data.address.split('-')
                let county =TextToCode[cti[0]][cti[1]][cti[2]].code //县市
                let provinces =`${county.substring(0,3)}000`   //省份
                let city =`${county.substring(0,4)}00`      //辖区
                this.upaddress.splice(0,0,provinces)
                this.upaddress.splice(1,0,city)
                this.upaddress.splice(2,0,county)

            },
            delfactory() {
                //删除工厂信息
                this.$axios.post(this.$store.state.delfactory, {ids: this.factoryIds}).then(res => {
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
            factorylistpag(val) {
                //工厂信息分页
                this.pageNumFactory = val
                this.factoryquery()
            },
            factorySelection(val) {
                //工厂信息多选
                this.factoryIds.length = 0
                val.forEach(item => {
                    this.factoryIds.push(item.id)
                })
                console.log(this.factoryIds)
            },
            factoryquery() {
                //工厂信息分页查询
                this.$axios.get(this.$store.state.factoryPage, {
                    params: {
                        pageSize: this.pageSizeFactory, pageNum: this.pageNumFactory,
                        company: this.querycompany, name: this.queryname, spare01: this.queryspare01
                    }
                }).then(res => {
                    this.factoryList = res.data.list
                    this.totalRecordNum = res.data.totalRecord
                })
            }
        },
        created: function () {
            this.factoryquery()

        }

    }
</script>

<style scoped>
    .factory {
        width: 100%;
        height: 100%;
        /*padding: 1%;*/
        /*display: flex;*/
        /*justify-content: space-around;*/

    }
    .menuBox {
        display: flex;
        background-color: #f8f8f8;
        justify-content: space-between;
        align-items: center;
    }
</style>