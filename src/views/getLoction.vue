<template>
  <div class="box-0">
    <TopFixed />
    <div class="box-1">
      <div id="map" style="width: 100%; height: 100%"></div>
      <div id="panel" style="width: 100%; height: 100%"></div>
    </div>
  </div>
</template>
<script src="https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"></script>
<script
  type="text/javascript"
  src="https://webapi.amap.com/maps?v=1.1&key=9b6d113ef3c481a23b2f27fcb471f5e8&plugin=AMap.Driving"
></script>
<script>
import TopFixed from "@/components/TopFixed.vue";

export default {
  name: "getLoction",
  components: {
    TopFixed,
  },
  data() {
    return {
      map: null,
      geolocation: null,
      position: null,
      driving: null,
      productObj: window.indexInfo.productObj,
    };
  },
  mounted() {
    setTimeout(() => {
      this.map = new AMap.Map("map", {
        resizeEnable: true,
        zoom: 13,
        dragEnable: true,
        // center: [window.parameters.longitude, window.parameters.latitude],
      });
      this.doLoction();
    }, 100);
  },

  methods: {
    doLoction() {
      const that = this;
      // let ua = window.navigator.userAgent.toLowerCase();
      if (window.parameters.token) {
        this.driving = new AMap.Driving({
          map: this.map,
          panel: "panel",
        });
        // 根据起终点经纬度规划驾车导航路线
        this.driving.search(
          new AMap.LngLat(
            window.parameters.longitude,
            window.parameters.latitude
          ),
          new AMap.LngLat(that.productObj.longitude, that.productObj.latitude),
          function(status, result) {
            console.log(status, result);
          }
        );
      } else {
        // let appPath="androidamap://viewMap?sourceApplication="+this.productObj.name+"&poiname="+this.productObj.name+"&lat="+this.productObj.latitude+"&lon="+this.productObj.longitude+"&dev=0";
        let path =
          "https://uri.amap.com/marker?position=" +
          this.productObj.longitude +
          "," +
          this.productObj.latitude +
          "&name=" +
          this.productObj.name;
        window.location.href = path;
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
  height: calc(100vh - 66.5px);
}
</style>
