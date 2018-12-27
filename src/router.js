import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
        path:'/',
          name:'login',
          component:require('./components/login').default
      },
      {
          path:'/Home',
          name:'Home',
          component:require('./components/Home').default,
          children:[
              {
                  // 生产计划单
                  path:'/production',
                  name:'production',
                  component:require('./menu/procurement/production').default,
              }
          ]
      }
  ]
})
