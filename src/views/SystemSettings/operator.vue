<template>
    <div class="operator">
        <div class="menuBox">
            <div class="QueryConditions">
                <el-button size="mini" type="primary" class="el-icon-plus" @click="addUser=true">新建
                </el-button>
                <el-button size="mini" type="primary" @click="passReset">批量密码重置
                </el-button>
                <el-button size="mini" type="primary" @click="operatorEnable">启用
                </el-button>
                <el-button size="mini" type="primary" @click="operatorDisable">禁用
                </el-button>
            </div>
            <div class=" QueryConditions QueryInput">
                <div>
                    <el-input size="mini" onkeyup="value=value.replace(/[^\d{11}]/g,'')" clearable v-model="phoneNumber"
                              placeholder="手机号" id="phoneNumber" @blur="phoneNumberChange"></el-input>
                    <el-input size="mini" clearable v-model="nickname" placeholder="用户姓名"></el-input>
                    <el-input size="mini" id="mazey" @blur="emailChange" clearable v-model="email"
                              placeholder="邮箱"></el-input>
                    <el-select v-model="role" size="mini" clearable placeholder="角色">
                        <el-option
                                v-for="item in roleoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="state" size="mini" clearable placeholder="状态">
                        <el-option
                                v-for="item in stateoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-model="factoryName" size="mini" clearable placeholder="工厂">
                        <el-option
                                v-for="item in factoryList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div>
                    <el-button type="primary" size="mini"
                               @click="phoneNumber='',nickname='',email='',state='',role='',factoryName=''">
                        重置
                    </el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search" @click="OperatorQueryPage()">查询
                    </el-button>
                </div>
            </div>
        </div>

        <el-table
                border
                stripe
                :data="OperatorList"
                @selection-change="Multipleselection"
                ref="table"
                :height="tableHeight">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" align="center"></el-table-column>
            <el-table-column prop="username" label="登录账号" align="center"></el-table-column>
            <el-table-column prop="niacname" label="用户姓名" align="center"></el-table-column>
            <el-table-column prop="role" label="角色" align="center">
                <template slot-scope="scope">
                    {{scope.row.role=='MANAGER'?'管理员':scope.row.role=='GENERAL'?'一般用户':'超级管理员'}}
                </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="180px" align="center"></el-table-column>
            <el-table-column prop="email" label="状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.state=='0'?'未启用':'已启用'}}
                </template>
            </el-table-column>
            <el-table-column prop="factoryName" label="工厂" align="center"></el-table-column>
            <el-table-column prop="createTime" label="添加时间" align="center"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="180px">
                <template slot-scope="scope">
                    <el-button type="text" @click="operatorUpdate(scope.row)">编辑</el-button>
                    <el-button type="text" @click="resetUpPassword(scope.row)">重置密码</el-button>
                    <el-button type="text" v-if="scope.row.nickname==judgeName?false:true" @click="delOpera(scope.row)">
                        删除
                    </el-button>
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
                        <el-select v-model="upaddUserData.factoryUuid" :disabled="upfactoryShow" clearable>
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
                screenWidth: document.body.clientWidth,
                tableHeight: 0,//表格高度
                addUser: false,//新建用户面板
                upaddUser: false,//修改用户面板
                judgeName: '',//用于身份判断，自己无法删除
                phoneNumber: '',//手机号
                email: '',//邮箱
                role: '',//角色
                state: '',//状态
                nickname: '',//昵称
                factoryName: '',//工厂
                pageNum: 1,//分页查询页数
                stateoptions: [
                    {
                        label: '未启用',
                        value: '0'
                    },
                    {
                        label: '已启用',
                        value: '1'
                    }
                ],
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
                    //修改用户数据
                    phoneNumber: '',//手机号
                    email: '',//邮箱
                    nickname: '',//用户姓名
                    username: '',//登录账号
                    role: '',//角色
                    factoryUuid: '',//工厂ID
                },
                upaddUserDataValidation: {
                    //修改用户表单验证
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

                operatorData: [],//选中操作员信息
            }
        },
        mounted() {

            const that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                })()
            }
        },
        watch: {
            screenWidth(val) {
                if (!this.timer) {
                    this.screenWidth = val
                    this.timer = true
                    let that = this
                    setTimeout(function () {
                        that.size()
                        that.timer = false
                        console.log(1)
                    }, 400)
                }
            }
        },
        methods: {
            size() {
                //监听窗口函数
                setTimeout(() => {
                    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 150;
                }, 100)
            },
            operatorEnable() {
                //启用
                let that = this
                let data = {
                    state: '1',
                    operatorList: this.operatorData,
                }
                /**
                 * 判断是否选中超级管理员
                 * */
                let state = this.operatorData.some(item => {
                    return item.username == 'admin'
                })
                if (!state) {
                    this.$axios.post(this.$store.state.updateState, data).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                onClose() {
                                    that.OperatorQueryPage()
                                }
                            });
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                } else {
                    this.$message({
                        showClose: true,
                        message: '不能选择超级管理员',
                        type: 'error'
                    });
                }

                console.log(data)
            },
            operatorDisable() {
                //禁用
                let that = this
                let data = {
                    state: '2',
                    operatorList: this.operatorData,
                }
                /**
                 * 判断是否选中超级管理员
                 * */
                let state = this.operatorData.some(item => {
                    return item.username == 'admin'
                })
                if (!state) {
                    this.$axios.post(this.$store.state.updateState, data).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                onClose() {
                                    that.OperatorQueryPage()
                                }
                            });
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                } else {
                    this.$message({
                        showClose: true,
                        message: '不能选择超级管理员',
                        type: 'error'
                    });
                }

            },
            passReset() {
                //密码重置
                let that = this
                this.$axios.post(this.$store.state.resetPassword, this.operatorData).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            onClose() {
                                that.OperatorQueryPage()
                            }
                        });
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })


            },
            resetUpPassword(data) {
                //单个重置
                this.operatorData = []
                this.operatorData.push(data)
                this.passReset()
            },
            delOpera(data) {
                //删除操作员
                let that = this

                this.$confirm('确定删除此用户？', '确认信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.$axios.get(this.$store.state.deleteoperator, {params: {uuid: data.uuid}}).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success',
                                    onClose() {
                                        that.OperatorQueryPage()
                                    }
                                });
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                    })


            },
            Multipleselection(data) {
                //操作员多选
                this.operatorData = data
                console.log(this.operatorData)
            },
            operatorUpdate(data) {
                //修改操作员按钮
                this.upaddUser = true
                this.upaddUserData = data
                if (data.role === "GENERAL") {
                    this.upfactoryShow = false
                    this.upfactorySelectShow = true
                } else {
                    this.upfactorySelectShow = false
                    this.upfactoryShow = true
                }
                console.log(data)
                // upfactoryShow
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
                        this.$axios.post(this.$store.state.addSaveOperator, this.addUserData).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success',
                                    onClose() {
                                        that.OperatorQueryPage()
                                        that.addUser = false
                                    }
                                });
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
                        console.log(this.addUserData)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }

                });
            },
            upsubmitaddUserData(upaddUserData) {
                //修改管理员信息
                let that = this
                this.$refs[upaddUserData].validate((valid) => {
                    if (valid) {
                        console.log(this.upaddUserData)
                        this.$axios.post(this.$store.state.updateoperator, this.upaddUserData).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '保存成功',
                                    type: 'success',
                                    onClose() {
                                        that.OperatorQueryPage()
                                        that.addUser = false
                                    }
                                });
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        })
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
                        role: this.role,//角色
                        state: this.state,//状态
                        factoryUuid: this.factoryName,//工厂
                    }
                }).then(res => {
                    this.OperatorList = res.data.list
                    this.totalOperatorNumdel = res.data.totalRecord
                    console.log(res.data.list)
                })
            }
        },

        created: function () {
            this.judgeName = this.$cookies.get('nickname')

            this.OperatorQueryPage();//操作员信息分页查询
            this.factoryQuery()//工厂信息
            this.size()

        }
    }
</script>

<style scoped>

</style>