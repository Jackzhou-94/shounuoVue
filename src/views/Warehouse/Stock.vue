<template>
    <div class="Stock">
        <!--库存查询-->
        <div class="query">
            <div style="display: flex;flex-wrap: nowrap">
                <el-select v-model="Search" size="mini" clearable placeholder="仓库类型">
                    <el-option
                            v-for="item in SearchType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="factoryName" clearable size="mini" placeholder="工厂名称">
                    <el-option
                            v-for="item in factorylist"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-input size="mini" style="width: 200px" placeholder="物料编码" clearable
                          v-model="MerchantCode"></el-input>
                <el-input size="mini" style="width: 200px" placeholder="货品编号" clearable v-model="ItemCode"></el-input>
                <el-input size="mini" style="width: 200px" placeholder="货品名称" clearable
                          v-model="descriptionGoods"></el-input>
                <el-date-picker
                        size="mini"
                        v-model="queryTime"
                        type="datetimerange"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions2"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                </el-date-picker>
            </div>
            <div style="display: flex;flex-wrap: nowrap;margin-left: 1em">
                <el-button size="mini" type="primary" @click="Settings=true">显示设置</el-button>
                <el-button size="mini" icon="el-icon-edit" type="primary"
                           @click="Search='',MerchantCode='',ItemCode='',descriptionGoods='',queryTime='',factoryName=''">
                    重置
                </el-button>
                <el-button type="primary" size="mini" icon="el-icon-search" @click="stockQuery()">查询</el-button>
            </div>

        </div>

        <!--显示设置-->
        <el-dialog
                title="显示设置"
                :visible.sync="Settings"
                width="500px"
                :show-close="false"

        >
            <div style="text-align: left">
                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="ItemNumber">货品编号</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="ItemName">货品名称</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="MaterialCode">物料编码</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="barCode">条形码</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="factoryNameShow">工厂名称</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="category">入库类别</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="brand">品牌</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="quantity">库存数量</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="unit">单位</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="StockPrice">库存单价</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="InventoryAmount">库存金额</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-checkbox v-model="ProductionQuantity">生产数量</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-checkbox v-model="Procuremen">采购在途</el-checkbox>
                    </el-col>

                </el-row>

            </div>

        </el-dialog>


        <el-table
                border
                :data="stocList"
                height="750"
                stripe
                width="100%"
        >
            <el-table-column
                    align="center"
                    type="selection"
            ></el-table-column>

            <el-table-column
                    align="center"
                    type="index"
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="货品编号"
                    prop="itemCode"
                    v-if="ItemNumber"
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="货品名称"
                    prop="name"
                    v-if="ItemName"
            ></el-table-column>
            <el-table-column
                    align="center"
                    label="物料编码"
                    prop="materialCode"
                    v-if="MaterialCode"
            ></el-table-column>
            <el-table-column
                    align="center"
                    label="条形码"
                    prop="barCode"
                    v-if="barCode"
            ></el-table-column>
            <el-table-column
                    align="center"
                    label="工厂名称"
                    prop="factoryName"
                    v-if="factoryNameShow"
            ></el-table-column>
            <el-table-column
                    align="center"
                    label="入库类别"
                    prop="category"
                    v-if="category"
            ></el-table-column>
            <el-table-column
                    align="center"
                    label="品牌"
                    prop="brand"
                    v-if="brand"
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="库存数量"
                    prop="stockNumber"
                    v-if="quantity"
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="单位"
                    prop="unit"
                    v-if="unit"
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="库存单价"
                    prop="stockPrice"
                    v-if="StockPrice"
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="库存金额"
                    prop="stockAmount"
                    v-if="InventoryAmount"
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="生产数量"
                    prop="productQuantity"
                    v-if="ProductionQuantity"
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="采购在途"
                    prop="purchaseTransit"
                    v-if="Procuremen"
            ></el-table-column>
        </el-table>
        <!--分页-->
        <el-row>
            <el-col :span="10" :offset="14">
                <el-pagination
                        @current-change="factorylistpags"
                        :page-size="15"
                        layout="prev, pager, next, jumper"
                        :total="StockNum">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Stock",
        data() {
            return {
                pickerOptions2: {
                    //查询时间快捷选项
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
                Search: '',//仓库具体类型
                pageNum: 1,
                MerchantCode: '',//物料编码
                ItemCode: '',//货品编号
                descriptionGoods: '',//货品名称
                queryTime: '',//查询时间
                factoryName: '',//工厂查询
                SearchType: [
                    //仓库类型
                    {
                        label: '原材料仓库',
                        value: '原材料仓库',
                    },
                    {
                        label: '半成品仓库',
                        value: '半成品仓库',
                    }
                ],
                factorylist: [],//工厂查询数据
                stocList: [],//库存数据
                StockNum: 0,//库存总条目数
                Settings: false,//显示设置面板

                /**
                 * 显示设置
                 * */
                ItemNumber: true,//货品编号
                ItemName: true,//  货品名称
                MaterialCode: true,//物料编码
                barCode: true,//条形码
                factoryNameShow: true,//工厂名称
                category: true,//入库类别
                brand: true,//品牌
                quantity: true,//库存数量
                unit: true,//单位
                StockPrice: true,//库存单价
                InventoryAmount: true,//库存金额
                ProductionQuantity: true,//生产数量
                Procuremen: true,//采购在途
            }

        },
        methods: {
            factorylistpags(val) {
                //库存分页查询
                this.pageNum = val
                this.stockQuery()
            },
            factoryQuery() {
                //工厂列表
                this.$axios.get(this.$store.state.factoryselect).then(res => {
                    let data = res.data.data
                    data.forEach(item => {
                        this.factorylist.push({value: item.code, label: item.name})
                    })
                })
            },
            stockQuery() {
                //库存分页查询
                this.$axios.get(this.$store.state.stockQuery, {
                    params: {
                        pageSize: 15,
                        pageNum: this.pageNum,
                        category: this.Search,
                        materialCode: this.MerchantCode,
                        itemCode: this.ItemCode,
                        name: this.descriptionGoods,
                        factoryName: this.factoryName,
                        startTime: this.queryTime[0],
                        endTime: this.queryTime[1],
                    }
                }).then(res => {
                    // stocList
                    this.stocList = res.data.list
                    this.StockNum = res.data.totalRecord
                    console.log(res)
                })
            },
        },
        created: function () {
            this.factoryQuery();//工厂信息查询
            this.stockQuery();//库存分页查询
        }
    }
</script>

<style scoped>

</style>