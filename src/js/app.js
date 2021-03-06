import Vue from 'vue';
import {router} from './router/router.js'


const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));



const app = new Vue({
  el: '#app',
  router,
})/*.$mount('#app')*/
