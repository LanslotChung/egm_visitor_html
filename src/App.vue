<template>
  <div id="app">
    <transition>
      <!-- <keep-alive> -->
      <router-view />
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    if (window.history && window.history.pushState) {
      // 向历史记录中插入了当前    
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  methods: {
    goBack() {
      if (
        !(
          window.goBackPathName == "mainPage" ||
          window.goBackPathName == "hardcoverRoaming" ||
          window.goBackPathName == "airview" ||
          window.goBackPathName == "computationResult" ||
          window.goBackPathName == "getLoction"
        )
      ) {
        // window.wx.miniProgram.reLaunch({
        //     url:'/pages/webview/webview'
        // })
        window.goBack = 1;
      } else {
        window.goBack = 0;
      }
      // window.wx.miniProgram.reLaunch({
      //     url:'/pages/index/index'
      // })
      // sessionStorage.clear();
      // window.history.back();
      // history.pushState(null, null, document.URL);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  -webkit-overflow-scrolling: touch;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>