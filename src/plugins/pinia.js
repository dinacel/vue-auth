import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';

// @todo use router in pinia
// @see https://stackoverflow.com/questions/70681667/cant-use-vue-router-and-pinia-inside-asingle-a-store
Vue.use(PiniaVuePlugin);
const pinia = createPinia();

export default pinia;
