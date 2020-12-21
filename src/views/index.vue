<template>
    <div>
        <TopFixed />
        <div class="box-1">
            <!-- <div class="box-1-0" v-if="!ifraShow">加载中</div>
            <iframe :show="ifraShow" class="box-1-0" :src="url" frameborder="0" width="100%" id="ifra"></iframe> -->
            <iframe class="box-1-0" :src="url" frameborder="0" width="100%" id="ifra"></iframe>
        </div>
        <BottomNav navCode="sandtable" />
    </div>
</template>
<script>
import TopFixed from "@/components/TopFixed.vue";
import BottomNav from "@/components/BottomNav.vue";
export default {
    name:'index',
    components: {
        TopFixed,
        BottomNav,
    },
    data() {
        return {
            url:'',
            ifraShow:false
        }
    },
    created() {
        for(let i=0;i<window.bottomData.matchList.length;i++){
            if(window.bottomData.matchList[i].code == 'sandtable'){
                this.url = window.bottomData.matchList[i].url;
            }
        }
        if(this.url == ""){
            for(let i=0;i<window.bottomData.childrenList.length;i++){
                if(window.bottomData.childrenList[i].code == 'sandtable'){
                    this.url = window.bottomData.childrenList[i].url;
                }
            }
        }
        console.log(this.url)
    },
    mounted() {
        const iframe = document.querySelector('#ifra');
        const _this = this;
        if (iframe.attachEvent) {
            iframe.attachEvent('onload', function () {
                // iframe加载完毕以后执行操作
                _this.ifraShow = true;
                console.log('iframe已加载完毕')
            })
            } else {
            iframe.onload = function () {
                // iframe加载完毕以后执行操作
                _this.ifraShow = true;
                console.log('iframe已加载完毕')
            }
        }
    },
    methods: {

    }
}
</script>
<style scoped>
.box-1{
    height: calc(100vh - 3.37333rem);
}
.box-1-0{
    height: 100%;
}
@supports (bottom: env(safe-area-inset-bottom)) {
    .box-1{
        height: calc(100vh - 3.37333rem - env(safe-area-inset-bottom));
    }
}
</style>
  