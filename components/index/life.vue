<template>
  <div class="m-life">
    <el-row>
      <el-col :span="14">
        <slider/>
      </el-col>
      <el-col :span="4">
        <div class="m-life-pic">
        </div>
      </el-col>
      <el-col :span="6">
        <div class="m-life-login">
          <h4><img 
            :src="user ? login : unlogin" 
            alt=""></h4>
          <!-- <transition name="my"> -->
            <p class="m-life-login-name">Hi！{{ user || '你好！' }}</p>
          </transition>
          <!-- <transition name="my"> -->
            <div v-if="!user" v-cloak>
              <p><nuxt-link to="/register"><el-button 
                round 
                size="medium" style="margin: 10px 0;">注册</el-button></nuxt-link></p>
              <p><nuxt-link to="/login"><el-button 
                round 
                size="medium">立即登录</el-button></nuxt-link></p>
            </div>
          </transition>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <div class="m-life-hotel"/>
      </el-col>
      <el-col :span="7">
        <div class="m-life-music"/>
      </el-col>
      <el-col :span="4">
        <div class="m-life-coop"/>
      </el-col>
      <el-col :span="6">
        <div class="m-life-downapp">
          <img 
            src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" 
            alt="下载APP">
          <p>美团APP手机版</p>
          <h4><span class="red">1元起</span><em class="gary">吃喝玩乐</em></h4>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Slider from './slider.vue'
export default {
  data () {
    return {
      user: '',
      unlogin: '//s0.meituan.net/bs/fe-web-meituan/e350c4a/img/avatar.jpg',
      login: '//s0.meituan.net/bs/fe-web-meituan/e3064a3/img/head-img.png'
    }
  },
  components: {
    Slider,
  },
  async mounted() {
    const {status, data: {user}} =await this.$axios.get('/users/getUser');
    this.user = status===200? user : ''; 
  },
}
</script>

<style lang="css" scope>
  .my-enter,
  .my-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  .my-enter-active,
  .my-leave-active {
    transition: all .4s ease;
  }
  .m-life .m-life-pic {
    background: #fff url(http://p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg) no-repeat top right;
    width: 150px;
    height: 240px;
    background-size: 150px;
    margin-top: 10px;
  }
  .m-life .m-life-login {
    height: 210px;
    background-color: #fff;
    margin-top: 10px;
    margin-left: 3px;
    text-align: center;
    padding-top: 30px;
    border: 1px solid #E5E5E5;
  }
  .m-life .m-life-login h4 {
    width: 59px;
    height: 59px;
    border-radius: 50%;
    background-color: #E5E5E5;
    margin: 0 auto;
  }
  .m-life .m-life-login img {
    height: 53px;
    border-radius: 50%;
    /* vertical-align:middle; */
    margin-top: 3px;
  }
  .m-life .m-life-hotel {
    height: 165px;
    width: 255px;
    background: #fff url(http://p1.meituan.net/codeman/8cce56c467a17e04f3094d1e455462a0132772.png) no-repeat;
    background-size: 255px;
    margin: 9px 0 0 10px;
  }
  .m-life .m-life-music {
    height: 165px;
    width: 255px;
    background: #fff url(http://p1.meituan.net/codeman/16442c19da1f1c4544f794e29d99c92051716.jpg) no-repeat;
    background-size: 255px;
    margin: 9px 0 0 10px;  
  }
  .m-life .m-life-coop {
    height: 156px;
    width: 165px;
    background: #fff url(http://p1.meituan.net/codeman/5b21cddb4bb1cbc3a9c3bce0f726c75940469.jpg) no-repeat;
    background-size: 150px;
    margin-top: 9px;
  }
  .m-life .m-life-downapp {
    height: 155px;
    border: 1px solid #E5E5E5; 
    margin: 9px 0 0 3px;
    text-align: center;
    font-size: 16px;
    background-color: #fff; 
  }
  .m-life .m-life-downapp img {
    width: 95px;
  }
</style>
