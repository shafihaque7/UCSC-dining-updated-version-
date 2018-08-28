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
   margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%); 
   z-index:10;
}

</style>
