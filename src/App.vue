<template>
  <v-app>
    <v-content>
         <div v-if="progressBar" id="theprogressbar">
               <v-progress-circular
               :size="70"
               :width="7"
               color="yellow"
               indeterminate
             ></v-progress-circular>
         
          </div>
          <title>{{currentDiningHall}}</title>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  computed: {
     progressBar(){
        return this.$store.state.progressBar
     },
     currentDiningHall(){
        return this.$store.state.selectedDiningHall
     }

  },
  name: 'App'
}
</script>

<style>
      #theprogressbar { 
         position: fixed;
       top: 50%;
       left: 50%;
       width: 100%;
       height: 100%;
       z-index:99;
         }
   
   </style>
