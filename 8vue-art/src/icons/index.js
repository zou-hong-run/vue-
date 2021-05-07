
// 全局引入icons组件
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
Vue.component('svg-icon',SvgIcon)
// webapck 提供函数
const req = require.context('./svg',true,/\.svg$/)
req.keys().map(req)