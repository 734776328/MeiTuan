<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img
            src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
            alt="美团">
      </el-col>
      <el-col :span="21" class="center">
        <div class="wrapper">
          <el-input v-model="search" placeholder="搜索商家和地点"  @focus="getFocus" @blur="blurFocus" @input="input"></el-input>
          <button class="el-button el-button-primary"><i class="el-icon-search"/></button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd>火锅</dd>
            <dd>火锅</dd>
            <dd>火锅</dd>
            <dd>火锅</dd>
            <dd>火锅</dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd>烧烤</dd>
            <dd>烧烤</dd>
            <dd>烧烤</dd>
            <dd>烧烤</dd>
          </dl>
        </div>
        <p class="suggest">
          <a href="#">工故宫博物院</a>
          <a href="#">工故宫博物院</a>
          <a href="#">工故宫博物院</a>
          <a href="#">工故宫博物院</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿公寓</nuxt-link>
          </li>
          <li>
              <nuxt-link
                to="/"
                class="business">商家入驻</nuxt-link>
            </li>
        </ul>
      </el-col>
      <el-col
        :span="6"
        class="right"
      >
        <ul class="security">
          <li>
            <i class="refund"/><p class="txt">随时退</p>
          </li>
          <li>
            <i class="single"/><p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue"/><p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
  
</template>
  
<script>
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      search: '',
      isFocus: false,
      hot: [],
      searchList: [],
    }
  },
  computed: {
    isHotPlace: function () {
      return this.isFocus&&!this.search
    },
    isSearchList: function () {
      return this.isFocus&&this.search
    }
  },
  methods: {
    getFocus: function () {
      this.isFocus = true
    },
    blurFocus: function () {
      setTimeout( ()=> {
        this.isFocus = false
      },200)
    },
    input () {
      console.log('获取数据')
    }
  }
}
</script>
<style scoped>
  @import "@/assets/css/public/header/index.scss";  
</style>