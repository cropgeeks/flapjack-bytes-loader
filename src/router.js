import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const brapiBaseUrl = process.env.VUE_APP_BRAPI_BASE

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: {
        title: 'Flapjack Bytes Loader',
      },
      props: {
        brapiBase: brapiBaseUrl
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
    },
    {
      path: '/bytes',
      name: 'bytes',
      component: () => import('./views/Bytes.vue'),
      meta: {
        title: 'Flapjack Bytes Viewer',
      }
    }
  ]
})


const DEFAULT_TITLE = 'Flapjack Bytes Loader';
router.afterEach((to) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;