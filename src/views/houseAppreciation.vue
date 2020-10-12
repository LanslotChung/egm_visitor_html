<template>
    <div>
        <TopFixed />
        <div class="box-1">
            <div style="display: flex;align-items: center;justify-content: center;">
                <van-icon name="arrow-left" color="rgb(0, 142, 255)" @click="prevTitleFn" />
                <div class="box-1-0">
                    <van-swipe :loop="false"  :width="w" :height="20" :show-indicators="false" ref="title" :stop-propagation="false">
                        <van-swipe-item v-for="(item,index) in familyList" :key="index" @click="titleClickFn(index)">
                            <div class="box-1-0-0" :style="initialSwipe == index ? 'background-color: #008eff;':''">{{item.house_type}}</div>
                        </van-swipe-item>
                    </van-swipe>
                </div>
                <van-icon name="arrow" color="rgb(0, 142, 255)" @click="nextTitleFn" />
            </div>
            <div>
                <div class="box-1-1">
                    <van-icon name="arrow-left" color="rgb(0, 142, 255)" class="arrow-left" @click="prevTitleFn" />
                    <van-swipe :loop="true"  :show-indicators="false"  @change="contentChangeFn" ref="content">
                        <van-swipe-item v-for="(item,index) in familyList" :key="index">
                            <div class="box-1-1-0">
                                <div>
                                    <img class="box-1-1-1" :src="item.main_pic" />
                                </div>
                            </div>
                        </van-swipe-item>
                    </van-swipe>
                    <van-icon name="arrow" color="rgb(0, 142, 255)" class="arrow"  @click="nextTitleFn" />

                    <div class="box-1-1-2" v-show="familyList[initialSwipe].url.length > 0" @click="goHardcoverRoaming"><img src="../assets/imgs/jzmy.png"/></div>
                    <div class="box-1-1-3" v-show="familyList[initialSwipe].houseImages.length > 0" @click="goAirview"><img src="../assets/imgs/nkhx.png"/></div>
                    <!-- :hidden="familyList[initialSwipe].houseImages.length > 0"
                    :hidden="familyList[initialSwipe].url.length > 0" -->
                </div>
            </div>
        </div>
        <BottomNav  navCode="Houseappreciation" />
    </div>
</template>
<script>
import TopFixed from "@/components/TopFixed.vue";
import BottomNav from "@/components/BottomNav.vue";
export default {
    name:'houseAppreciation',
    components: {
        TopFixed,
        BottomNav,
    },
    data() {
        return {
            w:parseFloat(document.getElementsByTagName('html')[0].style.fontSize)/37.5*74,
            initialSwipe:0,
            familyList:[],
            bottomDataName:'',
            bottomDataIndex:0
        }
    },
    created() {
        for(let i=0;i<window.bottomData.matchList.length;i++){
            if(window.bottomData.matchList[i].code == 'Houseappreciation'){
                this.familyList = window.bottomData.matchList[i].maps;
                this.bottomDataName = 'matchList';
                this.bottomDataIndex = i;
            }
        }
        if(this.familyList.length == 0){
            for(let i=0;i<window.bottomData.childrenList.length;i++){
                if(window.bottomData.childrenList[i].code == 'Houseappreciation'){
                    this.familyList = window.childrenList.matchList[i].maps;
                    this.bottomDataName = 'childrenList';
                    this.bottomDataIndex = i;
                }
            }
        }
        //this.$refs.content.resize()
    },
    methods: {
        titleClickFn(e){
            console.log(e)
            this.$refs.content.swipeTo(e);
            this.$refs.title.swipeTo(e);
            this.initialSwipe = e;
        },
        contentChangeFn(e){
            this.$refs.title.swipeTo(e);
            this.initialSwipe = e;
        },
        nextTitleFn:function(){
            let e = this.initialSwipe + 1;
            if(e>this.familyList.length-1){
                return
            }
            this.initialSwipe = e;
            this.$refs.content.swipeTo(this.initialSwipe);
        },
        prevTitleFn(){
            let e = this.initialSwipe - 1;
            if(e<0){
                return
            }
            this.initialSwipe = e;
            this.$refs.content.swipeTo(this.initialSwipe);
        },
        goHardcoverRoaming(){
            this.$router.push({
                path: "/hardcoverRoaming?bottomDataName="+this.bottomDataName+'&bottomDataIndex='+this.bottomDataIndex+'&id='+this.initialSwipe
            });
            // console.log(this.familyList[this.initialSwipe].houseImages.length)
        },
        goAirview(){
            this.$router.push({
                path: "/airview?bottomDataName="+this.bottomDataName+'&bottomDataIndex='+this.bottomDataIndex+'&id='+this.initialSwipe
            });
        }
    }
}
</script>
<style scoped>
@supports (bottom: env(safe-area-inset-bottom)) {
    .box-1{
        height: calc(100vh - 100px - env(safe-area-inset-bottom));
    }
    .box-1-1{
        height: calc(100vh - 160px - env(safe-area-inset-bottom));
    }
    /* .box-1-1-1{
        display: block;
        width: 344px;
        height: calc(100vh - 160px - env(safe-area-inset-bottom));
    } */
    .box-1-1-0{
        height: calc(100vh - 160px - env(safe-area-inset-bottom));
    }
}
.box-1{
    height: calc(100vh - 100px);
    background-color: #f0f0f0;
}
.box-1-0{
    height: 20px;
    padding:10px 0;
    width: 296px;
}
.box-1-0-0{
    margin: 0 2px;
    background-color: #9E9E9E;
    border-radius: 4px;
    text-align: center;
    font-size: 10px;
    color:#fff;
    height: 20px;
    line-height: 20px;
    width: 70px;
}
.box-1-1{
    width:344px;
    padding:10px 0;
    margin: 0 auto;
    height: calc(100vh - 160px);
    position: relative;
}
.box-1-1 .arrow-left{
    position: absolute;
    top: 50%;
    margin-top: -12px;
    left: 0px;
    z-index: 100;
}
.box-1-1 .arrow{
    position: absolute;
    z-index: 100;
    top: 50%;
    margin-top: -12px;
    right: 0px;
}
.box-1-1-1{
    display: block;
    width: 100%;
    height: auto;
}
.box-1-1-0{
    height: calc(100vh - 160px);
    overflow-y: scroll;
}
.box-1-1-2,.box-1-1-3{
    position: absolute;
    left: 10px;
    top: 60%;
    width: 32px;
    height: 57px;
    /* width: 30px;
    height: 57px; */
}
.box-1-1-3{
    margin-top: 67px;
}
.box-1-1-2 img,.box-1-1-3 img{
    display: block;
    width: 32px;
    height: 57px;
    /* width: 30px;
    height: 57px; */
}
@supports (bottom: env(safe-area-inset-bottom)) {
    .box-1{
        height: calc(100vh - 100px - env(safe-area-inset-bottom));
    }
    .box-1-1{
        height: calc(100vh - 160px - env(safe-area-inset-bottom));
    }
    /* .box-1-1-1{
        height: calc(100vh - 160px - env(safe-area-inset-bottom));
    } */
    .box-1-1-0{
        height: calc(100vh - 160px - env(safe-area-inset-bottom));
    }
}
</style>