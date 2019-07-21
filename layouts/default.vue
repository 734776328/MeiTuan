<template>
  <el-row class="layout-default">
    <el-col>
      <my-header />
    </el-col>
    <el-col>
      <nuxt />
    </el-col>
    <el-col>
      <my-footer />123
    </el-col>
  </el-row>
</template>

<script>
import MyHeader from '../components/public/header/index.vue'
import MyFooter from '../components/public/footer/index.vue'
export default {
  components: {
    MyHeader
  }
}
</script>
<style lang="scss" scope>

</style>
