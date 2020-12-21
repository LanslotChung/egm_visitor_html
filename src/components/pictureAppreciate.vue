<template>
  <div>
    <div class="box-3-5" :style="'height:' + h + 'px;'">
      <div class="box-3-5-1"><img :src="productBeaPicList[0].url" /></div>
      <div class="box-3-5-2">
        <div class="box-3-5-2-1"><img :src="productBeaPicList[1].url" /></div>
        <div class="box-3-5-2-2"><img :src="productBeaPicList[2].url" /></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "pictureAppreciate",
  props: {
    productBeaPicList: {
      type: Array,
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
<style scoped>
.box-3-5 {
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 0 3%;
  padding-bottom: 3%;
}
.box-3-5 img {
  max-height: 177px;
}
.box-3-5-1 {
  height: 100%;
  flex: 1 0 195px;
  overflow: hidden;
}
.box-3-5-1 img{
  width: 100%;
  height:100%;
  object-fit: cover;
}
.box-3-5-2 {
  height: 100%;
  flex: 1 1 124px;
  overflow: hidden;
}
.box-3-5-2-1 {
  overflow: hidden;
  height: 50%;
  max-height: 86px;
  padding: 0 0 2.5px 5px;
}
.box-3-5-2-1 img {
  width: 100%;
  height:100%;
  object-fit: cover;
}
.box-3-5-2-2 {
  overflow: hidden;
  height: 50%;
  max-height: 86px;
  padding: 2.5px 0 0 5px;
}
.box-3-5-2-2 img {
  width: 100%;
  height:100%;
  object-fit: cover;
}
</style>