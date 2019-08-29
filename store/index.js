import Vuex from 'vuex'
import Vue from 'vue'

import geo from './modules/geo.js'
import home from './modules/home.js'

Vue.use('Vuex')
const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    //-------------重点------------
    //-------------nuxt的生命周期------------
    // 此时有没 DOM 对象 拿不到this和vue的实例对象 只能拿到app对象
    async nuxtServerInit({commit}, {req, app}) {
      // console.log(app)
      
      //获取城市定位
      const {
        status, 
        data: {province, city}
      } = await app.$axios.get('/geo/getPosition')
      // console.log(province, city)
      //此处是客户端对请求数据的检查
      commit('geo/setPosition', status === 200?{province, city}:{province: '', city: ''})
      console.log('status',status)
      console.log('city',city)

      //获取menu的线上数据数据
      const {status: status2, data: {menu}} = await app.$axios.get('geo/menu')
      commit('home/setMenu', status2===200 ? menu : [])

      //获取热门搜索的数据
      const {status: status3, data: {result}} = await app.$axios.get('search/hotPlace',{
        params:{
          city: app.store.state.geo.position.city.replace('市','')
        }
      })
      commit('home/setHotPlace',status===200?result:[])

    },
  }
})

//返回的是方法名
export default store