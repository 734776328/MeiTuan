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
      <el-col>
        <categroy/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/changeCity/iselect.vue'
import hot from '@/components/changeCity/hot.vue'
import categroy from '@/components/changeCity/categroy.vue'
export default {
  components: {
    iSelect,
    hot,
    categroy
  }
}
</script>

<style lang="scss">
  
</style>