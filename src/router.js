import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import store from './store.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (store.state.selectedProduct == undefined && to.name == "product") {
    next({ name: 'home' })
  }
  next();
})

export default router