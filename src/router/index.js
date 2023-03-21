import idsrvAuth from '@/utils/idsrvAuth';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Admin from '@/views/Admin.vue';
import AuthRequired from '@/views/auth/AuthRequired';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

// navigation guards
const ifNotAuthenticated = (to, from, next) => {
  if (!idsrvAuth.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (idsrvAuth.isAuthenticated) {
    next();
  } else {
    next({
      path: '/auth-required',
      query: { // passing requested page path to redirect after login
        target: to.fullPath
      }
    });
  }
};

const router = new VueRouter({
  // @todo do server configuration before using history mode
  // @see https://stackoverflow.com/a/51340156
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: Home
      },
      beforeEnter: ifAuthenticated
    },
    /*{
      path: '/playground',
      name: 'playground',
      components: {
        default: Playground
      },
      beforeEnter: ifAuthenticated,
      meta: {
        authName: idsrvAuth.authName
      }
    }*/
  ]
});

idsrvAuth.useRouter(router);

export default router;
