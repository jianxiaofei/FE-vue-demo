import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('@v/login')
  },
  {
    path: '/',
    component: () => import('@v/common/layout'),
    children: [
      {
        path: '/home',
        meta: {title: '首页'},
        component: () => import('@v/home')
      },
      {
        path: '/visualization',
        meta: {title: '可视化'},
        component: () => import('@v/visualization')
      },
      {
        path: '/es6',
        meta: {title: 'ES6'},
        component: () => import('@v/es6/index')
      },
      {
        path: '/echarts',
        meta: {title: '百度echarts'},
        component: () => import('@v/echarts')
      },
      {
        path: '/v-charts',
        meta: {title: 'v-charts'},
        component: () => import('@v/v-charts')
      },
      {
        path: '/antv',
        meta: {title: '阿里antv'},
        component: () => import('@v/antv')
      },
      {
        path: '/HTML',
        meta: {title: 'HTML'},
        component: () => import('@v/html')
      },
      {
        path: '/CSS',
        meta: {title: 'CSS'},
        component: () => import('@v/css')
      },
      {
        path: '/JavaScript',
        meta: {title: 'JavaScript'},
        component: () => import('@v/javaScript')
      },
      {
        path: '/canvas',
        meta: {title: 'canvas'},
        component: () => import('@v/canvas')
      },
      {
        path: '/about',
        meta: {title: '关于'},
        component: () => import('@v/about')
      },
      {
        path: '*',
        meta: {title: '404'},
        component: () => import('@v/404')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') { // 暂时不做需要登录模块细致区分
    if (sessionStorage.getItem('sessionID')) {
      next()
    } else {
      next({
        path: '/login',
        query: {path: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
