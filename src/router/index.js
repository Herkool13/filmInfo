import { createRouter, createWebHistory } from 'vue-router'
import FilmInfoVue from '../pages/FilmInfo.vue';
import Home from '../pages/Home.vue'
const routes=[
  {path:"/",name:'home',component:Home},
  {path:"/:id",name:'filmInfo',component:FilmInfoVue},

];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes 
})

export default router
