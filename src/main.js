// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import echarts from 'echarts'
import 'echarts-wordcloud/dist/echarts-wordcloud.js'
import 'echarts-wordcloud/dist/echarts-wordcloud.min.js'

Vue.prototype.$echarts = echarts

Vue.use(iView);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
