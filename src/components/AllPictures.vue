<template>
      <v-layout row>
        <v-flex xs12>
          <v-card>
            <v-toolbar color="white" flat>
              <v-btn icon light @click="$router.go(-1)">
                <v-icon color="grey darken-2">arrow_back</v-icon>
              </v-btn>
    
              <v-toolbar-title class="grey--text text--darken-4">Pictures</v-toolbar-title>
    
              <v-spacer></v-spacer>
             
              <v-btn icon light>
                <v-icon  color="grey darken-2">search</v-icon>
              </v-btn>

           
            </v-toolbar>
    
            <v-subheader>May</v-subheader>
            <v-container fluid grid-list-xs>
              <v-layout row wrap>
                  


                <v-flex
                  v-for="(image,index) in images"
                  :key="index"
                  xs4
                >
                  <img
                    :src="image.url"
                    alt="lorem"
                    class="image"
                    height="100%"
                    width="100%"
                  >
                </v-flex>
              </v-layout>
            </v-container>
    
            <!-- <v-subheader>June</v-subheader>
            <v-container fluid grid-list-xs>
              <v-layout row wrap>
                <v-flex
                  v-for="i in 6"
                  :key="i"
                  xs4
                >
                  <img
                    :src="`https://randomuser.me/api/portraits/women/${i + 5}.jpg`"
                    alt="lorem"
                    class="image"
                    height="100%"
                    width="100%"
                  >
                </v-flex>
              </v-layout>
            </v-container> -->
    
            <v-footer class="mt-5"></v-footer>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
<script>
export default {
   data () {
      return {
        page: 1
      }
    },
   created(){

      this.initialize()

   },
   computed: {
      images(){
         return this.$store.state.pictures
      }

   },

   methods: {
      initialize (){
         this.$store.state.progressBar = true
         this.$store.dispatch('fetchAllPics')

         // console.log(this.$store.state.pictures)

      }
   }
}
</script>