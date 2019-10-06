<template>
  <li
    v-if="meta.photos.length"
    class="m-detail-item">
    <dl class="section">
      <dd class="info-left">
        <img
          :src="meta.photos[0].url"
          :alt="meta.photos[0].title">
      </dd>
      <dd class="info-right">
        <h4>{{ meta.name }}</h4>
        <p>
          <span v-if="meta.biz_ext&&meta.biz_ext.ticket_ordering">剩余：{{ Number(meta.biz_ext.ticket_ordering) }}</span>
          <span v-if="meta.deadline">截止日期：{{ meta.deadline }}</span>
        </p>
        <p>
          <span style="color: red;">￥</span><span class="price">{{ Number(meta.biz_ext.cost) }}</span> <span>门店价￥{{ Number(meta.biz_ext.cost) }}</span>
        </p>
        <el-button
          class="im-buy"
          type="warning"
          round
          @click="createCart">立即抢购
        </el-button>
      </dd>
    </dl>
  </li>
</template>

<script>
  export default {
    props: {
      meta: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      //创建购物车思路
      /*
        在点击 立即购买 触发异步请求函数 (创建购物车的函数)
        在异步请求函数中把 商品信息全部当做参数传入
        并创建一个 id （字符串随机生成）一同传入 用于标识商品 
        服务器接收到数据后 再往数据添加用户信息 最后存入mongodb
      */
      createCart: async function() {
        let { status, data: { code, id } } = await this.$axios.post('/cart/create', {
          params: {
            //随机生成字符串的方式
            id: Math.random().toString().slice(3, 9),
            detail: {
              name: this.meta.name,
              price: this.meta.biz_ext.cost,
              imgs: this.meta.photos
            }
          }
        })
        if (status === 200 && code === 0) {
          //已经成功存入数据库
          window.location.href = `/cart/?id=${id}`
        } else {
          console.log('error')
        }
      }
    }
  }
</script>

<style lang="scss">
  .m-detail-item {
    overflow: hidden;
    position: relative;
  }
  .m-detail-item {
    margin: 10px 0;
  }
  .m-detail-item dd {
    float: left;
  }
  .m-detail-item .im-buy{
    position: absolute;
    right: 80px;
    top: 50%;
    margin-top: -20px;
  }
  .m-detail-item .info-left {
    margin-right: 15px;
  }
  .m-detail-item .info-right p:nth-child(2) {
    margin-top: 34px;
  }
  .m-detail-item .info-right span:nth-child(3) {
    font-size: 13px;
    color: #999;
  }
  .m-detail-item .info-right .price {
    font-size: 30px;
    color: red;
  }
  .m-detail-item .info-left img {
    width: 100px;
    height: 100px;
  }

</style>