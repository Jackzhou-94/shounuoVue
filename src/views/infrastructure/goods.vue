<template>
    <div class="goods">
        <div>
            <!--新建与查询-->
            <div class="menuBox">
                <div class="QueryConditions QueryBan">

                    <el-button size="mini" type="primary" class="el-icon-plus" @click="addgoods=true">新建</el-button>
                    <el-button icon="el-icon-view" type="primary" size="mini" @click="Settings=true">显示设置</el-button>
                    <el-button size="mini" type="primary" @click="printContent">打印</el-button>
                    <el-button size="mini" type="danger" :disabled="delStatusButGoods" @click="delgoodsfun">移入回收站
                    </el-button>
                    <el-button size="mini" type="info" @click="goodsrecycleopen">回收站</el-button>
                </div>
                <div class="QueryConditions QueryInput">

                    <div>
                        <el-input size="mini" placeholder="商家编码" v-model="querymerchantCode"></el-input>

                        <el-input size="mini" placeholder="商品名称" v-model="queryname"></el-input>

                        <el-input size="mini" placeholder="货品编号" v-model="queryitemCode"></el-input>

                        <el-input size="mini" placeholder="盒装SKU" v-model="querysku"></el-input>

                        <el-input size="mini" placeholder="其他" v-model="queryother"></el-input>
                    </div>

                    <div>
                        <el-button type="primary" size="mini"
                                   @click="queryother='',querysku='',queryitemCode='',queryname='',querymerchantCode=''">
                            重置
                        </el-button>

                        <el-button type="primary" size="mini" icon="el-icon-search" @click="queryGoods()">查询
                        </el-button>
                    </div>


                </div>
            </div>
        </div>

        <div class="tableBox">
            <el-table
                    id="aaa"
                    :data="quireGoodsData"
                    border
                    stripe
                    ref="table"
                    :height="tableHeight"
                    @selection-change="goodsSelection"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        type="selection"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        type="index"
                >
                </el-table-column>
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
                        width="100"
                        label="基本单位">
                </el-table-column>
                <el-table-column
                        align="center"
                        v-if="packag"
                        prop="packag"
                        width="100"
                        label="包装材料">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="weight"
                        v-if="weight"
                        width="100"
                        label="重量">
                </el-table-column>

                <el-table-column
                        align="center"
                        prop="ingredients"
                        v-if="ingredients"
                        width="100"
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
                        width="100"
                        label="操作"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="upgoodspanel(scope.row)">修改</el-button>
                        <el-button :disabled="scope.row.recordState=='rs01'?(true):(false)" type="text"
                                   @click="delGoods(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <el-row>
            <el-col :span="10" :offset="14">
                <el-pagination
                        @current-change="goodslistpag"
                        :page-size="15"
                        layout="prev, pager, next, jumper"
                        :total="totalRecordNum">
                </el-pagination>
            </el-col>
        </el-row>
        <!--新建商品信息-->
        <el-dialog
                title="新建商品信息"
                :visible.sync="addgoods"
                width="800px"
                :show-close="false"
        >

            <el-form :model="addgoodsForm" ref="addgoodsForm" :rules="addgoodsrules"
                     label-position="right"
                     label-width="100px">

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="商品名称" prop="name">
                            <el-input size="mini" v-model="addgoodsForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="盒装SKU" prop="sku">
                            <el-input size="mini" v-model="addgoodsForm.sku"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="货品编号" prop="itemCode">
                            <el-input size="mini" v-model="addgoodsForm.itemCode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="商家编码" prop="merchantCode">
                            <el-input size="mini" v-model="addgoodsForm.merchantCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工艺流程" prop="process">
                            <el-input size="mini" v-model="addgoodsForm.process"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="品牌" prop="brand">
                            <el-input size="mini" v-model="addgoodsForm.brand"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="商品颜色" prop="color">
                            <el-select size="mini" v-model="addgoodsForm.color" placeholder="请选择">
                                <el-option
                                        v-for="item in goodsColors"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                </el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="基本单位">
                            <el-input size="mini" v-model="addgoodsForm.unit"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="包装材料">
                            <el-input size="mini" v-model="addgoodsForm.packag"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="面料成分">
                            <el-input size="mini" v-model="addgoodsForm.ingredients"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="商品成本">
                            <el-input-number size="mini" controls-position="right" v-model="addgoodsForm.costPrice"
                                             :precision="2" :step="0.1"></el-input-number>
                            <!--<el-input size="mini" v-model="addgoodsForm.costPrice"></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工艺标准">
                            <el-input size="mini" v-model="addgoodsForm.standard"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="克重">
                            <el-input size="mini" v-model="addgoodsForm.weight"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="针数">
                            <el-input size="mini" v-model="addgoodsForm.pinNumber"></el-input>
                        </el-form-item>
                    </el-col>


                    <el-col :span="8">
                        <el-form-item label="分类">
                            <el-cascader
                                    size="mini"
                                    @change="Classificationchoice"
                                    :options="addgoodsclassification"

                            ></el-cascader>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="季节">
                            <el-input size="mini" v-model="addgoodsForm.season"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注">
                            <el-input size="mini" v-model="addgoodsForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-button size="mini" type="primary" @click="submitForm('addgoodsForm')">立即创建</el-button>
            <el-button size="mini" @click="addgoods=false">取消</el-button>
        </el-dialog>
        <!--修改商品信息-->
        <el-dialog
                title="修改商品信息"
                :visible.sync="upgoods"
                width="800px"
                @closed="closeFun"
                :show-close="false"
        >
            <el-form :model="upgoodsForm" label-position="right"
                     label-width="100px" ref="upgoodsForm" :rules="upgoodsrules">

                <el-row>

                    <el-col :span="8">
                        <el-form-item label="商品名称" prop="name">
                            <el-input size="mini" v-model="upgoodsForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="盒装SKU" prop="sku">
                            <el-input size="mini" v-model="upgoodsForm.sku"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="货品编号" prop="itemCode">
                            <el-input disabled size="mini" v-model="upgoodsForm.itemCode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="8">
                        <el-form-item label="商家编码" prop="merchantCode">
                            <el-input disabled size="mini" v-model="upgoodsForm.merchantCode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工艺流程" prop="process">
                            <el-input size="mini" v-model="upgoodsForm.process"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="品牌" prop="brand">
                            <el-input size="mini" v-model="upgoodsForm.brand"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="商品颜色" prop="color">
                            <el-select size="mini" v-model="upgoodsForm.color" placeholder="请选择">
                                <el-option
                                        v-for="item in goodsColors"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        :disabled="item.disabled">
                                </el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="基本单位">
                            <el-input size="mini" v-model="upgoodsForm.unit"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="包装材料">
                            <el-input size="mini" v-model="upgoodsForm.packag"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>


                <el-row>
                    <el-col :span="8">
                        <el-form-item label="面料成分">
                            <el-input size="mini" v-model="upgoodsForm.ingredients"></el-input>
                        </el-form-item>
                    </el-col>


                    <el-col :span="8">
                        <el-form-item label="商品成本">
                            <el-input-number size="mini" controls-position="right" v-model="upgoodsForm.costPrice"
                                             :precision="2" :step="0.1"></el-input-number>
                            <!--<el-input size="mini" v-model="upgoodsForm.costPrice"></el-input>-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="工艺标准">
                            <el-input size="mini" v-model="upgoodsForm.standard"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="克重">
                            <el-input size="mini" v-model="upgoodsForm.weight"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="针数">
                            <el-input size="mini" v-model="upgoodsForm.pinNumber"></el-input>
                        </el-form-item>
                    </el-col>


                    <el-col :span="8">
                        <el-form-item label="分类">
                            <el-cascader
                                    v-model="upgoodsForm.types"
                                    size="mini"
                                    @change="UPificationchoice"
                                    :options="upgoodsclassification"
                            ></el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="季节">
                            <el-input size="mini" v-model="upgoodsForm.season"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="备注">
                            <el-input size="mini" v-model="upgoodsForm.remark"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
            <el-button size="mini" type="primary" @click="upsubmitForm('upgoodsForm')">立即修改</el-button>
            <el-button size="mini" @click="upgoods=false">取消</el-button>

        </el-dialog>

        <!--回收站-->
        <el-dialog
                title="回收站"
                :visible.sync="goodsrecycle"
                width="1000px"
                :show-close="false"
        >
            <div style="display: flex;justify-content: flex-start;margin-bottom: 0.5em">
                <el-button size="mini" type="primary" @click="batchgoods">批量恢复</el-button>
                <el-input size="mini" style="width: 200px" placeholder="商家编码"
                          v-model="querygoodsmerchantCode"></el-input>
                <el-input size="mini" style="width: 200px" placeholder="商品名称" v-model="querygoodsname"></el-input>
                <el-input size="mini" style="width: 200px" placeholder="其他" v-model="queryspare"></el-input>
                <el-button size="mini" type="primary" style="margin-left: 0.5em"
                           @click="querygoodsmerchantCode='',querygoodsname='',queryspare=''">重置
                </el-button>
                <el-button size="mini" type="primary" @click="queryGoodsRecycle()">查询</el-button>

            </div>

            <el-table
                    :border="true"
                    :data="goodsrecycleData"
                    stripe
                    @selection-change="goodsSelection"
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
                <el-table-column
                        align="center"
                        width="100"
                        label="操作"
                        fixed="right"
                >
                    <template slot-scope="scope">
                        <el-button type="text" @click="singlegoods(scope.row)">恢复</el-button>
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

        <!--显示设置-->
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
    </div>


</template>

<script>
    export default {
        name: "goods",
        data() {
            return {
                screenWidth: document.body.clientWidth,
                tableHeight: 0,
                queryname: '',//查询商品名称
                querysku: '',//查询盒装SKU
                queryitemCode: '',//查询货品编号
                querymerchantCode: '',//查询商家编码
                queryother: '',//查询其他
                quireGoodspagesize: 15,//商品信息分页大小
                quireGoodspageNum: 1,//商品信息分页页数
                quireGoodsData: [],//商品信息
                totalRecordNum: 0,//总条目数
                addgoods: false,//新建商品信息面板
                upgoods: false,//修改商品信息面板
                goodsColors: [
                    {
                        label: '纯色',
                        value: '纯色'
                    },
                    {
                        label: '混色',
                        value: '混色'
                    }
                ],
                addgoodsForm: {
                    //新建商品信息表单数据
                    name: '',
                    sku: '',
                    merchantCode: '',//商家编码
                    brand: '',//品牌
                    process: '',//工艺流程
                    season: '',//季节
                    costPrice: 0.1,//成本
                    unit: '',//基本单位
                    packag: '',//包装材料
                    weight: '',//重量
                    itemCode: '',//货品编号
                    ingredients: '',//面料成分
                    standard: '',//工艺标准
                    remark: '',//备注
                    type: '',//分类
                    color: '',//颜色分类
                    pinNumber: '',//针数
                },
                addgoodsrules: {
                    //新建商品信息表单验证
                    name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},

                    ],
                    sku: [
                        {required: true, message: '请输入盒装SKU', trigger: 'blur'},

                    ],
                    brand: [
                        {required: true, message: '请输入品牌', trigger: 'blur'},

                    ],
                    process: [
                        {required: true, message: '请输入对应工艺流程', trigger: 'blur'},

                    ],
                    itemCode: [
                        {required: true, message: '请输货品编号', trigger: 'blur'},

                    ],
                    type: [
                        {required: true, message: '请输入条形码', trigger: 'change'},
                    ],
                    merchantCode: [
                        {required: true, message: '请输入商家编码', trigger: 'blur'},

                    ],
                    color: [
                        {required: true, message: '请选择商品颜色类别', trigger: 'blur'},
                    ]
                },
                addgoodsclassification: [
                    //新建商品信息分类
                    {
                        value: '商务袜',
                        label: '商务袜',
                        children: [
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
                            },
                        ]
                    },
                    {
                        value: '168针',
                        label: '168针',
                        children: [
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
                            },
                        ]
                    }, {
                        value: '53棉',
                        label: '53棉',
                        children: [
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
                            },
                        ]
                    }, {
                        value: '中筒',
                        label: '中筒',
                        children: [
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
                            },
                        ]
                    }
                ],
                typedata: '',//用于储存数据，当表单发生改变时校验
                upgoodsForm: {
                    //修改商品信息表单数据
                    name: '',
                    sku: '',
                    brand: '',//品牌
                    process: '',//工艺流程
                    season: '',//季节
                    costPrice: 0.1,//成本
                    unit: '',//基本单位
                    packag: '',//包装材料
                    weight: '',//重量
                    itemCode: '',//货品编号
                    ingredients: '',//面料成分
                    standard: '',//工艺标准
                    color: '',//颜色
                    remark: '',//备注
                    type: '',//分类
                    pinNumber: '',//针数
                },
                upgoodsrules: {
                    //修改商品信息表单验证
                    name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},

                    ],
                    sku: [
                        {required: true, message: '请输入盒装SKU', trigger: 'blur'},

                    ],
                    brand: [
                        {required: true, message: '请输入品牌', trigger: 'blur'},

                    ],
                    process: [
                        {required: true, message: '请输入对应工艺流程', trigger: 'blur'},

                    ],
                    itemCode: [
                        {required: true, message: '请输入条形码', trigger: 'blur'},

                    ],
                    type: [
                        {required: true, message: '请输入条形码', trigger: 'change'},
                    ],
                    color: [
                        {required: true, message: '请选择商品颜色类别', trigger: 'change'},
                    ],
                    merchantCode: [
                        {required: true, message: '请输入商家编码', trigger: 'change'}
                    ]
                },
                upgoodsclassification: [
                    //修改商品信息分类
                    {
                        value: '商务袜',
                        label: '商务袜',
                        children: [
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
                            },
                        ]
                    },
                    {
                        value: '168针',
                        label: '168针',
                        children: [
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
                            },
                        ]
                    }, {
                        value: '53棉',
                        label: '53棉',
                        children: [
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
                            },
                        ]
                    }, {
                        value: '中筒',
                        label: '中筒',
                        children: [
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
                            },
                        ]
                    }
                ],
                goodsids: [],//商品信息id
                goodsrecycle: false,//回收站面板
                goodsrecycleData: [],//回收站数据
                recyctotalRecord: 0,//回收站总条目数
                recycpageSize: 0,//回收站单页个数
                Settings: false,//显示设置面板
                delStatusButGoods: true,//删除按钮
                /**
                 * 显示字段设置
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
                querygoodsmerchantCode: '',//回收站查询商家编码
                querygoodsname: '',//回收站查询商品名称
                queryspare: '',//回收站查询其他
                flag: '',//用于记录是否保存修改数据
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
            closeFun() {
                let obj = JSON.stringify(this.upgoodsForm)
                let state = (obj == this.typedata)
                let that = this
                if (!state) {
                    this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '保存',
                        cancelButtonText: '放弃修改'
                    })
                        .then(() => {
                            that.upsubmitForm('upgoodsForm')
                        })

                }

            },


            printContent() {
                //打印模块
                let div_print = document.getElementById('aaa');
                let newstr = div_print.innerHTML;
                let oldstr = document.body.innerHTML;
                document.body.innerHTML = newstr;
                window.print();
                window.location.reload();
                return false
            },
            goodsrecycleopen() {
                //回收站点击事件
                this.goodsrecycle = true
                this.queryGoodsRecycle()
            },
            restoregoods() {
                //恢复回收站可用信息
                let that = this
                this.$axios.post(this.$store.state.goodsByOpen, {ids: this.goodsids}).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',

                        });
                        that.queryGoodsRecycle()
                        that.queryGoods()
                    } else {
                        this.$message.error('操作错误！');
                    }
                })
            },
            singlegoods(data) {
                //回收站单条恢复
                this.goodsids.length = 0
                this.goodsids.push(data.id)
                this.restoregoods()
            },
            batchgoods() {
                //批量恢复回收站数据
                this.restoregoods()
            },
            Classificationchoice(val) {
                //新建商品信息分类选择
                this.addgoodsForm.type = ''
                val.forEach(item => {
                    this.addgoodsForm.type += `${item}/`
                    // this.addgoodsForm.type=this.addgoodsForm.type.substring(0,this.addgoodsForm.type.length-1)
                })
                this.addgoodsForm.type = this.addgoodsForm.type.substring(0, this.addgoodsForm.type.length - 1)

                console.log(this.addgoodsForm.type)
            },
            UPificationchoice(val) {
                //修改商品信息分类选择
                this.upgoodsForm.type = ''
                val.forEach(item => {
                    this.upgoodsForm.type += item
                })
                this.upgoodsForm.type = this.upgoodsForm.types[0] + '/' + this.upgoodsForm.types[1]
            },
            goodsSelection(val) {
                //商品信息多选
                this.goodsids.length = 0
                let listdata = [];//保存选中数据，判断是否允许删除
                val.forEach(item => {
                    this.goodsids.push(item.id)
                    listdata.push(item.recordState)
                })
                let HideShow = listdata.indexOf('rs01')
                if (val.length == 0 || HideShow != -1) {
                    this.delStatusButGoods = true
                } else {
                    this.delStatusButGoods = false
                }
                console.log(this.goodsids)
            },
            delgoodsfun() {
                //删除商品信息
                let that = this
                this.$axios.post(this.$store.state.delgoods, {ids: this.goodsids}).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success',
                        });
                        that.queryGoods()
                    }
                    else {
                        this.$message.error('删除失败！');
                    }
                })
            },

            submitForm(addgoodsForm) {
                //新建商品信息
                let that = this
                this.$refs[addgoodsForm].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.$store.state.addgoods, this.addgoodsForm).then(res => {
                            console.log(res)
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success',
                                });
                                that.queryGoods();
                                that.addgoods = false
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

            upgoodspanel(data) {

                //打开修改信息面板
                this.upgoods = true
                this.upgoodsForm = data

                this.upgoodsForm.types = []
                let num = data.type.indexOf('/')

                let a = data.type.substring(0, num)
                let b = data.type.substring(num + 1)
                this.upgoodsForm.types.push(a)
                this.upgoodsForm.types.push(b)
                // this.upsubmitForm.type

                this.typedata = JSON.stringify(data) //将数据转为字符串，进行修改验证
                console.log(this.typedata)
            },
            delGoods(val) {
                //删除单条商品信息
                this.goodsids.length = 0
                this.goodsids.push(val.id)
                this.delgoodsfun()
            },
            upsubmitForm(upgoodsForm) {
                this.typedata = JSON.stringify(this.upgoodsForm)
                //修改商品信息
                let that = this
                this.$refs[upgoodsForm].validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.$store.state.upgoods, this.upgoodsForm).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success',
                                });
                                that.queryGoods()
                                that.upgoods = false
                            }
                            else {
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

            goodslistpag(val) {
                //商品信息分页
                this.quireGoodspageNum = val
                this.queryGoods()
            },
            recycCurrentChange(val) {
                //回收站分页

                this.queryGoodsRecycle(6, val)
            },


            queryGoodsRecycle(size = 6, page = 1) {
                //回收站信息分页查询
                this.$axios.get(this.$store.state.goodsqueryRecycle, {
                    params: {
                        pageSize: size,
                        pageNum: page,
                        merchantCode: this.querygoodsmerchantCode,
                        name: this.querygoodsname,
                        other: this.queryspare
                    }
                }).then(res => {
                    this.goodsrecycleData = res.data.list
                    this.recyctotalRecord = res.data.totalRecord
                    this.recycpageSize = res.data.pageSize
                })
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

        },
        created: function () {
            this.queryGoods()
            this.size()


        }
    }
</script>

<style scoped>

    .QueryBan {
        background-color: #f8f8f8;
    }

    /*.goods {*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*!*padding: 1%;*!*/
    /*!*display: flex;*!*/
    /*!*justify-content: space-around;*!*/

    /*}*/


</style>