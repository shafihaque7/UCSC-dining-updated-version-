<template>
   <div>
         <v-toolbar color="indigo" flat>
               <v-btn icon light @click="$router.go(-1)">
                 <v-icon color="white">arrow_back</v-icon>
               </v-btn>
     
               <v-toolbar-title class="white--text">Machine Learning</v-toolbar-title>
     
               <v-spacer></v-spacer>
              
            
 
            
             </v-toolbar>
             <br/>
   <center><h2>This is a demo of machine learning with images.</h2></center>
   <v-layout row>
         <v-flex xs12 sm6 offset-sm3>
           <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
           <input
             type="file"
             style="display: none"
             ref="fileInput"
             accept="image/*"
             @change="onFilePicked">
         </v-flex>
       </v-layout>
       <v-layout row>
         <v-flex xs12 sm6 offset-sm3>
           <img :src="imageUrl"  width="100%">
         </v-flex>
       </v-layout>

       <v-layout row>

            <v-flex xs12 sm6 offset-sm3>
                  <center>
                     <div v-for="(label,index) in labels" :key="index">
                  <h3 >{{ label.description }}  </h3>
                  <h5>{{ label.score }}</h5>
                  </div>
                
                     </center>
            </v-flex>
          </v-layout>
          <br>
          <br/>
       </div>


</template>

<script>
      export default {
        data () {
          return {
            imageUrl: '',

            image: null

          }
        },
        computed: {
         labels() {
             return this.$store.state.labels
          }
        },
        methods: {
         onPickFile () {
            this.$refs.fileInput.click()
          },
          onFilePicked (event) {
            
           
             
            const files = event.target.files
            let filename = files[0].name
            if (filename.lastIndexOf('.') <= 0) {
              return alert('Please add a valid file!')
            }
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
              this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]

            if(this.image != null){
               this.$store.state.labels = []
             this.$store.state.progressBar = true

            const imageData = {
               title: new Date().toLocaleString(),
              image: this.image,
            }

            
           
               this.$store.dispatch('mlImage',imageData)
            }

          }
        }
      }
    </script>