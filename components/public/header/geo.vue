<template>
  <div class="m-geo">
    <i class="el-icon-location" />{{$store.state.geo.position.city}}
    <nuxt-link class="changeCity" to="changeCity">
      切换城市
    </nuxt-link>
    [茂名 东莞 湛江]
  </div>
</template>
  
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>

</style>
  