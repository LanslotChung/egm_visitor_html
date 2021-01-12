<template>
  <div>
    <div class="box-3-1">
       <div
        class="box-3-1-0"
        v-for="(houseList, index) in indexInfo.productHouseList"
        :key="index"
        @click="goHouseType('/houseAppreciation',houseList.id)"
      >
        <img v-if="houseList.thumb_pic" :src="houseList.thumb_pic" />
        <div v-if="houseList.title" class="box-3-1-0-0">{{ houseList.title }}</div>
        <div v-if="houseList.price" class="box-3-1-0-1">￥{{ houseList.price }}</div>
        <div v-if="houseList.sub_title" class="box-3-1-0-2">{{ houseList.sub_title }}</div>
      </div> 
    </div>
  </div>
</template>
<script>
export default {
  name: "houseType",
  props: {
    indexInfo: {
      type: Object,
    },
  },
  data() {
    return {
      w: window.screen.width,
      h: window.screen.height / 4,
    };
  },
  methods: {
    goHouseType(path,id) {
      window.houseIndex = id;
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
.box-3-1 {
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  margin: 0 3%;
}
.box-3-1-0 {
  margin-left: 3%;
  max-width: 154px;
}
.box-3-1-0 img {
  max-height: 154px;
  max-width: 154px;
  object-fit: cover;
}
.box-3-1-0-0 {
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 600;
  text-align: left;
  color: #222426;
  line-height: 20px;
  margin-top: 3%;
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.box-3-1-0-1 {
  opacity: 0.9;
  font-size: 18px;
  font-family: Roboto, Roboto-Black;
  font-weight: 900;
  text-align: left;
  color: #ff5500;
  line-height: 24px;
  margin-top: 3%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.box-3-1-0-2 {
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #808591;
  line-height: 17px;
  margin-top: 3%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-bottom: 10px;
}
</style>