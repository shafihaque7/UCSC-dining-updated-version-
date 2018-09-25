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
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

</style>
