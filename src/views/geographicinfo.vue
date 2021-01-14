<template>
  <div class="box-0">
    <TopFixed />
    <div class="box-1">
      <div id="map" style="width: 100%; height: 100%"></div>
      <div :class="panel_anim">
        <div class="pull" @click="pullMenu">
          <img
            :class="pull == 0 ? 'pull_img-animation4' : 'pull_img-animation3'"
            src="../assets/imgs/ico_up.svg"
          />
        </div>
        <div class="center" @click="panTocenter">
          <img src="../assets/imgs/ico_zhunxin.svg" />
        </div>
        <van-tabs :active="active" @change="onChange">
          <van-tab
            v-for="(list, index) in projectAssortList"
            :key="index"
            :title="list.title"
          >
            <div
              class="item"
              v-for="(item, index1) in list.projectFacilityList"
              :key="index1"
              @click="panToPoint(item)"
            >
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
              <div class="top">
                <div class="info">
                  <div class="point_name">
                    {{ item.title }}
                  </div>
                  <div class="point_addr">
                    {{ item.address }}
                  </div>
                </div>
                <div class="distance">
                  {{ calcDistance([item.longitude, item.latitude]) }}米
                </div>
              </div>
              <div
                class="line"
                style="
                  width: 100%;
                  height: 1px;
                  padding-left: 20px;
                  padding-right: 20px;
                  background: #eee;
                "
                v-if="index1 == list.projectFacilityList.length - 1"
              />
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- <div :class="pull==0 ?'pull menu_panel-up_anim':'pull menu_panel-down_anim'" @click="pullMenu"></div> -->

    <BottomNav navCode="geographicinfo" />
  </div>
</template>
<script
  type="text/javascript"
  src="https://webapi.amap.com/maps?v=1.1&key=9b6d113ef3c481a23b2f27fcb471f5e8"
></script>
<script>
import TopFixed from "@/components/TopFixed.vue";
import BottomNav from "@/components/BottomNav.vue";
export default {
  name: "geographicinfo",
  components: {
    TopFixed,
    BottomNav,
  },
  data() {
    return {
      historyMarker: [],
      text: null,
      marker: null,
      map: null,
      pull: 0,
      active: window.active,
      projectAssortList: window.projectAssortList,
      productObj: window.productObj,
      projectFacilityList: window.projectAssortList[0].projectFacilityList,
      proLntLat: [window.productObj.longitude, window.productObj.latitude],
      animOffsetY: 0,
      panel_anim: "",
    };
  },
  mounted() {
    setTimeout(() => {
      this.map = new AMap.Map("map", {
        resizeEnable: true,
        zoom: 13,
        center: [window.productObj.longitude, window.productObj.latitude],
      });
      this.marker = new AMap.Marker({
        map: this.map,
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png",
        position: [window.productObj.longitude, window.productObj.latitude],
      });
      this.text = new AMap.Text({
        map: this.map,
        text: window.productObj.name,
        position: [window.productObj.longitude, window.productObj.latitude],
        offset: new AMap.Pixel(0, -50),
      });
      this.text.setStyle({
        "font-size": "10px",
        padding: "5px",
        border: "none",
      });
      if (window.active == null) {
        this.onChange(0);
      } else {
        console.log(window.active);
        this.onChange(window.active);
      }

      this.animOffsetY = document.getElementById("map").clientHeight / 4;
      this.map.panBy(0, -this.animOffsetY);

      this.panel_anim =
        this.pull == 0
          ? "menu_panel menu_panel-up_anim"
          : "menu_panel menu_panel-down_anim";
    }, 100);

    
  },
  methods: {
    pullMenu() {
      if (this.pull == 1) {
        this.map.panBy(0, -this.animOffsetY);
        this.pull = 0;
        this.panel_anim =
        this.pull == 0
          ? "menu_panel menu_panel-up_anim"
          : "menu_panel menu_panel-down_anim";
        return;
      }
      if (this.pull == 0) {
        this.map.panBy(0, this.animOffsetY);
        this.pull = 1;
        this.panel_anim =
        this.pull == 0
          ? "menu_panel menu_panel-up_anim"
          : "menu_panel menu_panel-down_anim";
        return;
      }
    },
    onChange(e) {
      if (this.historyMarker) {
        for (let i = 0; i < this.historyMarker.length; i++) {
          this.map.remove(this.historyMarker[i]);
        }
      }
      this.projectFacilityList =
        window.projectAssortList[e].projectFacilityList;
      this.map.add(this.marker);
      this.map.add(this.text);
      for (let i = 0; i < this.projectFacilityList.length; i++) {
        let proLntLat = [
          this.projectFacilityList[i].longitude,
          this.projectFacilityList[i].latitude,
        ];
        let marker = new AMap.Marker({
          map: this.map,
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: proLntLat,
        });
        this.historyMarker.push(marker);
        this.map.add(marker);
      }
    },
    calcDistance(p2) {
      let p1 = this.proLntLat;
      var lnlt1 = new AMap.LngLat(p1[0], p1[1]);
      var lnlt2 = new AMap.LngLat(p2[0], p2[1]);
      var res = Math.round(lnlt1.distance(lnlt2));
      return res;
    },
    panToPoint(data) {
      this.map.setFitView(15);
      this.map.panTo([data.longitude, data.latitude]);
      this.map.panBy(0, -this.animOffsetY);
    },
    panTocenter() {
      this.map.panTo(this.proLntLat);
      if (this.pull == 0) {
        this.map.panBy(0, -this.animOffsetY);
      }
    },
  },
};
</script>
<style scoped>
.box-0 {
  position: fixed;
  width: 100%;
}
.box-1 {
  height: calc(100vh - 130px);
}

.menu_panel {
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  margin: 10px;
  background-color: #fff;
  height: 6rem;
  border-radius: 10px;
  z-index: 889;
  padding-bottom: 60px;
  box-shadow: 3px 3px 8px 0px rgba(192, 196, 204, 0.6);
}

.item {
  width: 100%;
  height: 80px;
}
.pull {
  position: absolute;
  top: -7.5px;
  left: 39%;
  height: 15px;
  width: 80px;
  border-radius: 10px;
  z-index: 888;
  background-color: #0072ff;
}
.pull img {
  position: absolute;
  height: 10px;
  transform: rotate(270deg);
  left: 44%;
  bottom: 2.5px;
}
.center {
  position: absolute;
  right: 0;
  top: -40px;
  height: 30px;
  width: 30px;
  z-index: 888;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 3px 3px 8px 0px rgba(0, 0, 0, 0.4);
}
.center img {
  position: absolute;
  height: 80%;
  width: 80%;
  top: 10%;
  left: 10%;
}
.top {
  display: flex;
  margin: 10px;
  height: 60px;
}
.distance {
  font-size: 0.33333rem;
  width: 70px;
  height: 60px;
  text-align: right;
  line-height: 60px;
  padding-right: 5px;
}
.point_name {
  font-size: 0.37333rem;
  font-weight: bold;
  color: #646566;
}
.point_addr {
  padding-top: 5px;
  font-size: 0.27333rem;
  color: #191919;
}

.pull_img-animation3 {
  animation: animation3 0.2s;
  animation-fill-mode: forwards;
}
.pull_img-animation4 {
  animation: animation4 0.2s;
  animation-fill-mode: forwards;
}
.menu_panel-down_anim {
  animation: down_anim 0.4s;
  animation-fill-mode: forwards;
}
.menu_panel-up_anim {
  animation: up_anim 0.4s;
  animation-fill-mode: forwards;
}
@supports (bottom: env(safe-area-inset-bottom)) {
  .box-1 {
    height: calc(100vh - 130px - env(safe-area-inset-bottom));
  }
  .menu_panel {
    padding-bottom: env(safe-area-inset-bottom);
    height: calc((100vh - 130px - env(safe-area-inset-bottom)) / 2);
  }
}
@keyframes down_anim {
  from {
    bottom: 0px;
  }
  to {
    bottom: calc(((100vh - 130px) / 2 - 1.17333rem) * -1);
  }
}
@keyframes up_anim {
  from {
    bottom: calc(((100vh - 130px) / 2 - 1.17333rem) * -1);
  }
  to {
    bottom: 0px;
  }
}
@keyframes animation3 {
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(270deg);
  }
}
@keyframes animation4 {
  from {
    transform: rotate(270deg);
  }
  to {
    transform: rotate(90deg);
  }
}
</style>
<style>
.box-0 .box-1 .van-tabs__line {
  background: #0072ff;
}
.box-0 .box-1 .van-tabs__content {
  height: calc((100vh - 130px) / 2 - 1.17333rem);
  overflow-y: scroll;
  overflow-x: hidden;
}
.van-tabs--line .van-tabs__wrap {
  border-radius: 16px;
}
</style>
