import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Hashtags from '../views/Hashtags.vue'
import Tweets from '../views/Tweets.vue'
import Users from '../views/Users.vue'
import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      anonymous: true
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/hashtags',
    name: 'hashtags',
    component: Hashtags,
  },
  {
    path: '/tweets',
    name: 'tweets',
    component: Tweets,
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior: () => {
    return {x: 0, y: 0}
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !record.meta.anonymous)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  next()
});

export default router
