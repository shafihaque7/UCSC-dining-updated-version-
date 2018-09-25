// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import  { store }  from './store'
// import * as firebase from 'firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import firebaseConfig from './firebaseConfig'
import axios from 'axios'

firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

export const fstorage = firebase.storage()

Vue.use(Vuetify)

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
