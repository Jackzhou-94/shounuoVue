import Vue from 'vue'
import Router from 'vue-router'

// component: require('./views/components/login').default
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            component: resolve=>require(['@/views/components/login'],resolve)
        },
        {
            path: '/Home',
            name: 'Home',
            component: resolve=>require(['@/views/components/Home'],resolve),

            redirect: '/chartPage',
            children: [
                {
                    //首页，图表页
                    path: '/chartPage',
                    name: 'chartPage',
                    component: resolve=>require(['@/views/components/chartPage'],resolve),
                },
                {
                    //操作员设置
                    path: '/operator',
                    name: 'operator',
                    component: resolve=>require(['@/views/SystemSettings/operator'],resolve),
                },
                {
                    // 生产计划单
                    path: '/production',
                    name: 'production',
                    component: resolve=>require(['@/views/procurement/production'],resolve),
                },
                {
                    // 生产计划单明细
                    path: '/productionDetail',
                    name: 'productionDetail',
                    component: resolve=>require(['@/views/procurement/productionDetail'],resolve),
                },
                {
                    //原材料信息
                    path: '/materials',
                    name: 'materials',
                    component: resolve=>require(['@/views/infrastructure/materials'],resolve),
                }, {
                    //商品信息
                    path: '/goods',
                    name: 'goods',
                    component: resolve=>require(['@/views/infrastructure/goods'],resolve),
                }, {
                    //供应商管理
                    path: '/supplier',
                    name: 'supplier',
                    component: resolve=>require(['@/views/infrastructure/supplier'],resolve),

                }, {
                    //工厂管理
                    path: '/factory',
                    name: 'factory',
                    component: resolve=>require(['@/views/infrastructure/factory'],resolve),
                }, {
                    //采购订单
                    path: '/purchase',
                    name: 'purchase',
                    component: resolve=>require(['@/views/procurement/purchase'],resolve),

                }, {
                    //入库管理
                    path: '/storage',
                    name: 'storage',
                    component: resolve=>require(['@/views/Warehouse/storage'],resolve),
                    // component: require('./views/Warehouse/storage').default,
                },
                {
                    //库存查询
                    path: '/Stock',
                    name: 'Stock',
                    component: resolve=>require(['@/views/Warehouse/Stock'],resolve),
                    // component: require('./views/Warehouse/Stock').default,
                }, {
                    //工艺管理
                    path: '/ProcessManagement',
                    name: 'ProcessManagement',
                    component: resolve=>require(['@/views/infrastructure/ProcessManagement'],resolve),
                    // component: require('./views/infrastructure/ProcessManagement').default,
                }, {
                    //工厂派单查询
                    path: '/FactoryDispatch',
                    name: 'FactoryDispatch',
                    component: resolve=>require(['@/views/procurement/FactoryDispatch'],resolve),
                    // component: require('./views/procurement/FactoryDispatch').default,
                }, {
                    //工厂派单管理
                    path: '/dispatchManagement',
                    name: 'dispatchManagement',
                    component: resolve=>require(['@/views/procurement/dispatchManagement'],resolve),
                    // component: require('./views/procurement/dispatchManagement').default,
                }, {
                    //生产日志
                    path: '/ProductionLog',
                    name: 'ProductionLog',
                    component: resolve=>require(['@/views/ProductionManagement/ProductionLog'],resolve),
                    // component: require('./views/ProductionManagement/ProductionLog').default,
                }, {
                    //半成品发货
                    path: '/deliveryProducts',
                    name: 'deliveryProducts',
                    component: resolve=>require(['@/views/ProductionManagement/deliveryProducts'],resolve),
                    // component: require('./views/ProductionManagement/deliveryProducts').default,
                }, {
                    //半成品入库
                    path: '/storageProducts',
                    name: 'storageProducts',
                    component: resolve=>require(['@/views/ProductionManagement/storageProducts'],resolve),
                    // component: require('./views/ProductionManagement/storageProducts').default,
                }
            ]
        }
    ]
})
