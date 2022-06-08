import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BootstrapVue from 'bootstrap-vue'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not 
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

const url = 'https://obligaciones-app.azurewebsites.net/api'
/* const url = 'http://localhost:3000/api'  */

axios.defaults.baseURL = url 

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
