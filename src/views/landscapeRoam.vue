<template>
    <div>
        <TopFixed />
        <div class="box-1">
            <iframe class="box-1-0" :src="url" frameborder="0" width="100%"></iframe>
        </div>
        <BottomNav  navCode="landscaperoam"/>
    </div>
</template>
<script>
import TopFixed from "@/components/TopFixed.vue";
import BottomNav from "@/components/BottomNav.vue";
export default {
    name:'landscapeRoam',
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
            if(window.bottomData.matchList[i].code == 'landscaperoam'){
                this.url = window.bottomData.matchList[i].url;
            }
        }
        if(this.url == ""){
            for(let i=0;i<window.bottomData.childrenList.length;i++){
                if(window.bottomData.childrenList[i].code == 'landscaperoam'){
                    this.url = window.bottomData.childrenList[i].url;
                }
            }
        }
        
    },
    methods: {

    }
}
</script>
<style scoped>
.box-1{
    height: calc(100vh - 130px);
}
.box-1-0{
    height: 100%;
}
@supports (bottom: env(safe-area-inset-bottom)) {
    .box-1{
        height: calc(100vh - 130px - env(safe-area-inset-bottom));
    }
}
</style>