import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// CSS configuration of element-ui is needed to be imported
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
