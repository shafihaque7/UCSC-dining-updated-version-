<template>
   <div>
         <v-navigation-drawer
         v-model="drawer"
         fixed
         app
       >
         <v-list dense>
           <v-list-tile v-for="diningHall in diningHalls" :key="diningHall.title" @click="changeDiningHall(diningHall.title)">
              
             <v-list-tile-action>
               <v-icon>{{diningHall.icon}}</v-icon>
             </v-list-tile-action>
             <v-list-tile-content >
               <v-list-tile-title >{{diningHall.title}}</v-list-tile-title>
             </v-list-tile-content>
          
           </v-list-tile>
        


         </v-list>
       </v-navigation-drawer>

       <v-toolbar
       color="indigo"
       dark
       fixed
       app
       tabs
     >
       <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
       <v-toolbar-title>{{selectedDiningHall}}</v-toolbar-title>
       <v-spacer></v-spacer>
       <v-tabs
         slot="extension"
         v-model="tab"
         color="indigo"
         grow
       >
         <v-tabs-slider color="yellow"></v-tabs-slider>
 
         <v-tab
           v-for="item in items"
           :key="item.meal"
          
         >
           {{ item.meal }}
         </v-tab>
       </v-tabs>
     </v-toolbar>
     <!-- <v-layout row>
         <v-flex >
       <v-carousel>
         <v-carousel-item
           v-for="(pic,i) in pics"
           :key="i"
           :src="pic.src"
         ></v-carousel-item>
       </v-carousel>
         </v-flex>
         </v-layout> -->
     
     <v-tabs-items  v-model="tab">
       
       <v-tab-item 
         v-for="item in items"
         :key="item.meal"
         
       >
       
      

         <v-card flat>
            
         
            

            <v-card-text @click= "goToPicture(foodName.name)" v-for="foodName in item.menu" :key="foodName.index">{{ foodName.name }}
           </v-card-text>


           <div v-if="item.menu.length == 0">
               <br/>
               <center><h1>Closed</h1></center>
            </div>


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
     data () {
       return {
         drawer: null,
         tab: null,
         closed: false,
         bottomNav: 'recent',
 
         pics: [
          {
            src: 'https://www.recipetineats.com/wp-content/uploads/2018/04/Veggie-Burgers_9a.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
          }
        ]

       
    
         
  

         
       }
     },
     computed:{
   

       
        
        items(){
           return this.$store.state.items
        },
        selectedDiningHall(){
           return this.$store.state.selectedDiningHall
        },
        diningHalls(){
           return this.$store.state.diningHalls
        },
        spaces(){


           var items = this.$store.state.items

           var Breakfast = 0;
           var Lunch = 1;
           var Dinner = 2;
           var LateNight = 3;

           var spaceToFill = 13;

         //   if (parseInt(this.tab) == Breakfast){

         //      var theLength = items[Breakfast].menu.length
              
         //       // theLength == 0 ? this.closed = true : this.closed = false

         //      return spaceToFill - theLength
         //   }
         //   else if (parseInt(this.tab) == Lunch){

         //    console.log(items[Lunch])
         //    var theLength = items[Lunch].menu.length
            
         //    // theLength == 0 ? this.closed = true : this.closed = false

         //    return spaceToFill - theLength
         //   }
         //   else if (parseInt(this.tab) == Dinner){
         //    var theLength = items[Dinner].menu.length
         //    // theLength == 0 ? this.closed = true : this.closed = false
         //    return spaceToFill - theLength

         //   }
         //   else if (parseInt(this.tab) == LateNight){
         //       var theLength = items[LateNight].menu.length
         //    //   theLength == 0 ? this.closed = true : this.closed = false
         //      return spaceToFill - theLength
         //   }
         //   else {
         //      console.log(this.tab)
         //      return spaceToFill
         //   }


           return 5

      
        }
        
     },
     

     
    beforeRouteUpdate (to, from, next) {
      this.initialize(to)
      next();
    },
    created(){
       // This part is to figure out which tab should go on
      const tab = parseInt(this.tab)
      this.tab = 1;

      // Finish this code when you have


       this.initialize(this.$route)
    
     

    },
    methods:{
      // 
       initialize(theRoute){
          console.log( theRoute.params.dininghall )
          this.$store.dispatch('fetchDiningHall', theRoute.params.dininghall)
         //  this.$store.state.selectedDiningHall = theRoute.params.dininghall

       },
       goToPicture(food){
          console.log(food)
         //  this.$router.push({ name: 'CreatePicture', params: { foodName: food }})

       },
       
       changeDiningHall(dininghallname){
         if(this.$store.state.selectedDiningHall == dininghallname && window.matchMedia('(max-width: 768px)').matches){
            this.drawer = !(this.drawer)
         }
         this.$router.push({ name: 'DiningHall', params: { dininghall: dininghallname }})
       },

       
       }
    }
    
   
 </script>

