<template>
    <div class="home">
        <el-container>
            <!--头-->
            <el-header>
                <h3 @click="Homejump">首诺供应链</h3>
                <div class="menubox">

                    <el-dropdown>
                        <span class="el-dropdown-link headerTitle">基础设置</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <div @click="addTab('商品信息','goods'),$router.push('goods')">
                                    <i class="fontFamily hhtx-shangpin"></i>
                                    <span class="menu">商品信息</span>
                                </div>
                            </el-dropdown-item>
                            <!--<el-dropdown-item>-->
                                <!--<div @click="addTab('仓库信息')">-->
                                    <!--<i class="fontFamily hhtx-cangku"></i>-->
                                    <!--<span class="menu">仓库信息</span>-->
                                <!--</div>-->
                            <!--</el-dropdown-item>-->
                            <el-dropdown-item>
                                <div @click="addTab('工艺管理','ProcessManagement',$router.push('ProcessManagement'))">
                                    <i class="fontFamily hhtx-gongyipin"></i>
                                    <span class="menu">工艺管理</span>
                                </div>
                            </el-dropdown-item>
                            <!--<el-dropdown-item>-->
                                <!--<div @click="addTab('流程设置')">-->
                                    <!--<i class="fontFamily hhtx-liucheng"></i>-->
                                    <!--<span class="menu">流程设置</span>-->
                                <!--</div>-->
                            <!--</el-dropdown-item>-->
                            <el-dropdown-item>
                                <div @click="addTab('原材料信息','materials'),$router.push('materials')">
                                    <i class="fontFamily hhtx-yuancailiao"></i>
                                    <span class="menu">原材料信息</span>
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div @click="addTab('工厂管理','factory'),$router.push('factory')">
                                    <i class="fontFamily hhtx-gongchang"></i>
                                    <span class="menu">工厂管理</span>
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div @click="addTab('供应商管理','supplier'),$router.push('supplier')">
                                    <i class="fontFamily hhtx-icon-p_gongyingshang"></i>
                                    <span class="menu">供应商管理</span>
                                </div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>


                    <el-dropdown>
                        <span class="el-dropdown-link headerTitle">系统设置</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <div @click="addTab('权限管理')">
                                    <i class="fontFamily hhtx-permissions"></i>
                                    <span class="menu">权限管理</span>
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div @click="addTab('参数设置')">
                                    <i class="fontFamily hhtx-canshu"></i>
                                    <span class="menu">参数设置</span>
                                </div>
                            </el-dropdown-item>

                            <el-dropdown-item>
                                <div @click="addTab('操作员管理')">
                                    <i class="fontFamily hhtx-guanliyuan"></i>
                                    <span class="menu">操作员管理</span>
                                </div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>


                    <el-dropdown>
                        <span class="el-dropdown-link headerTitle">采购管理</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <div @click="addTab('采购订单','purchase'),$router.push('purchase')">
                                    <i class="fontFamily hhtx-caigoudingdan"></i>
                                    <span class="menu">采购订单</span>
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div @click="addTab('生产计划单','production'),$router.push('production')">
                                    <i class="fontFamily hhtx-shengchan"></i>
                                    <span class="menu">生产计划单</span>
                                </div>

                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div @click="addTab('收货单(原料)')">
                                    <i class="fontFamily hhtx-shouhuoshou--"></i>
                                    <span class="menu">收货单(原料)</span>
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div @click="addTab('委外加工订单')">
                                    <i class="fontFamily hhtx-weiwaifeiyong"></i>
                                    <span class="menu">委外加工订单</span>
                                </div>
                            </el-dropdown-item>

                        </el-dropdown-menu>
                    </el-dropdown>


                    <el-dropdown>
                        <span class="el-dropdown-link headerTitle">仓库管理</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <div @click="addTab('入库管理','storage'),$router.push('storage')">
                                    <i class="fontFamily hhtx-ruku"></i>
                                    <span class="menu">入库管理</span>
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div @click="addTab('出库管理')">
                                    <i class="fontFamily hhtx-chuku"></i>
                                    <span class="menu">出库管理</span>
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div @click="addTab('库存查询','Stock'),$router.push('Stock')">
                                    <i class="fontFamily hhtx-kucun"></i>
                                    <span class="menu">库存查询</span>
                                </div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>


                    <el-dropdown>
                        <span class="el-dropdown-link headerTitle">统计分析</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <div @click="addTab('原材料采购统计')">
                                    <i class="fontFamily hhtx-yuancailiao"></i>
                                    <span class="menu">原材料采购统计</span>
                                </div>
                            </el-dropdown-item>

                            <el-dropdown-item>
                                <div @click="addTab('委外加工统计')">
                                    <i class="fontFamily hhtx-tongji2"></i>
                                    <span class="menu">委外加工统计</span>
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div @click="addTab('成品入库统计')">
                                    <i class="fontFamily hhtx-tongji1"></i>
                                    <span class="menu">成品入库统计</span>
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div @click="addTab('加工绩效统计')">
                                    <i class="fontFamily hhtx-tongji"></i>
                                    <span class="menu">加工绩效统计</span>
                                </div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>


                </div>

                <div>

                    <el-dropdown>
  <span class="el-dropdown-link" style="color: #d1e3f6">
     {{headernickname}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><span @click="outLogin">退出</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>


            </el-header>

            <el-container>
                <!--侧栏-->
                <el-aside width="2%">

                    <el-tooltip class="item" effect="dark" content="商品信息" placement="right">

                        <p @click="addTab('商品信息','goods'),$router.push('goods')"><i class="fontFamily hhtx-shangpin"></i></p>

                    </el-tooltip>


                    <el-tooltip class="item" effect="dark" content="工厂管理" placement="right">
                        <p @click="addTab('工厂管理','factory'),$router.push('factory')"><i class="fontFamily hhtx-cangku"></i></p>
                    </el-tooltip>

                    <el-tooltip class="item" effect="dark" content="工艺管理" placement="right">
                        <p @click="addTab('工艺管理')"><i class="fontFamily hhtx-gongyipin"></i></p>
                    </el-tooltip>


                    <el-tooltip class="item" effect="dark" content="原材料信息" placement="right">
                        <p @click="addTab('原材料信息','materials'),$router.push('materials')"><i class="fontFamily hhtx-yuancailiao"></i></p>
                    </el-tooltip>

                    <el-tooltip class="item" effect="dark" content="供应商管理" placement="right">
                        <p @click="addTab('供应商管理','supplier'),$router.push('supplier')"><i class="fontFamily hhtx-icon-p_gongyingshang"></i></p>
                    </el-tooltip>
                </el-aside>

                <!--内容-->
                <el-main>
                    <div class="tabsPane">
                        <el-tabs v-model="editableTabsValue2" v-show="tabsShow"  type="card" tab-position="top" closable
                                 @tab-remove="removeTab" @tab-click="selected">
                            <el-tab-pane
                                    v-for="item in editableTabs2"
                                    :key="item.name"
                                    :label="item.title"
                                    :name="item.name"
                                    :urlTag="item"
                            >

                            </el-tab-pane>

                        </el-tabs>
                        <router-view></router-view>
                    </div>




                </el-main>
            </el-container>


        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                editableTabsValue2: '',//默认选中第几个标签
                editableTabs2: [],//所有标签信息
                tabIndex: 0,//索引，当新增的时候从哪里开始递增
                headernickname: '',//登录账号
                tabsShow:false,//控制标签页显示
            }
        },
        methods: {
            Homejump(){
              //图表页跳转
                this.tabsShow=false
                this.$router.push('/chartPage')
            },
            outLogin() {
                //退出登录
                this.$router.push('/')
                sessionStorage.clear()
                this.$cookies.remove('nickname')
            },
            //新增选项卡
            addTab(targetName, url) {
                this.tabsShow=true
                let num
                let select = this.editableTabs2.some((item, index) => {
                    num = index + 1
                    return item.title == targetName
                })
                //判断以打开的选项卡中是否有包含当前要打开的菜单
                if (select) {
                    this.editableTabsValue2 = num.toString()
                } else {
                    let newTabName = ++this.tabIndex + '';
                    this.editableTabs2.push({
                        title: targetName,
                        name: newTabName,
                        content: url
                    });
                    this.editableTabsValue2 = newTabName;
                }


                //将最新选项卡信息保存
                sessionStorage.setItem('menu', JSON.stringify(this.editableTabs2))
                //最后选中的选项卡
                sessionStorage.setItem('index', this.editableTabsValue2)

            },
            //选中选项卡
            selected(tab, event) {
                let url = tab.$attrs.urlTag.content
                this.$router.push(url)
                //最后选中的选项卡
                sessionStorage.setItem('index', this.editableTabsValue2)


            },
            //删除选项卡
            removeTab(targetName) {
                let tabs = this.editableTabs2;
                let activeName = this.editableTabsValue2;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                this.editableTabsValue2 = activeName;
                this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
                if (this.editableTabs2.length == 0) {
                    this.editableTabsValue2 = '0'
                }
                //将最新选项卡信息保存
                sessionStorage.setItem('menu', JSON.stringify(this.editableTabs2))
                //最后选中的选项卡
                sessionStorage.setItem('index', this.editableTabsValue2)
            },
            //页面加载后恢复之前记录的选项卡
            PageLoad() {
                this.headernickname = this.$cookies.get('nickname')
                let menu = JSON.parse(sessionStorage.getItem('menu'))
                if (menu != null) {
                    menu.forEach(item => {
                        this.editableTabs2.push(item)
                    })
                    this.editableTabsValue2 = sessionStorage.getItem('index')
                    this.tabIndex = this.editableTabs2.length
                }
            }

        },
        created: function () {

            this.PageLoad()

        }

    }
</script>

<style scoped>
    .home {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .el-container {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
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
        height: 100%;
        color: #ffffff;
    }

    .menu {
        margin-left: 5px;
    }

    .el-main {
        width: 100%;
        padding: 0;
        margin: 0;
    }

    /*.tabsPane{height: 5%}*/
    .el-tabs {
        height: 100%
    }
</style>