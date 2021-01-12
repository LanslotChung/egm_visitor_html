<template>
  <div class="nav">
    <div class="box-0">
      <!-- <div>{{data}}</div> -->
      <div
        v-for="(item, index) in matchList"
        :key="index"
        class="box-0-0"
        @click="goPage(item.nav.path, 0)"
      >
        <div class="box-0-0-0">
          <img
            :id="index"
            :src="item.nav.code == navCode ? item.nav.icon0 : item.nav.icon1"
          />
        </div>
        <div
          class="box-0-0-1"
          :style="item.nav.code == navCode ? 'color:#0072FF' : ''"
        >
          {{ item.data.name }}
        </div>
      </div>
      <div
        v-if="data.childrenList.length > 0"
        class="box-0-0"
        @click="showChildrenListFn"
      >
        <div class="box-0-0-0 more">
          <img
            :src="
              moreColor == 0
                ? moreImgG
                : moreImg
            "
          />
        </div>
        <div class="box-0-0-1">更多</div>
      </div>
    </div>
    <div
      :class="
        showChildrenList && ready
          ? 'box-1-myfirst box-1'
          : ready
          ? 'box-1 box-1-myfirst1'
          : 'box-1'
      "
      v-if="data.childrenList.length > 0"
    >
      <div v-for="(item, index) in childrenList" :key="item.code">
        <div v-if="index < 4" class="box-1-0" @click="goPage(item.nav.path, 1)">
          <div class="box-0-0-0">
            <img
              :src="item.nav.code == navCode ? item.nav.icon0 : item.nav.icon1"
            />
          </div>
          <div
            class="box-0-0-1"
            :style="item.nav.code == navCode ? 'color:#0072FF' : ''"
          >
            {{ item.data.name }}
          </div>
        </div>
      </div>
      <div
        class="box-1-0-0"
        v-for="(item, index) in childrenList"
        :key="item.code"
      >
        <div
          v-if="index >= 4"
          class="box-1-0"
          @click="goPage(item.nav.path, 1)"
        >
          <div class="box-0-0-0">
            <img
              :src="item.nav.code == navCode ? item.nav.icon0 : item.nav.icon1"
            />
          </div>
          <div
            class="box-0-0-1"
            :style="item.nav.code == navCode ? 'color:#4b7df6' : ''"
          >
            {{ item.data.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomNav",
  props: {
    navCode: {
      type: String,
    },
  },
  data() {
    return {
      data: window.bottomData,
      moreColor: window.moreColor,
      moreImg: require("../assets/imgs/ico_gengduo.svg"),
      moreImgG:require("../assets/imgs/ico_gengduo_grey.svg"),
      nav: [
        {
          code: "sandtable", //微沙盘
          path: "/index",
          icon0: require("../assets/imgs/ico_niaokan.svg"),
          icon1: require("../assets/imgs/ico_niaokan_grey.svg"),
        },
        {
          code: "ebook", //电子楼书
          path: "/buildingElectronicBooks",
          icon0: require("../assets/imgs/ico_dianzishu.svg"),
          icon1: require("../assets/imgs/ico_dianzishu_grey.svg"),
        },
        {
          code: "Houseappreciation", //户型鉴赏
          path: "/houseAppreciation",
          icon0: require("../assets/imgs/ico_huxingjianshang.svg"),
          icon1: require("../assets/imgs/ico_huxingjianshang_grey.svg"),
        },
        {
          code: "landscaperoam", //景观漫游
          path: "/landscapeRoam",
          icon0: require("../assets/imgs/ico_jingguan.svg"),
          icon1: require("../assets/imgs/ico_jingguan_grey.svg"),
        },
        {
          code: "houseloan", //房贷计算器
          path: "/mortgageCalculator",
          icon0: require("../assets/imgs/ico_jisuanqi.svg"),
          icon1: require("../assets/imgs/ico_jisuanqi_grey.svg"),
        },
        {
          code: "basicInfo", //基本信息
          path: "/basicInfo",
          icon0: require("../assets/imgs/ico_jibenxinxi.svg"),
          icon1: require("../assets/imgs/ico_jibenxinxi_grey.svg"),
        },
        {
          code: "beautifulpictures", //美图鉴赏
          path: "/beautifulpictures",
          icon0: require("../assets/imgs/ico_meitu.svg"),
          icon1: require("../assets/imgs/ico_meitu_grey.svg"),
        },

        {
          code: "peripheral", //周边配置
          path: "/circumConfig",
          icon0: require("../assets/imgs/ico_zhoubian.svg"),
          icon1: require("../assets/imgs/ico_zhoubian_grey.svg"),
        },

        {
          code: "versiondeclarate", //版权申明
          path: "/versiondeclarate",
          icon0: require("../assets/imgs/ico_banben.svg"),
          icon1: require("../assets/imgs/ico_banben_grey.svg"),
        },
        {
          code: "soloshow", //独栋展示
          path: "/soloshow",
          icon0: require("../assets/imgs/ico_litishapan.svg"),
          icon1: require("../assets/imgs/ico_litishapan_grey.svg"),
        },
        {
          code: "geographicinfo", //地理信息
          path: "/geographicinfo",
          icon0: require("../assets/imgs/ico_dili.svg"),
          icon1: require("../assets/imgs/ico_dili_grey.svg"),
        },
      ],
      matchList: [],
      childrenList: [],
      ready: false,
      showChildrenList: false,
    };
  },
  created() {
    for (let i = 0; i < this.data.matchList.length; i++) {
      for (let j = 0; j < this.nav.length; j++) {
        if (this.data.matchList[i].code == this.nav[j].code) {
          this.matchList.push({
            data: this.data.matchList[i],
            nav: this.nav[j],
          });
        }
      }
    }
    for (let i = 0; i < this.data.childrenList.length; i++) {
      for (let j = 0; j < this.nav.length; j++) {
        if (this.data.childrenList[i].code == this.nav[j].code) {
          this.childrenList.push({
            data: this.data.childrenList[i],
            nav: this.nav[j],
          });
        }
      }
    }
  },
  methods: {
    goPage(path, colorCode) {
      window.moreColor = colorCode;
      if ("/" + this.$route.matched[0].name == path) {
        return;
      }
      this.$router.push({
        path: path,
      });
    },
    showChildrenListFn() {
      this.ready = true;
      this.showChildrenList = !this.showChildrenList;
    },
  },
};
</script>

<style scoped>
.nav {
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  z-index: 999;
  overflow: visible;
}

.box-0 {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 60px;
  line-height: 60px;
  position: relative;
  background: #ffffff;
  z-index: 999;
  overflow: visible;
}

.box-0-0 {
  flex: 1;
  color: #999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  overflow: visible;
}
.box-0-0-0 {
  width: 32%;
  height: 40%;
  margin-top: 17%;
  z-index: inherit;
  overflow: visible;
}
.box-0-0-0 img {
  width: 24px;
  height: 24px;
  display: block;
  z-index: inherit;
  overflow: visible;
}
.box-0-0-1 {
  font-size: 10px;
  height: 14px;
  line-height: 14px;
  margin-top: 7%;
  margin-bottom: 13%;
  color: #222426;
  z-index: inherit;
  overflow: visible;
}
.more {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.box-1 {
  position: absolute;
  bottom: -150px;
  max-width: 225px;
  right: 10px;
  display: flex;
  text-align: center;
  font-size: 15px;
  flex-wrap: wrap;
  background: #ffffff;
  justify-content: left;
  border-radius: 6px;
  z-index: 2;
  margin-bottom: 25px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  overflow: visible;
}

.box-1::before {
  content: "";
  position: absolute;
  right: 20px;
  width: 10px;
  height: 10px;
  margin-top: -10px;
  bottom: -5px;
  background: inherit;
  /*自动继承父元素的背景*/
  transform: rotate(45deg);
  z-index: 1;
  overflow: visible;
}
.box-1-myfirst {
  animation: myfirst 0.2s;
  animation-fill-mode: forwards;
  overflow: visible;
}
.box-1-myfirst1 {
  animation: myfirst1 0.2s;
  animation-fill-mode: forwards;
  overflow: visible;
}
.box-1-0 {
  position: relative;
  width: 75px;
  color: #999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60px;
  color: #9e9e9e;
  overflow: hidden;
  z-index: inherit;
}
.box-1-0-0 {
  position: relative;
  z-index: 2;
}
@keyframes myfirst {
  from {
    bottom: -150px;
  }
  to {
    bottom: 50px;
  }
}
@keyframes myfirst1 {
  from {
    bottom: 50px;
  }
  to {
    bottom: -150px;
  }
}
@supports (bottom: env(safe-area-inset-bottom)) {
  .nav {
    padding-bottom: env(safe-area-inset-bottom);
  }
  .box-0 {
    padding-bottom: env(safe-area-inset-bottom);
  }
  @keyframes myfirst {
    from {
      bottom: -150px;
    }
    to {
      bottom: calc(50px + env(safe-area-inset-bottom));
    }
  }
  @keyframes myfirst1 {
    from {
      bottom: calc(50px + env(safe-area-inset-bottom));
    }
    to {
      bottom: -150px;
    }
  }
}
</style>