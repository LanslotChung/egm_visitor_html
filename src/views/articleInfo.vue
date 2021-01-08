<template>
  <div>
    <TopFixed />
    <div class="box-0">
    <div class="box-1">{{ title }}</div>
    <div class="box-2">{{createTime | formatDate}}</div>
    <div v-html="content" class="box-3" v-if="content"></div>
    </div>
  </div>
</template>
<script>
import TopFixed from "@/components/TopFixed.vue";
export default {
  name: "articleInfo",
  components: {
    TopFixed,
  },
  data() {
    return {
      title: window.articleInfo.title,
      createTime: window.articleInfo.createTime,
      content: window.articleInfo.content,
    };
  },
  mounted(){
    document.documentElement.scrollTop=0;
  },
  filters: {
      formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      }
  },
  methods: {},
};
</script>
<style scoped>
.box-0{
 height: calc(100vh - 66.5px);
  overflow-y: scroll;
  background-color: #fff;
}
.box-1 {
  opacity: 0.9;
  font-size: 24px;
  font-family: PingFangSC, PingFangSC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #222426;
  line-height: 30px;
  margin: 3%;
}
.box-2 {
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #808591;
  line-height: 17px;
  margin: 3%;
}
.box-3 {
  width: 94%;
  margin: 3%;
  overflow: hidden;
  object-fit: cover;
}
</style>