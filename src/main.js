import Vue from 'vue'
import Vuelidate from "vuelidate/src";
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import VueMeta from 'vue-meta'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('localize', localizeFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.directive('tooltip', tooltipDirective)

const firebaseConfig = {
  apiKey: "AIzaSyA4XWD-RwrSUatNgt-BgSQWGEWw9wuGoko",
  authDomain: "vue-crm-lear.firebaseapp.com",
  databaseURL: "https://vue-crm-lear-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "vue-crm-lear",
  storageBucket: "vue-crm-lear.appspot.com",
  messagingSenderId: "307641911376",
  appId: "1:307641911376:web:54c451d753279a43416955"
};

firebase.initializeApp(firebaseConfig)

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

