import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'
import VueTouch from 'vue-touch'
import Api from './utils/api.js';
import RadialProgressBar from 'vue-radial-progress'
import VueClipboard from 'vue-clipboard2'
import AMap from 'vue-amap';

Vue.prototype.$api = Api;
Vue.use(VueTouch, { name: 'v-touch' })
Vue.use(Vant);
Vue.use(RadialProgressBar);
Vue.use(VueClipboard);
Vue.use(AMap);


AMap.initAMapApiLoader({
  // 高德key
  key: '9b6d113ef3c481a23b2f27fcb471f5e8',
  plugin: ['AMap.Geolocation'],
  uiVersion: '1.1'

});
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function generateBehaviorJsonArray(name, txt) {
  if (name != 'houseAppreciation') {
    //发送访问记录
    if (window.addHouseBrowsingArray.length > 0) {
      let jsonArray = [];
      for (let i = 0; i < window.addHouseBrowsingArray.length; i++) {
        let bl = false;
        for (let j = 0; j < jsonArray.length; j++) {
          if (window.addHouseBrowsingArray[i].houseId == jsonArray[j].houseId) {
            bl = true;
            jsonArray[j].num = jsonArray[j].num - 0 + 1;
            jsonArray[j].browsLength = jsonArray[j].browsLength - 0 + (window.addHouseBrowsingArray[i].browsLength - 0);
          }
        }
        if (!bl) {
          jsonArray.push(window.addHouseBrowsingArray[i]);
        }
      }
      console.log(jsonArray)
      //发送日志
      Api.post('/userIndex/addHouseBrowsing', {
        projectId: window.parameters.projectId,
        token: window.parameters.token,
        jsonArray: JSON.stringify(jsonArray)
      }, response => { console.log(response) });
      window.addHouseBrowsingArray = [];
    }
  } else {//户型鉴赏
    if (window.addHouseBrowsingArray.length > 0) {
      window.addHouseBrowsingArray[window.addHouseBrowsingArray.length - 1].endTime = new Date() - 0;
      window.addHouseBrowsingArray[window.addHouseBrowsingArray.length - 1].browsLength = (((new Date() - 0) - window.addHouseBrowsingArray[window.addHouseBrowsingArray.length - 1].beginTime) / 1000).toFixed(0);
    }
  }
  if (window.behaviorJsonArray.length > 0) {
    if (name != window.behaviorJsonArray[window.behaviorJsonArray.length - 1].name) {
      window.behaviorJsonArray[window.behaviorJsonArray.length - 1].endTime = new Date() - 0;
      window.behaviorJsonArray[window.behaviorJsonArray.length - 1].seconds = (((new Date() - 0) - window.behaviorJsonArray[window.behaviorJsonArray.length - 1].beginTime) / 1000).toFixed(0);
      //发送日志
      Api.post('/userIndex/addBrowsing', {
        projectId: window.parameters.projectId,
        programLength: 0,
        token: window.parameters.token,
        jsonArray: JSON.stringify(window.behaviorJsonArray)
      }, response => { console.log(response) });
      console.log(window.behaviorJsonArray)
      window.behaviorJsonArray = [];
      window.behaviorJsonArray.push({
        beginTime: new Date() - 0,
        endTime: 0,
        seconds: 0,
        title: '查看了' + txt,
        seeTime: formatTime(new Date(new Date() - 0)),
        name: name
      })
    }
  } else {
    window.behaviorJsonArray.push({
      beginTime: new Date() - 0,
      endTime: 0,
      seconds: 0,
      title: '查看了' + txt,
      seeTime: formatTime(new Date(new Date() - 0)),
      name: name
    })
  }
}

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  console.log(to, from)
  window.goBackPathName = to.name;
  switch (to.name) {
    case 'index':
      generateBehaviorJsonArray('index', '微沙盘')
      requestBottomData(next);
      break;
    case 'buildingElectronicBooks':
      generateBehaviorJsonArray('buildingElectronicBooks', '电子楼书')
      requestBottomData(next);
      break;
    case 'houseAppreciation':
      generateBehaviorJsonArray('houseAppreciation', '户型鉴赏')
      requestBottomData(next);
      break; //可选
    case 'landscapeRoam':
      generateBehaviorJsonArray('landscapeRoam', '景观漫游')
      requestBottomData(next);
      break; //可选
    case 'circumConfig':
      generateBehaviorJsonArray('circumConfig', '周边配置')
      requestBottomData(next);
      break; //可选
    case 'mortgageCalculator':
      generateBehaviorJsonArray('mortgageCalculator', '房贷计算器')
      requestBottomData(next);
      break; //可选
    case 'basicInfo':
      generateBehaviorJsonArray('basicInfo', '基本信息')
      requestBottomData(next);
      break; //可选
    case 'versiondeclarate':
      generateBehaviorJsonArray('versiondeclarate', '版权申明')
      requestBottomData(next);
      break; //可选
    case 'beautifulpictures':
      generateBehaviorJsonArray('beautifulpictures', '美图鉴赏')
      requestBottomData(next);
      break; //可选
    case 'soloshow':
      generateBehaviorJsonArray('soloshow', '独栋展示')
      requestBottomData(next);
      break; //可选
    case 'hardcoverRoaming':
      window.addHouseBrowsingArray.push({
        houseId: window.bottomData[to.query.bottomDataName][to.query.bottomDataIndex].maps[to.query.id].id,
        houseType: window.bottomData[to.query.bottomDataName][to.query.bottomDataIndex].maps[to.query.id].house_type,
        num: 1,
        browsLength: 0,
        beginTime: new Date() - 0,
        endTime: 0
      })
      if (window.behaviorJsonArray.length > 0) {
        window.behaviorJsonArray[window.behaviorJsonArray.length - 1].endTime = new Date() - 0;
        window.behaviorJsonArray[window.behaviorJsonArray.length - 1].seconds = (((new Date() - 0) - window.behaviorJsonArray[window.behaviorJsonArray.length - 1].beginTime) / 1000).toFixed(0);
        //发送日志
        Api.post('/userIndex/addBrowsing', {
          projectId: window.parameters.projectId,
          programLength: 0,
          token: window.parameters.token,
          jsonArray: JSON.stringify(window.behaviorJsonArray)
        }, response => { console.log(response) });
        console.log(window.behaviorJsonArray)
        window.behaviorJsonArray = [];
        window.behaviorJsonArray.push({
          beginTime: new Date() - 0,
          endTime: 0,
          seconds: 0,
          title: '查看了精装漫游(' + window.bottomData[to.query.bottomDataName][to.query.bottomDataIndex].maps[to.query.id].house_type + ')',
          seeTime: formatTime(new Date(new Date() - 0)),
          name: 'hardcoverRoaming'
        })
      } else {
        window.behaviorJsonArray.push({
          beginTime: new Date() - 0,
          endTime: 0,
          seconds: 0,
          title: '查看了精装漫游(' + window.bottomData[to.query.bottomDataName][to.query.bottomDataIndex].maps[to.query.id].house_type + ')',
          seeTime: formatTime(new Date(new Date() - 0))
        })
      }
      requestBottomData(next);
      break; //可选
    case 'airview':
      //记录一次户型访问
      window.addHouseBrowsingArray.push({
        houseId: window.bottomData[to.query.bottomDataName][to.query.bottomDataIndex].maps[to.query.id].id,
        houseType: window.bottomData[to.query.bottomDataName][to.query.bottomDataIndex].maps[to.query.id].house_type,
        num: 1,
        browsLength: 0,
        beginTime: new Date() - 0,
        endTime: 0
      })
      if (window.behaviorJsonArray.length > 0) {
        window.behaviorJsonArray[window.behaviorJsonArray.length - 1].endTime = new Date() - 0;
        window.behaviorJsonArray[window.behaviorJsonArray.length - 1].seconds = (((new Date() - 0) - window.behaviorJsonArray[window.behaviorJsonArray.length - 1].beginTime) / 1000).toFixed(0);
        //发送日志
        Api.post('/userIndex/addBrowsing', {
          projectId: window.parameters.projectId,
          programLength: 0,
          token: window.parameters.token,
          jsonArray: JSON.stringify(window.behaviorJsonArray)
        }, response => { console.log(response) });
        console.log(window.behaviorJsonArray)
        window.behaviorJsonArray = [];
        window.behaviorJsonArray.push({
          beginTime: new Date() - 0,
          endTime: 0,
          seconds: 0,
          title: '查看了鸟瞰户型(' + window.bottomData[to.query.bottomDataName][to.query.bottomDataIndex].maps[to.query.id].house_type + ')',
          seeTime: formatTime(new Date(new Date() - 0)),
          name: 'airview'
        })
      } else {
        window.behaviorJsonArray.push({
          beginTime: new Date() - 0,
          endTime: 0,
          seconds: 0,
          title: '查看了鸟瞰户型(' + window.bottomData[to.query.bottomDataName][to.query.bottomDataIndex].maps[to.query.id].house_type + ')',
          seeTime: formatTime(new Date(new Date() - 0))
        })
      }
      requestBottomData(next);
      break; //可选
    case "mainPage":
      if (!window.indexInfo) {
        

        Api.post('/userIndex/auto2Info', {
          projectId: window.parameters.projectId,
          adviserId: window.parameters.adviserId
        }, response => {
          if (response.status >= 200 && response.status < 300) {
            //console.log("indexInfo============",response.data.data)
            window.indexInfo = response.data.data;
            window.document.title=window.indexInfo.productObj.name;
            next();
          }
          else {
            console.log(response.message);
          }
        })
      }else{
        next();
      }
      
      break;
    default: //可选
    next();
      break;
  }



})
document.getElementById('indexLoading').style.display = 'none';
new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')

function requestBottomData(next) {
  if (!window.bottomData) {
    Api.post('/userIndex/matchList', {
      projectId: window.parameters.projectId
    }, response => {
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data.data)
        let obj = {
          matchList: [],
          childrenList: []
        }
        for (let i = 0; i < response.data.data.matchList.length; i++) {
          if (i < 4) {
            obj.matchList.push(response.data.data.matchList[i])
          } else {
            obj.childrenList.push(response.data.data.matchList[i])
          }
        }
        window.bottomData = obj;
        //window.backDrop = response.data.data.backDrop;
        window.aboveImage = response.data.data.aboveImage;
        window.belowImage = response.data.data.belowImage;

        next();
      } else {
        console.log(response.message);
      }
    });
  } else {
    next();
  }
}