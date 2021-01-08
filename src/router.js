import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/mainPage',//分享主页
      name: 'mainPage',
      component: () => import('./views/mainPage.vue'),
    },
    {
      path: '/',
      name: 'mainPage',
      redirect: '/mainPage',
      component: () => import('./views/mainPage.vue'),
    },
    {
      path: '/index',//微沙盘
      name: 'index',
      component: () => import('./views/index.vue'),
    },
    {
      path: '/buildingElectronicBooks',//电子楼书
      name: 'buildingElectronicBooks',
      component: () => import('./views/buildingElectronicBooks.vue'),
    },
    {
      path: '/hardcoverRoaming',//精装漫游
      name: 'hardcoverRoaming',
      component: () => import('./views/hardcoverRoaming.vue'),
    },
    {
      path: '/airview',//鸟瞰户型
      name: 'airview',
      component: () => import('./views/airview.vue'),
    },
    {
      path: '/houseAppreciation',//户型鉴赏
      name: 'houseAppreciation',
      component: () => import('./views/houseAppreciation.vue'),
    },
    {
      path: '/landscapeRoam',//景观漫游
      name: 'landscapeRoam',
      component: () => import('./views/landscapeRoam.vue'),
    },
    {
      path: '/mortgageCalculator',//房贷计算器
      name: 'mortgageCalculator',
      component: () => import('./views/mortgageCalculator.vue'),
    },
    {
      path: '/computationResult',//计算结果
      name: 'computationResult',
      component: () => import('./views/computationResult.vue'),
    },
    {
      path: '/basicInfo',//基本信息
      name: 'basicInfo',
      component: () => import('./views/basicInfo.vue'),
    },
    {
      path: '/beautifulpictures',//美图欣赏
      name: 'beautifulpictures',
      component: () => import('./views/beautifulpictures.vue'),
    },
    {
      path: '/circumConfig',//周边配置
      name: 'circumConfig',
      component: () => import('./views/circumConfig.vue'),
    },
    {
      path: '/versiondeclarate',//版权申明
      name: 'versiondeclarate',
      component: () => import('./views/versiondeclarate.vue'),
    },
    {
      path: '/soloshow',//独栋展示
      name: 'soloshow',
      component: () => import('./views/soloshow.vue'),
    },
    {
      path: '/articleInfo',//文章推荐
      name: 'articleInfo',
      component: () => import('./views/articleInfo.vue'),
    },
    {
      path:'/geographicinfo',//地理信息
      name:'geographicinfo',
      component: () => import('./views/geographicinfo.vue'),
    },
    {
      path:'/getLoction',//导航
      name:'getLoction',
      component: () => import('./views/getLoction.vue'),
      
    }
  ]
})