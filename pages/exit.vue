<template>
  <div>

  </div>
</template>
  
<script>
export default {
  layout: 'blank',
  middleware: async (ctx) => {
    let { status, data } = await ctx.$axios.get('/users/exit')
    if (status && status === 200 && data && data.code === 0) {
      /**
       * nuxtjs作为一个服务端渲染的库，代码应该在node环境执行，浏览器的执行环境和node的执行环境是有差异的，node上是没有window或document这样的对象，所以会报错。
        解决的办法有两种思路：

        1. 假如没有该对象或方法，可以用一个空对象或方法填充：

        if (!window) { window = {}; }
        if (!window.localStorage) { window.localStorage = {}; }
        if (!window.localStorage.getItem) { window.localStorage.getItem = function() {} }

        2. 或者干脆不执行，跳过这段代码
        if (window) {
            window.localStorage.getItem('uid')
        }

        最终生成的代码会保留源代码，这些代码在浏览端是能够正常运行的，只是在node上会被忽略。
       */
      if (window) {
        window.location.href = '/'
      }
    }
  }
}
</script>
<style scoped="scss">
  
</style>
