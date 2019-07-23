import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users.js'
import Passport from './utils/passport.js'
import Email from '../dbs/config.js'
import axios from './utils/axios.js'

let router = new Router({
  prefix: '/users'
})

let Store = new Redis().client

router.post('/signup', async (ctx)=>{
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body

  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {
      if ( new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      } 
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
      return false
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
    return false
  }
  let user = await User.find({
    username
  })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '账号已存在'
    }
    return false
  }
  // 将用户信息写入数据库
  let nuser = await User.create({
    username,
    password,
    email
  })
  if (nuser) {
    let res = await axios.post('/users/signin',{
      username,
      password
    })
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.bodu = {
        code: -1,
        msg: 'error',
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

router.post('/signin', async (ctx, next)=>{
  return Passport.authenticate("local", function(err, user, info, status){
    if(err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if(user) {
        console.log('user--------',user)
        ctx.body = {
          code: 0,
          msg: "登录成功",
          user: user
        }
        //触发passport的序列化 存储到session中
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire <0) {
    console.log(new Date(saveExpire))
    console.log(saveExpire)
    console.log(new Date().getTime())
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁'
    }
    return false
  }
  //发送方
  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })

  //要接受的信息
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }

  //邮件显示什么内容
  let mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`,
    to: ko.email,
    subject: '《高仿美团》注册码',
    html: `您在《高仿美团网》课程中注册了账号，注册码为：${ko.code}`
  }
  await transporter.sendMail(mailOptions, (error, info) =>{
    if (error) {
      return console.log(error)
    } else {
      Store.hmset(`nodemail:${ko.user}`,'code',ko.code, 'expire', ko.expire, 'email', 'ko.email')
    }
  })

  ctx.body = {
    code: 0,
    msg: '验证码已发送, 可能会有延时, 有效期1分钟'
  }
})

router.get('/exit', async (ctx,next)=>{
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

//router.get() 路由路径前面的 / 不能去掉 否则成 localhost:3000/usersgetUser
router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const {username, email} = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router