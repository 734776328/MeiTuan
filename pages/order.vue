<template>
  <div class="page-order">
    <el-row>
      <el-col :span="4" class="navbar">
        <h3>我的美团</h3>
        <dl>
          <dt></dt>
          <dd></dd>
          <dd></dd>
          <dd></dd>
          <dd></dd>
        </dl>
      </el-col>
      <el-col :span="20">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick">
          <el-tab-pane 
            label="全部订单"
            name="all">
            <list :cur="cur" />
          </el-tab-pane>
          <el-tab-pane
            label="代付款"
            name="unpay">
            <list :cur="cur" />
          </el-tab-pane>
          <el-tab-pane
            label="待使用"
            name="unuse">
            <list :cur="cur" />
          </el-tab-pane>
          <el-tab-pane
            label="待评价"
            name="unreplay">
            <list :cur="cur" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
  
<script>
import List from '@/components/order/list.vue'
export default {
  components: {
    List
  },
  data () {
    return {
      activeName: 'all',
      list: [],
      cur: []
    }
  },
  watch: {
    activeName: function () {

    },
    list: function () {

    }
  },
  methods: {
    handleClick: function (tab) {
      
    }
  },
  async asyncData (ctx) {
    
  }
}
</script>
<style scoped="scss">
  @import '@/assets/css/order/index.scss';
</style>
  