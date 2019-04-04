<template>
    <div class="Stock">
        <!--库存查询-->
        <div class="query">
            <div>
            <el-select v-model="Search" size="mini" placeholder="仓库类型">
                <el-option
                        v-for="item in SearchType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-input size="mini" style="width: 200px" placeholder="商家编码" clearable v-model="MerchantCode"></el-input>
            <el-input size="mini" style="width: 200px" placeholder="货品编号" clearable v-model="ItemCode"></el-input>
            <el-input size="mini" style="width: 200px" placeholder="货品名称" clearable v-model="descriptionGoods"></el-input>
            <el-date-picker
                    size="mini"
                    v-model="queryTime"
                    type="datetimerange"
                    @change="aaa"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions2"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
            </el-date-picker>
            </div>
            <div>
                <el-button size="mini" icon="el-icon-edit" type="primary" @click="Search='',MerchantCode='',ItemCode='',descriptionGoods=''">重置</el-button>
                <el-button type="primary" size="mini" icon="el-icon-search">查询</el-button>
            </div>

        </div>

       <el-table
       border
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
           ></el-table-column>

           <el-table-column
                   align="center"
                   label="货品名称"
           ></el-table-column>

           <el-table-column
                   align="center"
                   label="条形码"
           ></el-table-column>

           <el-table-column
                   align="center"
                   label="品牌"
           ></el-table-column>

           <el-table-column
                   align="center"
                   label="库存数量"
           ></el-table-column>

           <el-table-column
                   align="center"
                   label="单位"
           ></el-table-column>

           <el-table-column
                   align="center"
                   label="库存单价"
           ></el-table-column>

           <el-table-column
                   align="center"
                   label="库存金额"
           ></el-table-column>

           <el-table-column
                   align="center"
                   label="生产数量"
           ></el-table-column>

           <el-table-column
                   align="center"
                   label="采购在途"
           ></el-table-column>
       </el-table>
    </div>
</template>

<script>
    export default {
        name: "Stock",
        data(){
            return{
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
                Search:'',//仓库具体类型
                MerchantCode:'',//商家编码
                ItemCode:'',//货品编号
                descriptionGoods:'',//货品名称
                queryTime:'',//查询时间
                SearchType:[
                    //仓库类型
                    {
                        label:'原材料仓库',
                        value:'原材料仓库',
                    },
                    {
                        label:'半成品仓库',
                        value:'半成品仓库',
                    }
                ]
            }
        },
        methods:{
            aaa(){
                console.log(this.queryTime)
            }
        }
    }
</script>

<style scoped>

</style>