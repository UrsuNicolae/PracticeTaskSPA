import Vue from 'vue'
import Router from 'vue-router'
import MainComponent from '@/components/MainComponent'
import MovieDetailsComponet from '@/components/MovieDetailsComponet'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainComponents',
      component: MainComponent
    },
    {
      path: '/movie/:id',
      name: 'MovieDetailsComponet',
      component: MovieDetailsComponet
    }
  ]
})
