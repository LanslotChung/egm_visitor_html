<template>
  <div class="mortgageCalculator">
    <TopFixed />
    <div class="box-2">
      <div class="bgbox">
        <div class="line"></div>
        <div class="title">房贷计算器</div>
        <div class="line"></div>
      </div>
      <van-tabs v-model="active" class="box-2-0" title-inactive-color="#222426">
        <van-tab title="商业贷款">
          <van-cell-group>
            <van-field
              v-model="commercial.total"
              type="number"
              label="贷款总额(万)"
              placeholder="请输入您的贷款总额"
            />
          </van-cell-group>
          <van-cell-group>
            <van-field
              readonly
              clickable
              label="还款方式"
              :value="commercial.refundTypes[commercial.refundType].value"
              placeholder="请选择还款方式"
              @click="commercial.showPickerRefundType = true"
              right-icon="arrow"
            />
            <van-popup
              v-model="commercial.showPickerRefundType"
              position="bottom"
            >
              <van-picker
                show-toolbar
                :columns="commercial.refundTypes"
                @cancel="commercial.showPickerRefundType = false"
                value-key="value"
                :default-index="commercial.refundType"
                @confirm="onConfirmType"
              />
            </van-popup>
          </van-cell-group>
          <van-cell-group>
            <van-field
              readonly
              clickable
              label="还款年数"
              :value="commercial.refundYears[commercial.refundYear].value"
              placeholder="请选择还款方式"
              @click="commercial.showPickerRefundYear = true"
              right-icon="arrow"
            />
            <van-popup
              v-model="commercial.showPickerRefundYear"
              position="bottom"
            >
              <van-picker
                show-toolbar
                :columns="commercial.refundYears"
                @cancel="commercial.showPickerRefundYear = false"
                value-key="value"
                :default-index="commercial.refundYear"
                @confirm="onConfirmYears"
              />
            </van-popup>
          </van-cell-group>
          <van-cell-group>
            <van-field
              readonly
              clickable
              label="贷款利率"
              :value="commercial.interestRates[commercial.interestRate].value"
              placeholder="请选择贷款利率"
              @click="commercial.showInterestRate = true"
              right-icon="arrow"
            />
            <van-popup v-model="commercial.showInterestRate" position="bottom">
              <van-picker
                show-toolbar
                :columns="commercial.interestRates"
                @cancel="commercial.showInterestRate = false"
                value-key="value"
                :default-index="commercial.interestRate"
                @confirm="onConfirmRates"
              />
            </van-popup>
          </van-cell-group>
          <div class="box-2-0-0">
            <van-button
              type="primary"
              size="large"
              color="rgb(0, 114, 255)"
              style="
                width: 8rem;
                height: 40px;
                background: #0072ff;
                border-radius: 20px;
              "
              @click="calculateCommercialFn"
              >开始计算
            </van-button>
          </div>
        </van-tab>
        <van-tab title="公积金贷款">
          <van-cell-group>
            <van-field
              v-model="reservedFunds.total"
              type="number"
              label="贷款总额(万)"
              placeholder="请输入您的贷款总额"
            />
          </van-cell-group>
          <van-cell-group>
            <van-field
              readonly
              clickable
              label="还款方式"
              :value="reservedFunds.refundTypes[reservedFunds.refundType].value"
              placeholder="请选择还款方式"
              @click="reservedFunds.showPickerRefundType = true"
              right-icon="arrow"
            />
            <van-popup
              v-model="reservedFunds.showPickerRefundType"
              position="bottom"
            >
              <van-picker
                show-toolbar
                :columns="reservedFunds.refundTypes"
                @cancel="reservedFunds.showPickerRefundType = false"
                value-key="value"
                :default-index="reservedFunds.refundType"
                @confirm="onConfirmType1"
              />
            </van-popup>
          </van-cell-group>
          <van-cell-group>
            <van-field
              readonly
              clickable
              label="还款年数"
              :value="reservedFunds.refundYears[reservedFunds.refundYear].value"
              placeholder="请选择还款方式"
              @click="reservedFunds.showPickerRefundYear = true"
              right-icon="arrow"
            />
            <van-popup
              v-model="reservedFunds.showPickerRefundYear"
              position="bottom"
            >
              <van-picker
                show-toolbar
                :columns="reservedFunds.refundYears"
                @cancel="reservedFunds.showPickerRefundYear = false"
                value-key="value"
                :default-index="reservedFunds.refundYear"
                @confirm="onConfirmYears1"
              />
            </van-popup>
          </van-cell-group>
          <van-cell-group>
            <van-field
              readonly
              clickable
              label="贷款利率"
              :value="
                reservedFunds.interestRates[reservedFunds.interestRate].value
              "
              placeholder="请选择公积金贷款利率"
              @click="reservedFunds.showInterestRate = true"
              right-icon="arrow"
            />
            <van-popup
              v-model="reservedFunds.showInterestRate"
              position="bottom"
            >
              <van-picker
                show-toolbar
                :columns="reservedFunds.interestRates"
                @cancel="reservedFunds.showInterestRate = false"
                value-key="value"
                :default-index="reservedFunds.interestRate"
                @confirm="onConfirmRates1"
              />
            </van-popup>
          </van-cell-group>
          <div class="box-2-0-0">
            <van-button
              type="primary"
              size="large"
              color="rgb(0, 114, 255)"
              style="
                width: 8rem;
                height: 40px;
                background: #0072ff;
                border-radius: 20px;
              "
              @click="calculateCommercialFn1"
              >开始计算
            </van-button>
          </div>
        </van-tab>
        <van-tab title="组合贷款">
          <van-cell-group>
            <van-field
              v-model="combination.total0"
              type="number"
              label="商业贷款总额(万)"
              placeholder="请输入您的贷款总额"
            />
          </van-cell-group>
          <van-cell-group>
            <van-field
              v-model="combination.total1"
              type="number"
              label="公积金贷款总额(万)"
              placeholder="请输入您的贷款总额"
            />
          </van-cell-group>
          <van-cell-group>
            <van-field
              readonly
              clickable
              label="还款方式"
              :value="combination.refundTypes[combination.refundType].value"
              placeholder="请选择还款方式"
              @click="combination.showPickerRefundType = true"
              right-icon="arrow"
            />
            <van-popup
              v-model="combination.showPickerRefundType"
              position="bottom"
            >
              <van-picker
                show-toolbar
                :columns="combination.refundTypes"
                @cancel="combination.showPickerRefundType = false"
                value-key="value"
                :default-index="combination.refundType"
                @confirm="onConfirmType2"
              />
            </van-popup>
          </van-cell-group>
          <van-cell-group>
            <van-field
              readonly
              clickable
              label="还款年数"
              :value="combination.refundYears[combination.refundYear].value"
              placeholder="请选择还款方式"
              @click="combination.showPickerRefundYear = true"
              right-icon="arrow"
            />
            <van-popup
              v-model="combination.showPickerRefundYear"
              position="bottom"
            >
              <van-picker
                show-toolbar
                :columns="combination.refundYears"
                @cancel="combination.showPickerRefundYear = false"
                value-key="value"
                :default-index="combination.refundYear"
                @confirm="onConfirmYears2"
              />
            </van-popup>
          </van-cell-group>
          <van-cell-group>
            <van-field
              readonly
              clickable
              label="商业贷款利率"
              :value="
                combination.interestRates0[combination.interestRate0].value
              "
              placeholder="请选择商业贷款利率"
              @click="combination.showInterestRate0 = true"
              right-icon="arrow"
            />
            <van-popup
              v-model="combination.showInterestRate0"
              position="bottom"
            >
              <van-picker
                show-toolbar
                :columns="combination.interestRates0"
                @cancel="combination.showInterestRate0 = false"
                value-key="value"
                :default-index="combination.interestRate0"
                @confirm="onConfirmRates2"
              />
            </van-popup>
          </van-cell-group>
          <van-cell-group>
            <van-field
              readonly
              clickable
              label="公积金贷款利率"
              :value="
                combination.interestRates1[combination.interestRate1].value
              "
              placeholder="请选择公积金贷款利率"
              @click="combination.showInterestRate1 = true"
              right-icon="arrow"
            />
            <van-popup
              v-model="combination.showInterestRate1"
              position="bottom"
            >
              <van-picker
                show-toolbar
                :columns="combination.interestRates1"
                @cancel="combination.showInterestRate1 = false"
                value-key="value"
                :default-index="combination.interestRate1"
                @confirm="onConfirmRates3"
              />
            </van-popup>
          </van-cell-group>
          <div class="box-2-0-0">
            <van-button
              type="primary"
              size="large"
              color="rgb(0, 114, 255)"
              style="
                width: 8rem;
                height: 40px;
                background: #0072ff;
                border-radius: 20px;
              "
              @click="calculateCommercialFn2"
              >开始计算
            </van-button>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <BottomNav navCode="houseloan" />
  </div>
</template>
<script>
import TopFixed from "@/components/TopFixed.vue";
import BottomNav from "@/components/BottomNav.vue";
import utils from "@/utils/utils.js";
import { Toast } from "vant";
export default {
  name: "mortgageCalculator",
  components: {
    TopFixed,
    BottomNav,
  },
  data() {
    return {
      active: 0,
      commercial: {
        total: "",
        showPickerRefundType: false,
        refundType: 0,
        refundTypes: utils.refundTypes(),
        showPickerRefundYear: false,
        refundYear: 19,
        refundYears: utils.paymentTimes(30),
        showInterestRate: false,
        interestRate: 7,
        interestRates: utils.interestRates(4.9, 14),
      },
      reservedFunds: {
        total: "",
        showPickerRefundType: false,
        refundType: 0,
        refundTypes: utils.refundTypes(),
        showPickerRefundYear: false,
        refundYear: 19,
        refundYears: utils.paymentTimes(30),
        showInterestRate: false,
        interestRate: 2,
        interestRates: utils.interestRates(3.25, 4),
      },
      combination: {
        total0: "",
        total1: "",
        showPickerRefundType: false,
        refundType: 0,
        refundTypes: utils.refundTypes(),
        showPickerRefundYear: false,
        refundYear: 19,
        refundYears: utils.paymentTimes(30),
        showInterestRate0: false,
        interestRate0: 7,
        interestRates0: utils.interestRates(4.9, 14),
        showInterestRate1: false,
        interestRate1: 2,
        interestRates1: utils.interestRates(3.25, 4),
      },
    };
  },
  methods: {
    onConfirmType(e) {
      this.commercial.refundType = e.key;
      this.commercial.showPickerRefundType = false;
    },
    onConfirmYears(e) {
      this.commercial.refundYear = e.key;
      this.commercial.showPickerRefundYear = false;
    },
    onConfirmRates(e) {
      this.commercial.interestRate = e.key;
      this.commercial.showInterestRate = false;
    },
    calculateCommercialFn() {
      if (this.commercial.total <= 0) {
        Toast.fail("请输入贷款总额");
        return;
      }
      this.$router.push({
        path: "/computationResult",
        query: {
          active: this.active,
          refundType: this.commercial.refundType,
          refundYear: this.commercial.refundYears[this.commercial.refundYear]
            .num,
          interestRate0:
            this.commercial.interestRates[this.commercial.interestRate].num /
            100,
          total0: this.commercial.total,
        },
      });
    },
    onConfirmType1(e) {
      this.reservedFunds.refundType = e.key;
      this.reservedFunds.showPickerRefundType = false;
    },
    onConfirmYears1(e) {
      this.reservedFunds.refundYear = e.key;
      this.reservedFunds.showPickerRefundYear = false;
    },
    onConfirmRates1(e) {
      this.reservedFunds.interestRate = e.key;
      this.reservedFunds.showInterestRate = false;
    },
    calculateCommercialFn1() {
      if (this.reservedFunds.total <= 0) {
        Toast.fail("请输入贷款总额");
        return;
      }
      this.$router.push({
        path: "/computationResult",
        query: {
          active: this.active,
          refundType: this.reservedFunds.refundType,
          refundYear: this.reservedFunds.refundYears[
            this.reservedFunds.refundYear
          ].num,
          interestRate1:
            this.reservedFunds.interestRates[this.reservedFunds.interestRate]
              .num / 100,
          total1: this.reservedFunds.total,
        },
      });
    },
    onConfirmType2(e) {
      this.combination.refundType = e.key;
      this.combination.showPickerRefundType = false;
    },
    onConfirmYears2(e) {
      this.combination.refundYear = e.key;
      this.combination.showPickerRefundYear = false;
    },
    onConfirmRates2(e) {
      this.combination.interestRate0 = e.key;
      this.combination.showInterestRate0 = false;
    },
    onConfirmRates3(e) {
      this.combination.interestRate1 = e.key;
      this.combination.showInterestRate1 = false;
    },
    calculateCommercialFn2() {
      if (this.combination.total0 <= 0 || this.combination.total1 <= 0) {
        Toast.fail("请输入贷款总额");
        return;
      }
      this.$router.push({
        path: "/computationResult",
        query: {
          active: this.active,
          refundType: this.combination.refundType,
          refundYear: this.combination.refundYears[this.combination.refundYear]
            .num,
          interestRate0:
            this.combination.interestRates0[this.combination.interestRate0]
              .num / 100,
          total0: this.combination.total0,
          interestRate1:
            this.combination.interestRates1[this.combination.interestRate1]
              .num / 100,
          total1: this.combination.total1,
        },
      });
    },
  },
};
</script>
<style scoped>
.bgbox {
  width: 375px;
  height: 100px;
  background: #0072ff;
  position: fixed;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.line {
  width: 40px;
  height: 1px;
  opacity: 0.5;
  background: #ffffff;
  border-radius: 2px;
  margin-top: -37px;
}
.title {
  width: 100px;
  height: 20px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: #fefefe;
  line-height: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: -37px;
}
.box-2 {
  height: calc(100vh - 130px);
  overflow-y: scroll;
  background: #f7f7f7;
}
.box-2-0 {
  height: 220px;
  margin-top: 65px;
  margin-left: 3%;
  width: 94%;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 3px 8px 0px rgba(192, 196, 204, 0.3);
}
.box-2-0-0 {
  margin: 30px 26px 0;
}

@supports (bottom: env(safe-area-inset-bottom)) {
  .box-2 {
    height: calc(100vh - 130px - env(safe-area-inset-bottom));
  }
}
</style>
<style>
.mortgageCalculator .box-2-0 .van-tabs__nav {
  background-color: #fff;
}

.mortgageCalculator .box-2-0 .van-tab--active {
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 600;
  text-align: left;
  color: #0072ff;
  line-height: 20px;
}

.mortgageCalculator .box-2-0 .van-tabs__line {
  background: #0072ff;
  border-radius: 4px;
  height: 4px;
}
.mortgageCalculator .box-2-0 .van-field__label {
  width: 3.4rem;
}
</style>