<template>
    <div class="Stock">
        <!--库存查询-->
        <div class="query">
            <div style="display: flex;flex-wrap: nowrap">
                <el-select  v-model="Search" size="mini" clearable placeholder="仓库类型">
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
            <div style="display: flex;flex-wrap: nowrap">
                <el-button size="mini" icon="el-icon-edit" type="primary"
                           @click="Search='',MerchantCode='',ItemCode='',descriptionGoods='',queryTime='',factoryName=''">重置
                </el-button>
                <el-button type="primary" size="mini" icon="el-icon-search" @click="stockQuery()">查询</el-button>
            </div>

        </div>

        <el-table
                border
                :data="stocList"
                height="720"
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
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="货品名称"
                    prop="name"
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="条形码"
                    prop="barCode"
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="品牌"
                    prop="brand"
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="库存数量"
                    prop="stockNumber"
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="单位"
                    prop="unit"
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="库存单价"
                    prop="stockPrice"
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="库存金额"
                    prop="stockAmount"
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="生产数量"
                    prop="productQuantity"
            ></el-table-column>

            <el-table-column
                    align="center"
                    label="采购在途"
                    prop="purchaseTransit"
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
                pageNum:1,
                MerchantCode: '',//物料编码
                ItemCode: '',//货品编号
                descriptionGoods: '',//货品名称
                queryTime: '',//查询时间
                factoryName:'',//工厂查询
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
                stocList:[],//库存数据
                StockNum:0,//库存总条目数
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
                        pageSize:15,
                        pageNum:this.pageNum,
                        category:this.Search,
                        materialCode:this.MerchantCode,
                        itemCode:this.ItemCode,
                        name:this.descriptionGoods,
                        factoryName: this.factoryName,
                        startTime:this.queryTime[0],
                        endTime:this.queryTime[1],
                    }
                }).then(res=>{
                    // stocList
                    this.stocList=res.data.list
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