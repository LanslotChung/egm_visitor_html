<template>
    <div>
        <TopFixed />
        <div class="box-1">
            <div class="box-1-0">
                <v-touch @pan="pan" @panend="panend"  @pinch="pinch">
                    <!-- <div class="box-1-0-0" :style="'display: flex;align-self: center;justify-content: center;overflow: hidden;background:url('+backDrop+')'"> -->
                    <div class="box-1-0-0" style="display: flex;align-self: center;justify-content: center;overflow: hidden;position: relative;">
                        <div class="topbj">
                            <img :src="aboveImage" />
                        </div>
                        
                        <div v-if="!loading && imgs.length>0" style="display: flex;align-self: center;justify-content: center;overflow: hidden;position: relative;z-index: 2;">
                            <!-- !loading && imgs.length>0 -->
                            <img 
                                :src="item.src"
                                v-for="(item,i) in imgs[nameIndex]" :key="i"
                                v-show="index == i"
                                :style="'width:'+imgW+'px;height:' + imgH + 'px'"
                            />                            
                        </div>
                        <div v-else style="position: relative;z-index: 20;display: flex;align-self: center;justify-content: center;background-color: #fff;width: 100%;height: 100%;">
                                <!-- <van-image
                                    width="40px"
                                    fit="contain"
                                    :src="imgsrc"
                                /> -->
                                <radial-progress-bar 
                                    :diameter="100"
                                    :completed-steps="loaded"
                                    :total-steps="imgCount"
                                    :startColor="'rgb(0, 142, 255)'"
                                    :stopColor="'rgb(0, 142, 255)'"
                                    :animateSpeed="200"
                                    :innerStrokeColor="'rgb(168,212,247)'"
                                    style="align-self: center;justify-content: center;"
                                    >
                                    <p style="font-size:16px">{{progress}}%</p>
                                </radial-progress-bar>
                        </div>
                        <div class="bottombj">
                            <img :src="belowImage" />
                        </div>
                    </div>
                </v-touch>
            </div>
            <div class="box-1-1" v-if="names.length>1">
                <div class="box-1-1-0" >
                    <div v-for="(item,index) in names" :key="index" :style="nameIndex == index ?'border-bottom: 2px solid #4b7df6;;color:#4b7df6':''" @click="nameIndexFn(index)">{{item}}</div>
                </div>
            </div>
        </div>
        <BottomNav navCode="soloshow" />

        <!-- <van-image-preview v-model="show" :images="images"></van-image-preview> -->
    </div>
</template>
<script>
import TopFixed from "@/components/TopFixed.vue";
import BottomNav from "@/components/BottomNav.vue";
import RadialProgressBar from 'vue-radial-progress'
export default {
    name:'soloshow',
    components: {
        TopFixed,
        BottomNav,
        RadialProgressBar
    },
    data() {
        return {
            data:null,
            names:[],
            nameIndex:0,
            imgs:[],
            loading:true,
            index:0,
            isFinished:true,
            widthVw:100,
            imgsrc:require('../assets/imgs/loading.gif'),
            //backDrop:window.backDrop,
            aboveImage:window.aboveImage,
            belowImage:window.belowImage,
            imgW:100,
            imgH:100,
            canvasW:0,
            canvasH:0,
            maxImgW:100,
            maxImgH:100,
            minImgW:100,
            minImgH:100,
            tmpTime:0,
            maxTime:.05,
            loaded:0,
            imgCount:0,
            progress:0
        }
    },
    created() {
        for(let i=0;i<window.bottomData.matchList.length;i++){
            if(window.bottomData.matchList[i].code == 'soloshow'){
                this.data = window.bottomData.matchList[i].maps;
            }
        }
        if(this.data == null){
            for(let i=0;i<window.bottomData.childrenList.length;i++){
                if(window.bottomData.childrenList[i].code == 'soloshow'){
                    this.data = window.bottomData.childrenList[i].maps;
                }
            }
        }
        this.loadImgs();
    },
    mounted(){

    },
    methods: {
        async loadImgs(){
            for(let i=0;i<this.data.length;i++){
                this.names.push(this.data[i].name);
                this.imgCount += this.data[i].houseImages.length;
                await this.onloadImgs(this.data[i].houseImages,i,this.data.length-1);
            }
        },
        async onloadImgs(imgs,index,len) {
            for (let i = 0; i < imgs.length; i++) {
                await this.onloadImg(imgs[i].url,index);
            }
            if(index == len){
                this.loading = false;
                setTimeout(this.autoRotate,this.maxTime / 2 * 1000);
            }
        },
        onloadImg(imgsrc,index) {
            var isLoaded = false;
            return new Promise((resolve, reject) => {
                let newImg = new Image();
                newImg.src = imgsrc;
                newImg.onerror = () => {// 图片加载错误时的替换图片
                    newImg.src = '';//任意本地图片
                    reject();
                }
                newImg.onload = () => { // 图片加载成功后把地址给原来的img
                    this.imgs[index] = this.imgs[index] || [];
                    this.imgs[index].push(newImg);
                    this.loaded ++;
                    this.progress = (this.loaded / this.imgCount * 100).toFixed(2) ;
                    resolve();
                    if(isLoaded == false){
                        this.canvasW = document.body.clientWidth;
                        this.canvasH = document.body.clientHeight;
                        this.imgW = newImg.width;
                        this.imgH = newImg.height;
                        if(this.imgW > this.imgH){
                            this.imgH = this.imgH * this.canvasW / this.imgW;
                            this.imgW = this.canvasW;
                        }else{
                            this.imgW = this.imgW * this.canvasH / this.imgH;
                            this.imgH = this.canvasH;
                        }
                        this.maxImgW = this.imgW * this.canvasH / this.imgH;
                        this.maxImgH = this.canvasH;
                        this.minImgW = this.imgW;
                        this.minImgH = this.imgH;
                        isLoaded = true;
                    }
                }
            });
        },
        autoRotate:function(){
            if (this.index + 1 < this.imgs[this.nameIndex].length) {
                this.index++;
                setTimeout(this.autoRotate,this.maxTime / 2 * 1000);
            }else{
                this.index = 0;
            }
        },
        nameIndexFn:function(e){
            this.nameIndex = e;
            this.index = 0;
        },
        pan(e) {
            if((e.deltaTime - this.tmpTime) / 1000 >= this.maxTime){
                this.tmpTime = e.deltaTime;
                if(e.additionalEvent == 'panleft' || e.additionalEvent == 'pandown'){
                    if (this.index + 1 < this.imgs[this.nameIndex].length) {
                        this.index++
                    }else{
                        this.index = 0;
                    }
                }else if(e.additionalEvent == 'panright' || e.additionalEvent == 'panup'){
                    if (this.index - 1 >= 0) {
                        this.index--
                    }else{
                        this.index=this.imgs[this.nameIndex].length-1;
                    }
                }
            }
        },
        panend(){
            this.tmpTime = 0;
        },
        pinch(e){
                if(e.additionalEvent == 'pinchin'){
                    if(this.imgW > this.minImgW){
                        this.imgW -= e.distance;
                        this.imgH -= e.distance * this.minImgH / this.minImgW;
                    }
                }
                else if(e.additionalEvent == 'pinchout'){
                    if(this.imgW < this.maxImgW){
                        this.imgW += e.distance;
                        this.imgH += e.distance * this.minImgH / this.minImgW;
                    }
                }

                if(this.imgW < this.minImgW){
                    this.imgW = this.minImgW;
                }else if(this.imgW > this.maxImgW){
                    this.imgW = this.maxImgW;
                }

                if(this.imgH < this.minImgH){
                    this.imgH = this.minImgH;
                }else if(this.imgH > this.maxImgH){
                    this.imgH = this.maxImgH;
                }
        }
        // previewImg(i){
        //     this.images = [this.imgs[this.nameIndex][i].src];
        //     this.show = true;
        // }
    }
}
</script>
<style scoped>
.topbj{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1;
}
.topbj img{
    display: block;
    width: 100%;
    height: auto;
}
.bottombj{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 1;
}
.bottombj img{
    display: block;
    width: 100%;
    height: auto;
}

.box-1-0-0 img{
    width: 100%;
    height: 100%;
    display: block;
}
.box-1-1{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.box-1-1-0{
    background-color: #fff;
    padding: 10px;
    display: flex;
}
.box-1-1-0 div{
    flex: 1;
    border-bottom: 2px solid #fff;
    margin-right: 10px;
    font-size: 12px;
    height: 16px;
    line-height: 16px;
    color:#999;
    white-space: nowrap;
}
.box-1-1-0 div:nth-last-child(1){
    margin-right: 0px;
}
@supports (bottom: env(safe-area-inset-bottom)) {
    .box-1{
        height: calc(100vh - 126.5px - env(safe-area-inset-bottom));
    }
    .box-1-0-0{
        height: calc(100vh - 126.5px - env(safe-area-inset-bottom));
    }
}
</style>
  