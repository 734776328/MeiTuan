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
      kind: 'takeout',
      isEnterChild: true,
      menu: this.$store.state.home.menu
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
        // console.log(this.$store.state.home.menu.filter( (item)=> item.type===this.kind)[0])
        // return this.$store.state.home.menu.filter( (item)=> item.type===this.kind)[0].child
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
  },
  mounted() {
    this.menu = this.$store.state.home.menu
  },
}
</script>
<style scoped="scss">
  
</style>
  