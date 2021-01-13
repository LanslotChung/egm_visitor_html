<template>
  <div>
    <div class="box-1">
      <div class="back" @click="goBack">
        <img src="../assets/imgs/ico_right.svg" />
      </div>
      <div class="box-1-0">
        <img :src="adviserHeadPic" />
      </div>
      <div class="box-1-1">
        <div class="box-1-1-0">{{ adviserName }}</div>
        <div class="box-1-1-1">
          <img src="../assets/imgs/ico_jinpai.svg" />{{ adviserLevelName }}
        </div>
      </div>
      <div class="box-1-2" style="display: none">聊天</div>
      <div class="box-1-2 box-1-3">
        <a :href="'tel:' + adviserMobile"></a>
        <div class="box-1-2-0">
          <img src="../assets/imgs/ico_dianhua1.svg" />
        </div>
        <div class="box-1-2-1">打电话</div>
      </div>
      <div class="box-1-2 box-1-4" @click="openLocation">
        <div class="box-1-2-0">
          <img src="../assets/imgs/ico_daohang.svg" />
        </div>
        <div class="box-1-2-1">导航</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TopFixed",
  data() {
    return {
      token: window.parameters.token,
      adviserName: decodeURIComponent(window.indexInfo.adviserName),
      adviserLevelName: decodeURIComponent(window.indexInfo.adviserLevelName),
      adviserHeadPic: decodeURIComponent(window.indexInfo.adviserHeadPic),
      adviserMobile: window.indexInfo.adviserMobile,
      locationPath: "/getLoction",
    };
  },
  mounted(){
    if(!window.indexInfo){
      this.goBack();
    }

  document.body.scrollTop = 0;
  },
  methods: {
    goBack() {
      // this.$router.push({
      //   path: "/mainPage",
      // });
      window.moreColor=0;
      window.history.back();
    },
    openLocation() {
      //1  跳转公众号页面,页面打开地图
      //2  配置此页面为公众号页面,直接打开地图  无空白页
      //3  跳转到小程序,然后打开地图
     // alert("213213");
    //  console.log("微信对象位————————————",window.wx)
    //   window.wx.openLocation({
    //     latitude: 28.032965,
    //     longitude: 113.00297,
    //     scale: 18,
    //   });
      // window.wx.miniProgram.navigateTo({
      //     url:'/pages/loading/loading?latitude='+window.parameters.latitude+'&longitude='+window.parameters.longitude+'&name='+decodeURIComponent(window.parameters.name)+'&address='+decodeURIComponent(window.parameters.address)
      // })
      // window.wx.openLocation({
      //     latitude:window.parameters.latitude,
      //     longitude:window.parameters.longitude,
      //     scale: 18
      // })

      this.$router.push({
        path: this.locationPath,
      });
    },
  },
};
</script>
<style scoped>
.box-0 {
  height: 50px;
}
.box-1 {
  height: 7%;
  top: 0;
  right: 0;
  left: 0;
  background-color: #fff;
  padding: 3% 2%;
  display: flex;
  align-items: center;
  z-index: 999;
   box-shadow: 0px 3px 8px 0px rgba(192, 196, 204, 0.6);
}
.box-1-0 {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
}
.box-1-0 img {
  width: 40px;
  height: 40px;
  display: block;
}
.box-1-1 {
  flex: 1;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 2%;
}
.box-1-1-0 {
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  font-weight: bold;
  padding: 2%;
}
.box-1-1-1 {
  font-size: 12px;
  color: #222426;
  display: flex;
}
.box-1-1-1 img {
  margin-right: 1%;
  height: 100%;
}
.box-1-2 {
  width: 13%;
  font-size: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box-1-2-0 {
  width: 20px;
  height: 20px;
  background-color: #cce3ff;
  border-radius: 50%;
  padding: 9%;
}
.box-1-2-0 img {
  display: block;
  width: 100%;
  height: 100%;
}
.box-1-2-1 {
  width: 108%;
}
.box-1-3 {
  position: relative;
}
.box-1-3 a {
  position: absolute;
  left: 0;
  right: 10px;
  bottom: 0;
  top: 0;
}
.back {
  width: 20px;
  transform: rotate(180deg);
  margin-right: 5px;
}
.back img {
  width: 20px;
}
</style>