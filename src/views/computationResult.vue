<template>
  <div class="computationResult">
    <TopFixed />
    <div class="box-1">
      <div class="box-1-0">
        <div class="box-1-0-0">房贷清单</div>
        <div class="box-1-0-1" @click="doReCalc">重新计算</div>
      </div>
      <div class="box-1-1">
        <div class="box-1-1-0" v-if="refundType == 0">每月需还款</div>
        <div class="box-1-1-1" v-if="refundType == 0">
          {{ average.toFixed(2) }}<span>元</span>
        </div>
        <div class="box-1-1-0" v-if="refundType == 1">首期还款</div>
        <div class="box-1-1-1" v-if="refundType == 1">
          {{ initial.toFixed(2) }}<span>元</span>
        </div>
        <div class="box-1-1-0" v-if="refundType == 1">末期还款</div>
        <div class="box-1-1-1" v-if="refundType == 1">
          {{ telocinesia.toFixed(2) }}<span>元</span>
        </div>
      </div>
      <div class="box-1-2">
        <van-cell-group v-if="refundType == 1">
          <van-cell title="每月递减" :value="decrease.toFixed(2) + '元'" />
        </van-cell-group>
        <van-cell-group>
          <van-cell title="还款总额" :value="refundTotal.toFixed(2) + '万元'" />
        </van-cell-group>
        <van-cell-group>
          <van-cell title="支付利息" :value="interest.toFixed(2) + '万元'" />
        </van-cell-group>
        <van-collapse v-model="activeNames">
          <van-collapse-item title="还款明细">
            <van-collapse v-model="activeNames1">
              <div class="box-1-2-2" v-if="refundInfos">
                <div class="box-1-2-2-0">
                  <div>期次</div>
                  <div v-for="(item, index) in refundInfos" :key="index">
                    {{ index + 1 }}期
                  </div>
                </div>
                <div class="box-1-2-2-1">
                  <div>本期还款</div>
                  <div v-for="(item, index) in refundInfos" :key="index">
                    {{ (item.a - 0).toFixed(2) }}
                  </div>
                </div>
                <div class="box-1-2-2-2">
                  <div>本期本金</div>
                  <div v-for="(item, index) in refundInfos" :key="index">
                    {{ (item.b - 0).toFixed(2) }}
                  </div>
                </div>
                <div class="box-1-2-2-3">
                  <div>本期利息</div>
                  <div v-for="(item, index) in refundInfos" :key="index">
                    {{ (item.c - 0).toFixed(2) }}
                  </div>
                </div>
                <div class="box-1-2-2-4">
                  <div>本期剩余</div>
                  <div v-for="(item, index) in refundInfos" :key="index">
                    {{ (item.d - 0).toFixed(2) }}
                  </div>
                </div>
              </div>
              <!-- <van-collapse-item>
                                <template #title>
                                    <div class="box-1-2-0">第1年</div>
                                    <div class="box-1-2-1">
                                        <div>本期还款:1545元</div>
                                        <div>本期利息:4567元</div>
                                    </div>
                                </template>
                                <div class="box-1-2-2">
                                    <div class="box-1-2-2-0">
                                        <div>期次</div>
                                        <div>第1期</div>
                                        <div>第2期</div>
                                        <div>第3期</div>
                                    </div>
                                    <div class="box-1-2-2-1">
                                        <div>本期还款</div>
                                        <div>2755.44</div>
                                        <div>2755.44</div>
                                        <div>2755.44</div>
                                    </div>
                                    <div class="box-1-2-2-2">
                                        <div>本期本金</div>
                                        <div>2755.44</div>
                                        <div>2755.44</div>
                                        <div>2755.44</div>
                                    </div>
                                    <div class="box-1-2-2-3">
                                        <div>本期利息</div>
                                        <div>2755.44</div>
                                        <div>2755.44</div>
                                        <div>2755.44</div>
                                    </div>
                                    <div class="box-1-2-2-4">
                                        <div>本期剩余</div>
                                        <div>2755.44</div>
                                        <div>2755.44</div>
                                        <div>2755.45555555555555555554</div>
                                    </div>
                                </div>
                            </van-collapse-item> -->
            </van-collapse>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
    <BottomNav navCode="houseloan" />
  </div>
</template>
<script>
import TopFixed from "@/components/TopFixed.vue";
import BottomNav from "@/components/BottomNav.vue";
import utils from "@/utils/utils.js";
export default {
  name: "computationResult",
  components: {
    TopFixed,
    BottomNav,
  },
  data() {
    return {
      active: 0,
      refundType: 0,
      refundYear: 0,
      interestRate0: 0, //商业贷款利率
      total0: 0, //商业贷款额度
      interestRate1: 0, //公积金贷款利率
      total1: 0, //公积金贷款额度
      activeNames: ["0"],
      activeNames1: ["0"],

      average: 0,
      average0: 0,
      average1: 0,
      refundTotal: 0,
      interest: 0,
      refundInfos: [],

      initial: 0,
      telocinesia: 0,
      decrease: 0,
    };
  },
  mounted() {
    this.active = this.$route.query.active;
    this.refundType = this.$route.query.refundType;
    this.refundYear = this.$route.query.refundYear; //实际为期数
    if (this.active == 0) {
      //商业贷款
      this.interestRate0 = this.$route.query.interestRate0;
      this.total0 = this.$route.query.total0 - 0;
    } else if (this.active == 1) {
      //公积金贷款
      this.interestRate1 = this.$route.query.interestRate1;
      this.total1 = this.$route.query.total1 - 0;
    } else if (this.active == 2) {
      //组合贷款
      this.interestRate0 = this.$route.query.interestRate0;
      this.total0 = this.$route.query.total0 - 0;
      this.interestRate1 = this.$route.query.interestRate1;
      this.total1 = this.$route.query.total1 - 0;
    }

    if (this.refundType == 0) {
      //等额还款
      //还款
      this.average =
        utils.acpi(this.interestRate0, this.total0 * 10000, this.refundYear) +
        utils.acpi(this.interestRate1, this.total1 * 10000, this.refundYear);
      this.average0 = utils.acpi(
        this.interestRate0,
        this.total0 * 10000,
        this.refundYear
      );
      this.average1 = utils.acpi(
        this.interestRate1,
        this.total1 * 10000,
        this.refundYear
      );
      //还款总额
      this.refundTotal = (this.average * this.refundYear) / 10000;
      //支付利息
      this.interest = this.refundTotal - this.total0 - this.total1;
      //本期还款数组
      this.refundInfos = utils.acpiData(
        this.interestRate0,
        this.total0 * 10000,
        this.average0,
        this.interestRate1,
        this.total1 * 10000,
        this.average1,
        this.refundYear,
        this.average
      );
    } else if (this.refundType == 1) {
      //递减还款
      //首月
      this.initial =
        utils.averageCapital(
          this.interestRate0,
          this.total0 * 10000,
          this.refundYear,
          0
        ) +
        utils.averageCapital(
          this.interestRate1,
          this.total1 * 10000,
          this.refundYear,
          0
        );
      //最后
      this.telocinesia =
        utils.averageCapital(
          this.interestRate0,
          this.total0 * 10000,
          this.refundYear,
          this.refundYear - 1
        ) +
        utils.averageCapital(
          this.interestRate1,
          this.total1 * 10000,
          this.refundYear,
          this.refundYear - 1
        );
      //递减额度
      this.decrease = (this.initial - this.telocinesia) / (this.refundYear - 1);
      //还款总额
      this.refundTotal =
        (this.refundYear * (this.initial + this.telocinesia)) / 20000;
      //支付利息
      this.interest = this.refundTotal - this.total0 - this.total1;
      //本期还款数组
      this.refundInfos = utils.averageCapitalData(
        this.interestRate0,
        this.total0 * 10000,
        this.interestRate1,
        this.total1 * 10000,
        this.refundYear
      );
    }
    
  },
  methods: {
    doReCalc() {
      this.$router.push({
        path: "/mortgageCalculator",
      });
    },
  },
};
</script>
<style scoped>
.box-1 {
  height: calc(100vh - 130px);
  overflow-y: scroll;
}
.box-1-0 {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #fff;
  padding-left: 20px;
  background-color: #0072ff;
  display: flex;
}
.box-1-0-0 {
  height: 0.74667rem;
  font-size: 0.47333rem;
  line-height: 0.74667rem;
  text-align: center;
  border-radius: 0.26667rem;
  padding-left: 0.21333rem;
  padding-right: 0.21333rem;
  align-self: center;
  position: absolute;
  left: 8px;
}
.box-1-0-1 {
  height: 0.74667rem;
  border: 0.02667rem solid #fff;
  font-size: 0.37333rem;
  line-height: 0.74667rem;
  text-align: center;
  border-radius: 0.26667rem;
  padding-left: 0.21333rem;
  padding-right: 0.21333rem;
  align-self: center;
  position: absolute;
  right: 8px;
}
.box-1-1 {
  text-align: center;
  border: 8px;
  margin: 10px;
  padding: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1),
    1px 1px 1px 1px rgba(0, 0, 0, 0.1);
}
.box-1-1-0 {
  font-size: 12px;
  color: #333;
  height: 30px;
  line-height: 40px;
}
.box-1-1-1 {
  color: #5f71ee;
  font-size: 36px;
  height: 50px;
  line-height: 50px;
}
.box-1-1-1 span {
  font-size: 16px;
}
.box-1-2 {
  margin: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1),
    1px 1px 1px 1px rgba(0, 0, 0, 0.1);
}
.box-1-2-0 {
  font-size: 12px;
  color: #999;
}
.box-1-2-1 {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  color: #666;
}
.box-1-2-2 {
  display: flex;
}
.box-1-2-2 > div {
  text-align: center;
  overflow: hidden;
}
.box-1-2-2 > div > div:nth-child(2n + 1) {
  background-color: #e0e0e0;
}
.box-1-2-2 > div > div:nth-child(2n) {
  background-color: #fff;
}
.box-1-2-2 > div > div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.box-1-2-2-0 {
  flex: 2;
}
.box-1-2-2-1 {
  flex: 3;
}
.box-1-2-2-2 {
  flex: 3;
}
.box-1-2-2-3 {
  flex: 3;
}
.box-1-2-2-4 {
  flex: 4;
}
@supports (bottom: env(safe-area-inset-bottom)) {
  .box-1 {
    height: calc(100vh - 130px - env(safe-area-inset-bottom));
  }
}
</style>
<style>
.computationResult .van-collapse-item__content {
  padding: 0;
}
</style>