import Vue from 'vue'
import VueRouter from 'vue-router'
//components
import MainLayout from '../views/MainLayout'
import ImagesPage from '@/views/ImagesPage'
import ImagePage from '@/views/ImagePage'
import EditImagePage from '@/views/EditImagePage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainLayout',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'ImagesPage',
        component: ImagesPage
      },
      {
        path: ':id',
        name: 'ImagePage',
        component: ImagePage
      },
      {
        path: ':id/edit',
        name: 'EditImagePage',
        component: EditImagePage
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
