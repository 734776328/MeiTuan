<template>
  <section class="m-istyle">
    <!-- Vue事件绑定函数 建议不带() 带了()无法获取 el 参数 -->
    <dl @mouseover="over">
      <dt>有格调</dt>
        <dd
          :class="{active:kind==='all'}"
          kind="all"
          keyword="景点">全部</dd>
        <dd
          :class="{active:kind==='part'}"
          kind="part"
          keyword="美食">约会聚餐</dd>
        <dd
          :class="{active:kind==='spa'}"
          kind="spa"
          keyword="丽人">丽人SPA</dd>
        <dd
          :class="{active:kind==='movie'}"
          kind="movie"
          keyword="电影">电影演出</dd>
        <dd
          :class="{active:kind==='travel'}"
          kind="travel"
          keyword="旅游">品质出游
        </dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="item in cur"
        :key="item.title">
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never">
          <img
            :src="item.img"
            class="image">
          <ul class="cbody">
            <li class="title" style="font-weight: 600;">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<span>{{ item.price.length>0? item.price : '30'}}</span>/起</li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
import _ from 'lodash'
export default {
  data: () => {
    return {
      kind: 'all',
      list: {
        all: [],
        part: [],
        spa: [],
        movie: [],
        travel: [],
        time: new Date(),
        setTimeoutID: '',
      }
    }
  },
  computed: {
    cur: function () {
      return this.list[this.kind]
    }
  },
  // 解决bugger 延迟处理 mouseover 事件
  methods: {
    // Vue的事件不能用箭头函数代替 一旦箭头函数代替之后 this指向为空
    over: function (e) {

      let dom = e.target;
      let att = dom.getAttribute('kind');
      let tag = dom.tagName.toLowerCase();
      let self = this;

      this.list.setTimeoutID = setTimeout( async  () => {
        console.log('self.kind',self.kind);
        console.log('att',att);
        if (self.kind !== att && tag === 'dd') {
          console.log("不频繁");
          self.kind = att
          let keyword = dom.getAttribute('keyword');
          console.log('keyword',keyword);
          let {status, data:{count, pois}} = await self.$axios.get('/search/resultsByKeywords', {
            params: {
              keyword,
              city: self.$store.state.geo.position.city
            }
          })
          if(status === 200 && count > 0) {
            let r = pois.filter((item)=>item.photos.length).map((item, index)=>{
              return {
                title: item.name,
                pos: item.type.split(';')[0],
                price: item.biz_ext.cost || '暂无',
                img: item.photos[0].url,
                url: '//abc.com'
              }
            })
            this.list[this.kind]=r.slice(0,9);
          } else {
            console.log('空了');
            this.list[this.kind]= [];
          }
        }
        console.log('频繁了');
      },500)
    }
  },
  watch: {
    'list.setTimeoutID' : function (newVal, oldVal) {
      oldVal && clearTimeout(oldVal);
    }
  },
  async mounted(){
    let {status, data:{count, pois}} = await this.$axios.get('/search/resultsByKeywords', {
      params: {
        keyword: '景点',
        city: this.$store.state.geo.position.city
      }
    })
    if(status === 200 && count > 0) {
      let r = pois.filter((item)=>item.photos.length).map((item, index)=>{
        return {
          title: item.name,
          pos: item.type.split(';')[0],
          price: item.biz_ext.cost || '暂无',
          img: item.photos[0].url,
          url: '//abc.com'
        }
      })
      this.list[this.kind]=r.slice(0,9);
    }
    else
    {
      this.list[this.kind]= [];
    }
  }

}
</script>
<style lang="css">
  @import "@/assets/css/main.css"; 

  .m-istyle dl {
    height: 44px;
    overflow: hidden;
    background-color: #BFA77B;
    border-radius: 6px 6px 0 0;
    line-height: 44px;
    color: #fff;
  }
  .m-istyle dl dt {
    float: left;
    font-size: 18px;
    margin-left: 20px;
    margin-right: 14px;
  }
  .m-istyle dl dd {
    float: left;
    margin: 0 6px;
  }
  .m-istyle dl dd:hover {
    background-color: bisque;
    box-shadow: 10px 100px 7px #888888;
    color: red;
    font-weight: 550;
    border-radius: 10%;
    margin-left: 10px;
    height: 35px;
    display: inline-block;
    width: 60px;
    text-align: center;
    line-height: 35px;
  }
  .m-istyle .ibody {
    width: 1232px;
    overflow: hidden;
  }
  .m-istyle .ibody>li {
    float: left;
    margin: 10px 37px 10px 0;
    border-radius: 10px;
  }
  .m-istyle .ibody>li:hover {
    background-color: red; 
    box-shadow: 10px 10px 10px #888888;
    margin-left: -2px;
  }
  .m-istyle .ibody img {
    height: 208px;
    width: 370px;
  }
  .m-istyle .ibody .cbody li {
    margin-bottom: 6px;
  }
  .m-istyle .ibody .cbody .title {
    font-weight: 600px;
  }
  .m-istyle .ibody .cbody .pos {
    font-size: 12px;
    color: #999;
  }
  .m-istyle .ibody .cbody .price span{
    color: red;
    font-weight: 550px;
    font-size: 25px;
  }
</style>
