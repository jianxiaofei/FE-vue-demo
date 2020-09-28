import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Icon } from 'ant-design-vue'

// 使用阿里巴巴iconfont字体图标库-->symbol的方式
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1991993_d1vmlu6mygs.js',
})
Vue.use(Icon)
Vue.component('icon-font', IconFont)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
