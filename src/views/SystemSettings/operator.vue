<template>
    <div class="operator">
        <div class="menuBox">
            <div class="QueryConditions">
                <el-button size="mini" type="primary" class="el-icon-plus" @click="addUser=true,factoryQuery()">新建
                </el-button>
                <el-button size="mini" type="primary" class="el-icon-plus" @click="passReset">批量密码重置
                </el-button>
            </div>
            <div class=" QueryConditions QueryInput">
                <div>
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d{11}]/g,'')" clearable v-model="phoneNumber"
                              placeholder="手机号" id="phoneNumber" @blur="phoneNumberChange"></el-input>
                    <el-input size="mini" clearable v-model="nickname" placeholder="用户姓名"></el-input>
                    <el-input size="mini" id="mazey" @blur="emailChange" clearable v-model="email"
                              placeholder="邮箱"></el-input>

                </div>

                <div>
                    <el-button type="primary" size="mini"
                               @click="phoneNumber='',nickname='',email=''">
                        重置
                    </el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search">查询
                    </el-button>
                </div>
            </div>
        </div>

        <el-table
                border
                stripe
                :data="OperatorList"
                @selection-change="Multipleselection"
                height="750px">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" align="center"></el-table-column>
            <el-table-column prop="username" label="登录账号" align="center"></el-table-column>
            <el-table-column prop="niacname" label="用户姓名" align="center"></el-table-column>
            <el-table-column prop="role" label="角色" align="center">
                <template slot-scope="scope">
                    {{scope.row.role=='MANAGER'?'管理员':scope.row.role=='GENERAL'?'一般用户':'超级管理员'}}
                </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
            <el-table-column prop="createTime" label="添加时间" align="center"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="operatorUpdate(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-row>
            <el-col :span="10" :offset="14">
                <el-pagination
                        @current-change="operatorpag"
                        :page-size="10"
                        layout="prev, pager, next, jumper"
                        :total="totalOperatorNumdel">
                </el-pagination>
            </el-col>
        </el-row>

        <!--新建用户-->
        <el-dialog
                width="600px"
                style="padding: 0px;margin: 0px"
                title="新建用户" :visible.sync="addUser" :show-close="false"
        >
            <el-form :model="addUserData" ref="addUserData"
                     :rules="addUserDataValidation" size="mini" label-width="90px" label-position="right">
                <div class="addUserFormList">
                    <el-form-item label="登录账号" prop="username">
                        <el-input v-model="addUserData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="用户姓名" prop="nickname">
                        <el-input v-model="addUserData.nickname"></el-input>
                    </el-form-item>
                </div>

                <div class="addUserFormList">
                    <el-form-item label="手机号" prop="phoneNumber">
                        <el-input type="age" v-model.number="addUserData.phoneNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addUserData.email" clearable></el-input>
                    </el-form-item>

                </div>
                <div class="addUserFormList">
                    <el-form-item label="角色" prop="role">
                        <el-select v-model="addUserData.role" @change="roleSelect" clearable>
                            <el-option
                                    v-for="item in roleoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="工厂" v-if="factorySelectShow" prop="factoryUuid">
                        <el-select v-model="addUserData.factoryUuid" :disabled="factoryShow" clearable>
                            <el-option
                                    v-for="item in factoryList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>

            <div style="margin-top: 0.5em">
                <el-button size="mini" type="primary" @click="submitaddUserData('addUserData')">保存</el-button>
                <el-button size="mini" @click="addUser=false">取消</el-button>
            </div>

        </el-dialog>

        <!--修改用户-->
        <el-dialog
                width="600px"
                style="padding: 0px;margin: 0px"
                title="新建用户" :visible.sync="upaddUser" :show-close="false"
        >
            <el-form :model="upaddUserData" ref="upaddUserData"
                     :rules="upaddUserDataValidation" size="mini" label-width="90px" label-position="right">
                <div class="addUserFormList">
                    <el-form-item label="登录账号" prop="username">
                        <el-input v-model="upaddUserData.username"></el-input>
                    </el-form-item>
                    <el-form-item label="用户姓名" prop="nickname">
                        <el-input v-model="upaddUserData.nickname"></el-input>
                    </el-form-item>
                </div>

                <div class="addUserFormList">
                    <el-form-item label="手机号" prop="phoneNumber">
                        <el-input type="age" v-model.number="upaddUserData.phoneNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="upaddUserData.email" clearable></el-input>
                    </el-form-item>

                </div>
                <div class="addUserFormList">
                    <el-form-item label="角色" prop="role">
                        <el-select v-model="upaddUserData.role" @change="uproleSelect" clearable>
                            <el-option
                                    v-for="item in roleoptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="工厂" v-if="upfactorySelectShow" prop="factoryUuid">
                        <el-select v-model="upaddUserData.factoryUuid" :disabled="factoryShow" clearable>
                            <el-option
                                    v-for="item in factoryList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>

            <div style="margin-top: 0.5em">
                <el-button size="mini" type="primary" @click="upsubmitaddUserData('upaddUserData')">保存</el-button>
                <el-button size="mini" @click="upaddUser=false">取消</el-button>
            </div>

        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "operator",
        data() {
            var checkPhone = (rule, value, callback) => {
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                console.log(reg.test(value));
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error('请输入正确的手机号'));
                }

            };


            return {

                addUser: false,//新建用户面板
                upaddUser: false,//修改用户面板
                phoneNumber: '',//手机号
                email: '',//邮箱
                nickname: '',//昵称
                pageNum: 1,//分页查询页数
                roleoptions: [
                    {
                        label: '管理员',
                        value: 'MANAGER'
                    },
                    {
                        label: '普通用户',
                        value: 'GENERAL'
                    }
                ],
                addUserData: {
                    //新建用户数据
                    phoneNumber: '',//手机号
                    email: '',//邮箱
                    nickname: '',//用户姓名
                    username: '',//登录账号
                    role: '',//角色
                    factoryUuid: '',//工厂ID
                },
                addUserDataValidation: {
                    //新建用户表单验证
                    username: [
                        {required: true, message: '请输入登录账号', trigger: 'blur'},
                    ],
                    phoneNumber: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {required: true, validator: checkPhone, trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
                    ],
                    nickname: [
                        {required: true, message: '请输入用户姓名', trigger: 'blur'},
                        {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
                    ],
                    role: [
                        {required: true, message: '请选择角色', trigger: 'blur'},
                    ],
                    factoryUuid: [
                        {required: true, message: '请选择工厂', trigger: 'change'},
                    ]
                },
                upaddUserData: {
                    //新建用户数据
                    phoneNumber: '',//手机号
                    email: '',//邮箱
                    nickname: '',//用户姓名
                    username: '',//登录账号
                    role: '',//角色
                    factoryUuid: '',//工厂ID
                },
                upaddUserDataValidation: {
                    //新建用户表单验证
                    username: [
                        {required: true, message: '请输入登录账号', trigger: 'blur'},
                    ],
                    phoneNumber: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {required: true, validator: checkPhone, trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
                    ],
                    nickname: [
                        {required: true, message: '请输入用户姓名', trigger: 'blur'},
                        {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
                    ],
                    role: [
                        {required: true, message: '请选择角色', trigger: 'blur'},
                    ],
                    factoryUuid: [
                        {required: true, message: '请选择工厂', trigger: 'change'},
                    ]
                },
                OperatorList: [],//操作员查询数据
                totalOperatorNumdel: 0,//操作员分页查询总条目数
                factoryList: [],//工厂信息
                factoryShow: true,//工厂选择信息
                factorySelectShow: false,//判断工厂是否可选
                upfactoryShow: true,//工厂选择信息
                upfactorySelectShow: false,//判断工厂是否可选

                operatorData:[],//选中操作员信息
            }
        },
        methods: {
            passReset(){
              //密码重置
                this.$axios.post(this.$store.state.resetPassword,this.operatorData).then(res=>{
                    console.log(res)
                })


            },
                Multipleselection(data){
              //操作员多选
                this.operatorData=data
            },
            operatorUpdate(data){
              //修改操作员按钮
                this.upaddUser=true
                this.upaddUserData=data
            },
            operatorpag(val) {
                //操作员分页
                this.pageNum = val
                this.OperatorQueryPage()
            },
            roleSelect(val) {
                //角色选择
                console.log(val)
                if (val == 'GENERAL') {
                    this.factoryShow = false
                    this.factorySelectShow = true
                } else if (val == 'MANAGER') {
                    this.addUserData.factoryUuid = ''
                    this.factoryShow = true
                    this.factorySelectShow = false
                }
            },
            uproleSelect(val) {
                //角色选择
                console.log(val)
                if (val == 'GENERAL') {
                    this.upfactoryShow = false
                    this.upfactorySelectShow = true
                } else if (val == 'MANAGER') {
                    this.upaddUserData.factoryUuid = ''
                    this.upfactoryShow = true
                    this.upfactorySelectShow = false
                }
            },
            submitaddUserData(addUserData) {
                //提交管理员信息
                let that = this
                this.$refs[addUserData].validate((valid) => {
                    if (valid) {
                        // this.$axios.post(this.$store.state.addSaveOperator, this.addUserData).then(res => {
                        //     console.log(res)
                        // })
                        console.log(this.addUserData)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }

                });
            },
            upsubmitaddUserData(upaddUserData) {
                //提交管理员信息
                let that = this
                this.$refs[upaddUserData].validate((valid) => {
                    if (valid) {
                        console.log(this.upaddUserData)
                        // this.$axios.post(this.$store.state.addSaveOperator, this.addUserData).then(res => {
                        //     console.log(res)
                        // })
                        console.log(this.addUserData)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }

                });
            },
            phoneNumberChange() {
                //手机号验证
                var reg = /^[1][3,4,5,7,8][0-9]{9}$/; //正则表达式
                var obj = document.getElementById("phoneNumber"); //要验证的对象
                // if(obj.value === ""){ //输入不能为空
                //     alert("输入不能为空!");
                //     return false;
                // }else
                let that = this
                if (!reg.test(obj.value)) { //正则验证不通过，格式不对
                    this.$notify.error({
                        title: '错误',
                        message: '手机号格式错误',
                        onClose() {
                            that.phoneNumber = ''
                        }
                    });
                    return false;
                } else {
                    alert("通过！");
                    return true;
                }
            },
            emailChange() {
                //邮箱验证
                let that = this
                var reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/; //正则表达式
                var obj = document.getElementById("mazey"); //要验证的对象
                // if(obj.value === ""){ //输入不能为空
                //     alert("输入不能为空!");
                //     return false;
                // }else
                if (!reg.test(obj.value)) { //正则验证不通过，格式不对
                    this.$notify.error({
                        title: '错误',
                        message: '邮箱格式错误',
                        onClose() {
                            that.email = ''
                        }
                    });
                    return false;
                } else {
                    alert("通过！");
                    return true;
                }
            },
            factoryQuery() {
                //工厂列表
                this.$axios.get(this.$store.state.factoryselect).then(res => {
                    let data = res.data.data
                    this.factoryList = [];
                    data.forEach(item => {
                        this.factoryList.push({value: item.uuid, label: item.name})
                    })
                })
            },
            OperatorQueryPage() {
                //操作员信息分页查询
                this.$axios.get(this.$store.state.OperatorQueryPages, {
                    params: {
                        pageSize: 10,
                        pageNum: this.pageNum,
                        phoneNumber: this.phoneNumber,//手机号
                        email: this.email,//邮箱
                        nickname: this.nickname,//昵称
                    }
                }).then(res => {
                    this.OperatorList = res.data.list
                    this.totalOperatorNumdel = res.data.totalRecord
                })
            }
        },

        created: function () {
            this.OperatorQueryPage();//操作员信息分页查询

        }
    }
</script>

<style scoped>

</style>