import Vue from 'vue'
import App from './App'
import store from './store'

Vue.prototype.$store=store;
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main',"pages/send/main","pages/user/main","pages/cityChoice/main","pages/search/main"],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '一职很好',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true,
      backgroundColor: '#f1f0f5',
      backgroundTextStyle: '#f0eff5'
    },
    "tabBar": {
      backgroundColor: '#FFFFFF',
      borderStyle: '#b2b2b2',
      color: '#a1a1a1',
      selectedColor:'#5c91fd',
      "list": [{
          "pagePath": "pages/index/main",
          iconPath: '/static/icons/2.png',
          selectedIconPath: '/static/icons/1.png',
          "text": "首页"
        }, {
          "pagePath": "pages/send/main",
          iconPath: '/static/icons/4.png',
          selectedIconPath: '/static/icons/3.png',
          "text": "投递"
        },
        {
          "pagePath": "pages/user/main",
          iconPath: '/static/icons/6.png',
          selectedIconPath: '/static/icons/5.png',
          "text": "我的"
        }
      ]
    }
  }
}
