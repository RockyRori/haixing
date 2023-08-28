import Vue from 'vue'
import App from './App.vue'
import Router from './plugins/router'
import Axios from './plugins/axios'
import Element from './plugins/element'
import css from'./assets/icon/iconfont.css'
import LemonIMUI from 'lemon-imui';
import 'lemon-imui/dist/index.css';
Vue.use(LemonIMUI);
Vue.config.productionTip = false
Vue.prototype.$axios = Axios

new Vue({
	router: Router,
  render: h => h(App),
}).$mount('#app')
