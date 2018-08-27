// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './utils/axios.js'
Vue.config.productionTip = false
//路由开始时执行
router.beforeEach((to, from, next) => {
  next();
})
// 路由结束之后执行
router.afterEach(() => {});
//把ajax绑定在vue上
Vue.prototype.$ajax = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
