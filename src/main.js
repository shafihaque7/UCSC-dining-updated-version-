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

firebase.initializeApp({
   apiKey: "AIzaSyBID-Y48V9vHmFyaVIZN6KoYN5PC4tJYrY",
   authDomain: "ucscdining2.firebaseapp.com",
   databaseURL: "https://ucscdining2.firebaseio.com",
   projectId: "ucscdining2",
   storageBucket: "ucscdining2.appspot.com",
   messagingSenderId: "1045767642427"
 })
export const db = firebase.firestore()
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

export const fstorage = firebase.storage()

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
