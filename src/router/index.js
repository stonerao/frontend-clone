import Vue from 'vue'
import Router from 'vue-router'
import RouterView from './router'
//首页 
Vue.use(Router) 
export default new Router({
  mode: 'history',
  routes: [...RouterView]
})
