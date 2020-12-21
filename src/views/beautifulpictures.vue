<template>
    <div>
        <TopFixed />
        <div class="box-1">
            <div>
                <div class="box-1-1">
                    <van-icon name="arrow-left" color="#fff" class="arrow-left" @click="prevTitleFn" />
                    <van-swipe  @change="contentChangeFn" ref="content" :height="h">
                        <van-swipe-item v-for="(item,index) in familyList" :key="index">
                            <div class='cell'>
                                <img class="box-1-1-1" :src="item.url" @click="previewImg" />
                            </div>
                        </van-swipe-item>
                    </van-swipe>
                    <van-icon name="arrow" color="#fff" class="arrow"  @click="nextTitleFn" />
                </div>
            </div>
        </div>
        <BottomNav  navCode="beautifulpictures" />

        <van-image-preview v-model="show" :images="images"></van-image-preview>
    </div>
</template>
<script>
import TopFixed from "@/components/TopFixed.vue";
import BottomNav from "@/components/BottomNav.vue";

export default {
    name:'beautifulpictures',
    components: {
        TopFixed,
        BottomNav,
    },
    data() {
        return {
            h:window.screen.height-126.5,
            initialSwipe:0,
            familyList:[],
            images:[],
            show:false,
            index:null,
        }
    },
    created() {
        for(let i=0;i<window.bottomData.matchList.length;i++){
            if(window.bottomData.matchList[i].code == 'beautifulpictures'){
                this.familyList = window.bottomData.matchList[i].maps;
            }
        }
        if(this.familyList.length == 0){
            for(let i=0;i<window.bottomData.childrenList.length;i++){
                if(window.bottomData.childrenList[i].code == 'beautifulpictures'){
                    this.familyList = window.bottomData.childrenList[i].maps;
                }
            }
        }
    },
    methods: {
        contentChangeFn(e){
            this.initialSwipe = e;
        },
        nextTitleFn:function(){
            let e = this.initialSwipe + 1;
            if(e>this.familyList.length-1){
                e = 0;
            }
            this.initialSwipe = e;
            this.$refs.content.swipeTo(this.initialSwipe);
        },
        prevTitleFn(){
            let e = this.initialSwipe - 1;
            if(e<0){
                e = this.images.length - 1;
            }
            this.initialSwipe = e;
            this.$refs.content.swipeTo(this.initialSwipe);
        },
        previewImg(){
            this.images = [this.familyList[this.initialSwipe].url];
            this.show = true;
        }
    }
}
</script>
<style scoped>
.box-1{
    height: calc(100vh - 100px);
    background-color: #f0f0f0;
    overflow: hidden;
}
.box-1-0{
    height: 20px;
    padding:10px 0;
    width: 296px;
}
.box-1-0-0{
    margin: 0 2px;
    background-color: #169bd5;
    border-radius: 4px;
    text-align: center;
    font-size: 10px;
    color:#f0f0f0;
    height: 20px;
    line-height: 20px;
    width: 70px;
}
.box-1-1{
    width:344px;
    padding:10px 0;
    margin: 0 auto;
    height: calc(100vh - 120px);
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
    width: 344px;
    max-height: 100%;   
    object-fit: cover;
}
.box-1-1-2,.box-1-1-3{
    position: absolute;
    left: 10px;
    top: 60%;
    width: 30px;
    height: 57px;
}
.box-1-1-3{
    margin-top: 67px;
}
.box-1-1-2 img,.box-1-1-3 img{
    display: block;
    width: 30px;
    height: 57px;
}
.cell{
    display:table-cell; 
    vertical-align:middle;
    height:calc(100vh - 126.5px)
}
@supports (bottom: env(safe-area-inset-bottom)) {
    .box-1{
        height: calc(100vh - 126.5px - env(safe-area-inset-bottom));
    }
    .box-1-1{
        height: calc(100vh - 126.5px - env(safe-area-inset-bottom));
    }
    .cell{
        height:calc(100vh - 126.5px - env(safe-area-inset-bottom))
    }
}
</style>