<template>

   <div>


      <v-navigation-drawer v-model="drawer" fixed app>

         <v-list dense>


            <v-list-tile v-for="diningHall in diningHalls" :key="diningHall.title" @click="changeDiningHall(diningHall.title)">

               <v-list-tile-action>
                  <v-icon>{{diningHall.icon}}</v-icon>
               </v-list-tile-action>
               <v-list-tile-content>
                  <v-list-tile-title>{{diningHall.title}}</v-list-tile-title>
               </v-list-tile-content>

            </v-list-tile>

            <v-list-tile router-link to="cloudvision">

               <v-list-tile-action>
                  <v-icon>face</v-icon>
               </v-list-tile-action>
               <v-list-tile-content>
                  <v-list-tile-title>Machine Learning Demo</v-list-tile-title>
               </v-list-tile-content>

            </v-list-tile>



         </v-list>
      </v-navigation-drawer>

      <v-toolbar color="indigo" dark fixed app tabs>
         <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
         <v-toolbar-title>{{selectedDiningHall}}</v-toolbar-title>
         <v-spacer></v-spacer>

         <v-btn icon router-link to="search">
            <v-icon>search</v-icon>
         </v-btn>


         <!-- This is where this part ends -->
         <v-tabs slot="extension" v-model="tab" color="indigo" grow>
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab v-for="item in items" :key="item.meal">
               {{ item.meal }}
            </v-tab>
         </v-tabs>
      </v-toolbar>


      <v-tabs-items v-model="tab">

         <v-tab-item v-for="item in items" :key="item.meal">
            <v-card flat>
               <div v-if="item.closed">
                  <br/>
                  <center>
                     <h1>Closed</h1>
                  </center>
               </div>
               <v-card-text @click="goToPicture(foodName.name)" v-for="foodName in item.menu" :key="foodName.index">{{ foodName.name }}
               </v-card-text>

               <v-card-text v-for="space in spaces" :key="space.index">
                  <br/>
               </v-card-text>

            </v-card>

         </v-tab-item>

      </v-tabs-items>


   </div>
</template>

<script>

   export default {
      data() {
         return {
            drawer: null,
            tab: null,


         }
      },
      computed: {
         items() {
            return this.$store.state.items
         },
         selectedDiningHall() {
            return this.$store.state.selectedDiningHall
         },
         diningHalls() {
            return this.$store.state.diningHalls
         },

         spaces() {
            // console.log(parseInt(this.tab))

            const Breakfast = 0
            const Lunch = 1
            const Dinner = 2
            const LateNight = 3

            if (parseInt(this.tab) == Breakfast && this.$store.state.spaceCounter.breakfastCount < 15) {

               this.$store.state.currentSpace = 15 - this.$store.state.spaceCounter.breakfastCount
            }
            else if (parseInt(this.tab) == Lunch && this.$store.state.spaceCounter.lunchCount < 15) {

               this.$store.state.currentSpace = 15 - this.$store.state.spaceCounter.lunchCount
            }
            else if (parseInt(this.tab) == Dinner && this.$store.state.spaceCounter.dinnerCount < 15) {
               this.$store.state.currentSpace = 15 - this.$store.state.spaceCounter.dinnerCount
            }
            else if (parseInt(this.tab) == LateNight && this.$store.state.spaceCounter.lateNightCount < 15) {
               this.$store.state.currentSpace = 15 - this.$store.state.spaceCounter.lateNightCount
            }
            else {
               this.$store.state.currentSpace = 0
            }
            return this.$store.state.currentSpace
         }

      },



      beforeRouteUpdate(to, from, next) {
         this.initialize(to)
         next();
      },
      created() {
         // This part is to figure out which tab should go on


         // Finish this code when you have


         this.initialize(this.$route)



      },
      methods: {
         // 
         initialize(theRoute) {

            var dt = new Date();
            var time = dt.getHours();

            if (time >= 0 && time < 11) {
               this.tab = 0
            }

            else if (time >= 11 && time < 17) {
               this.tab = 1


            }
            else if (time >= 17 && time <= 22) {
               this.tab = 2
            }

            else {
               this.tab = 3

            }
            this.$store.state.progressBar = true
            console.log(theRoute.params.dininghall)
            this.$store.dispatch('fetchDiningHall', theRoute.params.dininghall)

         },
         goToPicture(food) {


            console.log(food)
            //  this.$router.push({ name: 'CreatePicture', params: { foodName: food }})

         },

         changeDiningHall(dininghallname) {
            if (this.$store.state.selectedDiningHall == dininghallname && window.matchMedia('(max-width: 768px)').matches) {
               this.drawer = !(this.drawer)
            }
            this.$router.push({ name: 'DiningHall', params: { dininghall: dininghallname } })
         },
      }
   }


</script>