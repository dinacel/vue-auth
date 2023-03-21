import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import pinia from '@/plugins/pinia';
import idsrvAuth from '@/utils/idsrvAuth';

Vue.config.productionTip = false;

idsrvAuth.startup().then(ok => {
  if (ok) {
    new Vue({
      pinia,
      router,
      render: h => h(App)
    }).$mount('#app');
  } else {
    console.log('Startup was not ok');
  }
}).catch(function() {
  console.log('Startup was not ok (idsrvAuth)');
});
