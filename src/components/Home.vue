<template>
    <div class="home">
        <el-container>
            <!--头-->
            <el-header>
                <h3>首诺供应链</h3>
                <div class="menubox">

                    <el-dropdown>
                        <span class="el-dropdown-link headerTitle">基础设置</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><i class="fontFamily hhtx-tongji2"></i>商品信息</el-dropdown-item>
                            <el-dropdown-item><i class="fontFamily hhtx-chuku"></i>仓库信息</el-dropdown-item>
                            <el-dropdown-item><i class="fontFamily hhtx-gongyipin"></i>工艺管理</el-dropdown-item>
                            <el-dropdown-item><i class="fontFamily hhtx-yuancailiao"></i>原材料信息</el-dropdown-item>
                            <el-dropdown-item><i class="fontFamily hhtx-icon-p_gongyingshang"></i>供应商管理</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>


                    <el-dropdown>
                        <span class="el-dropdown-link headerTitle">系统设置</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><i class="fontFamily hhtx-permissions"></i>权限管理</el-dropdown-item>
                            <el-dropdown-item><i class="fontFamily hhtx-canshu"></i>参数设置</el-dropdown-item>
                            <el-dropdown-item><i class="fontFamily hhtx-liucheng"></i>流程设置</el-dropdown-item>
                            <el-dropdown-item><i class="fontFamily hhtx-guanliyuan"></i>操作员管理</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>


                    <el-dropdown>
                        <span class="el-dropdown-link headerTitle">采购管理</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item> <i class="fontFamily hhtx-shouhuoshou--"></i>收货单(原料)</el-dropdown-item>
                            <el-dropdown-item><i class="fontFamily hhtx-weiwaifeiyong"></i>委外加工订单</el-dropdown-item>
                            <el-dropdown-item><i class="fontFamily hhtx-caigoudingdan"></i>采购订单(物料)</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                    <el-dropdown>
                        <span class="el-dropdown-link headerTitle">仓库管理</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><i class="fontFamily hhtx-ruku"></i>入库管理</el-dropdown-item>
                            <el-dropdown-item><i class="fontFamily hhtx-chuku"></i>出库管理</el-dropdown-item>
                            <el-dropdown-item><i class="fontFamily hhtx-kucun"></i>库存查询</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>


                    <el-dropdown>
                        <span class="el-dropdown-link headerTitle">统计分析</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><i class="fontFamily hhtx-yuancailiao"></i>原材料采购统计</el-dropdown-item>
                            <el-dropdown-item><i class="fontFamily hhtx-tongji2"></i>委外加工统计</el-dropdown-item>
                            <el-dropdown-item><i class="fontFamily hhtx-tongji1"></i>成品入库统计</el-dropdown-item>
                            <el-dropdown-item><i class="fontFamily hhtx-tongji"></i>加工绩效统计</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>


                </div>


                <div>
                    Main
                </div>
            </el-header>

            <el-container>
                <!--侧栏-->
                <el-aside width="2%">
                    <p></p>
                </el-aside>

                <!--内容-->
                <el-main>Main</el-main>
            </el-container>


        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
    .home {
        width: 100%;
        height: 100%
    }

    .el-container {
        width: 100%;
        height: 100%
    }

    .el-header {
        background-color: #403f4d;
        color: #ffffff;
        display: flex;
        justify-content: space-between;
        align-items: center;

    }

    .headerTitle {
        color: #ffffff;
    }

    .menubox {
        width: 50%;
        display: flex;
        justify-content: space-around;
    }

    .el-aside {
        background-color: #403f4d;
        height: 100%
    }

</style>