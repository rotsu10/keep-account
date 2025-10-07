import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

//引入vant组件
import { Field, CellGroup,Button } from 'vant';
import 'vant/lib/index.css';

export function createApp() {
  const app = createSSRApp(App)
  app.use(Field);
  app.use(CellGroup);
  app.use(Button);
  return {
    app
  }
}
// #endif


