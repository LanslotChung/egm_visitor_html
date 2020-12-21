<template>
  <div>
    <div class="box-1">{{ title }}</div>
    <div class="box-2">{{createTime | formatDate}}</div>
    <div v-html="content" class="box-3"></div>
  </div>
</template>
<script>
export default {
  name: "articleInfo",
  data() {
    return {
      title: window.articleInfo.title,
      createTime: window.articleInfo.createTime,
      content: window.articleInfo.content,
    };
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