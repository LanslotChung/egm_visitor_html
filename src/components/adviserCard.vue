<template>
  <div>
    <div class="box-3-0">
      <div class="box-3-0-0">
        <img :src="indexInfo.adviserHeadPic" />
      </div>
      <div class="box-3-0-1">
        <div class="box-3-0-1-0">{{ indexInfo.adviserName }}</div>
        <div class="box-3-0-1-1">
          <img src="../assets/imgs/ico_jinpai.svg" />{{
            indexInfo.adviserLevelName
          }}
        </div>
      </div>
      <div class="box-3-0-2 box-3-0-3" @click="addWechat">
        <div class="box-3-0-2-0">
          <img src="../assets/imgs/ico_weixin.svg" />
        </div>
        <div class="box-3-0-2-1">加微信</div>
      </div>
      <div class="box-3-0-2 box-3-0-3">
        <a :href="'tel:' + indexInfo.adviserMobile"></a>
        <div class="box-3-0-2-0">
          <img src="../assets/imgs/ico_dianhua1.svg" />
        </div>
        <div class="box-3-0-2-1">拨号</div>
      </div>
    </div>
    <div :style="'height:' + h + 'px'">
      <img
        style="margin-left: 3%; width: 94%; height: 100%; border-radius: 4px"
        :src="indexInfo.productObj.mainPic"
      />
    </div>
    <div class="box-3-1">
      <div class="box-3-1-0">
        <div class="box-3-1-0-0">{{ indexInfo.productObj.name }}</div>
        <div class="box-3-1-0-1">
          <div class="box-3-1-0-1-0" v-for="(tag, index) in indexInfo.productObj.labels" :key="index">
            {{ tag }}
          </div>
        </div>
      </div>
      <div class="box-3-1-1">
        <div class="box-3-1-1-0">￥{{ indexInfo.productObj.price }}</div>
        <div class="box-3-1-1-1">均价(元/平)</div>
      </div>
    </div>
    <div class="box-3-2">
      <div class="box-3-2-0">
        <div class="box-3-2-1">
          <img
            v-for="(image, index) in indexInfo.visitorHeadPics"
            :key="index"
            :src="image.headPic"
          />
        </div>
        <div style="color: #0072ff">{{ indexInfo.hits }}</div>
        <div>人浏览</div>
      </div>
      <div class="box-3-2-2" @click="doShare">
        <img src="../assets/imgs/ico_fenxiang.svg" />
        <div>分享</div>
      </div>
    </div>
    <div class="box-3-3">
      <img src="../assets/imgs/ico_dingwei.svg" />
      <div class="box-3-3-0">{{ indexInfo.productObj.address }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "adviserCard",
  props: {
    indexInfo: {
      type: Object,
    },
  },
  data() {
    return {
      w: window.screen.width,
      h: window.screen.height / 4,
      tags: ["宜居生态", "普通住宅", "花园洋房"],
      price: "18000",
    };
  },
  methods: {
    addWechat() {
      this.$copyText(this.indexInfo.adviserWxNumber).then(
        function (e) {
          alert("微信号已复制");
          console.log(e);
        },
        function (e) {
          alert("微信号复制失败，请重试");
          console.log(e);
        }
      );
    },
    doShare(){
      this.$copyText("192.168.3.46:8080/?"+"projectId="+window.parameters.projectId+"&adviserId="+window.parameters.adviserId).then(
        function (e) {
          alert("分享地址已复制");
          console.log(e);
        },
        function (e) {
          alert("分享地址复制失败，请重试");
          console.log(e);
        }
      );
    }

  },
};
</script>
<style scoped>
.box-3-0 {
  padding: 3%;
  display: flex;
  align-items: center;
}
.box-3-0-0 {
  width: 52px;
  height: 52px;
  border-radius: 30px;
  overflow: hidden;
}
.box-3-0-0 img {
  width: 52px;
  height: 52px;
  display: block;
}
.box-3-0-1 {
  flex: 1;
  height: 52px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 2%;
}
.box-3-0-1-0 {
  font-size: 18px;
  height: 18px;
  line-height: 18px;
  font-weight: bold;
  padding: 4%;
}
.box-3-0-1-1 {
  font-size: 12px;
  color: #222426;
  display: flex;
}
.box-3-0-1-1 img {
  margin-right: 1%;
  height: 100%;
}
.box-3-0-2 {
  width: 13%;
  font-size: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box-3-0-2-0 {
  width: 20px;
  height: 20px;
  background-color: #cce3ff;
  border-radius: 50%;
  padding: 9%;
}
.box-3-0-2-0 img {
  display: block;
  width: 100%;
  height: 100%;
}
.box-3-0-2-1 {
  width: 110%;
  margin-top: 14%;
}
.box-3-0-3 {
  margin-right: 2%;
  position: relative;
  margin-left: 3%;
}
.box-3-0-3 a {
  position: absolute;
  left: 0;
  right: 10px;
  bottom: 0;
  top: 0;
}
.box-3-1 {
  padding: 3%;
  display: flex;
  align-items: center;
}
.box-3-1-0 {
  width: 76%;
  height: 100%;
}
.box-3-1-0-0 {
  opacity: 0.9;
  font-size: 17px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 600;
  text-align: left;
  color: #000000;
  line-height: 1rem;
}
.box-3-1-0-1 {
  display: flex;
  align-items: center;
  overflow: hidden;
}
.box-3-1-0-1-0 {
  width: 21%;
  background: #d9eaff;
  border-radius: 3px;
  font-size: 10px;
  font-family: PingFangSC, PingFangSC-Regular;
  text-align: center;
  color: #0072ff;
  line-height: 18px;
  margin-right: 3%;
  padding: 1%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.box-3-1-1 {
  width: 24%;
  height: 100%;
}
.box-3-1-1-0 {
  opacity: 0.9;
  font-size: 17px;
  font-family: Roboto, Roboto-Black;
  font-weight: 900;
  text-align: left;
  color: #ff5500;
  line-height: 24px;
  text-align: right;
}
.box-3-1-1-1 {
  opacity: 0.9;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #808591;
  line-height: 17px;
  text-align: right;
  margin-top: 12%;
}
.box-3-2 {
  display: flex;
  align-items: center;
  height: 0.74667rem;
  padding: 1% 0;
}
.box-3-2-0 {
  display: flex;
  align-items: center;
  font-size: 12px;
  width: 81%;
  line-height: 24px;
  padding-top: 2%;
}
.box-3-2-1 {
  margin-left: 4%;
  width: 32%;
}
.box-3-2-1 img {
  width: 24px;
  border: 3px solid #ffffff;
  border-radius: 60%;
  margin: -5%;
}
.box-3-2-2 {
  display: flex;
  align-items: center;
  width: 17%;
  height: 0.74667rem;
  background: #0072ff;
  border-radius: 0.48rem;
  font-size: 0.32rem;
  font-family: PingFangSC, PingFangSC-Regular;
  color: #ffffff;
  line-height: 0.74667rem;
  text-align: center;
}
.box-3-2-2 img {
  height: 0.32rem;
  margin: 0 11%;
  margin-top: 5%;
}
.box-3-3 {
  display: flex;
  align-items: center;
  opacity: 0.9;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #222426;
  line-height: 16px;
  height: 0.7rem;
  padding-bottom: 2%;
  padding-left: 3%;
}
.box-3-3 img {
  height: 60%;
}
.box-3-3-0 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 3%;
}
</style>