<template>
  <div class="m-crumbs">
    <el-breadcrumb >
      <el-breakcrumb-item 
      :to="{path: '/'}"
      >
        {{$store.state.geo.position.city.replace('市','')}}美团
      </el-breakcrumb-item>
      <el-breadcrumb-item>
        <a href="/">
          {{ $store.state.geo.position.city.replace('市','')}}
          {{decodeURIComponent(keyword)}}
        </a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
  
<script>
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped="scss">
  
</style>
  