<template>
  <el-table
    :data="cartData"
  >
    <el-table-column
      prop="name"
      label="项目"
      width="532px">
    </el-table-column>
    <el-table-column
      prop="price"
      label="单价"
      width="132px">
    </el-table-column>
    <el-table-column
      label="数量"
      width="212px">
      <template  slot-scope="scope">
        <el-input-number
          v-model="scope.row.count"
          :min="0"
        />
      </template>
    </el-table-column>
    <el-table-column label="总价">
      <template slot-scope="scope">
        <div class="">
          {{ scope.row.price*scope.row.count }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
  
<script>
export default {
  props: {
    cartData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted() {
    console.log('cartDatacartData',this.cartData)
  },
}
</script>
<style scoped="scss">
  
</style>
  