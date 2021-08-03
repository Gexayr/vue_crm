import Vue from 'vue'
import Vuelidate from "vuelidate/src";
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filters'
import messagePlugin from '@/utils/message.plugin'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from "firebase/app"
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)

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

