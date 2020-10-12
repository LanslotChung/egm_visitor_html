<template>
    <div>
        <TopFixed />
        <div class="box-1">
            <div class="box-1-0" v-if='show_baseInfo'>   
                <div class="box-1-1-0">开发商信息</div>    
                <div class="box-1-0-0" v-if="show_name">
                    <div class="box-1-0-0-0">项目名称</div>
                    <div>{{data?data.name:''}}</div>
                </div>
                <div class="box-1-0-0" v-if="show_developers">
                    <div class="box-1-0-0-0">开发商</div>
                    <div>{{data?data.developers:''}}</div>
                </div>

                <div class="box-1-0-0" v-if="show_basePhone">
                    <div class="box-1-0-0-0">联系电话</div>
                    <div>{{data?data.basePhone:''}}</div>
                </div>
            </div>
            <div class="box-1-1" v-if='show_baseInfo'> 
                <div class="box-1-1-0">楼盘信息</div>
                <div class="box-1-0-0" v-if="show_baseBuiltupArea">
                    <div class="box-1-0-0-0">建筑面积</div>
                    <div>{{data?data.baseBuiltupArea:''}}万m&sup2;</div>
                </div>
                <div class="box-1-0-0" v-if="show_baseAreaCovered">
                    <div class="box-1-0-0-0">占地面积</div>
                    <div>{{data?data.baseAreaCovered:''}}万m&sup2;</div>
                </div>
                <div class="box-1-0-0" v-if="show_baseOpenDate">
                    <div class="box-1-0-0-0">开盘日期</div>
                    <div>{{data?data.baseOpenDate:''}}</div>
                </div>
                <div class="box-1-0-0" v-if="show_baseHandoverDate">
                    <div class="box-1-0-0-0">交房日期</div>
                    <div>{{data?data.baseHandoverDate:''}}</div>
                </div>
                <div class="box-1-0-0" v-if="show_basePropertyYears">
                    <div class="box-1-0-0-0">产权年限</div>
                    <div>{{data?data.basePropertyYears:''}}年</div>
                </div> 
                <div class="box-1-0-0" v-if="show_address">
                    <div class="box-1-0-0-0">楼盘地址</div>
                    <div>{{data?data.address:''}}</div>
                </div>
            </div>
            <div class="box-1-1" v-if="show_saleInfo">
                <div class="box-1-1-0">销售信息</div>
                <div class="box-1-0-0" v-if="show_saleLayout">
                    <div class="box-1-0-0-0">在售户型</div>
                    <div>{{data?data.saleLayout:''}}</div>
                </div>
                <div class="box-1-0-0" v-if="show_saleRealeState">
                    <div class="box-1-0-0-0">楼盘状态</div>
                    <div>{{data?data.saleRealeState==0?'开盘':'未开盘':''}}</div>
                </div>
                <div class="box-1-0-0" v-if="show_salePresale">
                    <div class="box-1-0-0-0">预售证</div>
                    <div>{{data?data.salePresale:''}}</div>
                </div>
            </div>
            <div class="box-1-1" v-if="show_areaInfo">
                <div class="box-1-1-0">小区概况</div>
                <div class="box-1-0-0" v-if="show_propertiesCars">
                    <div class="box-1-0-0-0">车位数</div>
                    <div>{{data?data.propertiesCars:''}}</div>
                </div>
                <div class="box-1-0-0" v-if="show_propertiesParkeRatio">
                    <div class="box-1-0-0-0">车位比</div>
                    <div>{{data?data.propertiesParkeRatio:''}}</div>
                </div>
                <div class="box-1-0-0" v-if="show_propertiesPowerMode">
                    <div class="box-1-0-0-0">供电方式</div>
                    <div>{{data?data.propertiesPowerMode=='0'?'民电':'商电':''}}</div>
                </div>
                <div class="box-1-0-0" v-if="show_propertiesWaterMode">
                    <div class="box-1-0-0-0">供水方式</div>
                    <div>{{data?data.propertiesWaterMode=='0'?'民水':'商水':''}}</div>
                </div>
                <div class="box-1-0-0" v-if="show_propertiesCompany">
                    <div class="box-1-0-0-0">物业公司</div>
                    <div>{{data?data.propertiesCompany:''}}</div>
                </div>
                <div class="box-1-0-0" v-if="show_propertiesPlotRatio">
                    <div class="box-1-0-0-0">容积率</div>
                    <div>{{data?data.propertiesPlotRatio:''}}</div>
                </div>
                <div class="box-1-0-0" v-if="show_propertiesAffRate">
                    <div class="box-1-0-0-0">绿化率</div>
                    <div>{{data?data.propertiesAffRate:''}}</div>
                </div>
                <div class="box-1-0-0" v-if="show_propertiesType">
                    <div class="box-1-0-0-0">物业类型</div>
                    <div>{{propertiesType}}</div>
                </div>
            </div>
        </div>
        <BottomNav navCode="basicInfo" />
    </div>
</template>
<script>
import TopFixed from "@/components/TopFixed.vue";
import BottomNav from "@/components/BottomNav.vue";
export default {
    name:'basicInfo',
    components: {
        TopFixed,
        BottomNav,
    },
    data() {
        return {
            data:null,
            show_baseBuiltupArea:false,
            show_baseAreaCovered:false,
            show_baseOpenDate:false,
            show_baseHandoverDate:false,
            show_basePropertyYears:false,
            show_developers:false,
            show_basePhone:false,
            show_address:false,
            show_name:false,
            show_saleLayout:false,
            show_saleRealeState:false,
            show_salePresale:false,
            show_propertiesCars:false,
            show_propertiesParkeRatio:false,
            show_propertiesPowerMode:false,
            show_propertiesWaterMode:false,
            show_propertiesCompany:false,
            show_propertiesPlotRatio:false,
            show_propertiesAffRate:false,
            show_propertiesType:false,
            show_baseInfo:false,
            show_saleInfo:false,
            show_areaInfo:false,
            propertiesType:''
        }
    },
    created() {
        this.$api.post('/userIndex/productInfo', {
            projectId: window.parameters.projectId
        }, response => {
            if (response.status >= 200 && response.status < 300) {
                console.log(response)
                
                this.data = response.data.data;

                this.show_baseBuiltupArea = this.data?this.data.baseBuiltupArea != '' :false;
                this.show_baseAreaCovered = this.data?this.data.baseAreaCovered != '' :false;
                this.show_baseOpenDate = this.data?this.data.baseOpenDate != '' :false;
                this.show_baseHandoverDate = this.data?this.data.baseHandoverDate != '0' :false;
                this.show_basePropertyYears = this.data?this.data.basePropertyYears != '' :false;
                this.show_developers = this.data?this.data.developers != '' :false;
                this.show_basePhone = this.data?this.data.basePhone != '' :false;
                this.show_address = this.data?this.data.address != '' :false;
                this.show_name = this.data?this.data.name != '' :false;

                this.show_saleLayout = this.data?this.data.saleLayout != '' :false;
                this.show_saleRealeState = this.data?this.data.saleRealeState != '-1' :false;
                this.show_salePresale = this.data?this.data.salePresale != '' :false;

                this.show_propertiesCars = this.data?this.data.propertiesCars != '' :false;
                this.show_propertiesParkeRatio = this.data?this.data.propertiesParkeRatio != '' :false;
                this.show_propertiesPowerMode = this.data?this.data.propertiesPowerMode != '-1' :false;
                this.show_propertiesWaterMode = this.data?this.data.propertiesWaterMode != '-1' :false;
                this.show_propertiesCompany = this.data?this.data.propertiesCompany != '' :false;
                this.show_propertiesPlotRatio = this.data?this.data.propertiesPlotRatio != '' :false;
                this.show_propertiesAffRate = this.data?this.data.propertiesAffRate != '' :false;
                this.show_propertiesType = this.data?this.data.propertiesType != '-1' :false;
                console.log(this.data.propertiesType)
                switch (this.data.propertiesType) {
                    case '0':
                        this.propertiesType='居住物业'
                        break;
                    case '1':
                        this.propertiesType='商业物业'
                        break;
                    case '2':
                        this.propertiesType='工业物业'
                        break;
                    case '3':
                        this.propertiesType='政府物业'
                        break;
                    default:
                        this.propertiesType='其他用途物业'
                        break;
                }

                this.show_baseInfo = this.show_baseBuiltupArea || this.show_baseAreaCovered || this.show_baseOpenDate || this.show_baseHandoverDate || this.show_basePropertyYears || this.show_developers || this.show_basePhone || this.show_address || this.show_name;
                this.show_saleInfo = this.show_saleLayout || this.show_saleRealeState || this.show_salePresale;
                this.show_areaInfo = this.show_propertiesCars || this.show_propertiesParkeRatio || this.show_propertiesPowerMode || this.show_propertiesWaterMode || this.show_propertiesCompany || this.show_propertiesPlotRatio || this.show_propertiesAffRate || this.show_propertiesType;

            } else {
                console.log(response.message);
            }
        });
    },
    methods: {

    }
}
</script>
<style scoped>
.box-1{
    height: calc(100vh - 100px);
    overflow-y: scroll;
    background-color: #f2f2f2;
}
.box-1-0{
    background-color: #fff;
    border-top: 1px solid #e0e0e0;
    padding-bottom:5px;
}
.box-1-0-0{
    display: flex;
    line-height: 24px;
    color: #333;
    font-size: 14px;
}
.box-1-0-0-0{
    width: 80px;
    color:#999;
    font-size: 14px;
    text-align: right;
    margin-right: 5px;
    min-width: 80px;
}
.box-1-1{
    margin-top: 8px;
    background-color: #fff;
    padding-bottom: 5px;
}
.box-1-1-0{
    margin: 0 16px;
    color: #333;
    font-size: 16px;
    border-bottom: 1px solid #e0e0e0;
    height: 40px;
    line-height: 40px;
    margin-bottom: 5px;
}
@supports (bottom: env(safe-area-inset-bottom)) {
    .box-1{
        height: calc(100vh - 100px - env(safe-area-inset-bottom));
    }
}
</style>
  