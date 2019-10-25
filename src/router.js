import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const brapiBaseUrl = "http://3.15.189.111:8081/gobii-dev/brapi/v1";
//= "http://cbsugobiixvm11.biohpc.cornell.edu:8081/gobii-dev/brapi/v1";
	//"http://3.15.189.111:8081/gobii-dev/brapi/v1";

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
router.afterEach((to, from) => {
    document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;