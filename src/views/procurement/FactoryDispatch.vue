<template>
    <div class="FactoryDispatch">
        <div class="menuBox">
            <div class="QueryConditions">
                <el-button type="primary" icon="el-icon-view" size="mini" @click="Settings=true">显示设置</el-button>
            </div>
            <div class=" QueryConditions QueryInput">

            </div>
        </div>
        <el-table
                border
                stripe
                style="width: 100%"
                height="720px"
        >
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" align="center"></el-table-column>
            <el-table-column label="派工单编号"  v-if="DistributionNumberShow" align="center"></el-table-column>
            <el-table-column label="工厂" v-if="factoryShow" align="center"></el-table-column>
            <el-table-column label="工艺" v-if="TechnologyShow" align="center"></el-table-column>
            <el-table-column label="预加工时间" v-if="PreprocessingShow" align="center"></el-table-column>
            <el-table-column label="预完工时间" v-if="PrecompletionShow"  align="center"></el-table-column>
            <el-table-column label="生产计划单编号" v-if="ProductionOrderShow"  align="center"></el-table-column>
            <el-table-column label="加工数量" v-if="ProcessingQuantityShow" align="center"></el-table-column>
            <el-table-column label="单位" v-if="uintShow" align="center"></el-table-column>
            <el-table-column label="派工人员" v-if="DispatchedWorkerShow" align="center"></el-table-column>
            <el-table-column label="审批人" v-if="ApproverShow" align="center"></el-table-column>
            <el-table-column label="备注" v-if="RemarksShow"  align="center"></el-table-column>
        </el-table>

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
                        <el-checkbox v-model="DistributionNumberShow">派工单编号</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="ProductionOrderShow">生产计划单编号</el-checkbox>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="factoryShow">工厂</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="TechnologyShow">工艺</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="PreprocessingShow">预加工时间</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="PrecompletionShow">预完工时间</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="ProcessingQuantityShow">加工数量</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="ApproverShow">审批人</el-checkbox>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-checkbox v-model="DispatchedWorkerShow">派工人员</el-checkbox>
                    </el-col>
                    <el-col :span="12">
                        <el-checkbox v-model="RemarksShow">备注</el-checkbox>
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

            </div>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "FactoryDispatch",
        data(){
            return{
                Settings: false,//显示设置面板

                /**
                 * 显示设置
                 * */
                ProductionOrderShow:true,//生产计划单编号
                DistributionNumberShow:true,//派工单编号
                factoryShow:true,//工厂
                TechnologyShow:true,//工艺
                PreprocessingShow:true,//预加工时间
                PrecompletionShow:true,//预完工时间
                ProcessingQuantityShow:true,//加工数量
                uintShow:true,//单位
                ApproverShow:true,//审批人
                DispatchedWorkerShow:true,//派工人员
                RemarksShow:true,//备注
                CreationTimeShow:true,//创建时间
                ModifyTimeShow:true,//修改时间

            }
        }
    }
</script>

<style scoped>

</style>