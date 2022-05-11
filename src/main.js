import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import PrettyCheckbox from 'pretty-checkbox-vue';

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'pretty-checkbox/src/pretty-checkbox.scss';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq4gmXxwK3nVtCK46SPS5nPbsUXbU2Oyw",
  authDomain: "barcode-58cc4.firebaseapp.com",
  projectId: "barcode-58cc4",
  storageBucket: "barcode-58cc4.appspot.com",
  messagingSenderId: "117907414581",
  appId: "1:117907414581:web:6de2e59b8d973c4e09db7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

Vue.prototype.$db = getFirestore(app);
// Vue.prototype.$storage = app.storage();
// Vue.prototype.$auth = app.auth();;

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(PrettyCheckbox);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
