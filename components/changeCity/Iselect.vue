<template>
  <div class="m-iselect">
    <span class="name">按省份选择：</span>
    <el-select
      v-model="pvalue"
      placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>


    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>

    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或者输入拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      cities: '',//全国城市列表
    }
  },
  methods: {
    //获取焦点时或输入数据时响应该事件
    querySearchAsync: _.debounce(async function(query,cb){
      let self = this;
      if (self.cities.length) {
        cb(self.cities.filter(item => item.value.indexOf(query)>-1))
      } else {
        let {status,data:{city}}=await self.$axios.get('/geo/city')
        if(status===200){
          self.cities = city.map(item=>{
            return {
              value: item.name
            }
          })
          cb(self.cities.filter(item => item.value.indexOf(query)>-1))
        } else {
          cd([])
        }
      }
    },200),
    // 当列表被点击时出发该事件
    handleSelect (item) {
      location.href='/'
    }
  },
  watch: {
    //当省份改变时 改变城市列表
    pvalue: async function (newPvalue) {
      console.log('省份省份省份省份',this.pvalue)
      let self = this
      let {status, data:{city}} = await self.$axios.get(`/geo/province/${newPvalue}`)
      console.log(city)
      if(status===200){
        self.city = city.map(item=>{
          return {
            value: item.id,
            label: item.name
          }
        })
        console.log(this.cvalue)
        self.cvalue=''
      }
      
    }
  },
  //插入页面后获取城市
  async mounted () {
    let self = this
    let {status, data: {province}} = await self.$axios.get('/geo/province')
    if(status === 200){
      console.log('数据库数据', province)
      self.province = province.map(item=>{
        return {
          value: item.id,
          label: item.name
        }
      })
    }
    console.log('self.provinceself.province',self.province)
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>