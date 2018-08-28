<template>
      <v-container>
        <v-layout row>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <form @submit.prevent="onCreateMeetup">
              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-text-field
                    name="title"
                    label="Food"
                    id="title"
                    v-model="title"
                    required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                  <v-flex xs12 sm6 offset-sm3>
                        <v-carousel v-if="pictures.length > 0">
                              <v-carousel-item
                                v-for="(item,i) in pictures"
                                :key="i"
                                :src="item.url"
                              ></v-carousel-item>
                            </v-carousel>
                  
                  </v-flex>
                </v-layout>

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
                  <img :src="imageUrl" height="150">
                </v-flex>
              </v-layout>


              <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                  <v-btn
                    class="primary"
                    :disabled="!formIsValid"
                    type="submit">Add Picture</v-btn>
                </v-flex>
              </v-layout>


              <v-layout row>
               <v-flex xs12 sm6 offset-sm3>

                     <h3 v-for="(label,index) in labels" :key="index">{{ label.description }}</h3>
                 
               </v-flex>
             </v-layout>

              


            </form>
          </v-flex>
        </v-layout>
      </v-container>
    </template>
    
    <script>
       import axios from 'axios'
      export default {
        data () {
          return {
            title: '',
            imageUrl: '',

            image: null
          }
        },
        created (){
            this.initialize(this.$route)

      //   axios.get('https://us-central1-ucscdining2.cloudfunctions.net/helloWorld', {
      //       params: {
      //          url: encodeURI('https://images.pexels.com/photos/127673/pexels-photo-127673.jpeg?auto=compress&cs=tinysrgb&h=350')
      //       }
      //    })
      //    .then(function (response) {
      //       console.log(response.data);
      //    })
      //    .catch(function (error) {
      //       console.log(error);
      //    })
      //    .then(function () {
      //       // always executed
      //    });  




            

        },
      
        beforeRouteUpdate (to, from, next) {
            this.initialize(to)
            next();
         },
        computed: {
          formIsValid () {
            return this.title !== '' &&
              this.imageUrl !== '' 

          },
          pictures() {
             return this.$store.state.pictures
          },
          labels() {
             return this.$store.state.labels
          }
        },
        methods: {
         initialize(theRoute){
            this.$store.state.progressBar = true
          console.log( theRoute.params.foodName )
          this.title = theRoute.params.foodName
          this.$store.dispatch('fetchPics', theRoute.params.foodName)
         

         },
         onCreateMeetup () {
            if (!this.formIsValid) {
              return
            }
            if (!this.image) {
              return
            }
            

            const meetupData = {
               title: this.title,
              image: this.image,
            }
            this.$store.dispatch('createPic', meetupData)
            this.imageUrl = null
            // this.$router.push('/meetups')
          },
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
          }
        }
      }
    </script>