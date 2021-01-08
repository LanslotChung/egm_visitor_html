<template>
  <div>
    <div class="box-1" v-for="(list, index) in articleInfoList" :key="index" @click="goArticleInfo('/articleInfo',list.id)">
      <div class="box-1-1"><img :src="list.cover" /></div>
      <div>
        <div class="box-1-1-1">{{ list.title }}</div>
        <div class="box-1-1-2">
          <img src="../assets/imgs/ico_yuedu.svg" />2389
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "houseType",
  props: {
    articleInfoList: {
      type: Array,
    },
  },
  data() {
    return {
      w: window.screen.width,
      h: window.screen.height / 4,
    };
  },
  methods:{
    goArticleInfo(path,id) {
    for(let i=0;i<this.articleInfoList.length;i++){
      if(id==this.articleInfoList[i].id){
      window.articleInfo= this.articleInfoList[i];
      break;
      }
      }
      
      if ("/" + this.$route.matched[0].name == path) {
        return;
      }
      this.$router.push({
        path: path,
      });
    },}
  
};
</script>
<style scoped>
.box-1 {
  display: flex;
}
.box-1-1 {
  padding: 0 3%;
}
.box-1-1 img {
  width: 120px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
}
.box-1-1-1 {
  opacity: 0.9;
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 700;
  text-align: left;
  color: #222426;
  line-height: 18px;
  height: 62px;
  margin-right: 3%;
}
.box-1-1-2 {
  opacity: 0.9;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #808591;
  line-height: 18px;
}
.box-1-1-2 img{
  height: 12px;
  margin-right: 5px;
  margin-bottom: -1px;
}
</style>