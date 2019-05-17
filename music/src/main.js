import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/store.js";
import axios from 'axios';

import VideoPlayer from 'vue-video-player';
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer);

Vue.prototype.axios= axios

import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
    error:require('./assets/timg.jpg'),
//  loading:'../assets/timg.jpg'
    loading: require('./assets/timg.jpg')
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
