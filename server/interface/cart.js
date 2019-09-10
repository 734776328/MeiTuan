import Router from 'koa-router'
import axios from './utils/axios'
import Cart from '../dbs/models/cart'
import md5 from 'crypto-js/md5'

let router = new Router({
  prefix: '/cart'
})


//创建购物车
router.post('/create',async (ctx) => {

  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    let time = Date()
    //购物车创建时间
    let cartNo = md5(Math.random()*1000 + time).toString()
    let {
      params: {
        id,
        detail
      }
    } = ctx.request.body

    //解决数据矛盾问题 detail[0].imgs 数组中元素 title 类型不一致 导致mongodb创建集合失败
    detail.imgs = detail.imgs.filter(item => typeof item.title === 'string')
    let cart = new Cart({
      id,
      //购物车创建时间
      cartNo,
      time,
      //获取session中的用户信息
      user: ctx.session.passport.user,
      detail
    })
    let result = await cart.save()
    console.log('await cart.save()',result)

    if (result) {
      ctx.body = {
        code: 0,
        msg: '',
        id: cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        //实际开发中 msg根据产品需求返回信息
        msg: 'fail'
      }
    }
  }
})

//获取购物车信息
router.post('/getCart', async (ctx)=>{

  let {id} = ctx.request.body

  try {
    let result = await Cart.findOne({cartNo: id})
    console.log('Cart.findOne({CartNo: id}',result)
    if(result) {
      ctx.body = {
        code: 0,
        data: result? result.detail[0] : {}
      }
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})

export default router