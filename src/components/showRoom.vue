<template>
  <div>
    <div class="box-3-4">
      <div class="box-3-4-0"></div>
      <div class="box-3-4-1">线上展厅</div>
    </div>
    <div
      :style="'height:' + h + 'px;padding-bottom: 3%;position: relative;'"
      @click="goPage('/index')"
    >
      <img v-if="productSingleFamily"
        style="
          margin-left: 3%;
          width: 94%;
          border-radius: 4px;
          height: 100%;
          object-fit: cover;
        "
        :src="productSingleFamily.url"
      />
      <img v-else
        style="
          margin-left: 3%;
          width: 94%;
          border-radius: 4px;
          height: 100%;
          object-fit: cover;
        "
        :src="productObj.mainPic"
      />
      <img
        src="../assets/imgs/ico_quanjing.svg"
        style="
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 99;
          margin-left: -.7rem;
          margin-top: -.7rem;
          height: 1.4rem;
          width: 1.4rem;
        "
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "showRoom",
  props: {
    productSingleFamily: {
      type: Object,
    },
    productObj:{
      type:Object,
    }
  },
  data() {
    return {
      w: window.screen.width,
      h: window.screen.height / 4,
    };
  },
  methods: {
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
  font-size: 10px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
  position: absolute;
  line-height: 14px;
  left: 47%;
  top: 48%;
  z-index: 100;
}
</style>