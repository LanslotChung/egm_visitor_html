<template>
    <div>
        <TopFixed />
        <div class="box-1">
            <van-swipe style="height: 100%;" vertical :show-indicators="false" @change="contentChangeFn" ref="content" v-if="data">
                <van-swipe-item v-for="(item,index) in data.maps" :key="index"  >
                    <img :src="item.url">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="box-2" v-if="data">
            <img :src="data.url" />
        </div>
        <div class="box-3" v-if="data">
            <div v-for="(item,index) in data.maps" :key="index" @click="clickTitleFn(index)" :style="index == initialSwipe?'color:#fff':''">
                {{item.name}}
            </div>
        </div>
        <BottomNav navCode="peripheral" />
    </div>
</template>
<script>
import TopFixed from "@/components/TopFixed.vue";
import BottomNav from "@/components/BottomNav.vue";
export default {
    name:'circumConfig',
    components: {
        TopFixed,
        BottomNav,
    },
    data() {
        return {
            data:null,
            initialSwipe:0,
        }
    },
    mounted() {
        for(let i=0;i<window.bottomData.matchList.length;i++){
            if(window.bottomData.matchList[i].code == 'peripheral'){
                this.data = window.bottomData.matchList[i];
                console.log(11)
            }
        }
        if(this.data == null){
            for(let i=0;i<window.bottomData.childrenList.length;i++){
                if(window.bottomData.childrenList[i].code == 'peripheral'){
                    this.data = window.bottomData.childrenList[i];
                }
            }
        }
        console.log(this.data)
    },
    methods:{
        contentChangeFn(e){
            this.initialSwipe = e;
        },
        clickTitleFn(e){
            console.log(e)
            this.$refs.content.swipeTo(e);
            this.initialSwipe = e;
        }
    }
}
</script>
<style scoped>
.box-1{
    height: calc(100vh - 100px);
}
.box-2{
    height: calc(100vh - 100px);
    top: 50px;
    position: fixed;
    left: 0;
    right: 0;
    z-index: -1;
}
.box-2 img,.box-1 img{
    display: block;
    width: 100%;
    height: 100%;
}
.box-3{
    width: 80px;
    position: fixed;
    top: 70px;
    right: 20px;
}
.box-3 div{
    width: 80px;
    height: 20px;
    line-height: 20px;
    color: #999;
    font-size: 14px;
    text-align: center;
    border-radius: 4px;
    background-color: #1e1e1e;
    margin-bottom: 10px;
}
@supports (bottom: env(safe-area-inset-bottom)) {
    .box-1{
        height: calc(100vh - 100px - env(safe-area-inset-bottom));
    }
    .box-2{
        height: calc(100vh - 100px - env(safe-area-inset-bottom));
    }
}
</style>