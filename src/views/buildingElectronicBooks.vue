<template>
    <div>
        <TopFixed />
        <div class="box-1">
            <div>
                <img :src="url" />
            </div>
        </div>
        <BottomNav navCode="ebook" />
    </div>
</template>
<script>
import TopFixed from "@/components/TopFixed.vue";
import BottomNav from "@/components/BottomNav.vue";
export default {
    name:'buildingElectronicBooks',
    components: {
        TopFixed,
        BottomNav,
    },
    data() {
        return {
            url:''
        }
    },
    created() {
        for(let i=0;i<window.bottomData.matchList.length;i++){
            if(window.bottomData.matchList[i].code == 'ebook'){
                this.url = window.bottomData.matchList[i].url;
            }
        }
        if(this.url == ""){
            for(let i=0;i<window.bottomData.childrenList.length;i++){
                if(window.bottomData.childrenList[i].code == 'ebook'){
                    this.url = window.bottomData.childrenList[i].url;
                }
            }
        }
        console.log(this.url)
    },
    methods: {

    }
}
</script>
<style scoped>
.box-1{
    height: calc(100vh - 100px);
    overflow-y: scroll;
}
.box-1 img{
    display: block;
    width: 100%;
    height: auto;
}
@supports (bottom: env(safe-area-inset-bottom)) {
    .box-1{
        height: calc(100vh - 100px - env(safe-area-inset-bottom));
    }
}
</style>