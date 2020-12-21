<template>
  <div class="box-0">
    <div class="box-1">
      <div class="box-1-0" v-if="indexInfo && indexInfo.productObj.name">
        {{ indexInfo.productObj.name }}
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="box-2" v-if="indexInfo&&indexInfo.projectAdvertList">
      <van-swipe :autoplay="30000" :width="w" :height="h" @change="onChange">
        <van-swipe-item
          class="box-2-1"
          v-for="(image, index) in indexInfo.projectAdvertList"
          :key="index"
        >
          <img :id="index" :src="image.url" />
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator">
          <div class="box-2-2" v-if="indexInfo.projectAdvertList.length>=2">
            <div
              :class="current == index ? 'box-2-2-1 ' : ' box-2-2-2'"
              v-for="(image, index) in indexInfo.projectAdvertList"
              :key="index"
            ></div>
          </div>
        </div>
      </van-swipe>
    </div>
    <!-- 名片 -->
    <div class="box-3" v-if="indexInfo && indexInfo.adviserName">
      <adviser-card :indexInfo="indexInfo" />
    </div>
    <!-- 线上展厅 -->
    <div class="box-3" v-if="indexInfo&&indexInfo.productSingleFamily">
      <show-room :productSingleFamily="indexInfo.productSingleFamily" />
    </div>
    <div class="box-3" v-if="indexInfo">
      <div class="box-3-4">
        <div class="box-3-4-0"></div>
        <div class="box-3-4-1">带我看户型</div>
        <div class="box-3-4-2" @click="goPage('/houseAppreciation')">
          查看更多
        </div>
        <img src="../assets/imgs/ico_right.svg" />
      </div>
      <house-type :indexInfo="indexInfo" />
    </div>
    <div class="box-3" v-if="indexInfo && indexInfo.productBeaPicList">
      <div class="box-3-4">
        <div class="box-3-4-0"></div>
        <div class="box-3-4-1">美图欣赏</div>
        <div class="box-3-4-2" @click="goPage('/beautifulpictures')">
          查看更多
        </div>
        <img src="../assets/imgs/ico_right.svg" />
      </div>
      <picture-appreciate :productBeaPicList="indexInfo.productBeaPicList" />
    </div>
    <div class="box-3" v-if="indexInfo&&indexInfo.productObj">
      <div class="box-3-4">
        <div class="box-3-4-0"></div>
        <div class="box-3-4-1">楼盘信息</div>
        <div class="box-3-4-2" @click="goPage('/basicInfo')">
          查看更多
        </div>
        <img src="../assets/imgs/ico_right.svg" />
      </div>
      <building-info :productObj="indexInfo.productObj" />
    </div>
    <div class="box-3" v-if="indexInfo&&indexInfo.productObj&&indexInfo.projectAssortList">
      <div class="box-3-4">
        <div class="box-3-4-0"></div>
        <div class="box-3-4-1">周边配套</div>
        <div class="box-3-4-2" @click="goPage('/circumConfig')">
          查看更多
        </div>
        <img src="../assets/imgs/ico_right.svg" />
      </div>
      <ambitus-info :productObj="indexInfo.productObj" :projectAssortList="indexInfo.projectAssortList"/>
    </div>
    <div class="box-3" v-if="indexInfo&&indexInfo.articleInfoList">
      <div class="box-3-4">
        <div class="box-3-4-0"></div>
        <div class="box-3-4-1">文章推荐</div>
      </div>
      <doc-recommend :articleInfoList="indexInfo.articleInfoList"/>
    </div>
  </div>
</template>
<script>
import AdviserCard from "../components/adviserCard.vue";
import AmbitusInfo from '../components/ambitusInfo.vue';
import BuildingInfo from '../components/buildingInfo.vue';
import DocRecommend from '../components/docRecommend.vue';
import HouseType from "../components/houseType.vue";
import PictureAppreciate from "../components/pictureAppreciate.vue";
import ShowRoom from "../components/showRoom.vue";
export default {
  name: "mainPage",
  components: {
    AdviserCard,
    ShowRoom,
    HouseType,
    PictureAppreciate,
    BuildingInfo,
    AmbitusInfo,
    DocRecommend
  },
  data() {
  
     return {
      indexInfo: null,
      w: window.screen.width,
      h: window.screen.height / 4,
      images: [
        "http://img01.tooopen.com/Downs/images/2010/4/6/sy_20100406161748158023.jpg",
        "http://pic1.nipic.com/2008-11-24/20081124212033881_2.jpg",
        "http://pic1.nipic.com/2008-12-02/2008122215550709_2.jpg",
        "http://img01.tooopen.com/Downs/images/2010/4/6/sy_20100406161748158023.jpg",
      ],
      current: 0,
      projectImg: require("../assets/imgs/defultPic.png"),
    };
  },
  created() {},
  mounted() {
    this.getData();
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    addWechat() {
      this.$copyText(this.wechatId).then(
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
    getData() {
      this.indexInfo = window.indexInfo;
    },
    goPage(path) {
      if ("/" + this.$route.matched[0].name == path) {
        return;
      }
      this.$router.push({
        path: path,
      });
    },
  },
};
</script>
<style scoped>
.box-0 {
  background: #f7f7f7;
}
.box-1 {
  height: 1rem;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0px 2px 10px 0px rgba(228, 231, 237, 0.4);
  opacity: 0.9;
  font-size: 17px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 600;
  text-align: left;
  color: #000000;
  line-height: 1rem;
}
.box-1-0 {
  margin-left: 3%;
}
.box-2 {
  margin-top: 3%;
}
.box-2-1 img {
  max-width: 375px;
  width: 96%;
  border-radius: 3%;
  padding: 0 2%;
  max-height: 160px;
  height: 100%;
}
.box-2-2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  top: 0%;
  margin-top: 1%;
}
.box-2-2-1 {
  width: 12px;
  height: 6px;
  background: #222426;
  border-radius: 3px;
  margin: 0 2%;
}
.box-2-2-2 {
  width: 6px;
  height: 6px;
  background: #a2a2a3;
  border-radius: 3px;
  margin: 0 2%;
}
.box-3 {
  width: 96%;
  background-color: #fff;
  margin: 3% 2%;
  border-radius: 3%;
  box-shadow: 0px 3px 8px 0px rgba(192, 196, 204, 0.3);
}

.box-3-4 {
  padding: 3%;
  display: flex;
  align-items: center;
}
.box-3-4-0 {
  width: 4px;
  height: 18px;
  background: #0072ff;
  border-radius: 2px;
}
.box-3-4-1 {
  width: 27%;
  opacity: 0.9;
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #222426;
  line-height: 24px;
  margin-left: 3%;
}
.box-3-4-2 {
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  color: #222426;
  line-height: 20px;
  margin-left: 47%;
}
.box-3-4 img {
  height: 14px;
  margin-top: 0.5%;
  margin-left: 1%;
}
</style>
  