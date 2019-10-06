<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="item in nav"
        :key="item.name"
        :class="[item.name,sortTarget === item.name?'s-nav-active':'']"
        @click="navSelect"
      >{{item.txt}}</dd>
    </dl>
    <ul>
      <Item v-for="(item,index) in list" :key="index" :meta="item"/>
    </ul>
  </div>
</template>
<script>
import Item from './product'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          active: true
        },
        {
          name: 's-price',
          txt: '价格最低',
          active: false
        },
        {
          name: 's-visit',
          txt: '人气最高',
          active: false
        },
        {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ],
      sortTarget: 's-default',
    }
  },
  methods: {
    navSelect(e) {
      this.sortTarget = e.target.className.split(' ').filter((item)=>{
        return item === 's-default' || item === 's-price' || item === 's-visit' || item === 's-comment'
      })[0];
    },
    sortArr (tar) {
      this.list.sort((a, b)=>{
        if (tar === 'price') {
          return a[tar] - b[tar];  
        } else {
          return b[tar] - a[tar];
        }
      })
    }
  },
  watch: {
    'sortTarget': function () {
      switch (this.sortTarget) {
        case 's-default' : 
          this.sortArr('rate');
          break;
        case 's-price' : 
          this.sortArr('price');
          break;
        case 's-visit' : 
          this.sortArr('rate');
          break;
        case 's-comment' : 
          this.sortArr('comment');
          break; 
      }
    }
  },
  mounted() {
    console.log(this.list)
  },
}
</script>
