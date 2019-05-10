<template>
    <div class="production">
        <div class="menuBox">
            <div class="QueryConditions">
                <el-button size="mini" type="primary" class="el-icon-plus" @click="addProductionBtn">新建</el-button>

                <el-button type="primary" icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>
                <!--:disabled="auditStatusBut" 提交审核显示控制-->
                <el-button size="mini" type="primary">提交审核</el-button>

                <!--:disabled="submitStatusBut" 审核通过显示控制-->
                <el-button size="mini" type="primary">审核通过</el-button>
                <!--:disabled="submitStatusBut" 审核驳回显示控制-->
                <el-button size="mini" type="primary">审核驳回</el-button>

            </div>
            <div class=" QueryConditions QueryInput">
                <div>
                    <el-input size="mini" clearable v-model="conditionproduceCode" placeholder="生产计划单编号"></el-input>
                    <el-input size="mini" clearable v-model="conditionsstyleCode" placeholder="款式编号"></el-input>
                    <el-input size="mini" clearable v-model="conditionmerchantCode" placeholder="商家编号"></el-input>
                    <el-input size="mini" clearable v-model="conditionName" placeholder="商品名称"></el-input>
                    <div class="produ">
                        <el-select clearable placeholder="工艺流程" multiple size="mini" v-model="conditionprocessNode">
                            <el-option
                                    v-for="item in ProcessFunction"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>

                </div>

                <div>
                    <el-button type="primary" size="mini"
                               @click="conditionproduceCode='',conditionsstyleCode='',conditionmerchantCode='',conditionName='',conditionprocessNode=[]">
                        重置
                    </el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search"
                               @click="ProduQueryPage()">查询
                    </el-button>
                </div>
            </div>
        </div>

        <el-table
                border
                stripe
                :data="ProductionList"
                height="750px"
                @cell-dblclick="detailedQuery"
        >
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column align="center" type="index"></el-table-column>
            <el-table-column align="center" label="生产计划单编号" prop="produceCode"
                             width="160px"></el-table-column>
            <el-table-column align="center" label="预加工时间" prop="expectProcessTime"
                             width="170px"></el-table-column>
            <el-table-column align="center" label="预完工时间" prop="expectCompleteTime"
                             width="160px"></el-table-column>
            <el-table-column align="center" label="创建时间" prop="createTime"
                             width="180px"></el-table-column>
            <el-table-column align="center" label="修改时间" prop="updateTime"
                             width="180px"></el-table-column>
            <el-table-column align="center" label="备注" prop="remark"></el-table-column>
            <el-table-column align="center" label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button type="text" @click="upProceBtn(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-row>
            <el-col :span="10" :offset="14">
                <el-pagination
                        @current-change="productionpag"
                        :page-size="15"
                        layout="prev, pager, next, jumper"
                        :total="totalRecordNum">
                </el-pagination>
            </el-col>
        </el-row>

        <!--生产计划详情-->
        <el-dialog
                title="生产计划详情"
                :visible.sync="DetailsPlan"
                :show-close="false"
                width="1100px">
            <div class="QueryConditions">
                <el-button type="primary" icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>
                <el-button type="primary" icon="el-icon-view" size="mini" @click="workerSettingsBtn">派工设置</el-button>
            </div>

            <el-table
                    border
                    stripe
                    :data="DetailsPlanList"
                    @selection-change="selectionDetailsPlanList"
            >
                <el-table-column align="center" fixed="left" type="selection"></el-table-column>
                <el-table-column align="center" type="index"></el-table-column>
                <el-table-column align="center" v-if="ProductionOrderShow" label="生产计划单编号" prop="produceCode"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="styleNumberShow" label="款式编号" prop="styleCode"
                                 width="170px"></el-table-column>
                <el-table-column align="center" v-if="MerchantNumberShow" label="商家编号" prop="merchantCode"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="MerchantNameShow" label="商品名称" prop="goodsName"></el-table-column>
                <el-table-column
                        label="工艺流程"
                        width="230"
                        v-if="processShow"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.processNodeList">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" v-if="specificationsShow" label="规格(颜色)" prop="colour"
                                 width="100px"></el-table-column>
                <el-table-column align="center" v-if="NumberShow" label="数量" prop="craftNumber"></el-table-column>
                <el-table-column align="center" v-if="unitShow" label="单位" prop="unit"></el-table-column>
                <el-table-column align="center" v-if="bandShow" label="品牌" prop="brand"></el-table-column>
                <el-table-column align="center" width="100px" v-if="categoryShow" label="类别"
                                 prop="category"></el-table-column>

                <!--<el-table-column align="center" v-if="processShow" label="工艺流程" prop="processNodeList"-->
                <!--width="150px"></el-table-column>-->
                <el-table-column align="center" v-if="CreationTimeShow" label="创建时间" prop="createTime"
                                 width="180px"></el-table-column>
                <el-table-column align="center" v-if="ModifyTimeShow" label="修改时间" prop="updateTime"
                                 width="180px"></el-table-column>
                <el-table-column align="center" v-if="noteShow" label="备注" prop="remark"></el-table-column>
                <!--<el-table-column align="center" label="操作" fixed="right">-->
                <!--<template slot-scope="scope">-->
                <!--<el-button type="text" @click="upProceBtn(scope.row)">修改</el-button>-->
                <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <el-divider>派工详情</el-divider>

            <el-table
                    border
                    stripe
                    :data="dispatchingDetailsData"
                    @selection-change="selectionDetailsPlanList"
            >
                <el-table-column align="center" type="index"></el-table-column>
                <el-table-column align="center" v-if="ProductionOrderShow" label="生产计划单编号" prop="produceCode"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="styleNumberShow" label="派工单号" prop="produceCode"
                                 width="170px"></el-table-column>
                <el-table-column align="center" v-if="MerchantNumberShow" label="款式编号" prop="styleCode"
                                 width="160px"></el-table-column>
                <el-table-column align="center" v-if="MerchantNameShow" label="工厂" prop="factoryName"></el-table-column>
                <el-table-column
                        label="工艺流程"
                        width="120"
                        v-if="processShow"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.processNodeList">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" v-if="CreationTimeShow" label="创建时间" prop="createTime"
                                 width="180px"></el-table-column>
                <el-table-column align="center" v-if="noteShow" label="备注" prop="remark"></el-table-column>

            </el-table>

            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            background
                            :page-size="5"
                            @current-change="dispatchingDetailspag"
                            layout="prev, pager, next"
                            style="margin-top: 10px"
                            :total="dispatchingDetailsNum">
                    </el-pagination>
                </el-col>
            </el-row>

        </el-dialog>


        <!--生产计划详情显示设置-->
        <el-dialog
                title="显示设置"
                :visible.sync="Settings"
                width="450px"
                :show-close="false"
        >
            <div style="text-align: left">
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="ProductionOrderShow">生产计划单编号</el-checkbox>
                    </el-col>

                    <el-col :span="12">
                        <el-checkbox v-model="styleNumberShow">款式编号</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="MerchantNumberShow">商家编号</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="MerchantNameShow">商品名称</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="specificationsShow">规格(颜色)</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="NumberShow">数量</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="unitShow">单位</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="bandShow">品牌</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="categoryShow">类别</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="processShow">工艺流程</el-checkbox>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="CreationTimeShow">创建时间</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="ModifyTimeShow">修改时间</el-checkbox>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="noteShow">备注</el-checkbox>
                    </el-col>


                </el-row>
            </div>

        </el-dialog>


        <!--生产计划单派工设置-->
        <el-dialog
                title="派工设置"
                :visible.sync="workerSettings"
                width="1000px"
                :show-close="false"
        >
            <div class="QueryConditions QueryInput">
                <el-button type="primary" size="mini" @click="generateDispatch">确认派工</el-button>
            </div>
            <!--选中的派工单详情信息-->
            <el-table
                    :data="Dispatched"
                    border
                    stripe
                    row-key="uuid"
                    style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <!--<el-checkbox v-for="city in  props.row.dispatchedDetailList.keys()"-->
                        <!--:label="city" :key="city">-->
                        <!--{{city=='weave'?'织造':city=='seamHead'?'缝头':city=='stereoType'?'定型':'包装'}}-->
                        <!---->
                        <!--</el-checkbox>-->
                        <el-table
                                border
                                stripe
                                :data="props.row.dispatchedDetailList"
                        >
                            <el-table-column prop="processNode" label="工艺流程">
                                <template slot-scope="aaa">
                                    {{aaa.row.processNode=='weave'?'织造':aaa.row.processNode=='seamHead'?'缝头':aaa.row.processNode=='stereoType'?'定型':'包装'}}
                                </template>
                                <!--<template>-->
                                <!--{{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}-->
                                <!--</template>-->
                            </el-table-column>
                            <el-table-column prop="factoryName" label="工厂"></el-table-column>
                        </el-table>


                    </template>
                </el-table-column>
                <el-table-column align="center" label="款式编号" prop="styleCode"
                                 width="170px"></el-table-column>
                <el-table-column align="center" label="商家编号" prop="merchantCode"
                                 width="160px"></el-table-column>
                <el-table-column align="center" label="商品名称" prop="goodsName"></el-table-column>

                <el-table-column align="center" label="单位" prop="unit"></el-table-column>

                <el-table-column
                        label="工艺流程"
                        width="230"
                        v-if="processShow"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.processNodeList">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>


            </el-table>

            <el-divider content-position="right"></el-divider>
            <div class="QueryConditions QueryInput">

                <div>
                    <el-input size="mini" placeholder="所属公司" v-model="querycompany"></el-input>

                    <el-input size="mini" placeholder="名称" v-model="queryname"></el-input>

                    <el-input size="mini" placeholder="其他" v-model="queryspare01"></el-input>
                </div>

                <div>
                    <el-button size="mini" type="primary" @click="factorySettings=true">显示设置</el-button>
                    <el-button type="primary" size="mini"
                               @click="queryspare01='',queryname='',querycompany=''">
                        重置
                    </el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search"
                               @click="factoryquery()">查询
                    </el-button>
                </div>


            </div>
            <el-table
                    :data="factoryList"
                    border
                    stripe
                    style="width: 100%">

                <el-table-column
                        align="center"
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        v-if="nameShow"
                        width="150"
                        label="名称">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="code"
                        v-if="codeShow"
                        label="编码"
                        width="100"
                >
                </el-table-column>
                <el-table-column
                        label="工厂职能"
                        v-if="functionShow"
                        width="230"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.technologys">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="address"
                        v-if="addressShow"
                        label="城市"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        v-if="detailedAddressShow"
                        prop="detailedAddress"
                        label="详细地址"
                        width="180"
                >
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="company"
                        v-if="companyShow"
                        label="所属公司"

                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="contact"
                        v-if="contactShow"
                        label="联系人"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="phoneNumber"
                        width="150"
                        v-if="phoneNumberShow"
                        label="手机号码">
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        prop="createTime"
                        width="180"
                        v-if="createTimeShow"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="修改时间"
                        prop="updateTime"
                        width="180"
                        v-if="updateTimeShow"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="remark"
                        width="100"
                        v-if="remarkShow"
                        label="备注">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作"
                        width="120"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="plantSelection(scope.row)">选择</el-button>

                    </template>
                </el-table-column>


            </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            @current-change="factorylistpag"
                            :page-size="15"
                            layout="prev, pager, next, jumper"
                            :total="totalRecordNum">
                    </el-pagination>
                </el-col>
            </el-row>


        </el-dialog>


        <!--派工单选择工厂职能-->
        <el-dialog
                title="工厂职能选择"
                class="functions"
                :show-close="false"
                :visible.sync="functionsSelect"
                width="400px">
            <!--technologys-->
            <el-checkbox-group v-model="checkList" v-for="city in  DispatchedFactory.technologys" :key="city">

                <!--<el-checkbox-->
                <!--:label="city=='weave'?'织造':city=='seamHead'?'缝头':city=='stereoType'?'定型':'包装'">-->
                <el-checkbox
                        :label="city=='weave'?'织造':city=='seamHead'?'缝头':city=='stereoType'?'定型':'包装'">
                </el-checkbox>

            </el-checkbox-group>
            <el-button size="mini" @click="seave">保存</el-button>
        </el-dialog>


        <!--生产计划单派工设置工厂信息显示设置-->
        <el-dialog
                title="显示设置"
                :show-close="false"
                :visible.sync="factorySettings"
                width="400px">
            <div style="text-align: left">
                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="nameShow">名称</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="codeShow">编码</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="addressShow">城市</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="detailedAddressShow">详细地址</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="companyShow">所属公司</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="contactShow">联系人</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="phoneNumberShow">手机号码</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="createTimeShow">创建时间</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="updateTimeShow">修改时间</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>

                    <el-col :span="8">
                        <el-checkbox v-model=" functionShow">工厂职能</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model=" remarkShow">备注</el-checkbox>
                    </el-col>
                </el-row>
            </div>


        </el-dialog>


        <!--工艺引入面板-->
        <el-dialog
                title="工艺引入"
                :visible.sync="ProcessIntroduction"
                :show-close="false"
                width="1100px">
            <div class="QueryConditions QueryInput">
                <div>

                    <el-input clearable size="mini" v-model="styleCodeQuery" placeholder="款式编号"></el-input>
                    <el-input clearable size="mini" v-model="merchantCodeQuery" placeholder="商家编码"></el-input>
                    <el-input clearable size="mini" v-model="nameQuery" placeholder="名称"></el-input>

                    <el-select size="mini" clearable v-model="categoryQuery" placeholder="类别">
                        <el-option
                                v-for="item in categorySelect"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </div>

                <div>
                    <el-button type="primary" size="mini"
                               @click="categoryQuery='',nameQuery='',merchantCodeQuery='',styleCodeQuery=''">重置
                    </el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search" @click="PricessQuery()">查询</el-button>
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="BatchIntroduction()">批量引入
                    </el-button>
                </div>

            </div>

            <el-table
                    border
                    stripe
                    ref="multipleTable"
                    :data="ProcessList"
                    highlight-current-row
                    @selection-change="MultiplePro"
            >

                <el-table-column
                        type="index"
                        align="center">
                </el-table-column>
                <el-table-column
                        :selectable="selectable"
                        type="selection"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="款式编号"
                        width="200"
                        prop="styleCode"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="商家编码"
                        prop="merchantCode"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="工艺名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="流程节点"
                        width="230"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.processNodeList">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                        label="颜色"
                        prop="colour"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="品牌"
                        prop="brand"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="类别"
                        prop="category"
                        width="100"
                        align="center">
                </el-table-column>


                <el-table-column
                        label="操作"
                        align="center"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="Introduce(scope.row)" :disabled="scope.row.show">引入
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            @current-change="Processlistpag"
                            :total="totalRecordNum"
                            :page-size="5"
                    >
                    </el-pagination>


                    <!---->
                    <!--<el-pagination-->
                    <!--@current-change="Processlistpag"-->
                    <!--:page-size="5"-->
                    <!--layout="prev, pager, next, jumper"-->
                    <!--:total="totalRecordNum">-->
                    <!--</el-pagination>-->
                </el-col>
            </el-row>


        </el-dialog>

        <!--新建生产计划单面板-->
        <el-dialog
                title="新建生产计划单"
                :visible.sync="addProduction"
                :show-close="false"
                width="1100px">
            <div class="QueryConditions">
                <el-button size="mini" type="primary" @click="ProcessIntroductionBtn">工艺信息引入</el-button>
                <el-button size="mini" type="primary" @click="delProdufuns">批量移除</el-button>
                <el-date-picker
                        style="margin-left: 0.5em"
                        v-model="value2"
                        size="mini"
                        type="datetimerange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="预加工时间"
                        end-placeholder="预完工时间"
                        align="right">
                </el-date-picker>

            </div>
            <el-table
                    border
                    :data="ScheduleList"
                    stripe
                    @selection-change="addProductionMultiple"
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
                        width="165"
                        prop="styleCode"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="商家编码"
                        prop="merchantCode"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="工艺名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="数量"
                        width="100px"
                        align="center">
                    <template slot-scope="scope">

                        <el-input v-model="scope.row.craftNumber"
                                  size="mini"
                                  style="width: 75px"
                                  oninput="value=value.replace(/[^\d]/g,'')"
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="流程节点"
                        width="205"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.processNodeList">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                        label="颜色"
                        prop="colour"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="品牌"
                        prop="brand"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="类别"
                        prop="category"
                        width="90"
                        align="center">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="rmproduction(scope.row)">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="btnBox">
                <el-button size="mini" type="primary" @click="addProductiondata">添加</el-button>
                <el-button size="mini" type="primary" @click="addProduction=false">取消</el-button>
            </div>


        </el-dialog>


        <!--修改生产计划单面板-->
        <el-dialog
                title="修改生产计划单"
                :visible.sync="upaddProduction"
                @closed="closeFun"
                :show-close="false"
                width="1100px">
            <div class="QueryConditions">
                <el-button size="mini" type="primary" @click="upProcessIntroductionBtn">工艺信息引入</el-button>
                <el-button size="mini" type="primary" @click="updelProdufuns">批量移除</el-button>
                <el-date-picker
                        style="margin-left: 0.5em"
                        v-model="upTime"
                        size="mini"
                        @change="upTimeFun"
                        type="datetimerange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="预加工时间"
                        end-placeholder="预完工时间"
                        align="right">
                </el-date-picker>
            </div>
            <el-table
                    border
                    :data="upScheduleList.producePlanDetailBeanList"
                    stripe
                    @selection-change="upaddProductionMultiple"
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
                        width="165"
                        prop="styleCode"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="商家编码"
                        prop="merchantCode"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="工艺名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="数量"
                        width="100px"
                        align="center">
                    <template slot-scope="scope">

                        <el-input v-model="scope.row.craftNumber"
                                  size="mini"
                                  style="width: 75px"
                                  oninput="value=value.replace(/[^\d]/g,'')"
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="流程节点"
                        width="205"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.processNodeList">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                        label="颜色"
                        prop="colour"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="品牌"
                        prop="brand"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="类别"
                        prop="category"
                        width="90"
                        align="center">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="操作"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="uprmproduction(scope.row)">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="btnBox">
                <el-button type="danger" size="mini" @click="delProduction">删除计划单</el-button>
                <el-button size="mini" type="primary" :disabled="upsaveShow" @click="upaddProductiondata">保存</el-button>
                <el-button size="mini" type="primary" @click="upaddProduction=false">取消</el-button>
            </div>


        </el-dialog>

        <!--修改工艺引入面板-->
        <el-dialog
                title="修改工艺引入"
                :visible.sync="upProcessIntroduction"
                :show-close="false"
                width="1100px">
            <div class="QueryConditions QueryInput">
                <div>

                    <el-input clearable size="mini" v-model="styleCodeQuery" placeholder="款式编号"></el-input>
                    <el-input clearable size="mini" v-model="merchantCodeQuery" placeholder="商家编码"></el-input>
                    <el-input clearable size="mini" v-model="nameQuery" placeholder="名称"></el-input>

                    <el-select size="mini" clearable v-model="categoryQuery" placeholder="类别">
                        <el-option
                                v-for="item in categorySelect"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </div>

                <div>
                    <el-button type="primary" size="mini"
                               @click="categoryQuery='',nameQuery='',merchantCodeQuery='',styleCodeQuery=''">重置
                    </el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search" @click="PricessQuery()">查询</el-button>
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="upBatchIntroduction()">批量引入
                    </el-button>
                </div>

            </div>

            <el-table
                    border
                    stripe
                    ref="upmultipleTable"
                    :data="upProcessList"
                    highlight-current-row
                    @selection-change="upMultiplePro"
            >

                <el-table-column
                        type="index"
                        align="center">
                </el-table-column>
                <el-table-column
                        :selectable="selectable"
                        type="selection"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="款式编号"
                        width="200"
                        prop="styleCode"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="商家编码"
                        prop="merchantCode"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="工艺名称"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="流程节点"
                        width="230"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag type="danger" v-for="item in scope.row.processNodeList">
                            {{item=='weave'?'织造':item=='seamHead'?'缝头':item=='stereoType'?'定型':'包装'}}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                        label="颜色"
                        prop="colour"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="品牌"
                        prop="brand"
                        align="center">
                </el-table-column>
                <el-table-column
                        label="类别"
                        prop="category"
                        width="100"
                        align="center">
                </el-table-column>


                <el-table-column
                        label="操作"
                        align="center"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="upIntroduce(scope.row)" :disabled="scope.row.show">引入
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            @current-change="Processlistpag"
                            :total="totalRecordNum"
                            :page-size="5"
                    >
                    </el-pagination>


                    <!---->
                    <!--<el-pagination-->
                    <!--@current-change="Processlistpag"-->
                    <!--:page-size="5"-->
                    <!--layout="prev, pager, next, jumper"-->
                    <!--:total="totalRecordNum">-->
                    <!--</el-pagination>-->
                </el-col>
            </el-row>


        </el-dialog>
    </div>
</template>

<script>

    import {regionDataPlus, CodeToText} from 'element-china-area-data'


    export default {
        name: "production",
        data() {
            return {
                //时间选择
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                value2: '',
                upTime: [],//修改计划单时间
                ProcessFunction: [
                    //工艺流程
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
                technology: [],//工艺流程Value值

                addProduction: false,//新建生产计划单面板

                upaddProduction: false,//修改生产计划单面板

                ProcessIntroduction: false,//工艺引入面板
                upProcessIntroduction: false,//修改工艺引入面板
                Settings: false,//显示设置面板
                workerSettings: false,//派工设置面板
                DetailsPlan: false,//生产计划详情面板
                DetailsPlanList: [],//生产计划详情数据

                /**
                 * 生产计划详情显示设置
                 * */
                ProductionOrderShow: true,// 生产计划单编号
                styleNumberShow: true,//款式编号
                MerchantNumberShow: true,//商家编号
                MerchantNameShow: true,// 商品名称
                specificationsShow: true,// 规格
                NumberShow: true,//数量
                unitShow: true,//单位
                bandShow: true,//品牌
                categoryShow: true,//类别
                processShow: true,//工艺流程
                CreationTimeShow: true,//创建时间
                ModifyTimeShow: true,//修改时间
                noteShow: true,//备注


                pageNumQuery: 1,//分页查询默认显示页数
                ProcessList: [],//工艺单数据
                upProcessList: [],//修改时工艺单数据
                styleCodeQuery: '',//款式编号
                merchantCodeQuery: '',//商家编码
                nameQuery: '',//工艺名称
                categoryQuery: '',//类别
                totalRecordNum: 0,//总条目数
                categorySelect: [
                    //工艺单类别
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
                ScheduleList: [],//新建生产计划单数据
                MultipleProList: [],//添加时多选工艺单数据（准备添加到数组的数据）
                addProductionMultipleList: [],//新建生产计划单数据多选

                upScheduleList: {
                    //修改生产计划单数据
                    id: '',
                    producePlanDetailBeanList: [],
                    expectProcessTime: '',//预计加工时间
                    expectCompleteTime: '',//预计完工时间
                },
                upMultipleProList: [],//修改时多选工艺单数据（准备添加到数组的数据）
                upaddProductionMultipleList: [],//修改生产计划单数据多选

                ProdupageNum: 1,//访问页数

                conditionsstyleCode: '',//生产计划单查询（款式编号）
                conditionproduceCode: '',//生产计划单编号
                conditionmerchantCode: '',//商家编号
                conditionName: '',//商品名称
                conditionprocessNode: [],//工艺流程
                ProductionList: [],//生产计划单数据
                typedata: '',//用于储存数据，当表单发生改变时校验
                upsaveShow: false,//修改生产计划单保存按钮显示控制
                delID: [],//删除生产计划单ID
                str: '',//生产计划单 工艺查询将数组转字符串

                /**
                 * 派工设置工厂查询信息
                 * **/
                pageSizeFactory: 5,//每页条目数
                pageNumFactory: 1,//当前页数
                factoryList: [],//工厂数据集合
                queryspare01: '',//查询其他
                queryname: '',//查询名称
                querycompany: '',//查询所属公司

                /**
                 * 派工设置显示设置
                 * **/
                factorySettings: false,//派工设置工厂信息显示设置面板
                nameShow: true,//名称
                codeShow: true,//编码
                functionShow: true,//工厂职能
                addressShow: true,//城市
                detailedAddressShow: true,//详细地址
                companyShow: true,//所属公司
                contactShow: true,//联系人
                phoneNumberShow: true,//手机号码
                createTimeShow: true,//创建时间
                updateTimeShow: true,//修改时间
                remarkShow: true,//备注


                Dispatched: [],//选择的派工单信息
                functionsSelect: false,//选择工厂职能面板
                DispatchedFactory: '',//选择的工厂数据
                checkList: [],//选择工厂时选中的工厂职能
                dispatchingDetailsPageNum: 1,//派工详情默认显示页数
                dispatchingDetailsData: [],//派工详情数据
                dispatchingDetailsNum: 0,//派工详情总条目数
                producitonUUID: '',//生产计划单双击获取的UUID

            }
        },

        methods: {
            generateDispatch() {
                //生成派工单

                // console.log(this.Dispatched)
                // this.$axios.post(this.$store.state.addDispatch, this.Dispatched).then(res => {
                //     console.log(res)
                // })
                let stateArr = this.Dispatched.every(item => {

                    return item.dispatchedDetailList.length === item.processNodeList.length

                })
                if (stateArr) {
                    this.$axios.post(this.$store.state.addDispatch, this.Dispatched).then(res => {
                        console.log(res)
                    })
                }else {
                    this.$message.error('还有单据未选择派工派工！');
                }


            },


            seave() {
                //保存选中的工厂职能
                let dataArr = []
                // dataArr = this.checkList//选中工厂职能数据转换
                this.checkList.forEach(l => {
                    let a = l === '织造' ? 'weave' : l === '缝头' ? 'seamHead' : l === '定型' ? 'stereoType' : 'pack'
                    dataArr.push(a)
                })
                console.log(dataArr)
                this.functionsSelect = false
                let data = this.Dispatched//选择的派工单信息
                let factory = this.DispatchedFactory//选择的工厂数据
                data.forEach(item => {
                    console.log(item.processNodeList)
                    item.processNodeList.forEach(k => {
                        console.log(k)

                        if (item.dispatchedDetailList.length < item.processNodeList.length) {
                            let param = {processNode: '', factoryUuid: '', factoryName: ''};
                            // param['processType'] = '';
                            dataArr.forEach(j => {
                                if (k === j) {
                                    param.processNode = j;
                                    param.factoryUuid = factory.uuid;//此时param对象的键名字为id而不是idNa
                                    param.factoryName = factory.name;
                                    item.dispatchedDetailList.push(param)
                                }

                            })

                        }

                    })


                })


                console.log(data)
            }
            ,
            plantSelection(data) {
                console.log(data)
                //派工设置选择工厂
                this.DispatchedFactory = data
                this.functionsSelect = true

            }
            ,
            selectionDetailsPlanList(data) {
                //选中需要派单的信息

                this.Dispatched = data
                console.log(data)
                // this.Dispatched.children=data.processNodeList
                this.Dispatched.forEach(item => {
                    item.dispatchedDetailList = []
                })
            }
            ,
            workerSettingsBtn() {
                //派工设置按钮
                if (this.Dispatched.length != 0) {
                    this.workerSettings = true;
                    this.factoryquery()
                } else {
                    this.$message.error('还未选择需要派工的信息！');
                }

            }
            ,
            dispatchingDetailspag(val) {
                //派工详情分页按钮
                this.dispatchingDetailsPageNum = val
                this.dispatchingDetailsFun()
            }
            ,
            detailedQuery(data) {
                //生产计划单双击事件
                this.producitonUUID = data.uuid
                this.DetailsPlan = true
                /**
                 *
                 * 生产计划单明细
                 * */
                this.$axios.get(this.$store.state.produceplanselect, {
                    params: {uuid: data.uuid}
                }).then(res => {
                    console.log(res)
                    this.DetailsPlanList = res.data.data.producePlanDetailBeanList
                })
                this.dispatchingDetailsFun()
            }
            ,
            dispatchingDetailsFun() {
                /**
                 *
                 * 生产计划单明细派工信息
                 * */
                this.$axios.get(this.$store.state.dispatchPage, {
                    params: {produceUuid: this.producitonUUID, pageSize: 5, pageNum: this.dispatchingDetailsPageNum}
                }).then(res => {
                    console.log(res)
                    this.dispatchingDetailsData = res.data.list
                    this.dispatchingDetailsNum = res.data.totalRecord
                })
            }
            ,
            factorylistpag(val) {
                //工厂信息分页
                this.pageNumFactory = val
                this.factoryquery()
            }
            ,

            factoryquery() {
                //工厂信息分页查询
                this.$axios.get(this.$store.state.factoryPage, {
                    params: {
                        pageSize: this.pageSizeFactory, pageNum: this.pageNumFactory,
                        company: this.querycompany, name: this.queryname, spare01: this.queryspare01
                    }
                }).then(res => {
                    console.log(res)
                    this.factoryList = res.data.list
                    this.totalRecordNum = res.data.totalRecord
                })
            }
            ,
            upTimeFun() {
                //修改生产计划单时，时间选择控件值发生变化时回调
                this.upScheduleList.expectProcessTime = this.upTime[0]
                this.upScheduleList.expectCompleteTime = this.upTime[1]
            }
            ,
            productionpag(val) {
                //工艺单信息分页

                this.pageNumQuery = val
                this.ProduQueryPage()
            }
            ,
            closeFun() {
                //数据修改验证

                if (this.upScheduleList.producePlanDetailBeanList.length != 0) {

                    let obj = JSON.stringify(this.upScheduleList)
                    let state = (obj == this.typedata)
                    let that = this
                    if (!state) {
                        this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
                            distinguishCancelAndClose: true,
                            confirmButtonText: '保存',
                            cancelButtonText: '放弃修改'
                        })
                            .then(() => {
                                that.upaddProductiondata()
                            })

                    }
                }


            }
            ,
            delProduction() {
                //删除生产计划单
                let that = this
                this.$confirm('此操作将永久删除该条订单记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post(this.$store.state.deleteproduction, {
                        uuidList: this.delID
                    }).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: '删除成功',
                                type: 'success',
                                onClose() {
                                    that.ProduQueryPage()
                                    that.upaddProduction = false
                                }
                            });
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })


                })
            }
            ,
            upProceBtn(data) {
                //生产计划单修改按钮
                this.delID.push(data.produceId)//将id赋值.
                this.upsaveShow = false//显示修改保存按钮
                this.$axios.get(this.$store.state.basicInformationPro, {
                    params: {uuid: data.uuid}
                }).then(res => {
                    this.upaddProduction = true
                    this.upScheduleList.producePlanDetailBeanList = res.data.data.producePlanDetailBeanList
                    this.upScheduleList.id = data.produceId
                    this.upScheduleList.expectProcessTime = res.data.data.expectProcessTime//预计加工时间
                    this.upScheduleList.expectCompleteTime = res.data.data.expectCompleteTime//预计完工时间

                    this.upTime = []
                    if (res.data.data.expectProcessTime != null && res.data.data.expectCompleteTime != null) {
                        this.upTime.push(res.data.data.expectProcessTime)//预计加工时间控件绑定值
                        this.upTime.push(res.data.data.expectCompleteTime)//预计完工时间绑定值
                    }

                    console.log(res.data)
                    this.typedata = JSON.stringify(this.upScheduleList)//将数据转为字符串，进行修改验证
                })
            }
            ,
            ProduQueryPage() {
                //生产计划单分页查询

                this.str = ''//流程查询，将数组转拼接成字符串
                this.conditionprocessNode.forEach(item => {
                    this.str += item + ','
                })
                this.str = this.str.substring(0, this.str.length - 1)


                this.$axios.get(this.$store.state.ProductionQueryPage, {
                    params: {
                        pageSize: 15,
                        pageNum: this.pageNumQuery,
                        styleCode: this.conditionsstyleCode,
                        produceCode: this.conditionproduceCode,
                        merchantCode: this.conditionmerchantCode,
                        name: this.conditionName,
                        processNode: this.str
                    }
                }).then(res => {
                    this.ProductionList = res.data.list
                    this.totalRecordNum = res.data.totalRecord
                    console.log(res)
                })
            }
            ,
            addProductiondata() {
                //添加生产计划单

                let a = {
                    producePlanDetailBeanList: this.ScheduleList,
                    expectProcessTime: this.value2[0],
                    expectCompleteTime: this.value2[1]
                }

                if (a.producePlanDetailBeanList.length == 0 || a.expectProcessTime == '' || a.expectCompleteTime == '') {
                    this.$message.error('信息填写不完全');
                } else {
                    let that = this
                    this.$axios.post(this.$store.state.addProduction, a).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                                onClose() {
                                    that.ProduQueryPage()
                                    that.addProduction = false
                                }
                            });
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                }

            }
            ,


            upaddProductiondata() {
                //修改生产计划单


                let that = this
                this.$axios.post(this.$store.state.addProduction, this.upScheduleList).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '保存成功',
                            type: 'success',
                            onClose() {
                                that.typedata = JSON.stringify(that.upScheduleList)
                                that.ProduQueryPage()
                                that.upaddProduction = false
                            }
                        });
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })

                console.log(this.upScheduleList)
            }
            ,
            delProdufuns() {
                //批量移除  新建生产计单 工艺单信息多选
                //批量移除原材料信息
                /**
                 * 1.当匹配到想同数据时，进行删除
                 * 2.先将原材料数据全部选中，再取消选中，从而达到刷新效果
                 * **/

                this.addProductionMultipleList.forEach(item => {
                    this.ScheduleList.forEach(j => {
                        if (item == j) {
                            this.ScheduleList[this.ScheduleList.indexOf(item)].show = false
                            this.ScheduleList.splice(this.ScheduleList.indexOf(item), 1)
                            this.$refs.multipleTable.toggleRowSelection();
                            this.$refs.multipleTable.clearSelection();
                        }

                    })
                })
            }
            ,
            updelProdufuns() {
                //批量移除  新建生产计单 工艺单信息多选
                //批量移除原材料信息
                /**
                 * 1.当匹配到想同数据时，进行删除
                 * 2.先将原材料数据全部选中，再取消选中，从而达到刷新效果
                 * **/


                console.log(this.upScheduleList.producePlanDetailBeanList.length)
                console.log(this.upsaveShow)
                this.upaddProductionMultipleList.forEach(item => {
                    this.upScheduleList.producePlanDetailBeanList.forEach(j => {
                        if (item == j) {
                            this.upScheduleList.producePlanDetailBeanList[this.upScheduleList.producePlanDetailBeanList.indexOf(item)].show = false
                            this.upScheduleList.producePlanDetailBeanList.splice(this.upScheduleList.producePlanDetailBeanList.indexOf(item), 1)
                            // this.$refs.upmultipleTable.toggleRowSelection();
                            // this.$refs.upmultipleTable.clearSelection();
                        }

                    })
                })
                // upsaveShow
                if (this.upScheduleList.producePlanDetailBeanList.length == 0) {
                    //判断要修改的数据，工艺单数据是否为空，为空就无法保存
                    this.upsaveShow = true
                }
            }
            ,
            addProductionMultiple(data) {
                //新建生产计单 工艺单信息多选
                this.addProductionMultipleList = []
                this.addProductionMultipleList = data
            }
            ,
            upaddProductionMultiple(data) {
                //新建生产计单 工艺单信息多选
                this.upaddProductionMultipleList = []
                this.upaddProductionMultipleList = data
            }
            ,
            rmproduction(data) {
                //移除工艺单信息（单个移除）
                let index = this.ScheduleList.indexOf(data)
                delete data.show
                this.ScheduleList.splice(index, 1)

                let listArr = this.ProcessList.filter(item => {
                    return data.styleCode === item.styleCode
                })
                listArr.forEach(item => {
                    item.show = false
                })
                this.$refs.multipleTable.toggleRowSelection();
                this.$refs.multipleTable.clearSelection();


            }
            ,
            uprmproduction(data) {
                //移除工艺单信息（单个移除）
                let index = this.upScheduleList.producePlanDetailBeanList.indexOf(data)
                delete data.show
                this.upScheduleList.producePlanDetailBeanList.splice(index, 1)

                let listArr = this.upProcessList.filter(item => {
                    return data.styleCode === item.styleCode
                })
                listArr.forEach(item => {
                    item.show = false
                })
                // this.$refs.upmultipleTable.toggleRowSelection();
                // this.$refs.upmultipleTable.clearSelection();
                if (this.upScheduleList.producePlanDetailBeanList.length == 0) {
                    //判断要修改的数据，工艺单数据是否为空，为空就无法保存
                    this.upsaveShow = true
                }

            }
            ,
            MultiplePro(data) {
                //多选工艺单信息
                this.MultipleProList = []
                this.MultipleProList = data

                console.log(this.MultipleProList)

            }
            ,
            upMultiplePro(data) {
                //修改多选工艺单信息
                this.upMultipleProList = []
                this.upMultipleProList = data

                console.log(this.upMultipleProList)

            }
            ,
            //
            BatchIntroduction() {
                //批量引入
                //ScheduleList: [],//新建生产计划单数据


                this.MultipleProList.forEach(item => {
                    if (item.show != true) {
                        this.ScheduleList.push(item)
                        item.show = true
                    } else {
                        this.$message.error('同一条记录无法重复添加哦！');
                    }

                })

                //取消选中状态
                this.$refs.multipleTable.clearSelection();


            }
            ,
            upBatchIntroduction() {
                //修改工艺单批量引入
                //ScheduleList: [],//新建生产计划单数据


                this.upMultipleProList.forEach(item => {
                    if (item.show != true) {
                        this.upScheduleList.producePlanDetailBeanList.push(item)
                        item.show = true
                    } else {
                        this.$message.error('同一条记录无法重复添加哦！');
                    }

                })

                //取消选中状态
                this.$refs.upmultipleTable.clearSelection();


            }
            ,
            selectable(row, index) {
                //判断是否可选
                if (row.show !== true) {
                    return true
                } else {
                    return false
                }
            }
            ,
            Introduce(data) {
                //工艺信息引入(单个)
                data.show = true
                this.ScheduleList.push(data)
            }
            ,
            upIntroduce(data) {
                //修改工艺信息引入(单个)
                data.show = true
                this.upScheduleList.producePlanDetailBeanList.push(data)
            }
            ,
            addProductionBtn() {
                //新建生产计划单
                this.addProduction = true

            }
            ,
            upProcessIntroductionBtn() {
                //工艺信息引入按钮
                this.upProcessIntroduction = true
                this.PricessQuery()//工艺单信息查询
            }
            ,
            ProcessIntroductionBtn() {
                //工艺信息引入按钮
                this.ProcessIntroduction = true
                this.PricessQuery()//工艺单信息查询
            }
            ,
            Processlistpag(val) {
                //工艺单分页
                this.pageNumQuery = val
                this.PricessQuery()
            }
            ,
            PricessQuery() {
                //工艺单分页查询

                this.$axios.get(this.$store.state.PricessQueryPage, {
                    params: {
                        pageSize: 10,
                        pageNum: this.pageNumQuery,
                        styleCode: this.styleCodeQuery,
                        merchantCode: this.merchantCodeQuery,
                        name: this.nameQuery,
                        category: this.categoryQuery
                    }
                }).then(res => {
                    this.ProcessList = res.data.list
                    this.upProcessList = res.data.list
                    this.totalRecordNum = res.data.totalRecord


                    /**
                     * 新建部分
                     * */
                    let materArr = this.ProcessList
                    let mArr = this.ScheduleList
                    let items = []
                    mArr.forEach(item => {
                        items.push(item.styleCode)
                    })
                    let list = materArr.filter(item => {
                        return items.indexOf(item.styleCode) != -1
                    });
                    list.forEach(item => {
                        item.show = true
                    })


                    /**
                     * 修改部分
                     * */
                    let upmaterArr = this.upProcessList
                    let upmArr = this.upScheduleList.producePlanDetailBeanList
                    let upitems = []
                    upmArr.forEach(item => {
                        items.push(item.styleCode)
                    })
                    let uplist = materArr.filter(item => {
                        return items.indexOf(item.styleCode) != -1
                    });
                    uplist.forEach(item => {
                        item.show = true
                    })

                })
            }
            ,
        },
        created: function () {
            this.ProduQueryPage()//生产计划单分页查询
        }


    }
</script>

<style scoped>
    .el-dialog .el-checkbox-group {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        padding: 10px;
    }

    .el-select, .el-input {
        width: 500px
    }

    .btnBox {
        text-align: right;
        margin-top: 0.5em;
    }

</style>