<template>
    <div class="supplier">
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
                <div style="display: flex;justify-content: space-between">
                    <div style="display: flex;flex-wrap: nowrap">
                        <el-button type="primary" size="mini" class="el-icon-plus" @click="addSupplier=true">新建</el-button>
                        <el-button type="primary" size="mini" class="el-icon-delete">回收站</el-button>
                        <el-button type="primary" icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>
                        <el-button type="danger"  size="mini" class="el-icon-delete" :disabled="delStatusButGoods"  @click="delSupplier">批量删除</el-button>
                    </div>


                    <div>
                        <!--<el-input size="mini" placeholder="商家编码" v-model="querymerchantCode"></el-input>-->
                        <!--<el-input size="mini" placeholder="商品名称" v-model="queryname"></el-input>-->
                        <!--<el-input size="mini" placeholder="货品编号" v-model="queryitemCode"></el-input>-->
                        <!--<el-input size="mini" placeholder="盒装SKU" v-model="querysku"></el-input>-->
                        <!--<el-input size="mini" placeholder="其他" v-model="queryother"></el-input>-->
                        <el-row>
                            <el-col :span="6">
                                <el-input size="mini" placeholder="手机号码" v-model="queryphoneNumber"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-input size="mini" placeholder="单位名称" v-model="queryname"></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-input size="mini" placeholder="其他" v-model="queryspare01"></el-input>
                            </el-col>

                            <el-col :span="3">
                                <el-button type="primary" size="mini"
                                           @click="queryspare01='',queryname='',queryphoneNumber=''">
                                    重置
                                </el-button>
                            </el-col>
                            <el-col :span="3">
                                <el-button type="primary" size="mini" icon="el-icon-search"
                                           @click="querySupplierData()">查询
                                </el-button>
                            </el-col>
                        </el-row>
                    </div>


                </div>


            </div>

            <!--添加-->
            <el-dialog title="添加供应商"  :visible.sync="addSupplier" width="70%"  :show-close="false">
                <el-form label-width="100px" label-position="right"  :model="addSupplierList" :rules="addSupplierRuee" ref="addSupplierList">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="单位名称" prop="unitName">
                                <el-input size="mini" v-model="addSupplierList.unitName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="单位编码" prop="unitCode">
                                <el-input size="mini" v-model="addSupplierList.unitCode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="主联系人">
                                <el-input size="mini" v-model="addSupplierList.mainContact"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="类别代码">
                                <el-input size="mini" v-model="addSupplierList.classCode"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="经营范围">
                                <el-input size="mini" v-model="addSupplierList.businessScope"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="类别名称">
                                <el-input size="mini" v-model="addSupplierList.className"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="手机号码">
                                <el-input size="mini" v-model="addSupplierList.phoneNumber"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="所属地区">
                                <el-input size="mini" v-model="addSupplierList.region"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>

                        <el-col :span="6">
                            <el-form-item label="银行账号">
                                <el-input size="mini" v-model="addSupplierList.bankAccount"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="法人代表">
                                <el-input size="mini" v-model="addSupplierList.corporateRepresentative"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="传真">
                                <el-input size="mini" v-model="addSupplierList.fax"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="邮箱">
                                <el-input size="mini" v-model="addSupplierList.mailbox"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>





                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="全称">
                                <el-input size="mini" v-model="addSupplierList.fullName"></el-input>
                            </el-form-item>

                        </el-col>
                        <el-col :span="6">

                            <el-form-item label="税号">
                                <el-input size="mini" v-model="addSupplierList.tax"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="银行">
                                <el-input size="mini" v-model="addSupplierList.bank"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="地址">
                                <el-input size="mini" v-model="addSupplierList.address"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>


                    <el-row>

                        <el-col :span="6">
                            <el-form-item label="邮编">
                                <el-input size="mini" v-model="addSupplierList.zipCode"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="网址">
                                <el-input size="mini" v-model="addSupplierList.website"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="生日">
                                <el-input size="mini" v-model="addSupplierList.birthday"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="开票信息3">
                                <el-input size="mini" v-model="addSupplierList.invoice02"></el-input>
                            </el-form-item>

                        </el-col>
                    </el-row>





                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="开票地址">
                                <el-input size="mini" v-model="addSupplierList.billAddress"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="备注信息">
                                <el-input size="mini" v-model="addSupplierList.remark"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="信用额度">
                                <el-input size="mini" v-model="addSupplierList.lineCredit"></el-input>
                            </el-form-item>
                        </el-col>


                        <el-col :span="6">
                            <el-form-item label="开票信息2">
                                <el-input size="mini" v-model="addSupplierList.invoice01"></el-input>
                            </el-form-item>
                        </el-col>


                    </el-row>


                    <el-row>
                        <el-col :span="6">

                            <el-form-item label="业务员">
                                <el-input size="mini" v-model="addSupplierList.salesman"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="公司名称">
                                <el-input size="mini" v-model="addSupplierList.company"></el-input>
                            </el-form-item>
                        </el-col>


                        <el-col :span="6">
                            <el-form-item label="下次业务提示">
                                <el-input size="mini" v-model="addSupplierList.businessTips"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button size="mini" type="primary" @click="addsubmitForm('addSupplierList')">添加</el-button>
                        <el-button size="mini" @click="addSupplier=false">取消</el-button>
                    </el-form-item>

                </el-form>

            </el-dialog>

            <!--修改-->
            <el-dialog  :show-close="false"   @closed="closeFun"  title="修改供应商"  :visible.sync="upSupplier" width="70%">
                <el-form  label-width="100px" label-position="right" :model="upSupplierList" :rules="upSupplierRuee" ref="upSupplierList">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="单位名称" prop="unitName">
                                <el-input size="mini" v-model="upSupplierList.unitName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="单位编码" prop="unitCode">
                                <el-input size="mini" v-model="upSupplierList.unitCode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="主联系人">
                                <el-input size="mini" v-model="upSupplierList.mainContact"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="类别代码">
                                <el-input size="mini" v-model="upSupplierList.classCode"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="经营范围">
                                <el-input size="mini" v-model="upSupplierList.businessScope"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="类别名称">
                                <el-input size="mini" v-model="upSupplierList.className"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="手机号码">
                                <el-input size="mini" v-model="upSupplierList.phoneNumber"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="所属地区">
                                <el-input size="mini" v-model="upSupplierList.region"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>

                        <el-col :span="6">
                            <el-form-item label="银行账号">
                                <el-input size="mini" v-model="upSupplierList.bankAccount"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="法人代表">
                                <el-input size="mini" v-model="upSupplierList.corporateRepresentative"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="传真">
                                <el-input size="mini" v-model="upSupplierList.fax"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="邮箱">
                                <el-input size="mini" v-model="upSupplierList.mailbox"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="全称">
                                <el-input size="mini" v-model="upSupplierList.fullName"></el-input>
                            </el-form-item>

                        </el-col>
                        <el-col :span="6">

                            <el-form-item label="税号">
                                <el-input size="mini" v-model="upSupplierList.tax"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="银行">
                                <el-input size="mini" v-model="upSupplierList.bank"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="地址">
                                <el-input size="mini" v-model="upSupplierList.address"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>

                        <el-col :span="6">
                            <el-form-item label="邮编">
                                <el-input size="mini" v-model="upSupplierList.zipCode"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="网址">
                                <el-input size="mini" v-model="upSupplierList.website"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="生日">
                                <el-input size="mini" v-model="upSupplierList.birthday"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="开票信息3">
                                <el-input size="mini" v-model="upSupplierList.invoice02"></el-input>
                            </el-form-item>

                        </el-col>
                    </el-row>



                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="开票地址">
                                <el-input size="mini" v-model="upSupplierList.billAddress"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="备注信息">
                                <el-input size="mini" v-model="upSupplierList.remark"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="信用额度">
                                <el-input size="mini" v-model="upSupplierList.lineCredit"></el-input>
                            </el-form-item>
                        </el-col>


                        <el-col :span="6">
                            <el-form-item label="开票信息2">
                                <el-input size="mini" v-model="upSupplierList.invoice01"></el-input>
                            </el-form-item>
                        </el-col>


                    </el-row>


                    <el-row>
                        <el-col :span="6">

                            <el-form-item label="业务员">
                                <el-input size="mini" v-model="upSupplierList.salesman"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="公司名称">
                                <el-input size="mini" v-model="upSupplierList.company"></el-input>
                            </el-form-item>
                        </el-col>


                        <el-col :span="6">
                            <el-form-item label="下次业务提示">
                                <el-input size="mini" v-model="upSupplierList.businessTips"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
                <!--<el-form :inline="true" :model="upSupplierList" :rules="upSupplierRuee" ref="upSupplierList">-->
                    <!--<el-row>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="单位名称" prop="unitName">-->
                                <!--<el-input size="mini" v-model="upSupplierList.unitName"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="单位编码" prop="unitCode">-->
                                <!--<el-input size="mini" v-model="upSupplierList.unitCode"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="主联系人">-->
                                <!--<el-input size="mini" v-model="upSupplierList.mainContact"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->

                    <!--<el-row>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="类别代码">-->
                                <!--<el-input size="mini" v-model="upSupplierList.classCode"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="类别名称">-->
                                <!--<el-input size="mini" v-model="upSupplierList.className"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="手机号码">-->
                                <!--<el-input size="mini" v-model="upSupplierList.phoneNumber"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->

                    <!--<el-row>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="所属地区">-->
                                <!--<el-input size="mini" v-model="upSupplierList.region"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="银行账号">-->
                                <!--<el-input size="mini" v-model="upSupplierList.bankAccount"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->

                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="法人代表">-->
                                <!--<el-input size="mini" v-model="upSupplierList.corporateRepresentative"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->


                    <!--<el-row>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="传真">-->
                                <!--<el-input size="mini" v-model="upSupplierList.fax"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="8">-->

                            <!--<el-form-item label="邮箱">-->
                                <!--<el-input size="mini" v-model="upSupplierList.mailbox"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="全称">-->
                                <!--<el-input size="mini" v-model="upSupplierList.fullName"></el-input>-->
                            <!--</el-form-item>-->

                        <!--</el-col>-->
                    <!--</el-row>-->


                    <!--<el-row>-->
                        <!--<el-col :span="8">-->

                            <!--<el-form-item label="税号">-->
                                <!--<el-input size="mini" v-model="upSupplierList.tax"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="银行">-->
                                <!--<el-input size="mini" v-model="upSupplierList.bank"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="地址">-->
                                <!--<el-input size="mini" v-model="upSupplierList.address"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->


                    <!--<el-row>-->

                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="邮编">-->
                                <!--<el-input size="mini" v-model="upSupplierList.zipCode"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->

                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="网址">-->
                                <!--<el-input size="mini" v-model="upSupplierList.website"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="生日">-->
                                <!--<el-input size="mini" v-model="upSupplierList.birthday"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->


                    <!--<el-row>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="开票信息3">-->
                                <!--<el-input size="mini" v-model="upSupplierList.invoice02"></el-input>-->
                            <!--</el-form-item>-->

                        <!--</el-col>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="开票地址">-->
                                <!--<el-input size="mini" v-model="upSupplierList.billAddress"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->

                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="备注信息">-->
                                <!--<el-input size="mini" v-model="upSupplierList.remark"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->


                    <!--<el-row>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="信用额度">-->
                                <!--<el-input size="mini" v-model="upSupplierList.lineCredit"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->


                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="开票信息2">-->
                                <!--<el-input size="mini" v-model="upSupplierList.invoice01"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->

                        <!--<el-col :span="8">-->

                            <!--<el-form-item label="业务员">-->
                                <!--<el-input size="mini" v-model="upSupplierList.salesman"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->


                    <!--<el-row>-->
                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="公司名称">-->
                                <!--<el-input size="mini" v-model="upSupplierList.company"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                        <!--<el-col :span="8">-->

                            <!--<el-form-item label="经营范围">-->
                                <!--<el-input size="mini" v-model="upSupplierList.businessScope"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->

                        <!--<el-col :span="8">-->
                            <!--<el-form-item label="下次业务提示">-->
                                <!--<el-input size="mini" v-model="upSupplierList.businessTips"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->
                    <!--<el-form-item>-->
                        <!--<el-button size="mini" type="primary" @click="upsubmitForm('upSupplierList')">修改</el-button>-->
                        <!--<el-button size="mini" @click="upSupplier=false">取消</el-button>-->
                    <!--</el-form-item>-->

                <!--</el-form>-->
                <el-button size="mini" type="primary" @click="upsubmitForm('upSupplierList')">修改</el-button>
                <el-button size="mini" @click="upSupplier=false">取消</el-button>
            </el-dialog>



            <!--显示设置-->
            <el-dialog
                    title="显示设置"
                    :visible.sync="Settings"
                    width="450px"
                    :show-close="false"
            >
                <div style="text-align: left">
                    <el-row>
                        <el-col :span="8">
                            <el-checkbox v-model="unitCode">单位编码</el-checkbox>
                        </el-col>

                        <el-col :span="8">
                            <el-checkbox v-model="unitName">单位名称</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="mainContact">主联系人</el-checkbox>
                        </el-col>
                    </el-row>


                    <el-row>
                        <el-col :span="8">
                            <el-checkbox v-model="className">原材料供应商</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="zipCode">邮编</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="classCode">类别代码</el-checkbox>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="8">
                            <el-checkbox v-model="region">所属地区</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="address">地址</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="phoneNumber">手机号码</el-checkbox>
                        </el-col>
                    </el-row>


                    <el-row>
                        <el-col :span="8">
                            <el-checkbox v-model="mailbox">邮箱</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="fullName">全称</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="fax">传真</el-checkbox>
                        </el-col>
                    </el-row>


                    <el-row>
                        <el-col :span="8">
                            <el-checkbox v-model="tax">税号</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="bank">银行</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="bankAccount">银行账号</el-checkbox>
                        </el-col>
                    </el-row>


                    <el-row>
                        <el-col :span="8">
                            <el-checkbox v-model="billAddress">开票地址</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="invoice01">开票信息2</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="corporateRepresentative">法人代表</el-checkbox>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-checkbox v-model="invoice02">开票信息3</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="website">网址</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="remark">备注信息</el-checkbox>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-checkbox v-model="birthday">生日</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="salesman">业务员</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="lineCredit">信用额度</el-checkbox>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-checkbox v-model="company">公司名称</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="businessScope">经营范围</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="businessTips">下次业务提示</el-checkbox>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-checkbox v-model="createTime">创建时间</el-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <el-checkbox v-model="updateTime">修改时间</el-checkbox>
                        </el-col>
                    </el-row>
                </div>

            </el-dialog>

            <el-table
                    style="width: 100%"
                    border
                    stripe
                    height="750px"
                    :data="supplierList"
                    highlight-current-row
                    @selection-change="supplierSelection"

            >
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column
                        type="index"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="创建时间"
                        v-if="createTime"
                        prop="createTime"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="修改时间"
                        v-if="updateTime"
                        prop="createTime"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="unitCode"
                        label="单位编码"
                        prop="unitCode"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="unitName"
                        label="单位名称"
                        prop="unitName"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="mainContact"
                        label="主联系人"
                        prop="mainContact"
                        width="200"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="classCode"
                        prop="classCode"
                        label="类别代码"
                        width="180"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="className"
                        label="类别名称"
                        prop="className"
                        width="180"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="zipCode"
                        prop="zipCode"
                        label="邮编"
                        width="180"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        v-if="region"
                        label="所属地区"
                        prop="region"
                        width="160"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="address"
                        label="地址"
                        prop="address"
                        width="180"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="phoneNumber"
                        label="手机号码"
                        prop="phoneNumber"
                        width="150"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="传真"
                        width="120"
                        prop="fax"
                        v-if="fax"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="mailbox"
                        label="邮箱"
                        prop="mailbox"
                        width="120"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="fullName"
                        label="全称"
                        prop="fullName"
                        width="150"
                        align="center"
                ></el-table-column>


                <el-table-column
                        v-if="tax"
                        label="税号"
                        prop="tax"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="bank"
                        label="银行"
                        prop="bank"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="bankAccount"
                        label="银行账号"
                        prop="bankAccount"
                        width="200"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="corporateRepresentative"
                        prop="corporateRepresentative"
                        label="法人代表"
                        width="180"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="billAddress"
                        label="开票地址"
                        prop="billAddress"
                        width="180"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="invoice01"
                        prop="invoice01"
                        label="开票信息2"
                        width="180"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        v-if="invoice02"
                        label="开票信息3"
                        prop="invoice02"
                        width="160"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="website"
                        label="网址"
                        prop="website"
                        width="180"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="remark"
                        label="备注信息"
                        prop="remark"
                        width="150"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="信用额度"
                        width="120"
                        prop="lineCredit"
                        v-if="lineCredit"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="birthday"
                        label="生日"
                        prop="birthday"
                        width="120"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="salesman"
                        label="业务员"
                        prop="salesman"
                        width="150"
                        align="center"
                ></el-table-column>

                <el-table-column
                        label="公司名称"
                        width="120"
                        prop="company"
                        v-if="company"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="businessScope"
                        label="经营范围"
                        prop="businessScope"
                        width="120"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="businessTips"
                        label="下次业务提示"
                        prop="businessTips"
                        width="150"
                        align="center"
                ></el-table-column>


                <el-table-column
                        label="操作"
                        align="center"
                        fixed="right"
                        width="120"
                >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="upgoodspanel(scope.row)">修改</el-button>
                        <el-button :disabled="scope.row.recordState=='rs01'?(true):(false)" type="text" size="small" @click="delgoodspanel(scope.row)">删除</el-button>
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
    </div>
</template>

<script>
    export default {
        name: "supplier",
        data() {
            return {
                data: [{
                    //供应商分类查询
                    label: '全部',
                    id: 1,
                    children: [
                        {
                            id: 2,
                            label: '原材料供应商',
                        },
                        {
                            id: 3,
                            label: '辅料供应商',
                        }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                addSupplierList: {
                    //新建供应商
                    unitName: '',//单位名称
                    unitCode: '',//单位编码
                    mainContact: '',//"主联系人",
                    classCode: '',//"类别代码",
                    className: '',//"类别名称",
                    zipCode: '',//"邮编",
                    region: '',// "所属地区",
                    address: '',//"地址",
                    phoneNumber: '',// "手机号码",
                    fax: '',//"传真",
                    mailbox: '',//"邮箱",
                    fullName: '',// "全称",
                    tax: '',//"税号",
                    bank: '',//"银行",
                    bankAccount: '',//"银行账号",
                    corporateRepresentative: '',// "法人代表",
                    billAddress: '',//"开票地址",
                    invoice01: '',//"开票信息2",
                    invoice02: '',//"开票信息3",
                    dataState: '',// "string",
                    website: '',//"网址",
                    remark: '',//备注信息"
                    lineCredit: '',// "信用额度"
                    birthday: '',//"生日"
                    salesman: '',//业务员"
                    company: '',// "公司名称"
                    businessScope: '',//经营范围
                    businessTips: ''//"下次业务提示"

                },
                addSupplierRuee: {
                    //表单验证
                    unitName: [
                        {required: true, message: '请输入单位名称', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    unitCode: [
                        {required: true, message: '请输入单位编码', trigger: 'blur'}
                    ]
                },
                upSupplierList: {
                    //修改供应商
                    unitName: '',//单位名称
                    unitCode: '',//单位编码
                    mainContact: '',//"主联系人",
                    classCode: '',//"类别代码",
                    className: '',//"类别名称",
                    zipCode: '',//"邮编",
                    region: '',// "所属地区",
                    address: '',//"地址",
                    phoneNumber: '',// "手机号码",
                    fax: '',//"传真",
                    mailbox: '',//"邮箱",
                    fullName: '',// "全称",
                    tax: '',//"税号",
                    bank: '',//"银行",
                    bankAccount: '',//"银行账号",
                    corporateRepresentative: '',// "法人代表",
                    billAddress: '',//"开票地址",
                    invoice01: '',//"开票信息2",
                    invoice02: '',//"开票信息3",
                    dataState: '',// "string",
                    website: '',//"网址",
                    remark: '',//备注信息"
                    lineCredit: '',// "信用额度"
                    birthday: '',//"生日"
                    salesman: '',//业务员"
                    company: '',// "公司名称"
                    businessScope: '',//经营范围
                    businessTips: ''//"下次业务提示"

                },
                upSupplierRuee: {
                    //修改供应商表单验证
                    unitName: [
                        {required: true, message: '请输入单位名称', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    unitCode: [
                        {required: true, message: '请输入单位编码', trigger: 'blur'}
                    ]
                },
                suppllierPageNum: 1,//默认显示页数
                suppllierPageSize: 15,//默认显示条目数
                supplierList: [],//供应商数据列表
                addSupplier: false,//新建供应商面板
                upSupplier: false,//修改供应商面板

                /**
                 *
                 * 供应商列表字段显示隐藏
                 * **/
                unitCode: true, //单位编码
                createTime:true,//创建时间
                updateTime:true,//修改时间
                unitName: true, //单位名称
                mainContact: true,//主联系人
                classCode: true,//类别代码
                className: true,//原材料供应商
                zipCode: true,//邮编
                region: true,//所属地区
                address: true,//地址
                phoneNumber: true,//手机号码
                fax: true,//传真
                mailbox: true,//邮箱
                fullName: true,//全称
                tax: true,//税号
                bank: true,//银行
                bankAccount: true,//银行账号
                corporateRepresentative: true,//法人代表
                billAddress: true,//开票地址
                invoice01: true,//开票信息2
                invoice02: true,//开票信息3
                website: true,//网址
                remark: true,//备注信息
                lineCredit: true,//信用额度
                birthday: true,//生日
                salesman: true,//业务员
                company: true,//公司名称
                businessScope: true,//经营范围
                businessTips: true,//下次业务提示
                totalPage: 0,//总页数
                pageSize: 0,//单页个数
                totalRecord: 0,//总条数
                classType: '全部',//供应商分类查询
                Settings: false,//显示设置
                delStatusButGoods:true,//删除按钮
                supplierids: [],//供应商ID
                queryspare01: '',//查询其他字段
                queryname: '',//查询名称
                queryphoneNumber: '',//查询手机号码
                typedata:[],////用于储存数据，当表单发生改变时校验
            }
        },
        methods: {
            closeFun() {
                let obj = JSON.stringify(this.upSupplierList)
                let state = (obj == this.typedata)
                let that = this
                if (!state) {
                    this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '保存',
                        cancelButtonText: '放弃修改'
                    })
                        .then(() => {
                            that.upsubmitForm('upSupplierList')
                        })

                }

            },
            querySupplierData() {
                //供应商条件查询
                this.querySupplier()
            },
            supplierSelection(val) {
                //供应商信息多选
                this.supplierids.length = 0
                let listdata=[];//保存选中数据，判断是否允许删除
                val.forEach(item => {
                    this.supplierids.push(item.id)
                    listdata.push(item.recordState)
                })
                let HideShow=listdata.indexOf('rs01')
                if (val.length==0||HideShow!=-1){
                    this.delStatusButGoods=true
                } else {
                    this.delStatusButGoods=false
                }
            },
            addsubmitForm(formName) {
                //新建供应商
                let that=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.$store.state.addSuppier, this.addSupplierList).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success',
                                    onClose() {
                                        that.querySupplier()
                                    }
                                });
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        }).catch(err => {
                            this.$message.error(err);
                        })


                    } else {
                        this.$message.error('信息填写不完全!!！');
                        return false;
                    }
                });
            },
            upsubmitForm(formName) {
                //修改供应商
                this.typedata = JSON.stringify(this.upSupplierList)
                let that=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.$store.state.upSuppier, this.upSupplierList).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success',
                                    onClose() {
                                        that.querySupplier()
                                    }
                                });
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        }).catch(err => {
                            this.$message.error(err);
                        })


                    } else {
                        this.$message.error('error submit!!！');
                        return false;
                    }
                });
            },
            upgoodspanel(data) {
                //打开修改信息面板
                this.upSupplier = true
                this.upSupplierList = data
                this.typedata = JSON.stringify(data) //将数据转为字符串，进行修改验证
                console.log(this.typedata)
            },
            delgoodspanel(val){
              //单条删除供应商信息
                this.supplierids.length=0
                this.supplierids.push(val.id)
                this.delSupplier()
            },
            delSupplier() {
                //删除供应商信息
                let that=this
                this.$axios.post(this.$store.state.delSuppier, {ids: this.supplierids}).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                            onClose() {
                                that.querySupplier()
                            }
                        });
                    }
                    else {
                        this.$message.error(res.data.msg);
                    }
                })
            },
            //树形空间选中后的回调
            handleNodeClick(data) {
                this.classType = data.label
                this.querySupplier();
            },
            handleCurrentChange(val) {
                /**
                 * 分页
                 * */
                this.suppllierPageNum = val
                this.querySupplier()
            },
            //查询供应商信息
            querySupplier() {
                this.$axios.get(this.$store.state.suppllierPage, {
                    params: {
                        pageSize: this.suppllierPageSize,
                        pageNum: this.suppllierPageNum,
                        className: this.classType,
                        unitName: this.queryname,
                        phoneNumber: this.queryphoneNumber,
                        spare01: this.queryspare01
                    }
                }).then(res => {
                    this.supplierList = res.data.list
                    this.totalPage = res.data.totalPage//总页数
                    this.pageSize = res.data.pageSize//单页个数
                    this.totalRecord = res.data.totalRecord//总条数
                })
            }
        },
        created: function () {
            this.querySupplier()

        }
    }
</script>

<style scoped>
    .supplier {
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
        /*display: flex;*/
        background-color: #f8f8f8;
        /*justify-content: space-between;*/
        /*align-items: center;*/
    }
</style>