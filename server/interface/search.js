import Router from 'koa-router'
import axios from './utils/axios'
import Poi from '../dbs/models/poi.js'
let router = new Router({
  prefix: '/search'
})

const sign = '62a39adfd535bc96baa589de83744a4c'

router.get('/top', async (ctx) => {
  let {status, data: {top}} = await axios.get(`http://cp-tools.cn/search/top`,{
    params: {
      //输入的内容
      input: ctx.query.input,
      city: ctx.query.city,
      sign
    }
  })
  ctx.body = {
    top: status===200? top: []
  }
})

router.get('/hotPlace', async (ctx) => {
  let city = ctx.query.city
  let {status,data:{result}} = await axios.get(`http://cp-tools.cn/search/hotPlace`,{
    params: {
      sign,
      city
    }
  })
  ctx.body={
    result: status===200?result:[]
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  let city = ctx.query.city
  let keyword = ctx.query.keyword
  const {status, data: {count, pois}} = await axios.get(`http://cp-tools.cn/search/resultsByKeywords`,{
    params: {
      city,
      keyword
    }
  })
  ctx.body = {
      count: status===200? count : 0,
      pois: status===200? pois : []
  }
})

export default router