import Vue from 'vue'
import App from './App'

import './app.scss'
import Http from './utils/Http'
import Util from './utils/util'

const localStorage = require('../src/utils/localStorage.js')
const model = require('../src/utils/model')
Vue.config.productionTip = false
Vue.prototype.$http = Http

Object.assign(model, localStorage.asyncLoadStorageUserData())
console.log('当前环境' + Util.returnHost())
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
