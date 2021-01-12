<template>
  <div>
    <TopFixed />
    <div class="box-1">
      <div
        class="line"
        style="
          width: 100%;
          height: 1px;
          padding-left: 20px;
          padding-right: 20px;
          background: #eee;
          "
      />
      <div style="display: flex; align-items: center; justify-content: center">
        <div class="box-1-0">
          <van-swipe
            :loop="false"
            :width="w"
            :show-indicators="false"
            ref="title"
            :stop-propagation="false"
          >
            <van-swipe-item
              v-for="(titleKey, index) in imgDict.keySet()"
              :key="index"
              @click="titleClickFn(index)"
            >
              <div
                class="box-1-0-0"
                :style="
                  initialSwipe == index
                    ? 'color: #0072ff;font-weight: bold;'
                    : ''
                "
              >
                {{ titleKey + "(" + imgDict.get(titleKey).length + ")" }}
              </div>
              <div
                :style="
                  initialSwipe == index
                    ? 'margin-left:20%;width:60%;height:3px;background-color: #0072ff;font-weight: bold;'
                    : ''
                "
              ></div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div>
        <div class="box-1-1">
          <van-swipe
            :loop="false"
            :show-indicators="false"
            @change="contentChangeFn"
            ref="content"
          >
            <van-swipe-item
              v-for="(contentKey, index) in imgDict.keySet()"
              class="box-1-1-0"
              :key="index"
            >
              <div v-if="index != 0" class="not-all">
                <img
                  class="box-1-1-1"
                  :src="item"
                  v-for="(item, index) in imgDict.get(contentKey)"
                  :key="index"
                  @click="previewImg(contentKey, index)"
                />
              </div>
              <div v-else>
                <div
                  v-for="(contentTitleKey, index) in imgDict.keySet()"
                  :key="index"
                  class="all"
                >
                  <div v-if="index != 0">
                    <div class="category">{{ contentTitleKey }}</div>
                    <img
                      class="box-1-1-1"
                      :src="url"
                      v-for="(url, index1) in imgDict.get(contentTitleKey)"
                      :key="index1"
                      @click="previewImg(contentTitleKey, index1)"
                    />
                  </div>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
          <van-image-preview
            v-model="show"
            :images="images"
            :startPosition="imgIndex"
          ></van-image-preview>
        </div>
      </div>
    </div>
    <BottomNav navCode="beautifulpictures" />
  </div>
</template>
<script>
import TopFixed from "@/components/TopFixed.vue";
import BottomNav from "@/components/BottomNav.vue";
import { HashMap } from "@/utils/hashMap.js";
export default {
  name: "beautifulpictures",
  components: {
    TopFixed,
    BottomNav,
  },
  data() {
    return {
      h: window.screen.height - 126.5,
      w:
        (parseFloat(document.getElementsByTagName("html")[0].style.fontSize) /
          37.5) *
        74,
      initialSwipe: 0,
      familyList: [],
      images: [],
      show: false,
      index: null,
      imgDict: null,
      imgIndex: 0,
    };
  },
  created() {
    for (let i = 0; i < window.bottomData.matchList.length; i++) {
      if (window.bottomData.matchList[i].code == "beautifulpictures") {
        this.familyList = window.bottomData.matchList[i].maps;
      }
    }
    if (this.familyList.length == 0) {
      for (let i = 0; i < window.bottomData.childrenList.length; i++) {
        if (window.bottomData.childrenList[i].code == "beautifulpictures") {
          this.familyList = window.bottomData.childrenList[i].maps;
        }
      }
    }

    this.imgDict = new HashMap();
    this.imgDict.put("全部", new Array());
    this.familyList.forEach((imgInfo) => {
      var allImgs = this.imgDict.get("全部");
      allImgs.push(imgInfo.url);
      var key = imgInfo.name ? imgInfo.name : "默认";
      if (this.imgDict.containsKey(key)) {
        var imgs = this.imgDict.get(key);
        imgs.push(imgInfo.url);
      } else {
        this.imgDict.put(key, new Array(imgInfo.url));
      }
    });
    
  },
  methods: {
    titleClickFn(e) {
      this.$refs.content.swipeTo(e);
      this.$refs.title.swipeTo(e);
      this.initialSwipe = e;
      window.houseIndex = this.familyList[e].id;
    },
    contentChangeFn(e) {
      this.$refs.title.swipeTo(e);
      this.initialSwipe = e;
      window.houseIndex = e;
      window.houseIndex = this.familyList[e].id;
    },
    previewImg(name, index) {
      this.imgIndex = index;
      this.images = this.imgDict.get(name);
      this.show = true;
    },
  },
};
</script>
<style scoped>
.category {
  padding: 5px 5px;
  font-size: 14px;
  color: #808591;
}
.not-all {
  padding: 0 10px;
}
.all {
  padding: 0 10px;
}
.box-1 {
    position: fixed;
  height: calc(100vh - 130px);
  background-color: #fff;
  width: 100%;
}
.box-1-0 {
  height: 20px;
  width: 100%;
  padding: 10px 5px;
  background: #fff;
  margin-top: 1px;
}
.box-1-0-0 {
  margin: 0 2px;
  text-align: center;
  font-size: 14px;
  color: #000;
  line-height: 20px;
}
.box-1-1 {
  width: 100%;
  margin: 0 auto;
  height: calc(100vh - 160px);
  position: relative;
}
.box-1-1 .arrow-left {
  position: absolute;
  top: 50%;
  margin-top: -12px;
  left: 0px;
  z-index: 100;
}
.box-1-1 .arrow {
  position: absolute;
  z-index: 100;
  top: 50%;
  margin-top: -12px;
  right: 0px;
}
.box-1-1-1 {
  margin: 5px;
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
}
.box-1-1-0 {
  height: calc(100vh - 160px);
  overflow-y: scroll;
}

@supports (bottom: env(safe-area-inset-bottom)) {
  .box-1 {
    height: calc(100vh - 130px - env(safe-area-inset-bottom));
  }
  .box-1-1 {
    height: calc(100vh - 160px - env(safe-area-inset-bottom));
  }
  /* .box-1-1-1{
        height: calc(100vh - 160px - env(safe-area-inset-bottom));
    } */
  .box-1-1-0 {
    height: calc(100vh - 160px - env(safe-area-inset-bottom));
  }
}
</style>
