import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

firebase.initializeApp({
  apiKey: 'AIzaSyCoYXrWg_QdNRoiFtz-pAP0qrhZ6VKKYk0',
  authDomain: 'winwin-bc12b.firebaseapp.com',
  databaseURL: 'https://winwin-bc12b.firebaseio.com',
  projectId: 'winwin-bc12b',
  storageBucket: 'winwin-bc12b.appspot.com',
  messagingSenderId: '765837126346',
  appId: '1:765837126346:web:38c387729e3154c24aa233'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
