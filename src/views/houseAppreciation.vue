<template>
  <div>
    <TopFixed />
    <div class="box-1">
      <div
        class="line"
        style="
          width: 100%;
          height: 1px;
          padding-left: 20px;
          padding-right: 20px;
          background: #eee;
          "
      />
      <div style="display: flex; align-items: center; justify-content: center">
        <div class="box-1-0">
          <van-swipe
            :loop="false"
            :width="w"
            :show-indicators="false"
            ref="title"
            :stop-propagation="false"
          >
            <van-swipe-item
              v-for="(item, index) in familyList"
              :key="index"
              @click="titleClickFn(index)"
            >
              <div
                class="box-1-0-0"
                :style="
                  initialSwipe == index
                    ? 'color: #0072ff;font-weight: bold;'
                    : ''
                "
              >
                {{ item.house_type }}
              </div>
              <div
                :style="
                  initialSwipe == index
                    ? 'margin-left:20%;width:60%;height:3px;background-color: #0072ff;font-weight: bold;'
                    : ''
                "
              ></div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div>
        <div class="box-1-1">
          <van-swipe
            :loop="true"
            :show-indicators="false"
            @change="contentChangeFn"
            ref="content"
          >
            <van-swipe-item v-for="(item, index) in familyList" :key="index">
              <div class="box-1-1-0">
                <div>
                  <img class="box-1-1-1" :src="item.main_pic" />
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>

          <div
            :class="
              familyList[initialSwipe].houseImages.length > 0
                ? 'box-1-1-2 box-1-1-2-animation1'
                : 'box-1-1-2 box-1-1-2-animation2'
            "
            v-show="familyList[initialSwipe].url.length > 0"
            @click="goHardcoverRoaming"
          >
            精装漫游
          </div>
          <div
            :class="
              familyList[initialSwipe].houseImages.length > 0
                ? 'box-1-1-3 box-1-1-3-animation4'
                : 'box-1-1-3 box-1-1-3-animation3'
            "
            v-show="familyList[initialSwipe].houseImages.length > 0"
            @click="goAirview"
          >
            鸟瞰户型
          </div>
          <!-- :hidden="familyList[initialSwipe].houseImages.length > 0"
                    :hidden="familyList[initialSwipe].url.length > 0" -->
        </div>
      </div>
    </div>
    <BottomNav navCode="Houseappreciation" />
  </div>
</template>
<script>
import TopFixed from "@/components/TopFixed.vue";
import BottomNav from "@/components/BottomNav.vue";
export default {
  name: "houseAppreciation",
  components: {
    TopFixed,
    BottomNav,
  },
  data() {
    return {
      w:
        (parseFloat(document.getElementsByTagName("html")[0].style.fontSize) /
          37.5) *
        74,
      initialSwipe: 0,
      familyList: [],
      bottomDataName: "",
      bottomDataIndex: 0,
    };
  },
  created() {
    for (let i = 0; i < window.bottomData.matchList.length; i++) {
      if (window.bottomData.matchList[i].code == "Houseappreciation") {
        this.familyList = window.bottomData.matchList[i].maps;
        this.bottomDataName = "matchList";
        this.bottomDataIndex = i;
      }
    }
    if (this.familyList.length == 0) {
      for (let i = 0; i < window.bottomData.childrenList.length; i++) {
        if (window.bottomData.childrenList[i].code == "Houseappreciation") {
          this.familyList = window.childrenList.matchList[i].maps;
          this.bottomDataName = "childrenList";
          this.bottomDataIndex = i;
        }
      }
    }

    //this.$refs.content.resize()
  },
  mounted() {
    if (window.houseIndex) {
      for (let i = 0; i < this.familyList.length; i++) {
        if (window.houseIndex == this.familyList[i].id) {
          this.$refs.content.swipeTo(i);
          this.$refs.title.swipeTo(i);
          this.initialSwipe = i;
          break;
        }
      }
    }
  },
  methods: {
    titleClickFn(e) {
      this.$refs.content.swipeTo(e);
      this.$refs.title.swipeTo(e);
      this.initialSwipe = e;
      window.houseIndex = this.familyList[e].id;
    },
    contentChangeFn(e) {
      this.$refs.title.swipeTo(e);
      this.initialSwipe = e;
      window.houseIndex = e;
      window.houseIndex = this.familyList[e].id;
    },
    nextTitleFn: function() {
      let e = this.initialSwipe + 1;
      if (e > this.familyList.length - 1) {
        return;
      }
      this.initialSwipe = e;
      this.$refs.content.swipeTo(this.initialSwipe);
    },
    prevTitleFn() {
      let e = this.initialSwipe - 1;
      if (e < 0) {
        return;
      }
      this.initialSwipe = e;
      this.$refs.content.swipeTo(this.initialSwipe);
    },
    goHardcoverRoaming() {
      this.$router.push({
        path:
          "/hardcoverRoaming?bottomDataName=" +
          this.bottomDataName +
          "&bottomDataIndex=" +
          this.bottomDataIndex +
          "&id=" +
          this.initialSwipe,
      });
      //
    },
    goAirview() {
      this.$router.push({
        path:
          "/airview?bottomDataName=" +
          this.bottomDataName +
          "&bottomDataIndex=" +
          this.bottomDataIndex +
          "&id=" +
          this.initialSwipe,
      });
    },
  },
};
</script>
<style scoped>
.box-1 {
  height: calc(100vh - 100px);
  background-color: #fff;
  overflow-x: hidden;
}
.box-1-0 {
  height: 20px;
  width: 100%;
  padding: 10px 5px;
  background: #fff;
  margin-top: 1px;
}
.box-1-0-0 {
  margin: 0 2px;
  text-align: center;
  font-size: 14px;
  color: #000;
  line-height: 20px;
}
.box-1-1 {
  width: 344px;
  margin: 0 auto;
  height: calc(100vh - 160px);
  position: relative;
}
.box-1-1 .arrow-left {
  position: absolute;
  top: 50%;
  margin-top: -12px;
  left: 0px;
  z-index: 100;
}
.box-1-1 .arrow {
  position: absolute;
  z-index: 100;
  top: 50%;
  margin-top: -12px;
  right: 0px;
}
.box-1-1-1 {
  display: block;
  width: 100%;
  height: auto;
}
.box-1-1-0 {
  height: calc(100vh - 160px);
  overflow-y: scroll;
}
.box-1-1-2 {
  position: absolute;
  margin: 0 2px;
  left: 20%;
  bottom: 30px;
  width: 60%;
  height: 20px;
  border-radius: 20px;
  text-align: center;
  font-size: 15px;
  color: #fff;
  background-color: #0072ff;
  padding: 1% 0 2% 0;
  box-shadow: 3px 3px 3px #aca9a9;
  /* width: 30px;
    height: 57px; */
}
.box-1-1-3 {
  position: absolute;
  margin: 0 2px;
  left: 10%;
  bottom: 30px;
  width: 35%;
  height: 20px;
  border-radius: 20px;
  text-align: center;
  font-size: 15px;
  color: #fff;
  background-color: #00ba42;
  padding: 1% 0 2% 0;
  box-shadow: -3px 3px 3px #aca9a9;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  /* width: 30px;
    height: 57px; */
}
.box-1-1-2-animation1 {
  animation: animation1 0.4s;
  animation-fill-mode: forwards;
}
.box-1-1-2-animation2 {
  animation: animation2 0.4s;
  animation-fill-mode: forwards;
}

.box-1-1-3-animation3 {
  animation: animation3 0.3s;
  animation-fill-mode: forwards;
}
.box-1-1-3-animation4 {
  animation: animation4 0.3s;
  animation-fill-mode: forwards;
}

@keyframes animation1 {
  from {
    width: 60%;
    left: 19%;
  }
  to {
    width: 35%;
    left: 55%;
  }
}
@keyframes animation2 {
  from {
    width: 35%;
    left: 55%;
  }
  to {
    width: 60%;
    left: 19%;
  }
}

@keyframes animation3 {
  from {
    /* font-size: 15px; */
    width: 35%;
  }
  to {
    /* font-size: 0%; */
    width: 0%;
  }
}

@keyframes animation4 {
  from {
    width: 0%;
    /* font-size: 0%; */
  }
  to {
    width: 35%;
    /* font-size: 15px; */
  }
}

@supports (bottom: env(safe-area-inset-bottom)) {
  .box-1 {
    height: calc(100vh - 130px - env(safe-area-inset-bottom));
  }
  .box-1-1 {
    height: calc(100vh - 160px - env(safe-area-inset-bottom));
  }
  /* .box-1-1-1{
        height: calc(100vh - 160px - env(safe-area-inset-bottom));
    } */
  .box-1-1-0 {
    height: calc(100vh - 170px - env(safe-area-inset-bottom));
  }
}
</style>
<style>
.van-swipe {
}
</style>
