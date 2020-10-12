<template>
    <div>
        <div class="box-0"></div>
        <div class="box-1">
            <div class="box-1-0">
                <img :src="adviserHeadPic" />
            </div>
            <div class="box-1-1">
                <div class="box-1-1-0">{{adviserName}}</div>
                <div class="box-1-1-1">{{adviserLevelName}}</div>
            </div>
            <div class="box-1-2" style="display: none;">聊天</div>
            <div class="box-1-2 box-1-3">
                <a :href="'tel:'+adviserMobile"></a>
                <div class="box-1-2-0"><img src="../assets/imgs/ddh.png" /></div>
                <div class="box-1-2-1">打电话</div>
            </div>
            <div class="box-1-2 box-1-4" @click="openLocation">
                <div class="box-1-2-0"><img src="../assets/imgs/dh.png" /></div>
                <div class="box-1-2-1">导航</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'TopFixed',
        data() {
            return {
                adviserName:decodeURIComponent(window.parameters.adviserName),
                adviserLevelName:decodeURIComponent(window.parameters.adviserLevelName),
                adviserHeadPic:decodeURIComponent(window.parameters.adviserHeadPic),
                adviserMobile:window.parameters.adviserMobile
            }
        },
        methods: {
            openLocation(){
                //1  跳转公众号页面,页面打开地图
                //2  配置此页面为公众号页面,直接打开地图  无空白页
                //3  跳转到小程序,然后打开地图
                // window.wx.miniProgram.openLocation({
                //     latitude:28.032965,
                //     longitude:113.00297,
                //     scale: 18
                // })
                window.wx.miniProgram.navigateTo({
                    url:'/pages/loading/loading?latitude='+window.parameters.latitude+'&longitude='+window.parameters.longitude+'&name='+decodeURIComponent(window.parameters.name)+'&address='+decodeURIComponent(window.parameters.address)
                })
                // window.wx.openLocation({
                //     latitude:window.parameters.latitude,
                //     longitude:window.parameters.longitude,
                //     scale: 18
                // })
            }
        },
    }
</script>
<style scoped>
.box-0{
    height: 50px;
}
.box-1{
    height: 40px;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    background-color: #fff;
    padding:5px 10px;
    display: flex;
    align-items: center;
    z-index: 100;
}
.box-1-0{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    overflow: hidden;
}
.box-1-0 img{
    width: 40px;
    height: 40px;
    display: block;
}
.box-1-1{
    flex: 1;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
}
.box-1-1-0{
    font-size: 14px;
    height: 18px;
    line-height: 18px;
}
.box-1-1-1{
    font-size: 12px;
    height: 16px;
    line-height: 16px;
}
.box-1-2{
    width: 40px;
    height: 40px;
    font-size: 11px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.box-1-2-0{
    width: 20px;
    height: 20px;
}
.box-1-2-0 img{
    display: block;
    width: 100%;
    height: 100%;
}
.box-1-3{
    border-right: 1px solid #e0e0e0;
    margin-right: 4px;
    padding-right: 10px;
    position: relative;
}
.box-1-3 a{
    position: absolute;
    left: 0;
    right: 10px;
    bottom: 0;
    top: 0;
}
</style>