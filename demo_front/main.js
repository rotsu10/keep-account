import App from './App.vue'
import 'default-passive-events'
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(Vant)
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import { createPinia } from 'pinia';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

if (typeof EventTarget !== "undefined") {
  let func = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, fn, capture) {
    this.func = func;
    if (typeof capture !== "boolean") {
      capture = capture || {};
      capture.passive = false;
    }
    this.func(type, fn, capture);
  };
}

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(Antd);
  app.use(Vant);
  app.use(pinia);
  return {
    app
  }
}
// #endif