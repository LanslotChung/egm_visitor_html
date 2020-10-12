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
    name: 'App',
    mounted() {
      if (window.history && window.history.pushState) {
        // 向历史记录中插入了当前页
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
      }
    },
    destroyed() {
      window.removeEventListener('popstate', this.goBack, false);
    },
    methods: {
      goBack() {
        console.log("点击了浏览器的返回按钮",window.goBackPathName);
        if(!(window.goBackPathName == 'airview' || window.goBackPathName == 'hardcoverRoaming' || window.goBackPathName == 'computationResult')){
          window.wx.miniProgram.reLaunch({
              url:'/pages/index/index'
          })
        }
        // window.wx.miniProgram.reLaunch({
        //     url:'/pages/index/index'
        // })
        // sessionStorage.clear();
        // window.history.back();
        // history.pushState(null, null, document.URL);
      },
    }
  }
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