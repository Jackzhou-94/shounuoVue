import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            component: require('./views/components/login').default
        },
        {
            path: '/Home',
            name: 'Home',
            component: require('./views/components/Home').default,
            children: [
                {
                    // 生产计划单
                    path: '/production',
                    name: 'production',
                    component: require('./menu/procurement/production').default,
                }, {
                    //原材料信息
                    path: '/materials',
                    name: 'materials',
                    component: require('./views/infrastructure/materials').default,
                }, {
                    //商品信息
                    path: '/goods',
                    name: 'goods',
                    component: require('./views/infrastructure/goods').default,
                }, {
                    //供应商管理
                    path: '/supplier',
                    name: 'supplier',
                    component: require('./views/infrastructure/supplier').default,
                }, {
                    //工厂管理
                    path: '/factory',
                    name: 'factory',
                    component: require('./views/infrastructure/factory').default,
                }, {
                    //采购订单
                    path: '/purchase',
                    name: 'purchase',
                    component: require('./views/procurement/purchase').default,
                }
            ]
        }
    ]
})
