<template>
    <div>
        <TopFixed />
        <div class="box-1"  v-if="data">
            
                <div class="box-1-0-5">云上观楼，让营销充满更多可能性！</div>   

            <div class="box-1-0">
                <div class="box-1-0-0">项目信息<span>Project Information</span></div>
                <div class="box-1-0-1"><img :src="data.mainPic"/></div>
                <div class="box-1-0-2">项目名称:{{data.name}}</div>                
                <div class="box-1-0-2">开发商:{{data.developers}}</div>
                <div style="font-size: 12px;">项目地址:{{data.address}}</div>
                
            </div>
            <div class="box-1-0">
                <div class="box-1-0-0">技术支持<span>Technology Support</span></div>
                <div class="box-1-0-4">
                    <div>
                        <img :src="data.deptLogo" v-if="data.deptLogo"/>
                        <img src="../assets/imgs/enterlogo.jpg" v-if="!data.deptLogo"/>
                    </div>
                </div>                           
                <div class="box-1-0-8">技术供应商:{{data.deptName?data.deptName:"湖南亿比克网络科技有限公司™"}}</div>  
            </div>
            <div class="box-1-0">
                <div class="box-1-0-0">免责声明<span>Disclaimer</span></div>
                <div style="font-size: 12px;padding:10px 0px" v-html="data.disclaimer"></div>
                <div class="box-1-0-3">*演示内容仅供参考，最终以签约合同为准</div>
            </div>
            <div class="box-1-0">
                <div class="box-1-0-0-0">*网络服务供应商<span>Network Service Provider</span></div>
                <div class="box-1-0-7">
                    <div class="box-1-0-7-0">
                        <div>服务商：亿比克网络科技™</div>
                        <div>技术合作：{{data.mobile1}} / {{data.mobile2}}</div>
                        <div>公司网址：{{data.webUrl}}</div>
                    </div>
                    <!-- <div class="box-1-0-7-1">
                        <div><img src="../assets/imgs/ewm.jpg" /></div>
                        <div class="box-1-0-7-1-1">长按进行线上咨询</div>
                    </div> -->
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
    name:'versiondeclarate',
    components: {
        TopFixed,
        BottomNav,
    },
    data() {
        return {
            data:null
        }
    },
    created() {
        this.$api.post('/userIndex/versionStatement', {
            projectId: window.parameters.projectId
        }, response => {
            if (response.status >= 200 && response.status < 300) {
                console.log(response)
                this.data = response.data.data;
                // this.data.deptLogo="";
                // this.data.deptName="";
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
    height: calc(100vh - 101px);
    border-top: 1px solid #e0e0e0;
    overflow-y: scroll;
}
.box-1-0{
    padding: 0px 10px 30px 10px;
}
.box-1-0-0{
    font-weight: bold;
    color: #333333;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
}
.box-1-0-0-0{
    font-weight: bold;
    color: #333333;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
}
.box-1-0-0-0 span{
    font-size: 8px;
    color: #4b7df6;
    font-weight: normal;
    margin-left: 5px;
}
.box-1-0-0 span{
    font-size: 12px;
    color: #4b7df6;
    font-weight: normal;
    margin-left: 5px;
}
.box-1-0-1{
    width: 355px;
    padding-bottom: 10px;
}
.box-1-0-1 img{
    width: 355px;
    display: block;
    height: auto;
}
.box-1-0-2{
    font-size: 12px;
    height: 18px;
    line-height: 18px;
}
.box-1-0-3{
    text-align: right;
    font-size: 10px;
    color: #4b7df6;
}
.box-1-0-4{
    display: flex;
    justify-content: space-around;
    padding-bottom: 5px;
    padding:20px;
}
.box-1-0-4 div img{
    width: 64px;
    height: 64px;
    display:block;
}
.box-1-0-5{
    color: #4b7df6;
    font-size: 20px;
    text-align: center;
    line-height: 20px;
    padding: 30px 10px 30px 10px;
}
.box-1-0-8{
    color: #000;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
}
.box-1-0-6{
    font-size: 10px;
}
.box-1-0-7{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.box-1-0-7-0{
    font-size: 10px;
    line-height: 14px;
}
.box-1-0-7-1{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.box-1-0-7-1-1{
    padding-top: 5px;
    font-size: 10px;
    line-height: 14px;
}
.box-1-0-7-1 img{
    display: block;
    width: 60px;
    height: 60px;
}
@supports (bottom: env(safe-area-inset-bottom)) {
    .box-1{
        height: calc(100vh - 100px - env(safe-area-inset-bottom));
    }
}
</style>
  