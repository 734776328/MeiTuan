<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
        <dd v-for="(value,index) in menu" :key="index" @mouseenter="enter">
          <i :class="value.type"/>{{value.name}}<span class="arrow"/>
        </dd>
    </dl>
    <div class="detail" v-if="kind" @mouseleave="childMenuLeave" @mouseenter="childMenuEnter">
      <!-- template 不可以绑定key -->
      <template v-for="(item, index) in curdetail">
        <h4 :key="index">{{ item.title }}</h4>
        <span v-for="v in item.child" :key="v"> {{ v }} </span>
      </template>
    </div>
  </div>
</template>
<script>
import { stringify } from 'querystring';
export default {
  data () {
    return {
      kind: '',
      isEnterChild: true,
      menu: [{
          type: "food",
          name: "美食",
          child: [{
            title: '美食',
            child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
          }]
      },{
        type: "takeout",
        name: "外卖",
        child: [{
          title: '外卖',
          child: ['美团外卖']
        }]
      },{
        type: 'hotel',
        name: '酒店',
        child: [{
          title: '酒店管理',
          child: ['经济型', '舒适/三星', '豪华/五星']
        }]
      }]
    }
  },
  computed: {
    curdetail(){
        // var str = JSON.stringify(JSON.stringify(this.menu.filter( (item) => item.type===this.kind)[0]))
        // console.log((str))
        // // var obj = JSON.parse(str)
        // // console.log(obj.child[0].child1)
        // return this.menu.filter( (item) => item.type===this.kind)[0]
          return this.menu.filter((item)=> item.type === this.kind )[0].child;
      }
  },
  methods: {
    mouseleave () {
      let selt=this;
      selt._time = setTimeout( ()=> {
        if (!this.isEnterChild) {
          console.log('2')
          this.kind = ''
        }
      }, 50)
    },
    enter (e) {
      this.kind = e.target.querySelector('i').className
       
    },
    childMenuLeave () {
      this.isEnterChild = false
      this.kind = ''
    },
    childMenuEnter () {
      this.isEnterChild = true
    }
  }
}
</script>
<style scoped="scss">
  
</style>
  