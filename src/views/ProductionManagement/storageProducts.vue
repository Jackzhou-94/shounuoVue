<template>
    <div class="storageProducts">
        <div class="menuBox">
            <div class="QueryConditions">
                <el-button size="mini" type="primary" class="el-icon-plus">新建
                </el-button>
                <el-button type="primary" icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>
                <el-button size="mini" type="primary">提交审核</el-button>
                <el-button size="mini" type="primary">审核通过
                </el-button>
                <el-button size="mini" type="primary">审核驳回
                </el-button>
                <el-button size="mini" type="danger">批量删除</el-button>
            </div>
            <div class=" QueryConditions QueryInput">
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
        <el-table
                border
                stripe
                style="width: 100%"
                height="720px"
        >
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column align="center" type="index"></el-table-column>
            <el-table-column align="center" v-if="WarehouseReceiptShow" label="入库单号" width="160px"></el-table-column>
            <el-table-column align="center" v-if="InvoiceNoShow" label="发货单号" width="160px"></el-table-column>
            <el-table-column align="center" v-if="ProductionPlanningShow" label="生产计划单编号"
                             width="160px"></el-table-column>
            <el-table-column align="center" v-if="DispatchedNumberShow" label="派工单编号" width="160px"></el-table-column>
            <el-table-column align="center" v-if="MerchantNumberShow" label="商家编号" width="160px"></el-table-column>
            <el-table-column align="center" v-if="ItemCodeShow" label="货品编号" width="160px"></el-table-column>
            <el-table-column align="center" v-if="TradeNameShow" label="商品名称" width="120px"></el-table-column>
            <el-table-column align="center" v-if="ExpectedWarehousingShow" label="预计入库总量"
                             width="120px"></el-table-column>
            <el-table-column align="center" v-if="ActualDeliveryShow" label="实际发货数量" width="120px"></el-table-column>
            <el-table-column align="center" v-if="ActualQuantityShow" label="实际入库数量" width="120px"></el-table-column>
            <el-table-column align="center" v-if="ShippedShow" label="已发货数量" width="120px"></el-table-column>
            <el-table-column align="center" v-if="EstimatedStorageTimeShow" label="预计入库时间"
                             width="160px"></el-table-column>
            <el-table-column align="center" v-if="ActualStorageTimeShow" label="实际入库时间" width="160px"></el-table-column>
            <el-table-column align="center" v-if="SinglePersonShow" label="制单人" width="100px"></el-table-column>
            <el-table-column align="center" v-if="RemarksShow" label="备注" width="100px"></el-table-column>
        </el-table>

        <!--半成品入库显示设置-->
        <el-dialog
                title="显示设置"
                :visible.sync="Settings"
                width="450px"
                :show-close="false"
        >
            <div style="text-align: left">
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="WarehouseReceiptShow">入库单号</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="InvoiceNoShow">发货单号</el-checkbox>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="ProductionPlanningShow">生产计划单号</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="DispatchedNumberShow">派工单号</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model=" MerchantNumberShow">商家编号</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="ItemCodeShow">货品编号</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="TradeNameShow">商品名称</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="ExpectedWarehousingShow">预计入库总量</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="ActualDeliveryShow">实际发货数量</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="ActualQuantityShow">实际入库数量</el-checkbox>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="ShippedShow">已发货数量</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="EstimatedStorageTimeShow">预计入库时间</el-checkbox>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="ActualStorageTimeShow">实际入库时间</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="SinglePersonShow">制单人</el-checkbox>
                    </el-col>

                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model=" RemarksShow">备注</el-checkbox>
                    </el-col>
                </el-row>
            </div>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "storageProducts",
        data() {
            return {
                /**
                 * 半成品入库管理显示设置
                 * */
                Settings: false,//半成品入库管理显示设置面板
                WarehouseReceiptShow: true,//入库单号
                InvoiceNoShow: true,//发货单号
                ProductionPlanningShow: true,// 生产计划单号
                DispatchedNumberShow: true,//派工单号
                MerchantNumberShow: true,//商家编号
                ItemCodeShow: true,//货品编号
                TradeNameShow: true,//商品名称
                ExpectedWarehousingShow: true,//预计入库总量
                ActualDeliveryShow: true,//实际发货数量
                ActualQuantityShow: true,//实际入库数量
                ShippedShow: true,//已发货数量
                EstimatedStorageTimeShow: true,//预计入库时间
                ActualStorageTimeShow: true,//实际入库时间
                SinglePersonShow: true,//制单人
                RemarksShow: true,//备注

            }
        }
    }
</script>

<style scoped>

</style>