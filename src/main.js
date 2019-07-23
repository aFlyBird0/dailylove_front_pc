import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import iView from 'iview';
import router from './router/router.js';
import 'iview/dist/styles/iview.css';
import './plugins/iview.js'
import './plugins/axios.js'

// Vue.use(VueRouter);
Vue.use(iView);

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.config.productionTip = false

// Vue.prototype.serverUrl = "http://127.0.0.1:8081/dailylove"
Vue.prototype.serverUrl = "http://tcualhp.cn:8080/dailylove"

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
