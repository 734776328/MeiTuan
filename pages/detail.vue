<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumbs/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <summa :meta="product"/>
      </el-col>
    </el-row>
    <el-row class="m-title">
      <el-col :span="24">
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>
    <el-row class="shops-info" v-if="canOrder || !login">
      <el-col :span="24">
        <list
          v-if="login"
          :list="list"/>
        <div
          v-else
          class="deal-need-login">
          <img
            src="https://p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png"
            alt="登录查看">
          <span>请登录后查看详细团购优惠</span>
          <el-button
            type="primary"
            round>
            <a href="/login">立即登录</a>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
  
<script>
import Crumbs from '@/components/detail/crumbs.vue'
import Summa from '@/components/detail/summary.vue'
import List from '@/components/detail/list.vue'
export default {
  components: {
    Crumbs,
    Summa,
    List
  },
  computed: {
    canOrder: function () {
      console.log('asdasdsa')
      return this.list.filter(item => item.photos.length).length
    }
  },  
  async asyncData (ctx) {
    let {keyword, type} = ctx.query;

    const {status, data: {product, more:list,login}}= await ctx.$axios.get('/search/products',{
      params: {
        keyword,
        type,
        city: ctx.store.state.geo.position.city
      }
    })
    if (status===200) {
      return {
        keyword,
        product,
        type,
        list,
        login
      }
    } else {
      return {
        keyword,
        product: {},
        type,
        list: [],
        login: false
      }
    }
  }
}
</script>
<style scoped="scss">
.page-detail .m-title {
  margin-top: 35px;
}
.page-detail .shops-info {
  border-radius: 50%;
}
.page-detail .m-title h3 {
  font-size: 20px;
  color: #000;
  font-weight: 700px;
}
</style>
  