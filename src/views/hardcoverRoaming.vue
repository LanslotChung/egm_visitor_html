<template>
    <div>
        <!-- <TopFixed /> -->
        <div class="box-1">
            <iframe class="box-1-0" :src="bottomData[bottomDataName][bottomDataIndex].maps[id].url" frameborder="0" width="100%"></iframe>
        </div>
        <!-- <BottomNav navCode="Houseappreciation" /> -->
    </div>
</template>
<script>
// import TopFixed from "@/components/TopFixed.vue";
// import BottomNav from "@/components/BottomNav.vue";
export default {
    name:'hardcoverRoaming',
    components: {
        // TopFixed,
        // BottomNav,
    },
    data() {
        return {
            id:0,
            bottomData:window.bottomData,
            bottomDataName:'',
            bottomDataIndex:0,
        }
    },
    created() {
        this.id = this.$route.query.id;
        this.bottomDataName = this.$route.query.bottomDataName;
        this.bottomDataIndex = this.$route.query.bottomDataIndex;
    },
    methods: {

    }
}
</script>
<style scoped>
.box-1{
    height: 100vh;
}
/* .box-1{
    height: calc(100vh - 100px);
} */
.box-1-0{
    height: 100%;
}
</style>