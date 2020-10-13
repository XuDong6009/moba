import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HerosEdit.vue'
import HeroList from '../views/HerosList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import AdsEdit from '../views/AdsEdit.vue'
import AdsList from '../views/AdsList.vue'
import UserEdit from '../views/UserEdit.vue'
import UserList from '../views/UserList.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },  
  {
  path: '/',
  name: 'Main',
  component: Main,
  children: [{
      path: '/categories/create',
      name: 'CategoryCreate',
      component: CategoryEdit
    },
    {
      path: '/categories/edit/:id',
      name: 'CategoryEdit',
      component: CategoryEdit,
      props: true //将id 注入到props中
    },
    {
      path: '/categories/list',
      name: 'CategoryList',
      component: CategoryList
    },

    //物品
    {
      path: '/items/create',
      name: 'ItemCreate',
      component: ItemEdit
    },
    {
      path: '/items/edit/:id',
      name: 'ItemEdit',
      component: ItemEdit,
      props: true //将id 注入到props中
    },
    {
      path: '/items/list',
      name: 'ItemList',
      component: ItemList
    },

    //英雄
    {
      path: '/heros/create',
      name: 'HeroCreate',
      component: HeroEdit
    },
    {
      path: '/heros/edit/:id',
      name: 'HeroEdit',
      component: HeroEdit,
      props: true //将id 注入到props中
    },
    {
      path: '/heros/list',
      name: 'HeroList',
      component: HeroList
    },

    //文章
    {
      path: '/articles/create',
      name: 'ArticleCreate',
      component: ArticleEdit
    },
    {
      path: '/articles/edit/:id',
      name: 'ArticleEdit',
      component: ArticleEdit,
      props: true //将id 注入到props中
    },
    {
      path: '/articles/list',
      name: 'ArticleList',
      component: ArticleList
    },

    //广告
    {
      path: '/ads/create',
      name: 'AdsCreate',
      component: AdsEdit
    },
    {
      path: '/ads/edit/:id',
      name: 'AdsEdit',
      component: AdsEdit,
      props: true //将id 注入到props中
    },
    {
      path: '/ads/list',
      name: 'AdsList',
      component: AdsList
    },

    //管理员
    {
      path: '/users/create',
      name: 'UserCreate',
      component: UserEdit
    },
    {
      path: '/users/edit/:id',
      name: 'UserEdit',
      component: UserEdit,
      props: true //将id 注入到props中
    },
    {
      path: '/users/list',
      name: 'UserList',
      component: UserList
    }

  ]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router