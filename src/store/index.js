import Vue from 'vue'
import Vuex from 'vuex'

import { db, fstorage } from '../main'
import axios from 'axios'



Vue.use(Vuex)

export const store = new Vuex.Store({
   state: {
      items: [
         { meal: 'Breakfast', menu: [] }, { meal: 'Lunch', menu: [] }, { meal: 'Dinner', menu: [] }, { meal: 'Late Night', menu: [] }
      ],
      selectedDiningHall: null,
      diningHalls: [{ title: 'Colleges Nine & Ten', icon: 'local_pizza' }, { title: 'Cowell/Stevenson', icon: 'dns' }, { title: 'Crown/Merrill', icon: 'eject' }, { title: 'Porter/Kresge', icon: 'event_seat' }, { title: 'Rachel Carson/Oakes', icon: 'explore' }],
      currentMenu: null,
      pictures: [],
      labels: [],
      progressBar: false

   },
   mutations: { // This is where the modification to the state is hapenning
      changeSelectedDiningHall(state, payload) {
         state.selectedDiningHall = payload
      },
      addItems(state, payload) {


         state.items[0].menu = payload.breakfast
         state.items[1].menu = payload.lunch
         state.items[2].menu = payload.dinner
         state.items[3].menu = payload.latenight

         state.progressBar = false


         //   state.items[0].menu[0].name = payload.lunch

      },
      addPics(state, payload) {
         //   console.log(payload)
         state.pictures = payload

         state.progressBar = false

      },
      addOnePic(state, payload) {
         console.log('This is from mutations' + payload.url)

         let theImageUrl = payload.url

         axios.get('https://us-central1-ucscdining2.cloudfunctions.net/helloWorld', {
            params: {
               url: payload.url
            }
         })
            .then(function (response) {
               console.log(response.data);
               state.labels = response.data
               
            })
            .catch(function (error) {
               console.log(error);
            })
            .then(function () {
               // always executed
            });


         state.pictures.unshift(payload)
      },
      addMLlabels(state, payload) {
         console.log('This is from mutations' + payload.url)

         let theImageUrl = payload.url

         axios.get('https://us-central1-ucscdining2.cloudfunctions.net/helloWorld', {
            params: {
               url: payload.url
            }
         })
            .then(function (response) {
               console.log(response.data);
               state.labels = response.data
               state.progressBar = false
            })
            .catch(function (error) {
               console.log(error);
            })
            .then(function () {
               // always executed
            });


         // state.pictures.unshift(payload)
      }

   },
   actions: { // async functions

      fetchDiningHall({ commit }, payload) {
         
         var currentDiningHall = payload
         commit('changeSelectedDiningHall', payload)

         var breakfastMenu = []
         var lunchMenu = []
         var dinnerMenu = []
         var lateNightMenu = []

         var count = 0

         db.collection("allitems").where("dininghallname", "==", currentDiningHall)
            .orderBy("order").get()
            .then(function (querySnapshot) {
               querySnapshot.forEach(function (doc) {
                  // doc.data() is never undefined for query doc snapshots
                  // console.log(doc.id, " => ", doc.data());
                  var food = {
                     name: doc.data().food
                  };


                  switch (doc.data().timeofmeal) {
                     case 'Breakfast':
                        // console.log('found breakfast')
                        breakfastMenu.push(food)
                        break;
                     case 'Lunch':
                        // console.log('found Lunch')
                        lunchMenu.push(food)
                        break;

                     case 'Dinner':
                        // console.log('found Dinner')
                        dinnerMenu.push(food)
                        break;
                     case 'Late Night':
                        // console.log('found Dinner')
                        lateNightMenu.push(food)
                        break;

                  }

               });
            })
            .catch(function (error) {
               console.log("Error getting documents: ", error);
            });

         var data = {
            breakfast: breakfastMenu,
            lunch: lunchMenu,
            dinner: dinnerMenu,
            latenight: lateNightMenu
         }

         commit('addItems', data)




      },
      createPic({ commit, getters }, payload) {
         const filename = payload.image.name
         const ext = filename.slice(filename.lastIndexOf('.'))
         fstorage.ref('meetups/' + payload.title + ext).put(payload.image)
            .then((snapshot) => {
               var filePath = snapshot.metadata.fullPath
               return fstorage.ref(filePath).getDownloadURL()
            })
            .then((img) => {
               // console.log(img)

               var picData = {
                  food: payload.title,
                  url: img
               }

               db.collection('pictures').doc().set(picData)
               commit('addOnePic', picData)
               return picData.url
            })
            .then(imgUrl => {
               // console.log('this is where the img url is' + imgUrl)


            })
         // Reach out to firebase and store it
      },
      mlImage({ commit, getters }, payload) {
         const filename = payload.image.name
         const ext = filename.slice(filename.lastIndexOf('.'))
         fstorage.ref('machinelearning/' + payload.title + ext).put(payload.image)
            .then((snapshot) => {
               var filePath = snapshot.metadata.fullPath
               return fstorage.ref(filePath).getDownloadURL()
            })
            .then((img) => {
               // console.log(img)

               var picData = {
                  food: payload.title,
                  url: img
               }
               commit('addMLlabels', picData)

             
            })
         // Reach out to firebase and store it
      },

      fetchPics({ commit }, payload) {
         
         console.log('This is fetching image for ' + payload)

         var imageForPics = []

         var foodName = payload

         db.collection("pictures").where("food", "==", foodName)
            .get()
            .then(function (querySnapshot) {
               querySnapshot.forEach(function (doc) {
                  // console.log(doc.data())
                  imageForPics.push(doc.data())
               });
            })
            .catch(function (error) {
               console.log("Error getting documents: ", error);
            });

         //   console.log(imageForPics)

         commit('addPics', imageForPics)

      },

      fetchAllPics({ commit }) {


         var imageForPics = []

      

         db.collection("pictures")
            .get()
            .then(function (querySnapshot) {
               querySnapshot.forEach(function (doc) {
                  // console.log(doc.data())
                  imageForPics.push(doc.data())
               });
            })
            .catch(function (error) {
               console.log("Error getting documents: ", error);
            });

         //   console.log(imageForPics)

         commit('addPics', imageForPics)

      }
   },
   getters: {


   }

})