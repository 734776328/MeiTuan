<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <nuxt-link to="/">
          <img
            src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png"
            alt="美团">
        </nuxt-link>
      </el-col>
      <el-col :span="21" class="center">
        <div class="wrapper">
          <el-input v-model="search" placeholder="搜索商家和地点"  @focus="getFocus" @blur="blurFocus" @input="input"></el-input>
          <button class="el-button el-button-primary"><i class="el-icon-search"/></button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, idx) in this.$store.state.home.hotPlace.slice(0,4)" :key="idx">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">
                {{ item.name }}
              </a>
            </dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item, idx) in searchList" :key = idx>
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">
                {{ item.name }}
              </a>
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a :href="'/products?keyword='+encodeURIComponent(item.name)" v-for="(item, idx) in this.$store.state.home.hotPlace" :key="idx">
            {{item.name}}
          </a>
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
      </el-col>
    </el-row>
  </div>
  
</template>
  
<script>
import { setTimeout } from 'timers';
import _ from 'lodash'
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
      return this.isFocus && !this.search
    },
    isSearchList: function () {
      return this.isFocus && this.search
    }
  },
  methods: {
    getFocus: function () {
      this.isFocus = true
    },
    blurFocus: function () {
      setTimeout( ()=> {
        this.isFocus = false
      },300)
    },
    //自动匹配与搜索框相匹配的内容
    input: _.debounce( async function () {
      let {status, data: {top}} = await this.$axios.get(`/search/top`, {
        params: {
          input: this.search,
          city: this.$store.state.geo.position.city.replace('市', '')
        }
      })
      this.searchList = top.slice(0,10)
    }, 300)
  }
}
</script>
<style scoped>
</style>