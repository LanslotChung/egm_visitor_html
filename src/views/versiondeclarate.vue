<template>
  <div>
    <TopFixed />
    <div class="box-1" v-if="data">
      <div class="box-1-0-1">
        <img src="../assets/imgs/p_banben_bg.svg" />
        <div class="box-1-0-1-1">云上观楼</div>
        <div class="box-1-0-1-2">让营销充满更多可能性！</div>
        <div class="title-box">
          <div class="line"></div>
          <div class="title">版本声明</div>
          <div class="line"></div>
        </div>
      </div>

      <div class="box-1-0">
        <div class="box-1-0-0">
          <div class="point" />
          项目信息
        </div>
        <div class="box-1-0-2">
          <div class="box-1-0-2-0">项目名称:</div>
          <div class="box-1-0-2-1">{{ data.name }}</div>
        </div>
        <div class="box-1-0-2">
          <div class="box-1-0-2-0">开发商:</div>
          <div class="box-1-0-2-1">{{ data.developers }}</div>
        </div>
        <div class="box-1-0-2">
          <div class="box-1-0-2-0">项目地址:</div>
          <div class="box-1-0-2-1">{{ data.address }}</div>
        </div>
      </div>
      <div class="box-1-0">
        <div class="box-1-0-0">
          <div class="point" />
          技术支持
        </div>

        <div class="box-1-0-2">
          <div class="box-1-0-2-0">技术供应商:</div>
          <div class="box-1-0-2-1">
            {{ data.deptName ? data.deptName : "湖南亿比克网络科技有限公司™" }}
          </div>
        </div>
        <div class="box-1-0-4">
          <div>
            <img :src="data.deptLogo" v-if="data.deptLogo" />
            <img src="../assets/imgs/enterlogo.jpg" v-if="!data.deptLogo" />
          </div>
        </div>
      </div>
      <div class="box-1-0">
        <div class="box-1-0-0">
          <div class="point" />
          免责声明
        </div>
        <div class="doc" v-html="data.disclaimer"></div>
        <div class="box-1-0-3">*演示内容仅供参考，最终以签约合同为准</div>
      </div>
      <div class="box-2">
        <div class="box-2-1">网络服务供应商</div>
        <div class="box-2-2">         
            <div class="box-2-2-2">
              <div class="box-2-2-2-0">服务商：</div>
              <div class="box-2-2-2-1">亿比克网络科技™</div>
            </div>
             <div class="box-2-2-2">
              <div class="box-2-2-2-0">技术合作：</div>
              <div class="box-2-2-2-1">{{ data.mobile1 }} / {{ data.mobile2 }}</div>
            </div>
             <div class="box-2-2-2">
              <div class="box-2-2-2-0">公司网址：</div>
              <div class="box-2-2-2-1">{{ data.webUrl }}</div>
            </div>
        </div>
      </div>
    </div>
    <BottomNav navCode="versiondeclarate" />
  </div>
</template>
<script>
import TopFixed from "@/components/TopFixed.vue";
import BottomNav from "@/components/BottomNav.vue";
export default {
  name: "versiondeclarate",
  components: {
    TopFixed,
    BottomNav,
  },
  data() {
    return {
      data: null,
    };
  },
  created() {
    this.$api.post(
      "/userIndex/versionStatement",
      {
        projectId: window.parameters.projectId,
      },
      (response) => {
        if (response.status >= 200 && response.status < 300) {
          
          this.data = response.data.data;
          // this.data.deptLogo="";
          // this.data.deptName="";
        }
      }
    );
  },
  methods: {},
};
</script>
<style scoped>
.box-1 {
  height: calc(100vh - 101px);
  border-top: 1px solid #e0e0e0;
  overflow-y: scroll;
}
.title-box {
 
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 10px;
}
.line {
  width: 40px;
  height: 1px;
  background: #e4e7ed;
  border-radius: 2px;
}
.title {
  
  height: 24px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #222426;
  line-height: 24px;
  margin: 0 10px;
}
.point {
  width: 4px;
  height: 16px;
  background: #0072ff;
  border-radius: 2px;
  margin-top: 3px;
  margin-right: 10px;
}
.doc {
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: justify;
  color: #222426;
  line-height: 20px;
  margin-bottom: 12px;
}
.box-1-0 {
  padding: 0px 20px 30px 20px;
}
.box-1-0-0 {
  display: flex;
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #222426;
  line-height: 22px;
  margin-bottom: 16px;
}
.box-1-0-0-0 {
  font-weight: bold;
  color: #333333;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
}
.box-1-0-0-0 span {
  font-size: 8px;
  color: #4b7df6;
  font-weight: normal;
  margin-left: 5px;
}
.box-1-0-0 span {
  font-size: 12px;
  color: #4b7df6;
  font-weight: normal;
  margin-left: 5px;
}
.box-1-0-1 {
  width: 100%;
  position: relative;
}
.box-1-0-1 img {
  width: 100%;
  display: block;
  height: auto;
}
.box-1-0-1-1 {
  position: absolute;
  font-size: 24px;
  font-family: PingFangSC, PingFangSC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #ffffff;
  line-height: 33px;
  top: 26px;
  left: 140px;
}
.box-1-0-1-2 {
  position: absolute;
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #ffffff;
  line-height: 22px;
  top: 60px;
  left: 100px;
}
.box-1-0-2 {
  display: flex;
  margin-bottom: 12px;
}
.box-1-0-2-0 {
  width: 30%;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #7e8187;
  line-height: 20px;
}
.box-1-0-2-1 {
  width: 265px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #222426;
  line-height: 20px;
}
.box-1-0-3 {
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: justify;
  color: #7e8187;
  line-height: 20px;
}
.box-1-0-4 div img {
  width: 70px;
  height: 70px;
  object-fit: cover;
}

.box-1-0-8 {
  color: #000;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
}
.box-1-0-6 {
  font-size: 10px;
}
.box-1-0-7 {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.box-1-0-7-0 {
  font-size: 10px;
  line-height: 14px;
}
.box-1-0-7-1 {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.box-1-0-7-1-1 {
  padding-top: 5px;
  font-size: 10px;
  line-height: 14px;
}
.box-1-0-7-1 img {
  display: block;
  width: 60px;
  height: 60px;
}
.box-2 {
  width: 335px;
  background: #f7f7f7;
  padding: 20px 0;
  margin-left: 20px;
}
.box-2-1 {
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Semibold;
  font-weight: 600;
  text-align: left;
  color: #222426;
  line-height: 17px;
  text-align: center;
  margin-bottom: 10px;
  
}
.box-2-2{
    margin-left: 16px;
}
.box-2-2-2 {
  display: flex;
  margin-bottom: 12px;
}
.box-2-2-2-0 {
  width: 25%;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #7e8187;
  line-height: 20px;
}
.box-2-2-2-1 {
  width: 265px;
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #222426;
  line-height: 20px;
}
@supports (bottom: env(safe-area-inset-bottom)) {
  .box-1 {
    height: calc(100vh - 130px - env(safe-area-inset-bottom));
  }
}
</style>
  