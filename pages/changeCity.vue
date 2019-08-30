<template>
  <div class="page-changeCity">
    <el-row>
      <el-col>
        <iSelect/>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <hot/>
      </el-col>
    </el-row>
    <el-row>
      <el-col>3</el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/changeCity/iselect.vue'
import hot from '@/components/changeCity/hot.vue'
export default {
  components: {
    iSelect,
    hot
  }
}
</script>

<style lang="scss">
  
</style>