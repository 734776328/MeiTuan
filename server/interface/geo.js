import Router from 'koa-router'
import axios from './utils/axios.js';
import Province from '../dbs/models/province.js'
import Menus from '../dbs/models/menus.js'
import Cities from '../dbs/models/cities.js'

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
  // //把数据返回给客户端
  // if (status===200) {
  //   ctx.body = {
  //     menu
  //   }
  // } else {
  //   ctx.body = {
  //     menu: []
  //   }
  // }

  // mongodb数据库获取菜单
  let result = await Menus.find()
  let menu =result[0].menu
  ctx.body = {menu: menu.length>0? menu:[]}
})

// 1. 获取城市列表    本地数据库数据
// router.get('/province', async (ctx) => {
//   let province = await Province.find()
//   console.log('数据库全部城市信息-----',province)
//   ctx.body = {
//     province: province.map( item => {
//       return {
//         id: item.id,
//         name: item.value[0]
//       }
//     })
//   }
// })

// 2. 线上全国省数据
router.get('/Province', async (ctx) => {
  // let {status, data: {province}} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  // ctx.body = {province:  status===200? province: []}

  //数据库获取

})

//存储全国省数据
// router.get('/quanshen', async (ctx)=> {
//   const {data:{province}} = await axios.get('http://cp-tools.cn/geo/province')
//   console.log('provinceprovinceprovince',province)
//   Province.insertMany(province,(err,docs)=>{
//     if(err) console.log(err)
//     console.log(docs)
//   })
// })

//3. 获取市数据

router.get('/province/:id',async (ctx) => {
  // const {status, data: {city}} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}`)
  // ctx.body = {
  //   city: status===200? city: []
  // }
  const result = await Province.find({id: ctx.params.id})
  console.log(result)
  ctx.body = {city: result.length>0? result:[]}

})


//4导入全国城市线上数据
router.get('/importCits', async (ctx)=>{
  const {data:{city}} = await axios.get('http://cp-tools.cn/geo/city')
  console.log(city)
  Cities.insertMany(city, (err,docs)=>{
    if(err) console.log(err)
    ctx.body = {
      city
    }
  })
  // Province.insertMany(province,(err,docs)=>{
  //   if(err) console.log(err)
  //   console.log(docs)
  // })
})

//4. 获取全国城市数据
router.get('/city', async (ctx) => {
  // const {status, data: {city}} = await axios.get(`http://cp-tools.cn/geo/city`)
  // ctx.body = {
  //   city: status===200?city:[]
  // }
  const result = Cities.find()
  console.log(result)
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

//获取热门城市
router.get('/hotCity', async (ctx) => {
  const {status, data: {hots}} = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`)
  ctx.body = {
    hots: status===200? hots: []
  }
})
export default router