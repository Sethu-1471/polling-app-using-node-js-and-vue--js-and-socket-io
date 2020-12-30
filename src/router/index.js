import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);
const routes = [
  {
    path: '/poll/:id',
    name: 'Home',
    component: Home,
    meta: {
      guest: true
  }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
      guest: true
  }
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('../views/CreatePoll.vue'),
    meta: {
      requiresAuth: true
      }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue'),
    meta: {
      guest: true
  }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (sessionStorage.getItem('auth') == null) {
      next()
    } else {
      next()
    } 
  } else if(to.matched.some(record => record.meta.guest)) {
    if(sessionStorage.getItem('auth') == null){
      next();
    }
    else{
      next();
    }
}else {
    next()
  }

})

// To avoid Display error
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

export default router
