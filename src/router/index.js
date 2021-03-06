import Vue from 'vue'
import Router from 'vue-router'
import DiningHall from '@/components/DiningHall'
import CreatePicture from '@/components/CreatePicture'
import AllPictures from '@/components/allpictures'
import CloudVision from '@/components/CloudVision'
import Search from '@/components/Search'

Vue.use(Router)

const router= new Router({
  routes: [
   {
      path: '/',
      redirect: '/Cowell%2FStevenson'
    },
    {
      path: '/allpictures',
      name: 'AllPictures',
      component: AllPictures
   },
   {
      path: '/cloudvision',
      name: 'CloudVision',
      component: CloudVision
   },
   {
      path: '/search',
      name: 'Search',
      component: Search
   },

    {
      path: '/create/:foodName',
      name: 'CreatePicture',
      component: CreatePicture
   },
    {  
      path: '/:dininghall',
      name: 'DiningHall',
      component: DiningHall
    },
    
  ],
  mode: 'history'
})
export default router
