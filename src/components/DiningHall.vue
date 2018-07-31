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
     
     <v-tabs-items  v-model="tab">
       <v-tab-item 
         v-for="item in items"
         :key="item.meal"
         
       >

         
         
         <v-card flat>
               
         
        

            <v-card-text v-for="foodName in item.menu" :key="foodName.index">{{ foodName.name }}
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
  

         
       }
     },
     computed:{

        subtrackt(thedata){
           console.log(thedata)
        },
        
        items(){
           return this.$store.state.items
        },
        selectedDiningHall(){
           return this.$store.state.selectedDiningHall
        },
        diningHalls(){
           return this.$store.state.diningHalls
        },
        
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
       initialize(theRoute){
          console.log(theRoute.params.dininghall)
          this.$store.dispatch('fetchDiningHall', theRoute.params.dininghall)
         //  this.$store.state.selectedDiningHall = theRoute.params.dininghall

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