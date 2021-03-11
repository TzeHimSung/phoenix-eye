/*
 * @Author: JHSeng
 * @Date: 2021-01-22 10:24:13
 * @LastEditTime: 2021-03-10 17:39:21
 * @LastEditors: Please set LastEditors
 * @Description: main configuration of project phoenix-eye
 * @FilePath: \phoenix-eye\src\main.js
 */

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

// import vue-router
import router from './router'

// import element ui
import ElementUI from 'element-ui'
// CSS configuration of element-ui is needed to be imported
import 'element-ui/lib/theme-chalk/index.css'

// import bk-magic-vue
import bkMagic from 'bk-magic-vue'
// import bk-magic-vue css style
import 'bk-magic-vue/dist/bk-magic-vue.min.css'

Vue.use(Vuex)

Vue.use(ElementUI)
Vue.use(bkMagic)

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

// create a vue instance
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
