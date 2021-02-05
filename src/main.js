import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// CSS configuration of element-ui is needed to be imported
import 'element-ui/lib/theme-chalk/index.css'

// 全量引入 bk-magic-vue
import bkMagic from 'bk-magic-vue'

// 全量引入 bk-magic-vue 样式
import 'bk-magic-vue/dist/bk-magic-vue.min.css'

import router from './router'

Vue.use(ElementUI)
Vue.use(bkMagic)

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
