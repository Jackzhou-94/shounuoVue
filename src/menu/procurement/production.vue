<template>
    <div class="production">
        <!--查询条件-->
        <div class="Query">

            <div style="display: flex;justify-content: space-between;align-items: center">
                <el-date-picker
                        v-model="start"
                        type="datetime"
                        placeholder="选择日期"
                        size="small"
                        format="yyyy-MM-dd HH:mm"
                >
                </el-date-picker>
                <span>至</span>
                <el-date-picker
                        v-model="end"
                        type="datetime"
                        placeholder="选择日期"
                        size="small"
                        format="yyyy-MM-dd HH:mm"
                >
                </el-date-picker>

                <el-select v-model="warehouse" placeholder="仓库" size="small">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>


                <el-select v-model="supplier" placeholder="供应商" size="small">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-input
                        class="inputSelect"
                        size="small"
                        placeholder="采购单号"
                        v-model="PurchaseOrder">
                </el-input>
                <el-input
                        class="inputSelect"
                        size="small"
                        placeholder="SKU编码"
                        v-model="SKUNum">
                </el-input>
                <el-input
                        class="inputSelect"
                        size="small"
                        placeholder="备注"
                        v-model="note">
                </el-input>
            </div>


            <div style="display: flex;justify-content: space-between">
                <el-button type="primary" icon="el-icon-search" size="mini">搜索</el-button>
                <el-button type="primary" size="mini">重置</el-button>
            </div>
        </div>

        <!--操作按钮-->
        <div class="operationBtn">
            <el-button size="mini"><i class="fontFamily hhtx-icon-test1"></i><span>新建</span></el-button>
            <el-button size="mini"><i class="fontFamily hhtx-xiugai"></i><span>批量修改</span></el-button>
            <el-button size="mini"><i class="fontFamily hhtx-fuzhi"></i><span>复制</span></el-button>
            <el-button size="mini"><i class="fontFamily hhtx-tiaoxingma"></i><span>条形码</span></el-button>
            <el-button size="mini"><i class="fontFamily hhtx-qiyong"></i><span>启用</span></el-button>
            <el-button size="mini"><i class="fontFamily hhtx-ban"></i><span>禁用</span></el-button>
            <el-button size="mini"><i class="fontFamily hhtx-icon-p_mrpcanshushezhi"></i><span>参数设置</span></el-button>

        </div>

        <!--表格数据-->
        <div class="tabaData">
            <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    tooltip-effect="dark"
                    max-height="300"
                    @selection-change="handleSelectionChange"

            >
                <el-table-column
                        type="selection"
                        width="55"
                >
                </el-table-column>
                <el-table-column
                        type="index"
                        align="center"
                        width="50"
                >
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        width="120"
                >
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="small">
                            编辑
                        </el-button>
                        <el-button
                                type="text"
                                size="small">
                            移除
                        </el-button>
                    </template>

                </el-table-column>


                <el-table-column
                        label="同步状态"
                        width="120"
                        align="center"
                >
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="审核状态"
                        width="120"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="关闭状态"
                        align="center"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="cangku"
                        label="仓库"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="rukucishu"
                        label="入库次数"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="caigoudanhao"
                        align="center"
                        label="采购单号"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="dingdanleixing"
                        align="center"
                        label="订单类型"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="caigouriqi"
                        align="center"
                        label="采购日期"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="shangpingleixing"
                        align="center"
                        label="商品类型"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="beizhu"
                        align="center"
                        label="备注"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="hetongtiaokuang"
                        align="center"
                        label="合同条款"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="songhuadizhi"
                        align="center"
                        label="送货地址"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="zhidanren"
                        align="center"
                        label="制单人"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="shenheren"
                        align="center"
                        label="审核人"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="shenheshijian"
                        align="center"
                        label="审核时间"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="chuangjianshijian"
                        align="center"
                        label="创建时间"
                        width="160">
                </el-table-column>
            </el-table>

            <!--分页-->
            <div class="pagination">
                <span>已选中{{num}}条</span>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-size="100"
                        layout="prev, pager, next, jumper"
                        :total="1000">
                </el-pagination>
            </div>

        </div>


        <!--操作按钮-->
        <div class="operationBtn">
            <el-button size="mini"><i class="fontFamily hhtx-icon-test1"></i><span>新建</span></el-button>
            <el-button size="mini"><i class="fontFamily hhtx-xiugai"></i><span>批量修改</span></el-button>
            <el-button size="mini"><i class="fontFamily hhtx-fuzhi"></i><span>复制</span></el-button>
            <el-button size="mini"><i class="fontFamily hhtx-zuhe"></i><span>转组合商品</span></el-button>
            <el-button size="mini"><i class="fontFamily hhtx-shuxing"></i><span>属性组</span></el-button>


        </div>


        <!--货品详情-->
        <div class="tabaData">
            <el-table
                    ref="multipleTable"
                    :data="SKU"
                    tooltip-effect="dark"
                    max-height="300"
                    @selection-change="handleSelectionChange"

            >
                <el-table-column
                        type="selection"
                        width="55"
                >
                </el-table-column>
                <el-table-column
                        type="index"
                        align="center"
                        width="50"
                >
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        width="120"
                >
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                size="small">
                            编辑
                        </el-button>
                        <el-button
                                type="text"
                                size="small">
                            移除
                        </el-button>
                    </template>

                </el-table-column>


                <el-table-column
                        label="图片"
                        width="120"
                        align="center"
                >
                    <template slot-scope="scope">



                        <el-popover
                                placement="top-start"
                                width="200"
                                trigger="hover"
                        >
                            <img style="width: 300px;height: 300px" :src=scope.row.img>
                            <img slot="reference" style="width: 100px;height: 100px" :src=scope.row.img>
                        </el-popover>







                        <!--<img style="width: 100px;height: 100px" :src=scope.row.img>-->
                    </template>
                </el-table-column>
                <el-table-column
                        prop="skubianma"
                        label="SKU编码"
                        width="120"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="tiaoxingma"
                        label="条形码"
                        align="center"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="shangjiabianma"
                        label="商家编码"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="shifouzengping"
                        label="是否赠品"
                        align="center"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="shifouqiyong"
                        align="center"
                        label="是否启用"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="zuheshangping"
                        align="center"
                        label="组合商品"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="yanse"
                        align="center"
                        label="颜色"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="chima"
                        align="center"
                        label="尺码"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="chengbenjia"
                        align="center"
                        label="成本价"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="jiesuanjia"
                        align="center"
                        label="结算价"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="chengbenhesuanfangfa"
                        align="center"
                        label="成本核算方法"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="xiaoshoujia"
                        align="center"
                        label="销售价"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="caigouzhouqi"
                        align="center"
                        label="采购周期"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="shenheshijian"
                        align="center"
                        label="审核时间"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="chuangjianshijian"
                        align="center"
                        label="创建时间"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="caigouyuan"
                        align="center"
                        label="采购员"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="caigouzhouqi"
                        align="center"
                        label="采购周期"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="xianggui"
                        align="center"
                        label="箱规"
                        width="160">
                </el-table-column>
                <el-table-column
                        prop="guige"
                        align="center"
                        label="规格"
                        width="160">
                </el-table-column>
            </el-table>

            <!--分页-->
            <div class="pagination">
                <span>已选中{{num}}条</span>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-size="100"
                        layout="prev, pager, next, jumper"
                        :total="1000">
                </el-pagination>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "production",
        data() {
            return {
                start: '',//开始时间
                end: '',//结束时间
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                num: '0',//选中的条目数
                warehouse: '',//仓库
                PurchaseOrder: '',//采购单号
                SKUNum: '',//SKU编码
                supplier: '',//供应商
                note: '',//备注
                tableData3: [
                    {
                        date: '自动同步',
                        name: '已审核',
                        address: '已关闭',
                        cangku: '北京',
                        rukucishu: 0,
                        caigoudanhao: 'CG2018-1000038',
                        dingdanleixing: '销采拿货',
                        caigouriqi: '2018-10-22 16:36:42',
                        shangpingleixing: '成品',
                        beizhu: '由缺货订单生成',
                        zhidanren: 'admin',
                        shenheren: 'admin',
                        shenheshijian: '2018-10-22 16:37:01',
                        chuangjianshijian: '2018-10-22 16:37:01'

                    }, {
                        date: '自动同步',
                        name: '已审核',
                        address: '已关闭',
                        cangku: '北京',
                        rukucishu: 0,
                        caigoudanhao: 'CG2018-1000038',
                        dingdanleixing: '销采拿货',
                        caigouriqi: '2018-10-22 16:36:42',
                        shangpingleixing: '成品',
                        beizhu: '由缺货订单生成',
                        zhidanren: 'admin',
                        shenheren: 'admin',
                        shenheshijian: '2018-10-22 16:37:01',
                        chuangjianshijian: '2018-10-22 16:37:01'

                    }, {
                        date: '自动同步',
                        name: '已审核',
                        address: '已关闭',
                        cangku: '北京',
                        rukucishu: 0,
                        caigoudanhao: 'CG2018-1000038',
                        dingdanleixing: '销采拿货',
                        caigouriqi: '2018-10-22 16:36:42',
                        shangpingleixing: '成品',
                        beizhu: '由缺货订单生成',
                        zhidanren: 'admin',
                        shenheren: 'admin',
                        shenheshijian: '2018-10-22 16:37:01',
                        chuangjianshijian: '2018-10-22 16:37:01'

                    }, {
                        date: '自动同步',
                        name: '已审核',
                        address: '已关闭',
                        cangku: '北京',
                        rukucishu: 0,
                        caigoudanhao: 'CG2018-1000038',
                        dingdanleixing: '销采拿货',
                        caigouriqi: '2018-10-22 16:36:42',
                        shangpingleixing: '成品',
                        beizhu: '由缺货订单生成',
                        zhidanren: 'admin',
                        shenheren: 'admin',
                        shenheshijian: '2018-10-22 16:37:01',
                        chuangjianshijian: '2018-10-22 16:37:01'

                    }, {
                        date: '自动同步',
                        name: '已审核',
                        address: '已关闭',
                        cangku: '北京',
                        rukucishu: 0,
                        caigoudanhao: 'CG2018-1000038',
                        dingdanleixing: '销采拿货',
                        caigouriqi: '2018-10-22 16:36:42',
                        shangpingleixing: '成品',
                        beizhu: '由缺货订单生成',
                        zhidanren: 'admin',
                        shenheren: 'admin',
                        shenheshijian: '2018-10-22 16:37:01',
                        chuangjianshijian: '2018-10-22 16:37:01'

                    }, {
                        date: '自动同步',
                        name: '已审核',
                        address: '已关闭',
                        cangku: '北京',
                        rukucishu: 0,
                        caigoudanhao: 'CG2018-1000038',
                        dingdanleixing: '销采拿货',
                        caigouriqi: '2018-10-22 16:36:42',
                        shangpingleixing: '成品',
                        beizhu: '由缺货订单生成',
                        zhidanren: 'admin',
                        shenheren: 'admin',
                        shenheshijian: '2018-10-22 16:37:01',
                        chuangjianshijian: '2018-10-22 16:37:01'

                    }, {
                        date: '自动同步',
                        name: '已审核',
                        address: '已关闭',
                        cangku: '北京',
                        rukucishu: 0,
                        caigoudanhao: 'CG2018-1000038',
                        dingdanleixing: '销采拿货',
                        caigouriqi: '2018-10-22 16:36:42',
                        shangpingleixing: '成品',
                        beizhu: '由缺货订单生成',
                        zhidanren: 'admin',
                        shenheren: 'admin',
                        shenheshijian: '2018-10-22 16:37:01',
                        chuangjianshijian: '2018-10-22 16:37:01'

                    }, {
                        date: '自动同步',
                        name: '已审核',
                        address: '已关闭',
                        cangku: '北京',
                        rukucishu: 0,
                        caigoudanhao: 'CG2018-1000038',
                        dingdanleixing: '销采拿货',
                        caigouriqi: '2018-10-22 16:36:42',
                        shangpingleixing: '成品',
                        beizhu: '由缺货订单生成',
                        zhidanren: 'admin',
                        shenheren: 'admin',
                        shenheshijian: '2018-10-22 16:37:01',
                        chuangjianshijian: '2018-10-22 16:37:01'

                    }, {
                        date: '自动同步',
                        name: '已审核',
                        address: '已关闭',
                        cangku: '北京',
                        rukucishu: 0,
                        caigoudanhao: 'CG2018-1000038',
                        dingdanleixing: '销采拿货',
                        caigouriqi: '2018-10-22 16:36:42',
                        shangpingleixing: '成品',
                        beizhu: '由缺货订单生成',
                        zhidanren: 'admin',
                        shenheren: 'admin',
                        shenheshijian: '2018-10-22 16:37:01',
                        chuangjianshijian: '2018-10-22 16:37:01'

                    }, {
                        date: '自动同步',
                        name: '已审核',
                        address: '已关闭',
                        cangku: '北京',
                        rukucishu: 0,
                        caigoudanhao: 'CG2018-1000038',
                        dingdanleixing: '销采拿货',
                        caigouriqi: '2018-10-22 16:36:42',
                        shangpingleixing: '成品',
                        beizhu: '由缺货订单生成',
                        zhidanren: 'admin',
                        shenheren: 'admin',
                        shenheshijian: '2018-10-22 16:37:01',
                        chuangjianshijian: '2018-10-22 16:37:01'

                    }, {
                        date: '自动同步',
                        name: '已审核',
                        address: '已关闭',
                        cangku: '北京',
                        rukucishu: 0,
                        caigoudanhao: 'CG2018-1000038',
                        dingdanleixing: '销采拿货',
                        caigouriqi: '2018-10-22 16:36:42',
                        shangpingleixing: '成品',
                        beizhu: '由缺货订单生成',
                        zhidanren: 'admin',
                        shenheren: 'admin',
                        shenheshijian: '2018-10-22 16:37:01',
                        chuangjianshijian: '2018-10-22 16:37:01'

                    }, {
                        date: '自动同步',
                        name: '已审核',
                        address: '已关闭',
                        cangku: '北京',
                        rukucishu: 0,
                        caigoudanhao: 'CG2018-1000038',
                        dingdanleixing: '销采拿货',
                        caigouriqi: '2018-10-22 16:36:42',
                        shangpingleixing: '成品',
                        beizhu: '由缺货订单生成',
                        zhidanren: 'admin',
                        shenheren: 'admin',
                        shenheshijian: '2018-10-22 16:37:01',
                        chuangjianshijian: '2018-10-22 16:37:01'

                    }, {
                        date: '自动同步',
                        name: '已审核',
                        address: '已关闭',
                        cangku: '北京',
                        rukucishu: 0,
                        caigoudanhao: 'CG2018-1000038',
                        dingdanleixing: '销采拿货',
                        caigouriqi: '2018-10-22 16:36:42',
                        shangpingleixing: '成品',
                        beizhu: '由缺货订单生成',
                        zhidanren: 'admin',
                        shenheren: 'admin',
                        shenheshijian: '2018-10-22 16:37:01',
                        chuangjianshijian: '2018-10-22 16:37:01'

                    }],
                SKU: [
                    {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '113817765',
                        tiaoxingma: '113817765',
                        shangjiabianma: '113817765',
                        shifouzengping: '否',
                        shifouqiyong: '是',
                        zuheshangping: '否',
                        shenheshijian: '2018-10-22 16:36:42',
                        yanse: '黑色',
                        chima: '32',
                        chengbenjia: '0',
                        jiesuanjia: '0',
                        chengbenhesuanfangfa: '加权平均',
                        chuangjianshijian: '2018-10-22 16:37:01',
                        xiaoshoujia: '88.00',
                        caigouzhouqi: '1',
                        caigouyuan: 'Test',
                        xianggui: '',
                        guige: ''
                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '113817765',
                        tiaoxingma: '113817765',
                        shangjiabianma: '113817765',
                        shifouzengping: '否',
                        shifouqiyong: '是',
                        zuheshangping: '否',
                        shenheshijian: '2018-10-22 16:36:42',
                        yanse: '黑色',
                        chima: '32',
                        chengbenjia: '0',
                        jiesuanjia: '0',
                        chengbenhesuanfangfa: '加权平均',
                        chuangjianshijian: '2018-10-22 16:37:01',
                        xiaoshoujia: '88.00',
                        caigouzhouqi: '1',
                        caigouyuan: 'Test',
                        xianggui: '',
                        guige: ''

                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '113817765',
                        tiaoxingma: '113817765',
                        shangjiabianma: '113817765',
                        shifouzengping: '否',
                        shifouqiyong: '是',
                        zuheshangping: '否',
                        shenheshijian: '2018-10-22 16:36:42',
                        yanse: '黑色',
                        chima: '32',
                        chengbenjia: '0',
                        jiesuanjia: '0',
                        chengbenhesuanfangfa: '加权平均',
                        chuangjianshijian: '2018-10-22 16:37:01',
                        xiaoshoujia: '88.00',
                        caigouzhouqi: '1',
                        caigouyuan: 'Test',
                        xianggui: '',
                        guige: ''

                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '113817765',
                        tiaoxingma: '113817765',
                        shangjiabianma: '113817765',
                        shifouzengping: '否',
                        shifouqiyong: '是',
                        zuheshangping: '否',
                        shenheshijian: '2018-10-22 16:36:42',
                        yanse: '黑色',
                        chima: '32',
                        chengbenjia: '0',
                        jiesuanjia: '0',
                        chengbenhesuanfangfa: '加权平均',
                        chuangjianshijian: '2018-10-22 16:37:01',
                        xiaoshoujia: '88.00',
                        caigouzhouqi: '1',
                        caigouyuan: 'Test',
                        xianggui: '',
                        guige: ''

                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '113817765',
                        tiaoxingma: '113817765',
                        shangjiabianma: '113817765',
                        shifouzengping: '否',
                        shifouqiyong: '是',
                        zuheshangping: '否',
                        shenheshijian: '2018-10-22 16:36:42',
                        yanse: '黑色',
                        chima: '32',
                        chengbenjia: '0',
                        jiesuanjia: '0',
                        chengbenhesuanfangfa: '加权平均',
                        chuangjianshijian: '2018-10-22 16:37:01',
                        xiaoshoujia: '88.00',
                        caigouzhouqi: '1',
                        caigouyuan: 'Test',
                        xianggui: '',
                        guige: ''

                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '113817765',
                        tiaoxingma: '113817765',
                        shangjiabianma: '113817765',
                        shifouzengping: '否',
                        shifouqiyong: '是',
                        zuheshangping: '否',
                        shenheshijian: '2018-10-22 16:36:42',
                        yanse: '黑色',
                        chima: '32',
                        chengbenjia: '0',
                        jiesuanjia: '0',
                        chengbenhesuanfangfa: '加权平均',
                        chuangjianshijian: '2018-10-22 16:37:01',
                        xiaoshoujia: '88.00',
                        caigouzhouqi: '1',
                        caigouyuan: 'Test',
                        xianggui: '',
                        guige: ''

                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '113817765',
                        tiaoxingma: '113817765',
                        shangjiabianma: '113817765',
                        shifouzengping: '否',
                        shifouqiyong: '是',
                        zuheshangping: '否',
                        shenheshijian: '2018-10-22 16:36:42',
                        yanse: '黑色',
                        chima: '32',
                        chengbenjia: '0',
                        jiesuanjia: '0',
                        chengbenhesuanfangfa: '加权平均',
                        chuangjianshijian: '2018-10-22 16:37:01',
                        xiaoshoujia: '88.00',
                        caigouzhouqi: '1',
                        caigouyuan: 'Test',
                        xianggui: '',
                        guige: ''

                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '113817765',
                        tiaoxingma: '113817765',
                        shangjiabianma: '113817765',
                        shifouzengping: '否',
                        shifouqiyong: '是',
                        zuheshangping: '否',
                        shenheshijian: '2018-10-22 16:36:42',
                        yanse: '黑色',
                        chima: '32',
                        chengbenjia: '0',
                        jiesuanjia: '0',
                        chengbenhesuanfangfa: '加权平均',
                        chuangjianshijian: '2018-10-22 16:37:01',
                        xiaoshoujia: '88.00',
                        caigouzhouqi: '1',
                        caigouyuan: 'Test',
                        xianggui: '',
                        guige: ''

                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '113817765',
                        tiaoxingma: '113817765',
                        shangjiabianma: '113817765',
                        shifouzengping: '否',
                        shifouqiyong: '是',
                        zuheshangping: '否',
                        shenheshijian: '2018-10-22 16:36:42',
                        yanse: '黑色',
                        chima: '32',
                        chengbenjia: '0',
                        jiesuanjia: '0',
                        chengbenhesuanfangfa: '加权平均',
                        chuangjianshijian: '2018-10-22 16:37:01',
                        xiaoshoujia: '88.00',
                        caigouzhouqi: '1',
                        caigouyuan: 'Test',
                        xianggui: '',
                        guige: ''

                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '113817765',
                        tiaoxingma: '113817765',
                        shangjiabianma: '113817765',
                        shifouzengping: '否',
                        shifouqiyong: '是',
                        zuheshangping: '否',
                        shenheshijian: '2018-10-22 16:36:42',
                        yanse: '黑色',
                        chima: '32',
                        chengbenjia: '0',
                        jiesuanjia: '0',
                        chengbenhesuanfangfa: '加权平均',
                        chuangjianshijian: '2018-10-22 16:37:01',
                        xiaoshoujia: '88.00',
                        caigouzhouqi: '1',
                        caigouyuan: 'Test',
                        xianggui: '',
                        guige: ''

                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '113817765',
                        tiaoxingma: '113817765',
                        shangjiabianma: '113817765',
                        shifouzengping: '否',
                        shifouqiyong: '是',
                        zuheshangping: '否',
                        shenheshijian: '2018-10-22 16:36:42',
                        yanse: '黑色',
                        chima: '32',
                        chengbenjia: '0',
                        jiesuanjia: '0',
                        chengbenhesuanfangfa: '加权平均',
                        chuangjianshijian: '2018-10-22 16:37:01',
                        xiaoshoujia: '88.00',
                        caigouzhouqi: '1',
                        caigouyuan: 'Test',
                        xianggui: '',
                        guige: ''

                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '113817765',
                        tiaoxingma: '113817765',
                        shangjiabianma: '113817765',
                        shifouzengping: '否',
                        shifouqiyong: '是',
                        zuheshangping: '否',
                        shenheshijian: '2018-10-22 16:36:42',
                        yanse: '黑色',
                        chima: '32',
                        chengbenjia: '0',
                        jiesuanjia: '0',
                        chengbenhesuanfangfa: '加权平均',
                        chuangjianshijian: '2018-10-22 16:37:01',
                        xiaoshoujia: '88.00',
                        caigouzhouqi: '1',
                        caigouyuan: 'Test',
                        xianggui: '',
                        guige: ''

                    }, {
                        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545913078597&di=d1560372cfdbbdea6990db29e0c4d5e5&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fblog%2F201410%2F16%2F20141016094844_UmAE8.jpeg',
                        skubianma: '113817765',
                        tiaoxingma: '113817765',
                        shangjiabianma: '113817765',
                        shifouzengping: '否',
                        shifouqiyong: '是',
                        zuheshangping: '否',
                        shenheshijian: '2018-10-22 16:36:42',
                        yanse: '黑色',
                        chima: '32',
                        chengbenjia: '0',
                        jiesuanjia: '0',
                        chengbenhesuanfangfa: '加权平均',
                        chuangjianshijian: '2018-10-22 16:37:01',
                        xiaoshoujia: '88.00',
                        caigouzhouqi: '1',
                        caigouyuan: 'Test',
                        xianggui: '',
                        guige: ''

                    }],
                multipleSelection: []
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleSelectionChange(val) {
                this.num = val.length

            }
        }
    }
</script>

<style scoped>
    .production {
        width: 98%;
        height: 95%;
        background-color: #ffffff;
        text-align: left;
        padding: 0px 1% 0px 1%;
    }

    .Query {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 8%;
    }

    .Query .el-input, .Query .el-select {
        margin: 0 0 0 5px
    }

    .inputSelect {
        width: 20%
    }

    .tabaData {
        width: 100%;
        border: 1px #f8f8f8 solid;
        /*resize: vertical;*/
        /*overflow: auto;*/
        /*height: 50%;*/
    }

    .pagination {
        display: flex;
        justify-content: space-between;
    }

    .operationBtn {
        background-color: #f8f8f8
    }

</style>