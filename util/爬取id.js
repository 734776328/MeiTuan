const axios = require('@nuxtjs/axios')
axios.get('http://cp-tools.cn/auth/verify?uid=6123123').then((status, data)=>{
  console.log(data)
})