import App from './App'
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
import Varlet from '@varlet/ui';
import '@varlet/ui/es/style';
export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(Varlet);
  app.use(Vant);
  app.use(pinia);
  return {
    app
  }
}
// #endif


