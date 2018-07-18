// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    position: null,
    allCity: null
  },
  mutations: {
    setPosition(state,payload){
      state.position = payload;
    },
    setAllCity(state,payload){
      state.allCity = payload;
    }
  }
})

export default store
