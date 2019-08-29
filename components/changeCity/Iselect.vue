</<template>
  <div class="m-iselect">
    <span>按省份选择:</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option v-for="item in province" :key="item.value" :value="item.value" :label="item.label"/>
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option v-for="item in city" :key="item.value" :value="item.value" :label="item.label">
      </el-option>
    </el-select>
    <el-autocomplete v-model="input" :fetch-suggestions="querySearchAsync" placeholder="请输入城市中文或拼音" @select="handleSelect"/>
  </div>
</template>

<script>
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
    querySearchAsync () {
      
    },
    handleSelect () {

    }
  },
  watch: {
    //当省份改变时 改变城市列表
    pvalue: async function (newPvalue) {
      let self = this
      let {status, data:{city}} = await self.$axios.get(`/geo/province/${newPvalue}`)
      if(status===200){
        self.city = city.map(item=>{
          return {
            value: item.id,
            label: item.name
          }
        })
        self.cvalue=''
      }
      
    }
  },
  async mounted () {
    let self = this
    let { status, data: {province}} = await self.$axios.get('/geo/province')
    if(status === 200){
      self.province = province.map(item=>{
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>
