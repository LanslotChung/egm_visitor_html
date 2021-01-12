<template>
  <div>
    <div class="box-3-5" :style="'height:' + h + 'px;'">
      <div class="box-3-5-1" v-if="productBeaPicList.length > 0"><img :src="productBeaPicList[0].url" /></div>
      <div class="box-3-5-2" v-if="productBeaPicList.length > 1">
        <div class="box-3-5-2-1" v-if="productBeaPicList.length > 1"><img :src="productBeaPicList[1].url" /></div>
        <div class="box-3-5-2-2" v-if="productBeaPicList.length > 2"><img :src="productBeaPicList[2].url" /></div>
        <div v-else class="box-3-5-2-3"><img src="../assets/imgs/ico_gengduo2.svg" /></div>
        
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
  mounted(){
    console.log("PIC ---------------",this.productBeaPicList)
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
.box-3-5-2-3 {
  overflow: hidden;
  height: 50%;
  max-height: 86px;
  padding: 2.5px 0 0 5px;
  margin: 2.5px 0 0 5px;
  background-color: #f2f8ff;
}
.box-3-5-2-3 img {
  width: 40px;
  height:40px;
  object-fit: cover;
  margin: 20px 45px;
}
</style>