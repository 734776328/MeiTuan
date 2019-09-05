<template>
  <li
    v-if="meta.photos.length"
    class="m-detail-item">
    <dl class="section">
      <dd>
        <img
          :src="meta.photos[0].url"
          :alt="meta.photos[0].title">
      </dd>
      <dd>
        <h4>{{ meta.name }}</h4>
        <p>
          <span v-if="meta.biz_ext&&meta.biz_ext.ticket_ordering">剩余：{{ Number(meta.biz_ext.ticket_ordering) }}</span>
          <span v-if="meta.deadline">截止日期：{{ meta.deadline }}</span>
        </p>
        <p>
          <span class="price">{{ Number(meta.biz_ext.cost) }}</span>
          <sub>门店价{{ Number(meta.biz_ext.cost) }}</sub>
        </p>
      </dd>
      <dd>
        <el-button
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
</style>