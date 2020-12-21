<template>
  <div>
    <div class="box-1">
      <div style="width: 100%; height: 5.4rem">
        <el-amap
          vid="amap"
          :zoom="15"
          :dragEnable="false"
          :doubleClickZoom="false"
          :rotateEnable="false"
          class="amap-demo"
          :center="[productObj.longitude, productObj.latitude]"
        >
          <el-amap-marker 
            :position="[productObj.longitude, productObj.latitude]"
          />
          <el-amap-text ref="son"
            :position="[productObj.longitude, productObj.latitude]"
            :text="
              '<div id=\'label\' style=\'font-size:10px;padding:5px\'>' +
              productObj.name +
              '</div>'
            "
            :offset="[0, -50]"
          />
        </el-amap>
      </div>
      <div class="box-1-1">
        <div
          class="box-1-1-1"
          v-for="(assortList, index) in projectAssortList"
          :key="index"
        >
          <div v-for="(img, index) in imgs" :key="index">
            <img :src="img.src" v-if="img.title == assortList.title" />
          </div>
          {{ assortList.title }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ambitusInfo",
  props: {
    productObj: {
      type: Object,
    },
    projectAssortList: {
      type: Array,
    },
  },
  data() {
    
    return {
     style:  {
                        'color': '#fff',
                        'background-color': '#ff4891',
                        'border': 'none'
       },
      imgs: [
        { title: "交通", src: require("../assets/imgs/ico_jiaotong.svg") },
        { title: "教育", src: require("../assets/imgs/ico_jiaoyu.svg") },
        { title: "商业", src: require("../assets/imgs/ico_shangye.svg") },
        { title: "医疗", src: require("../assets/imgs/ico_yiliao.svg") },
      ],
      w: window.screen.width,
      h: window.screen.height / 4,
      lng: 0,
      lat: 0,
      loaded: false
     
    };
  },
 
  methods: {},
};
</script>
<style scoped>
.box-1 {
  margin: 0 3%;
  padding-bottom: 5%;
}
.box-1-1 {
  position: absolute;
  display: flex;
  background: #ffffff;
  border-radius: 2px;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  z-index: 999;
  margin-top: -12%;
  align-content: center;
  width: 80%;
  margin-left: 5%;
}
.box-1-1-1 {
  height: 20px;
  display: flex;
  margin: 10px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: center;
  color: #222426;
  line-height: 20px;
  width: 100%;
}
.box-1-1-1 img {
  margin-right: 4px;
  width: 18px;
  height: 18px;
}
.box-2{
  border: none;
  box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1) ;
}
</style>