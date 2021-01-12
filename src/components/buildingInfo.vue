<template>
  <div>
    <div class="box-3-0">
      <div class="box-3-0-1">
        <div class="box-3-0-1-1">
          <div class="box-3-0-1-1-1">{{ productObj.baseOpenDate }}</div>
          <div class="box-3-0-1-1-2">
            <img src="../assets/imgs/ico_kaipan_time.svg" />开盘时间
          </div>
        </div>
        <div class="box-3-0-1-1">
          <div class="box-3-0-1-1-1">待定</div>
          <div class="box-3-0-1-1-2">
            <img src="../assets/imgs/ico_zhutui_huxing.svg" />主推户型
          </div>
        </div>
      </div>
      <div class="box-3-0-1">
        <div class="box-3-0-1-1">
          <div class="box-3-0-1-1-1">{{ productObj.baseAreaCovered }}万㎡</div>
          <div class="box-3-0-1-1-2">
            <img src="../assets/imgs/ico_zhandi_mianji.svg" />占地面积
          </div>
        </div>
        <div class="box-3-0-1-1">
          <div class="box-3-0-1-1-1">{{ productObj.baseBuiltUpArea }}万㎡</div>
          <div class="box-3-0-1-1-2">
            <img src="../assets/imgs/ico_jianzhu_mianji.svg" />建筑面积
          </div>
        </div>
      </div>
    </div>
    <div class="box-3-1">
      <img src="../assets/imgs/ico_dingwei.svg" />{{ productObj.address.replace(/\//g,'') }}
    </div>
  </div>
</template>
<script>
export default {
  name: "buildingInfo",
  props: {
    productObj: {
      type: Object,
    },
  },
  data() {
    return {
      w: window.screen.width,
      h: window.screen.height / 4,
    };
  },
  methods: {},
};
</script>
<style  scoped>
.box-3-0 {
  margin-left: 3%;
}
.box-3-0-1 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.box-3-0-1-1 {
  width: 47%;
  background: #f2f8ff;
  border-radius: 4px;
  margin-right: 3%;
  margin-bottom: 3%;
}
.box-3-0-1-1-1 {
  font-size: 16px;
  font-family: Roboto, Roboto-Bold;
  font-weight: 700;
  text-align: center;
  color: #222426;
  line-height: 21px;
  margin-top: 10%;
}
.box-3-0-1-1-2 {
  font-size: 13px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  color: #0072ff;
  line-height: 14px;
  margin-top: 8%;
  margin-bottom: 10%;
}
.box-3-0-1-1-2 img {
  height: 14px;
  margin-right: 3%;
  margin-bottom: -1%;
}
.box-3-1 {
  margin-left: 3%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 15px;
  opacity: 0.9;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #222426;
  line-height: 18px;
  padding-bottom: 2.5%;
}
.box-3-1 img {
  width: 16px;
  height: 16px;
  margin-bottom: -0.5%;
  margin-right: 0.5%;
}
</style>