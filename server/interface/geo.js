import Router from 'koa-router'
import axios from './utils/axios.js';
import Province from '../dbs/models/province.js'
import Menus from '../dbs/models/menus.js'
import Cities from '../dbs/models/cities.js'
import HotCitys from '../dbs/models/hotCitys.js'

let router = new Router({
  prefix: '/geo'
})

//签名 
const sign = '62a39adfd535bc96baa589de83744a4c'


//获取城市定位
router.get('/getPosition', async (ctx) => {
  let {status, data: {province, city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

//获取 menu 菜单数据
router.get('/menu', async (ctx) => {
  // //获取线上数据
  // let {status, data: {menu}} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)

  // mongodb数据库获取菜单
  let result = await Menus.find()
  let menu =result[0].menu
  ctx.body = {menu: menu.length>0? menu:[]}
})

// 2. 获取全国省数据


router.get('/province', async (ctx) => {
  // let {status, data: {province}} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)

  //数据库获取
  const result = await Province.find()
  ctx.body = {
    province: result
  }

})

//3. 获取市数据
// 根据传送过来的省ID去城市数据库中查找城市数据 mongodb模糊查询使用的是正则表达式
router.get('/province/:id',async (ctx) => {
  // const {status, data: {city}} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}`)
  //正则表达式注意事项 不能带单引号'' 双引号""" 在nodejs中必须使用 new RegExp()构建正则表达式 RegExp() 中添加变量跟字符串中合并变量一样
  const cityID = new RegExp("^"+ctx.params.id.substring(0,2))
  const cities = await Cities.find({id: cityID})
  // 下面语句为什么返回的是 []
  // ctx.body = {city: cities.length>0? cities:[]}
  console.log('city: cities.length',cities.length);
  ctx.body = {city:cities}
})


//4. 获取全国城市数据

router.get('/city', async (ctx) => {
  // const {status, data: {city}} = await axios.get(`http://cp-tools.cn/geo/city`)
  const result = await Cities.find()
  if (result.length>0) {
    ctx.body = {
      code: 1,
      city: result
    }
  }else {
    ctx.body = {
      code: -1,
      city: []
    }
  }
})

//5获取热门城市

router.get('/hotCity', async (ctx) => {
  // const {status, data: {hots}} = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`)
  const hotCitys = await HotCitys.find()
  if (hotCitys.length>0) {
    ctx.body = {
      code: 1,
      hots: hotCitys
    }
  } else {
    ctx.body = {
      code: 1,
      host: []
    }
  }  
  
})
export default router