import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const vsnHost = process.env.VUE_APP_VSNI_BASE
// const jhiHost = process.env.VUE_APP_JHI_BASE

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: {
        title: 'Flapjack Bytes Loader',
      }
    },
    {
      path: '/options',
      name: 'options',
      component: () => import('./views/Options.vue'),
      meta: {
        title: 'Flapjack Bytes Options',
	  }
	},
    {
      path: '/matrix',
      name: 'matrix',
      component: () => import('./views/Matrix.vue'),
      meta: {
        title: 'Flapjack Bytes Matrix',
      }
    },
    {
      path: '/study',
      name: 'study',
      component: () => import('./views/Study.vue'),
      meta: {
        title: 'Flapjack Bytes Study',
      }
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('./views/Map.vue'),
      meta: {
        title: 'Flapjack Bytes Map',
      }
    }
  ]
})


const DEFAULT_TITLE = 'Flapjack Bytes Loader';
router.afterEach((to, from) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;