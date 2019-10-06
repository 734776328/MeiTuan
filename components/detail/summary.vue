<template>
  <dl class="m-sum-card">
    <dt>
      <h1>{{ meta.name }}</h1>
      <div>
        <el-rate
        v-model="rate"
        disabled/>
        <span>{{ Number(meta.biz_ext.rating)||rate }}分</span>
        <span>人均￥{{ Number(meta.biz_ext.cost) }}</span>  
      </div>
      <div class="line"></div>
      <div class="shops-info">
        <ul>
          <li @click="openMap(meta.location)">地址：{{ meta.address }}</li>
          <li>电话：{{ meta.tel }}</li>
          <li>营业时间：周一至周日 10:00-24:00</li>
        </ul>
      </div>
    </dt>
    <dd>
      <el-carousel
        height="400px"
        indicator-position="none">
        <el-carousel-item
          v-for="(item,idx) in meta.photos"
          :key="idx">
          <h3><img
            :src="item.url"
            alt="item.title"
            height="400px"></h3>
        </el-carousel-item>
      </el-carousel>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    meta: {
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  data() {
    return {
      sale: 70 + Math.floor(Math.random() * 300)
    }
  },
  computed: {
    rate: function () {
      return Number(this.meta.biz_ext.rating) || Math.floor(Math.random() * 5)
    }
  },
  methods: {
    openMap: function (location) {
    }
  }
}
</script>
<style scoped>
.m-sum-card .line {
  height: 1px;
  border-bottom: 1px #999 transparent;
}
.m-sum-card h1 {
  margin-bottom: 10px;
}
.m-sum-card li {
  list-style-type: none;
}
.m-sum-card .shops-info {
  padding: 10px 0;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.m-sum-card .shops-info ul {
  padding-top: 9px;
}
.m-sum-card .shops-info li {
  margin-bottom: 10px;
  color: #999;
}
.m-sum-card .el-rate {
  float: left;
}
</style>