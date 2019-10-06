<template>
  <dl class="s-item">
    <dt>
      <img :src="meta.img" alt="商品图片">
    </dt>
    <dd>
      <h3>
        <nuxt-link :to="{path:'detail',query:{keyword:meta.name,type:meta.module}}">{{ meta.name }}</nuxt-link>
      </h3>
        <el-rate
          :value="meta.rate"
          disabled
          show-text>
        </el-rate>
      <span class="s-item-value">{{ meta.rate }}分</span>
      <span class="s-item-comment-total">{{ meta.comment }}人评论</span>
      <p>
        <span class="s-item-type">{{ meta.type }}</span>
        <span class="s-item-addr">{{ meta.addr }}</span>
      </p>
      <p>
        <em class="s-item-price">￥{{ meta.price }}起</em>
        <b>{{ meta.status }}</b>
      </p>
      <ul>
        <li>
          <span class="detail-type">门票</span>{{meta.ticket || '暂无描述'}}
        </li>
        <li>
          <span class="detail-type">跟团</span>{{meta.group || '暂无描述'}}
        </li>
        <li v-if="meta.scene&&meta.scene.length">
          <span class="detail-type">景酒</span>
          {{ meta.scene || '暂无描述' }}
        </li>
        <li v-else>
          <span class="detail-type">景酒</span>暂无描述
        </li>
      </ul>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    console.log(this.meta.rate/10)
  },
}
</script>