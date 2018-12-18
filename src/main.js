import Vue from 'vue';
import VueYouTubeEmbed from 'vue-youtube-embed';
import App from './App.vue';
import store from './store';

Vue.use(VueYouTubeEmbed);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
