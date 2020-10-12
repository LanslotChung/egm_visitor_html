<template>
  <div class="nav">
    <div class="box-0">
      <!-- <div>{{data}}</div> -->
      <div v-for="(item,index) in matchList" :key="index" class="box-0-0" @click='goPage(item.nav.path)'>
        <div class="box-0-0-0"><img :src="item.nav.code == navCode ? item.nav.icon1 : item.nav.icon0" :style="item.nav.code == navCode ? 'filter: brightness(100%)':''"/></div>
        <div class="box-0-0-1" :style="item.nav.code == navCode ? 'color:#4b7df6':''">{{item.data.name}}</div>
      </div>
      <div v-if="data.childrenList.length>0" class="box-0-0" @click="showChildrenListFn">
        <div class="box-0-0-0 more"><img src="../assets/imgs/gd.png" style="filter: brightness(100%)"/></div>
        <div class="box-0-0-1">更多</div>
      </div>
    </div>
    <div :class="showChildrenList && ready ? 'box-1-myfirst box-1': ready?'box-1 box-1-myfirst1':'box-1'" v-if="data.childrenList.length>0">
      <div v-for="(item,index) in childrenList" :key="item.code" style="border-bottom:1px solid #e0e0e0">
        <div v-if="index<4" class="box-1-0" @click='goPage(item.nav.path)'>
          <div class="box-0-0-0"><img :src="item.nav.code == navCode ? item.nav.icon1 : item.nav.icon0" :style="item.nav.code == navCode ? 'filter: brightness(100%)':''" /></div>
          <div class="box-0-0-1" :style="item.nav.code == navCode ? 'color:#4b7df6':''">{{item.data.name}}</div>
        </div>
      </div>
      <div v-for="(item,index) in childrenList" :key="item.code">
        <div v-if="index>=4" class="box-1-0" @click='goPage(item.nav.path)'>
          <div class="box-0-0-0"><img :src="item.nav.code == navCode ? item.nav.icon1 : item.nav.icon0" :style="item.nav.code == navCode ? 'filter: brightness(100%)':''" /></div>
          <div class="box-0-0-1" :style="item.nav.code == navCode ? 'color:#4b7df6':''">{{item.data.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BottomNav',
    props: {
      navCode:{
        type:String,
      }
    },
    data(){
      return {
        data:window.bottomData,
        nav:[
          {
            code:"sandtable",//微沙盘
            path:"/index",
            icon0:require('../assets/imgs/wsp0.png'),
            icon1:require('../assets/imgs/wsp1.png')
          },
          {
            code:"ebook",//电子楼书
            path:"/buildingElectronicBooks",
            icon0:require('../assets/imgs/dzls0.png'),
            icon1:require('../assets/imgs/dzls1.png')
          },
          {
            code:"Houseappreciation",//户型鉴赏
            path:"/houseAppreciation",
            icon0:require('../assets/imgs/hxjs0.png'),
            icon1:require('../assets/imgs/hxjs1.png')
          },
          {
            code:"landscaperoam",//景观漫游
            path:"/landscapeRoam",
            icon0:require('../assets/imgs/jgmy0.png'),
            icon1:require('../assets/imgs/jgmy1.png')
          },
          {
            code:"houseloan",//房贷计算器
            path:"/mortgageCalculator",
            icon0:require('../assets/imgs/fdjsq0.png'),
            icon1:require('../assets/imgs/fdjsq1.png')
          },
          {
            code:"basicInfo",//基本信息
            path:"/basicInfo",
            icon0:require('../assets/imgs/jbxx0.png'),
            icon1:require('../assets/imgs/jbxx1.png')
          },
          {
            code:"beautifulpictures",//美图鉴赏
            path:"/beautifulpictures",
            icon0:require('../assets/imgs/mtjs0.png'),
            icon1:require('../assets/imgs/mtjs1.png')
          },

          {
            code:"peripheral",//周边配置
            path:"/circumConfig",
            icon0:require('../assets/imgs/ddsz0.png'),
            icon1:require('../assets/imgs/ddsz1.png')
          },
          
          {
            code:"versiondeclarate",//版权申明
            path:"/versiondeclarate",
            icon0:require('../assets/imgs/bqsm0.png'),
            icon1:require('../assets/imgs/bqsm1.png')
          },
          {
            code:"soloshow",//独栋展示
            path:"/soloshow",
            icon0:require('../assets/imgs/zbpt0.png'),
            icon1:require('../assets/imgs/zbpt1.png')
          }
        ],
        matchList:[],
        childrenList:[],
        ready:false,
        showChildrenList:false
      }
    },
    created() {
      for(let i=0;i<this.data.matchList.length;i++){
        for(let j = 0;j<this.nav.length;j++){
          if(this.data.matchList[i].code == this.nav[j].code){
            this.matchList.push({
              data:this.data.matchList[i],
              nav:this.nav[j]
            });
          }
        }
      }
      for(let i=0;i<this.data.childrenList.length;i++){
        for(let j = 0;j<this.nav.length;j++){
          if(this.data.childrenList[i].code == this.nav[j].code){
            this.childrenList.push({
              data:this.data.childrenList[i],
              nav:this.nav[j]
            });
          }
        }
      }
    },
    methods: {
      goPage(e){
        if(('/'+this.$route.matched[0].name) == e){
          return
        }
        this.$router.push({
          path: e
        });
      },
      showChildrenListFn(){
        this.ready = true;
        this.showChildrenList = !this.showChildrenList;
      }
    }
  }
</script>

<style scoped>
  .nav {
    height: 49.5px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 0.5px solid #9e9e9e;
    background-color: #fff;
    z-index: 100;
  }

  .box-0 {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 49.5px;
    line-height: 49.5px;
    position: relative;
    z-index: 100;
    background-color: #fff;
  }

  .box-0-0 {
    flex: 1;
    color: #999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .box-0-0-0{
    width: 16px;
    height: 16px;
  }
  .box-0-0-0 img{
    width: 16px;
    height: 16px;
    display: block;
    filter: brightness(50%);

  }
  .box-0-0-1{
    font-size: 10px;
    height: 14px;
    line-height: 14px;
    padding-top: 7px;
    color:#7b7b7b;
  }
  .more{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .more img{
    width: 22px;
    height: 5.4px;
  }
  .box-1{
    position: absolute;
    bottom:-150px;
    left: 0;
    right: 0;
    z-index: 8;
    display: flex;
    text-align: center;
    font-size: 15px;
    flex-wrap: wrap;
    background-color: #fff;
    justify-content: center;
    border-top: 0.5px solid #e0e0e0;
    z-index: 99;
  }
  .box-1-myfirst{
    animation: myfirst .2s;
    animation-fill-mode:forwards;
  }
  .box-1-myfirst1{
    animation: myfirst1 .2s;
    animation-fill-mode:forwards;
  }
  .box-1-0{
    width: 70px;
    margin: 0 5px;
    color: #999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 49.5px;
    color:#9e9e9e;
  }
  @keyframes myfirst{
    from{
        bottom:-150px;
    }
    to{
        bottom:50px;
    }
  }
  @keyframes myfirst1{
    from{
        bottom:50px;
    }
    to{
        bottom:-150px;
    }
  }
  @supports (bottom: env(safe-area-inset-bottom)) {
    .nav {
      padding-bottom: env(safe-area-inset-bottom);
    }
    .box-0{
      padding-bottom: env(safe-area-inset-bottom);
    }
    @keyframes myfirst{
      from{
          bottom:-150px;
      }
      to{
          bottom:calc(50px + env(safe-area-inset-bottom));
      }
    }
    @keyframes myfirst1{
      from{
          bottom:calc(50px + env(safe-area-inset-bottom));
      }
      to{
          bottom:-150px;
      }
    }
  }
</style>