import Vue from 'vue'
import Router from 'vue-router'
import DiningHall from '@/components/DiningHall'

Vue.use(Router)

const router= new Router({
  routes: [
   {
      path: '/',
      redirect: '/Cowell%2FStevenson'
    },
    {  
      path: '/:dininghall',
      name: 'DiningHall',
      component: DiningHall
    }
  ],
  mode: 'history'
})
export default router
