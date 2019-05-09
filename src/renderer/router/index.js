import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: resolve => require(['@/components/login'],resolve),
      meta: {keepAlive:true} ,
      children:[
        {
          path:'login',
          component: resolve => require(['@/components/login/logins'],resolve),
          meta: {keepAlive:true}
        },
        {
          path:'register',
          component: resolve => require(['@/components/login/register'],resolve),
          meta: {keepAlive:true}
        }
     ]
   },
   {
     path:'/index',
     name:'index',
     component:resolve => require(['@/components/index'],resolve),
     children:[
       {
         path:'ilove',
         name:'ilove',
         component:resolve => require(['@/components/ilove'],resolve)
       }
     ]
   }
  ]
})
