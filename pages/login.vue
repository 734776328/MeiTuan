<template>
  <div class="page-login">
    <div class="login-header">
      <a
        href="/"
        class="logo"/>
    </div>
    <div class="login-panel">
      <div class="banner">
        <img
          src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          width="480"
          height="370"
          alt="美团网">
      </div>
      <div class="form">
        <h4
          v-if="error"
          class="tips"><i/>{{ error }}</h4>
        <p><span>账号登录</span></p>
        <el-input
          v-model="username"
          prefix-icon="profile"/>
        <el-input
          v-model="password"
          prefix-icon="password"
          type="password"/>
        <div class="foot">
          <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
          <b>忘记密码？</b>
        </div>
        <el-button
          class="btn-login"
          type="success"
          size="mini"
          @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
  
<script>
import CryptoJS from 'crypto-js'
export default {
  layout: 'blank',
   data () {
    return {
      error: '',
      checked: '',
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      // let self = this;
      this.$axios.post('/users/signin', {
        //用于处理中文编码 不处理后台接收到乱码
        username: window.encodeURIComponent(this.username),
        password: CryptoJS.MD5(this.password).toString()
      }).then(({status, data})=>{
        console.log('登录操作')
        if (status === 200) {
          console.log(data)
          if (data&&data.code===0) {
            console.log('登录成功')
            location.href = '/'
          } else {
            this.error = data.msg
          }
        } else {
          this.error = '登录失败'
        }
        setTimeout(()=>{
          this.error = ""
        }, 1500)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/assets/css/login/index.scss";
</style>
  