import Vue from 'vue'
import App from './App'

import './app.scss'
import Http from './utils/Http'

Vue.config.productionTip = false
Vue.prototype.$http = Http

App.mpType = 'app'

const app = new Vue(App)
app.$mount()
