<template>
    <div class="ProcessManagement">

        <div class="menuBox">
            <div class="QueryConditions">
                <el-button size="mini" type="primary" class="el-icon-plus" @click="addprocess=true">新建</el-button>
                <el-button size="mini" type="primary" class="el-icon-plus" @click="upaddprocess=true">修改</el-button>
            </div>
            <div class="QueryConditions QueryInput">
                <div>
                    <el-input clearable size="mini" placeholder="款式编号"></el-input>
                    <el-input clearable size="mini" placeholder="商家编码"></el-input>
                    <el-input clearable size="mini" placeholder="名称"></el-input>

                    <el-select size="mini" clearable v-model="category" placeholder="类别">
                        <el-option
                                v-for="item in categorySelect"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                    <el-select size="mini" clearable v-model="selectState" placeholder="状态">
                        <el-option
                                v-for="item in SelectOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div>
                    <el-button type="primary" size="mini">重置</el-button>

                    <el-button type="primary" size="mini" icon="el-icon-search">查询</el-button>
                </div>

            </div>
        </div>
        <!--新建工艺单-->
        <el-dialog
                width="1100px"
                style="padding: 0px;margin: 0px"
                title="新建工艺单" :visible.sync="addprocess" :show-close="false"
        >
            <el-form style="text-align: left" :model="addprocessData" ref="addprocessData" :rules="addprocessrules"
                     size="mini" label-width="100px" label-position="right">

                <div style="display: flex;flex-wrap: nowrap;justify-content: space-between">
                    <el-form-item label="工艺名称" prop="name">
                        <el-input v-model="addprocessData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="商家编码" prop="merchantCode">
                        <el-input v-model="addprocessData.merchantCode" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="品牌" prop="brand">
                        <el-input v-model="addprocessData.brand"></el-input>
                    </el-form-item>
                    <el-form-item label="类别" prop="category">
                        <el-select clearable v-model="addprocessData.category" placeholder="类别">
                            <el-option
                                    v-for="item in categorySelect"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>


                    </el-form-item>
                    <el-form-item label="颜色">
                        <el-input v-model="addprocessData.colour"></el-input>
                    </el-form-item>
                </div>

                <div style="display: flex;flex-wrap: nowrap" class="x">
                    <el-form-item label="工艺设置" prop="processNode">
                        <el-select placeholder="请选择" size="mini" multiple
                                   v-model="addprocessData.processNode">
                            <el-option
                                    v-for="item in ProcessFunction"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>


                </div>
            </el-form>

            <el-tabs shadow="never" type="border-card" v-model="activeName">
                <el-tab-pane label="新品管理" name="first">
                    <div class="QueryConditions">

                        <el-button size="mini"  @click="addGoods">添加新品</el-button>

                    </div>
                    <el-table
                            :data="addprocessData.goodsList"
                            border
                            stripe
                            style="width: 100%">


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
                                width="180"
                                label="基本单位">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                v-if="packag"
                                prop="packag"
                                width="180"
                                label="包装材料">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="weight"
                                v-if="weight"
                                width="180"
                                label="重量">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="barCode"
                                v-if="barCode"
                                width="180"
                                label="条形码">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="ingredients"
                                v-if="ingredients"
                                width="180"
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
                                fixed="right"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="rmGoods(scope.row)">移除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>


                </el-tab-pane>

                <el-tab-pane label="原材料管理" name="second">
                    <div class="QueryConditions">
                        <el-button size="mini" @click="addMater">添加原材料</el-button>
                        <el-button size="mini" @click="batchMaterRm">批量移除</el-button>
                    </div>

                    <el-table
                            border
                            stripe
                            :data="addprocessData.materialsList"
                            highlight-current-row
                            @selection-change="addMaterMulti"
                    >
                        <el-table-column type="selection" align="center"></el-table-column>
                        <el-table-column
                                type="index"
                                align="center"
                                sortable
                        ></el-table-column>
                        <el-table-column
                                label="物料编号"
                                prop="materialCode"
                                width="180"
                                align="center"
                                sortable
                        ></el-table-column>
                        <el-table-column
                                label="物料名称"
                                prop="name"
                                width="200"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="ingredients"
                                label="成分规格"
                                width="180"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="ingredients"
                                label="成分配比"
                                width="180"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="物料分类"
                                prop="type"
                                width="180"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="默认损耗"
                                prop="defaultLoss"
                                width="160"
                                align="center"
                                sortable
                        ></el-table-column>
                        <el-table-column
                                label="厂商"
                                prop="manufacturer"
                                width="180"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="计量单位"
                                prop="unit"
                                width="100"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="成本价"
                                prop="costPrice"
                                width="120"
                                align="center"
                                sortable
                        ></el-table-column>
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
                                label="备注"
                                prop="note"
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
                                <el-button type="text" @click="rmMater(scope.row)">移除</el-button>

                            </template>
                        </el-table-column>
                    </el-table>


                </el-tab-pane>

            </el-tabs>

            <div style="text-align: right;margin-top: 0.5em">
                <el-button size="mini" type="primary" @click="addtechnology('addprocessData')">保存</el-button>
            </div>

        </el-dialog>

        <!--修改工艺单-->
        <el-dialog
                width="1100px"
                style="padding: 0px;margin: 0px"
                title="修改工艺单" :visible.sync="upaddprocess" :show-close="false"
        >
            <el-form style="text-align: left" :model="upaddprocessData" ref="upaddprocessData"
                     :rules="upaddprocessrules"
                     size="mini" label-width="100px" label-position="right">

                <div style="display: flex;flex-wrap: nowrap;justify-content: space-between">
                    <el-form-item label="工艺名称" prop="name">
                        <el-input v-model="upaddprocessData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="商家编码" prop="merchantCode">
                        <el-input v-model="upaddprocessData.merchantCode" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="品牌" prop="brand">
                        <el-input v-model="upaddprocessData.brand"></el-input>
                    </el-form-item>
                    <el-form-item label="类别" prop="category">
                        <el-select clearable v-model="upaddprocessData.category" placeholder="类别">
                            <el-option
                                    v-for="item in categorySelect"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>


                    </el-form-item>
                    <el-form-item label="颜色">
                        <el-input v-model="upaddprocessData.colour"></el-input>
                    </el-form-item>
                </div>

                <div style="display: flex;flex-wrap: nowrap" class="x">
                    <el-form-item label="工艺设置" prop="processNode">
                        <el-select placeholder="请选择" size="mini" multiple
                                   v-model="upaddprocessData.processNode">
                            <el-option
                                    v-for="item in ProcessFunction"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>


                </div>
            </el-form>

            <el-tabs shadow="never" type="border-card" v-model="upactiveName">
                <el-tab-pane label="新品管理" name="first">
                    <div class="QueryConditions">

                        <el-button size="mini"  @click="upaddGoods">添加新品</el-button>

                    </div>
                    <el-table
                            :data="upaddprocessData.goodsList"
                            border
                            stripe
                            style="width: 100%">


                        <el-table-column
                                align="center"
                                prop="merchantCode"
                                v-if="upmerchantCode"
                                label="商家编码"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="name"
                                v-if="upname"
                                label="商品名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="itemCode"
                                v-if="upitemCode"
                                label="货品编号"
                                width="180"
                        >
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="type"
                                v-if="uptype"
                                label="分类"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="sku"
                                v-if="upsku"
                                width="180"
                                label="盒装SKU">

                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="brand"
                                v-if="upbrand"
                                width="180"
                                label="品牌">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                v-if="upprocess"
                                prop="process"
                                width="180"
                                label="工艺流程">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="season"
                                v-if="upseason"
                                width="180"
                                label="季节">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="costPrice"
                                v-if="upcostPrice"
                                width="180"
                                label="商品成本价">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="unit"
                                v-if="upunit"
                                width="180"
                                label="基本单位">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                v-if="uppackag"
                                prop="packag"
                                width="180"
                                label="包装材料">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="weight"
                                v-if="upweight"
                                width="180"
                                label="重量">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="barCode"
                                v-if="upbarCode"
                                width="180"
                                label="条形码">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="ingredients"
                                v-if="upingredients"
                                width="180"
                                label="面料成份">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                prop="standard"
                                v-if="upstandard"
                                width="180"
                                label="执行工艺标准">
                        </el-table-column>
                        <el-table-column

                                label="创建时间"
                                prop="createTime"
                                v-if="upcreateTime"
                                width="180"
                                align="center"
                                sortable
                        ></el-table-column>
                        <el-table-column
                                label="修改时间"
                                prop="updateTime"
                                v-if="upupdateTime"
                                width="180"
                                align="center"
                                sortable
                        ></el-table-column>
                        <el-table-column
                                align="center"
                                prop="remark"
                                v-if="upremark"
                                width="180"
                                label="备注">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                fixed="right"
                                label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" @click="uprmGoods(scope.row)">移除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>


                </el-tab-pane>

                <el-tab-pane label="原材料管理" name="second">
                    <div class="QueryConditions">
                        <el-button size="mini" @click="upaddMater">添加原材料</el-button>
                        <el-button size="mini" @click="upbatchMaterRm">批量移除</el-button>
                    </div>

                    <el-table
                            border
                            stripe
                            :data="upaddprocessData.materialsList"
                            highlight-current-row
                            @selection-change="upaddMaterMulti"
                    >
                        <el-table-column type="selection" align="center"></el-table-column>
                        <el-table-column
                                type="index"
                                align="center"
                                sortable
                        ></el-table-column>
                        <el-table-column
                                label="物料编号"
                                prop="materialCode"
                                width="180"
                                align="center"
                                sortable
                        ></el-table-column>
                        <el-table-column
                                label="物料名称"
                                prop="name"
                                width="200"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                prop="ingredients"
                                label="成分规格"
                                width="180"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="物料分类"
                                prop="type"
                                width="180"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="默认损耗"
                                prop="defaultLoss"
                                width="160"
                                align="center"
                                sortable
                        ></el-table-column>
                        <el-table-column
                                label="厂商"
                                prop="manufacturer"
                                width="180"
                                align="center"
                        ></el-table-column>
                        <el-table-column
                                label="基本计量单位"
                                prop="unit"
                                width="150"
                                align="center"
                                sortable
                        ></el-table-column>
                        <el-table-column
                                label="成本价"
                                prop="costPrice"
                                width="120"
                                align="center"
                                sortable
                        ></el-table-column>
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
                                label="备注"
                                prop="note"
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
                                <el-button type="text" @click="uprmMater(scope.row)">移除</el-button>

                            </template>
                        </el-table-column>
                    </el-table>


                </el-tab-pane>

            </el-tabs>

            <div style="text-align: right;margin-top: 0.5em">
                <el-button size="mini" type="primary" @click="upaddtechnology('upaddprocessData')">保存</el-button>
            </div>

        </el-dialog>


        <!--添加商品面板-->
        <el-dialog
                width="1100px"
                title="添加商品" :visible.sync="addGoodsPanel" :show-close="false"
        >
            <div style="display: flex;justify-content: left;flex-wrap: nowrap;margin-bottom: 0.5em">
                <el-button icon="el-icon-view" type="primary" size="mini" @click="Settings=true">显示设置</el-button>
                <el-button type="primary" size="mini"
                           @click="queryother='',querysku='',queryitemCode='',queryname='',querymerchantCode=''">
                    重置
                </el-button>

                <el-button type="primary" size="mini" icon="el-icon-search" @click="queryGoods()">查询
                </el-button>

            </div>
            <div style="display: flex;justify-content: space-around">

                <el-input size="mini" placeholder="商家编码" v-model="querymerchantCode"></el-input>

                <el-input size="mini" placeholder="商品名称" v-model="queryname"></el-input>

                <el-input size="mini" placeholder="货品编号" v-model="queryitemCode"></el-input>

                <el-input size="mini" placeholder="盒装SKU" v-model="querysku"></el-input>

                <el-input size="mini" placeholder="其他" v-model="queryother"></el-input>

            </div>

            <el-table
                    :data="quireGoodsData"
                    border
                    stripe
                    height="360px"
                    style="width: 100%">

                <el-table-column
                        align="center"
                        type="index"
                        width="50">
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
                        width="180"
                        label="基本单位">
                </el-table-column>
                <el-table-column
                        align="center"
                        v-if="packag"
                        prop="packag"
                        width="180"
                        label="包装材料">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="weight"
                        v-if="weight"
                        width="180"
                        label="重量">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="barCode"
                        v-if="barCode"
                        width="180"
                        label="条形码">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="ingredients"
                        v-if="ingredients"
                        width="180"
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
                        align="center"
                        prop="remark"
                        v-if="remark"
                        width="180"
                        label="备注">
                </el-table-column>
                <el-table-column
                        align="center"
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="introductionGoods(scope.row)">引入</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            @current-change="goodslistpag"
                            :page-size="5"
                            layout="prev, pager, next, jumper"
                            :total="totalRecordNum">
                    </el-pagination>
                </el-col>
            </el-row>


        </el-dialog>

        <!--修改添加商品面板-->
        <el-dialog
                width="1100px"
                title="修改添加商品" :visible.sync="upaddGoodsPanel" :show-close="false"
        >
            <div style="display: flex;justify-content: left;flex-wrap: nowrap;margin-bottom: 0.5em">
                <el-button icon="el-icon-view" type="primary" size="mini" @click="upSettings=true">显示设置</el-button>
                <el-button type="primary" size="mini"
                           @click="queryother='',querysku='',queryitemCode='',queryname='',querymerchantCode=''">
                    重置
                </el-button>

                <el-button type="primary" size="mini" icon="el-icon-search" @click="queryGoods()">查询
                </el-button>

            </div>
            <div style="display: flex;justify-content: space-around">

                <el-input size="mini" placeholder="商家编码" v-model="querymerchantCode"></el-input>

                <el-input size="mini" placeholder="商品名称" v-model="queryname"></el-input>

                <el-input size="mini" placeholder="货品编号" v-model="queryitemCode"></el-input>

                <el-input size="mini" placeholder="盒装SKU" v-model="querysku"></el-input>

                <el-input size="mini" placeholder="其他" v-model="queryother"></el-input>

            </div>

            <el-table
                    :data="quireGoodsData"
                    border
                    stripe
                    height="360px"
                    style="width: 100%">

                <el-table-column
                        align="center"
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column

                        label="创建时间"
                        prop="createTime"
                        v-if="upcreateTime"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        label="修改时间"
                        prop="updateTime"
                        v-if="upupdateTime"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        align="center"
                        prop="merchantCode"
                        v-if="upmerchantCode"
                        label="商家编码"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        v-if="upname"
                        label="商品名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="itemCode"
                        v-if="upitemCode"
                        label="货品编号"
                        width="180"
                >
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="type"
                        v-if="uptype"
                        label="分类"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="sku"
                        v-if="upsku"
                        width="180"
                        label="盒装SKU">

                </el-table-column>
                <el-table-column
                        align="center"
                        prop="brand"
                        v-if="upbrand"
                        width="180"
                        label="品牌">
                </el-table-column>
                <el-table-column
                        align="center"
                        v-if="upprocess"
                        prop="process"
                        width="180"
                        label="工艺流程">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="season"
                        v-if="upseason"
                        width="180"
                        label="季节">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="costPrice"
                        v-if="upcostPrice"
                        width="180"
                        label="商品成本价">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="unit"
                        v-if="upunit"
                        width="180"
                        label="基本单位">
                </el-table-column>
                <el-table-column
                        align="center"
                        v-if="uppackag"
                        prop="packag"
                        width="180"
                        label="包装材料">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="weight"
                        v-if="upweight"
                        width="180"
                        label="重量">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="barCode"
                        v-if="upbarCode"
                        width="180"
                        label="条形码">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="ingredients"
                        v-if="upingredients"
                        width="180"
                        label="面料成份">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="standard"
                        v-if="upstandard"
                        width="180"
                        label="执行工艺标准">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="remark"
                        v-if="upremark"
                        width="180"
                        label="备注">
                </el-table-column>
                <el-table-column
                        align="center"
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="upintroductionGoods(scope.row)">引入</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-row>
                <el-col :span="10" :offset="14">
                    <el-pagination
                            @current-change="goodslistpag"
                            :page-size="5"
                            layout="prev, pager, next, jumper"
                            :total="totalRecordNum">
                    </el-pagination>
                </el-col>
            </el-row>


        </el-dialog>


        <!--添加原材料面板-->
        <el-dialog
                width="1100px"
                title="添加原材料" :visible.sync="addMaterPanel" :show-close="false"
        >
            <div style="display: flex;justify-content: left;flex-wrap: nowrap;margin-bottom: 0.5em">
                <el-button icon="el-icon-view" type="primary" size="mini" @click="MaterSettings=true">显示设置</el-button>
                <el-button type="primary" size="mini"
                           @click="materialsNum='',VendorQueries='',materialsName=''">
                    重置
                </el-button>

                <el-button type="primary" size="mini" icon="el-icon-search" @click="introducedMater">批量引入</el-button>

                <el-button type="primary" size="mini" icon="el-icon-search" @click="queryMater()">查询
                </el-button>

            </div>
            <div style="display: flex;flex-wrap: nowrap">

                <el-input clearable style="width: 150px" placeholder="物料编号" size="mini"
                          v-model="materialsNum"></el-input>

                <el-input clearable style="width: 150px" placeholder="物料名称" size="mini"
                          v-model="materialsName"></el-input>
                <el-select clearable style="width: 180px" v-model="VendorQueries" placeholder="厂商" size="mini">
                    <el-option
                            v-for="item in factoryList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>

            <el-table
                    border
                    stripe
                    ref="multipleTable"
                    :data="materialsList"
                    highlight-current-row
                    @selection-change="addMaterDetails">

                <el-table-column type="selection" align="center" :selectable="selectable"></el-table-column>
                <el-table-column
                        type="index"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="materialCodeMater"
                        label="物料编号"
                        prop="materialCode"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column

                        v-if="nameMater"
                        label="物料名称"
                        prop="name"
                        width="200"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="ingredientsMater"
                        prop="ingredients"
                        label="成分规格"
                        width="180"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="typeMater"
                        label="物料分类"
                        prop="type"
                        width="180"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="defaultLossMater"
                        label="默认损耗"
                        prop="defaultLoss"
                        width="160"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="manufacturerMater"
                        label="厂商"
                        prop="manufacturer"
                        width="180"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="unitMater"
                        label="基本计量单位"
                        prop="unit"
                        width="150"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="costPriceMater"
                        label="成本价"
                        prop="costPrice"
                        width="120"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="createTimeMater"
                        label="创建时间"
                        prop="createTime"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="updateTimeMater"
                        label="修改时间"
                        prop="updateTime"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="noteMater"
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
                    <template slot-scope="scope">
                        <el-button type="text" @click="introductionMater(scope.row)" :disabled="scope.row.show">引入
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--原材料信息分页-->
            <el-row :gutter="24">
                <el-col :span="16" :offset="8"></el-col>
                <el-col :span="8" :offset="16">
                    <el-pagination
                            @current-change="MaterPage"
                            :page-size="5"
                            layout="prev, pager, next, jumper"
                            :total="totalRecord">
                    </el-pagination>
                </el-col>

            </el-row>

            <!--<el-button @click="saveMater">保存</el-button>-->
        </el-dialog>


        <!--修改添加原材料面板-->
        <el-dialog
                width="1100px"
                title="修改添加原材料" :visible.sync="upaddMaterPanel" :show-close="false"
        >
            <div style="display: flex;justify-content: left;flex-wrap: nowrap;margin-bottom: 0.5em">
                <el-button icon="el-icon-view" type="primary" size="mini" @click="upMaterSettings=true">显示设置</el-button>
                <el-button type="primary" size="mini"
                           @click="materialsNum='',VendorQueries='',materialsName=''">
                    重置
                </el-button>

                <el-button type="primary" size="mini" icon="el-icon-search" @click="upintroducedMater">批量引入</el-button>

                <el-button type="primary" size="mini" icon="el-icon-search" @click="queryMater()">查询
                </el-button>

            </div>
            <div style="display: flex;flex-wrap: nowrap">

                <el-input clearable style="width: 150px" placeholder="物料编号" size="mini"
                          v-model="materialsNum"></el-input>

                <el-input clearable style="width: 150px" placeholder="物料名称" size="mini"
                          v-model="materialsName"></el-input>
                <el-select clearable style="width: 180px" v-model="VendorQueries" placeholder="厂商" size="mini">
                    <el-option
                            v-for="item in factoryList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>

            <el-table
                    border
                    stripe
                    ref="upmultipleTable"
                    :data="materialsList"
                    highlight-current-row
                    @selection-change="upaddMaterDetails">

                <el-table-column type="selection" align="center" :selectable="upselectable"></el-table-column>
                <el-table-column
                        type="index"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="upmaterialCodeMater"
                        label="物料编号"
                        prop="materialCode"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column

                        v-if="upnameMater"
                        label="物料名称"
                        prop="name"
                        width="200"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="upingredientsMater"
                        prop="ingredients"
                        label="成分规格"
                        width="180"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="uptypeMater"
                        label="物料分类"
                        prop="type"
                        width="180"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="updefaultLossMater"
                        label="默认损耗"
                        prop="defaultLoss"
                        width="160"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="upmanufacturerMater"
                        label="厂商"
                        prop="manufacturer"
                        width="180"
                        align="center"
                ></el-table-column>
                <el-table-column
                        v-if="upunitMater"
                        label="基本计量单位"
                        prop="unit"
                        width="150"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="upcostPriceMater"
                        label="成本价"
                        prop="costPrice"
                        width="120"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="upcreateTimeMater"
                        label="创建时间"
                        prop="createTime"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="upupdateTimeMater"
                        label="修改时间"
                        prop="updateTime"
                        width="180"
                        align="center"
                        sortable
                ></el-table-column>
                <el-table-column
                        v-if="upnoteMater"
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
                    <template slot-scope="scope">
                        <el-button type="text" @click="upintroductionMater(scope.row)" :disabled="scope.row.show">引入
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--原材料信息分页-->
            <el-row :gutter="24">
                <el-col :span="16" :offset="8"></el-col>
                <el-col :span="8" :offset="16">
                    <el-pagination
                            @current-change="MaterPage"
                            :page-size="5"
                            layout="prev, pager, next, jumper"
                            :total="totalRecord">
                    </el-pagination>
                </el-col>

            </el-row>

            <!--<el-button @click="saveMater">保存</el-button>-->
        </el-dialog>


        <!--添加原材料显示设置-->
        <el-dialog
                title="显示设置"
                :visible.sync="MaterSettings"
                width="450px"
                :show-close="false"

        >
            <div style="text-align: left">
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="materialCodeMater">物料编号</el-checkbox>
                    </el-col>

                    <el-col :span="12">
                        <el-checkbox v-model="nameMater">物料名称</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="ingredientsMater">成分规格</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="typeMater">物料分类</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="updateTimeMater">修改时间</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="defaultLossMater">默认损耗</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="manufacturerMater">厂商</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="unitMater">基本计量单位</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="costPriceMater">成本价</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="noteMater">备注</el-checkbox>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="createTimeMater">创建时间</el-checkbox>
                    </el-col>


                </el-row>
            </div>

        </el-dialog>


        <!--修改原材料显示设置-->
        <el-dialog
                title="修改原材料显示设置"
                :visible.sync="upMaterSettings"
                width="450px"
                :show-close="false"

        >
            <div style="text-align: left">
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="upmaterialCodeMater">物料编号</el-checkbox>
                    </el-col>

                    <el-col :span="12">
                        <el-checkbox v-model="upnameMater">物料名称</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="upingredientsMater">成分规格</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="uptypeMater">物料分类</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="upupdateTimeMater">修改时间</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="updefaultLossMater">默认损耗</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="upmanufacturerMater">厂商</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="upunitMater">基本计量单位</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="upcostPriceMater">成本价</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="upnoteMater">备注</el-checkbox>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="upcreateTimeMater">创建时间</el-checkbox>
                    </el-col>


                </el-row>
            </div>

        </el-dialog>


        <!--添加商品显示设置-->
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


        <!--修改添加商品显示设置-->
        <el-dialog
                title="修改添加商品显示设置"
                :visible.sync="upSettings"
                width="450px"
                :show-close="false"

        >
            <div style="text-align: left">
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="upmerchantCode">商家编码</el-checkbox>
                    </el-col>

                    <el-col :span="12">
                        <el-checkbox v-model="upname">商品名称</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="upitemCode">货品编号</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="uptype">分类</el-checkbox>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="upsku">盒装SKU</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="upbrand">品牌</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="upprocess">工艺流程</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="upseason">季节</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="upcostPrice">商品成本价</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="upunit">基本单位</el-checkbox>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="uppackag">包装材料</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="upweight">重量</el-checkbox>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="upbarCode">条形码</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="upingredients">面料成分</el-checkbox>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="upstandard">执行工艺标准</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="upremark">备注</el-checkbox>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="upcreateTime">创建时间</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="upupdateTime">修改时间</el-checkbox>
                    </el-col>

                </el-row>

            </div>

        </el-dialog>

        <el-table
                border
                height="750px"
                stripe
                style="width: 100%"
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
                    align="center">
            </el-table-column>
            <el-table-column
                    label="商家编码"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="颜色"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="流程节点"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="工艺名称"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="品牌"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="类别"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="启用状态"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="center">
            </el-table-column>
        </el-table>

    </div>

</template>

<script>
    export default {
        name: "ProcessManagement",
        data() {
            return {
                addprocess: false,//新建工艺单面板
                processSet: false,//流程节点设置面板
                upaddprocess: false,//修改工艺单面板
                upprocessSet: false,//修改节点设置面板


                addprocessData: {
                    //新建工艺单数据
                    merchantCode: '',//商家编码
                    colour: '',//颜色
                    processFlow: '',//工艺流程（用于展示）
                    processNode: [],//流程节点
                    name: '',//工艺名称
                    brand: '',//品牌
                    category: '',//类别
                    goodsList: [],//商品信息
                    materialsList: [],//原材料信息
                },
                addprocessrules: {
                    //新建工艺单表单验证
                    name: [
                        {required: true, message: '请输入物料名称', trigger: 'blur'},
                    ],
                    merchantCode: [
                        {required: true, message: '还未引入对应商品信息', trigger: 'blur'},
                    ],
                    brand: [
                        {required: true, message: '请选择品牌', trigger: 'blur'},
                    ],
                    category: [
                        {required: true, message: '请选择类别', trigger: 'change'}
                    ],
                    processNode: [
                        {required: true, message: '请选择工艺设置', trigger: 'change'},
                    ],
                },
                upaddprocessData: {
                    //新建工艺单数据
                    merchantCode: '',//商家编码
                    colour: '',//颜色
                    processFlow: '',//工艺流程（用于展示）
                    processNode: [],//流程节点
                    name: '',//工艺名称
                    brand: '',//品牌
                    category: '',//类别
                    goodsList: [],//商品信息
                    materialsList: [],//原材料信息
                },
                upaddprocessrules: {
                    //修改工艺单表单验证
                    name: [
                        {required: true, message: '请输入物料名称', trigger: 'blur'},
                    ],
                    merchantCode: [
                        {required: true, message: '还未引入对应商品信息', trigger: 'blur'},
                    ],
                    brand: [
                        {required: true, message: '请选择品牌', trigger: 'blur'},
                    ],
                    category: [
                        {required: true, message: '请选择类别', trigger: 'change'}
                    ],
                    processNode: [
                        {required: true, message: '请选择工艺设置', trigger: 'change'},
                    ],
                },


                categorySelect: [
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
                category: [],//搜素类别
                selectState: '',//搜素状态
                SelectOptions: [{
                    label: '启用',
                    value: '1',
                }, {
                    label: '停用',
                    value: '2',
                }],
                ProcessFunction: [
                    //工艺职能
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
                addGoodsPanel: false,//添加商品面板
                addMaterPanel: false,//添加原材料面板

                upaddGoodsPanel: false,//修改添加商品面板
                upaddMaterPanel: false,//修改添加原材料面板
                /**
                 * 商品信息数据
                 * */
                queryname: '',//查询商品名称
                querysku: '',//查询盒装SKU
                queryitemCode: '',//查询货品编号
                querymerchantCode: '',//查询商家编码
                queryother: '',//查询其他
                Settings: false,//商品信息显示设置
                quireGoodspagesize: 5,//商品信息分页大小
                quireGoodspageNum: 1,//商品信息分页页数
                quireGoodsData: [],//商品信息
                totalRecordNum: 0,//总条目数
                activeName: 'first',//新建tabs默认页
                upactiveName: 'first',//tabs默认页

                upSettings: false,//商品信息显示设置
                /**
                 * 商品信息显示字段设置
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


                /**
                 * 修改商品信息显示字段设置
                 * **/
                upname: true,//商品名称
                upsku: true,//盒装SKU
                upitemCode: true,//货品编号
                upmerchantCode: true,//商家编码
                upbarCode: true,//条形码
                upbrand: true,//品牌
                upcostPrice: true,//商品成本价
                upingredients: true,//面料成分
                uppackag: true,//包装材料
                upprocess: true,//对应工艺流程
                upseason: true,//季节
                upremark: true,//备注
                upstandard: true,//执行工艺标准
                uptype: true,//分类
                upunit: true,//基本单位
                upweight: true,//重量
                upcreateTime: true,//创建时间
                upupdateTime: true,//修改时间


                totalRecord: 0,//总条目数
                materialsList: [],//原材料数据
                materialsNum: '',//物料编码
                materialsName: '',//物料名称
                VendorQueries: '',//厂商查询
                factoryList: [],//供应商查询数据
                MaterSettings: false,//添加原材料显示设置
                upMaterSettings: false,//修改添加原材料显示设置

                /**
                 * 添加原材料显示设置
                 * **/
                updateTimeMater: true,//修改时间
                createTimeMater: true,//创建时间
                noteMater: true,//备注
                costPriceMater: true,//成本价
                unitMater: true,//基本计量单位
                manufacturerMater: true,//厂商
                defaultLossMater: true,//默认损耗
                zhuangtaiMater: true,//状态
                typeMater: true,//物料分类
                ingredientsMater: true,//成分规格
                nameMater: true,//物料名称
                materialCodeMater: true,//物料编号


                /**
                 * 修改添加原材料显示设置
                 * **/
                upupdateTimeMater: true,//修改时间
                upcreateTimeMater: true,//创建时间
                upnoteMater: true,//备注
                upcostPriceMater: true,//成本价
                upunitMater: true,//基本计量单位
                upmanufacturerMater: true,//厂商
                updefaultLossMater: true,//默认损耗
                upzhuangtaiMater: true,//状态
                uptypeMater: true,//物料分类
                upingredientsMater: true,//成分规格
                upnameMater: true,//物料名称
                upmaterialCodeMater: true,//物料编号


                addMaterList: [],//添加原材料信息多选数据
                addMaterMultiList: [],//新建工艺单原材料列表多选数据

                upaddMaterMultiList: [],//修改新建工艺单原材料列表多选数据
            }
        },
        methods: {
            addtechnology(addprocessData) {
                //新建工艺单
                //新建商品信息
                let that = this
                this.$refs[addprocessData].validate((valid) => {
                    if (valid) {
                        console.log('ok')
                        console.log(this.addprocessData)
                    } else {
                        this.$message({
                            message: '信息填写不完全',
                            type: 'warning'
                        });
                    }
                });

            },
            upaddtechnology(upaddprocessData) {
                //修改工艺单
                //修改商品信息
                let that = this
                this.$refs[upaddprocessData].validate((valid) => {
                    if (valid) {
                        console.log('ok')
                        console.log(this.upaddprocessData)
                    } else {
                        this.$message({
                            message: '信息填写不完全',
                            type: 'warning'
                        });
                    }
                });

            },
            batchMaterRm() {
                //批量移除原材料信息
                let indexList = this.addMaterMultiList.map((item, index) => {
                    return this.addprocessData.materialsList.indexOf(item)
                })
                indexList.forEach(item => {
                    this.addprocessData.materialsList[item].show = false
                    this.addprocessData.materialsList.splice(item, 1)
                    this.$refs.multipleTable.toggleRowSelection();
                    this.$refs.multipleTable.clearSelection();
                })
            },
            upbatchMaterRm() {
                //修改批量移除原材料信息
                let indexList = this.upaddMaterMultiList.map((item, index) => {
                    return this.upaddprocessData.materialsList.indexOf(item)
                })
                indexList.forEach(item => {
                    this.upaddprocessData.materialsList[item].show = false
                    this.upaddprocessData.materialsList.splice(item, 1)
                    this.$refs.upmultipleTable.toggleRowSelection();
                    this.$refs.upmultipleTable.clearSelection();
                })
            },
            rmMater(data) {
                //移除原材料信息
                let index = this.addprocessData.materialsList.indexOf(data)
                delete data.show
                this.addprocessData.materialsList.splice(index, 1)

                let listArr = this.materialsList.filter(item => {
                    return data.materialCode === item.materialCode
                })
                listArr.forEach(item => {
                    item.show = false
                })
                this.$refs.multipleTable.toggleRowSelection();
                this.$refs.multipleTable.clearSelection();
                console.log(this.materialsList)
                console.log(listArr)

            },
            uprmMater(data) {
                //移除原材料信息
                let index = this.upaddprocessData.materialsList.indexOf(data)
                delete data.show
                this.upaddprocessData.materialsList.splice(index, 1)

                let listArr = this.materialsList.filter(item => {
                    return data.materialCode === item.materialCode
                })
                listArr.forEach(item => {
                    item.show = false
                })
                this.$refs.upmultipleTable.toggleRowSelection();
                this.$refs.upmultipleTable.clearSelection();
                console.log(this.upmaterialsList)
                console.log(listArr)

            },
            selectable(row, index) {
                //判断是否可选
                if (row.show !== true) {
                    return true
                } else {
                    return false
                }
            },
            upselectable(row, index) {
                //修改判断是否可选
                if (row.show !== true) {
                    return true
                } else {
                    return false
                }
            },
            introducedMater() {
                //原材料批量引入

                this.addMaterList.forEach(item => {
                    if (item.show != true) {
                        this.addprocessData.materialsList.push(item)
                        item.show = true
                    } else {
                        this.$message.error('同一条记录无法重复添加哦！');
                    }

                })

                //取消选中状态
                this.$refs.multipleTable.clearSelection();

            },
            upintroducedMater() {
                //修改原材料批量引入

                this.upaddMaterList.forEach(item => {
                    if (item.show != true) {
                        this.upaddprocessData.materialsList.push(item)
                        item.show = true
                    } else {
                        this.$message.error('同一条记录无法重复添加哦！');
                    }

                })

                //取消选中状态
                this.$refs.upmultipleTable.clearSelection();

            },
            addMaterMulti(data) {
                //新建工艺单原材料列表多选
                console.log(data)
                this.addMaterMultiList = data
            },
            addMaterDetails(data) {
                //添加原材料面板多选
                this.addMaterList = data

            },
            upaddMaterMulti(data) {
                //修改工艺单原材料列表多选
                console.log(data)
                this.upaddMaterMultiList = data
            },
            upaddMaterDetails(data) {
                //修改原材料面板多选
                this.upaddMaterList = data

            },

            introductionMater(data) {
                //引入原材料
                data.show = true
                this.addprocessData.materialsList.push(data)

            },

            upintroductionMater(data) {
                //修改引入原材料
                data.show = true
                this.upaddprocessData.materialsList.push(data)

            },
            MaterPage(val) {
                /**
                 * 分页
                 * */
                this.queryMater(val, 5)
            },
            addMater() {
                //新建工艺单添加原材料按钮
                this.addMaterPanel = true
                this.factoryList = []
                this.supplierQuery();//工厂信息查询
            },
            upaddMater() {
                //修改工艺单添加原材料按钮
                this.upaddMaterPanel = true
                this.factoryList = []
                this.supplierQuery();//工厂信息查询
            },
            introductionGoods(data) {
                //引入商品信息
                this.addprocessData.goodsList.length = 0;
                this.addprocessData.merchantCode = data.merchantCode
                this.addGoodsPanel = false
                this.addprocessData.goodsList.push(data)
                // this.addprocessData.goodsList
            },
            upintroductionGoods(data) {
                //修改引入商品信息
                this.upaddprocessData.goodsList.length = 0;
                this.upaddprocessData.merchantCode = data.merchantCode
                this.upaddGoodsPanel = false
                this.upaddprocessData.goodsList.push(data)
                // this.addprocessData.goodsList
            },
            rmGoods() {
                //移除商品信息
                this.addprocessData.goodsList = [];
            },
            uprmGoods() {
                //修改移除商品信息
                this.upaddprocessData.goodsList = [];
            },
            goodslistpag(val) {
                //商品信息分页
                this.quireGoodspageNum = val
                this.queryGoods()
            },
            addGoods() {
                //新建工艺单添加商品按钮
                this.addGoodsPanel = true
                this.queryGoods()
            },
            upaddGoods() {
                //修改工艺单添加商品按钮
                this.upaddGoodsPanel = true
                this.queryGoods()
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
            supplierQuery() {
                //供应商列表
                this.$axios.get(this.$store.state.suppllierSelect).then(res => {
                    let data = res.data.data
                    data.forEach(item => {

                        this.factoryList.push({value: item.unitCode, label: `${item.unitName}（${item.className}）`})

                    })

                })
            },
            queryMater(Num = 1, Size = 5, type = '全部') {
                //原材料信息查询
                let data = {
                    pageNum: Num, pageSize: Size, type: type,
                    materialCode: this.materialsNum, name: this.materialsName,
                    manufacturer: this.VendorQueries
                }

                this.$axios.get(this.$store.state.queryPage, {
                    params: data
                }).then(res => {
                    this.materialsList = res.data.list
                    this.totalRecord = res.data.totalRecord//总条数

                    /**
                     * 新建部分
                     * */
                    let materArr = this.materialsList
                    let mArr = this.addprocessData.materialsList
                    let items = []
                    mArr.forEach(item => {
                        items.push(item.materialCode)
                    })
                    let list = materArr.filter(item => {
                        return items.indexOf(item.materialCode) != -1
                    });

                    list.forEach(item => {
                        item.show = true
                    })
                    /**
                     * 修改部分
                     * **/
                    let upmaterArr = this.materialsList
                    let upmArr = this.upaddprocessData.materialsList
                    let upitems = []
                    upmArr.forEach(item => {
                        upitems.push(item.materialCode)
                    })
                    let uplist = upmaterArr.filter(item => {
                        return upitems.indexOf(item.materialCode) != -1
                    });
                    uplist.forEach(item => {
                        item.show = true
                    })
                })

            }
        },
        created: function () {
            this.queryMater();//原材料信息分页查询

        }
    }
</script>

<style scoped>
    .selectBox {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5em;

    }

    .selectBox .el-input {
        width: 200px;
    }

    .el-tabs {
        margin: 0px;
    }
    .x .el-select{
        width: 260px;
    }
</style>