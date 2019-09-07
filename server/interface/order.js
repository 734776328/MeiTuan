import Router from 'koa-router'
import axios from './utils/axios.js'
import Order from '../dbs/models/Order.js'
import md5 from 'crypto-js/md5'
import Cart from '../dbs/models/cart.js'

let router = new Router({prefix: '/order'})

// 创建订单
router.post('/createOrder', async (ctx)=>{
  console.log('===========================================================')
  let {id, price, count} = ctx.request.body
  let time = Date()
  let orderID = md5(Math.random() * 1000 + time).toString()
  if(!ctx.isAuthenticated()){
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  }else{
    let findCart = await Cart.findOne({cartNo: id})
    console.log('findCartfindCartfindCart',findCart.detail[0].imgs)
    let order = new Order({
      id: orderID,
      total: price*count,
      time,
      user: ctx.session.passport.user,
      name: findCart.detail[0].name,
      imgs: findCart.detail[0].imgs[0].url,
      status: 0
    })
    try {
      let result = await order.save();
      if(result){
        await findCart.remove()
        ctx.body = {
          code: 0,
          // 创建订单成功之后 拿着orderID就可以去支付了
          id: orderID
        }
      }else{
        ctx.body = {
          code: -1
        }
      }
    } catch (e) {
      console.log(e)
      ctx.body = {
        code: -1
      }
    }
  }
})
//查看所有订单
router.post('/getOrders',async (ctx) => {
  console.log('================================================================================================')
  if(!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      list: [],
      msg: 'please login'
    }
  }else {
    try{
      //我们此处没有进行分页查询
      // let result = await Order.find().limit(15)
      let result = await Order.find()
      console.log('result result result result ', result)
      if(result){
        ctx.body={
          code: 0,
          list: result
        }
      } else {
        ctx.body = {
          code: -1,
          list: []
        }
      }
    }catch(e){
      ctx.body={
        code:-1,
        list: []
      }
    }
  }
})
export default router