<template>
   <div>
      <v-toolbar color="indigo" dark fixed app>
         <v-btn icon light @click="$router.go(-1)">
            <v-icon color="white">arrow_back</v-icon>
         </v-btn>
         <v-flex xs12 sm6 offset-sm3>
            <v-text-field v-model="search" label="Search" hide-details dark color="white"></v-text-field>
         </v-flex>


      </v-toolbar>

      <v-container xs12 sm6 offset-sm3>

         <v-layout row wrap>
            <v-flex xs3>Breakfast</v-flex>
            <v-flex xs3>Lunch</v-flex>
            <v-flex xs3>Dinner</v-flex>
            <v-flex xs3>Late Night</v-flex>
         </v-layout>
         <v-layout row wrap>
            <v-flex xs3>
               <v-checkbox color="primary" v-model="BreakfastSelected"></v-checkbox>
            </v-flex>
            <v-flex xs3>
               <v-checkbox color="primary" v-model="LunchSelected"></v-checkbox>
            </v-flex>
            <v-flex xs3>
               <v-checkbox color="primary" v-model="DinnerSelected"></v-checkbox>
            </v-flex>
            <v-flex xs3>
               <v-checkbox color="primary" v-model="LateNightSelected"></v-checkbox>
            </v-flex>
         </v-layout>








         <v-card-text v-for="item in allFood" :key="item.index">
            <v-layout row wrap>

               <v-flex xs4>
                  {{ item.food }}
               </v-flex>
               <v-flex xs3>
                  {{ item.timeofmeal}}
               </v-flex>
               <v-flex xs5 @click='goToDiningHall(item.dininghallname)'>
                  {{ item.dininghallname }}
               </v-flex>



            </v-layout>

         </v-card-text>








      </v-container>



   </div>

</template>

<script>
   export default {
      computed: {
         allFood() {
            var allTheFood = this.$store.state.allFood

            if (this.BreakfastSelected == false) {
               allTheFood = allTheFood.filter(one => one.timeofmeal != 'Breakfast')
            }
            if (this.LunchSelected == false) {
               allTheFood = allTheFood.filter(one => one.timeofmeal != 'Lunch')
            }
            if (this.DinnerSelected == false) {
               allTheFood = allTheFood.filter(one => one.timeofmeal != 'Dinner')
            }
            if (this.LateNightSelected == false) {
               allTheFood = allTheFood.filter(one => one.timeofmeal != 'Late Night')
            }

            return allTheFood.filter((one) => {
               // console.log(this.search);

               return ((one.food).toLowerCase()).match(((this.search).toLowerCase()));





            });
         }

      },
      beforeRouteUpdate(to, from, next) {
         this.initialize()
         next();
      },
      created() {
         this.initialize()

      },
      data() {
         return {
            BreakfastSelected: true,
            LunchSelected: true,
            DinnerSelected: true,
            LateNightSelected: true,
            search: '',
         }
      },
      methods: {
         goToDiningHall(dininghallname){
            console.log('This is where its clicked')
            this.$router.push({ name: 'DiningHall', params: { dininghall: dininghallname } })
         },
         // 
         initialize() {
            this.$store.state.progressBar = true
            console.log('Came here')
            // this.$store.state.progressBar = true
            var dt = new Date();
            var time = dt.getHours();

            if (time >= 0 && time < 11) {
               this.BreakfastSelected = true
               this.LunchSelected = false
               this.DinnerSelected = false
               this.LateNightSelected = false
            }

            else if (time >= 11 && time < 17) {
               this.BreakfastSelected = false
               this.LunchSelected = true
               this.DinnerSelected = false
               this.LateNightSelected = false


            }
            else if (time >= 17 && time <= 22) {
               this.BreakfastSelected = false
               this.LunchSelected = false
               this.DinnerSelected = true
               this.LateNightSelected = false
              
            }

            else {
               this.BreakfastSelected = false
               this.LunchSelected = false
               this.DinnerSelected = false
               this.LateNightSelected = true
               

            }
            this.$store.dispatch('fetchAllFood')



         },

      }

   }
</script>