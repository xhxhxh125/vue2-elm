import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router' // 引入配置好的路由线路
import store from './store/' // 引入配置好的store
import {routerMode} from './config/env'
import './config/rem' // 引入配置好的rem设置
// 此处应该是初始化fastclick吧
import FastClick from 'fastclick'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode: routerMode,//配置路由模式,不太理解,此处可选值 ["hash"|"history"|"abstract"]
	strict: process.env.NODE_ENV !== 'production',//手册里没查到
	scrollBehavior (to, from, savedPosition) {//切换route后的<滚动行为>
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})

new Vue({
	router,
	store,
}).$mount('#app')
/*
 * $mount , vue实例方法,手动把vue实例挂在到一个dom上
*/
