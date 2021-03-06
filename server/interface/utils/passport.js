import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async function(username, password, done){
  let where = {
    username
  };
  let result = await UserModel.findOne(where)
  if ( result === null ) {
    done(null, false, '账号不存在')
  } else {
    if (result.password !== password) {
      done(null,false, '密码错误')
    } else {
      done(null,result)
    }
  }
}))
 
//序列化和反序列化 在验证用户登录成功之后把用户信息存入session中
passport.serializeUser( function (user, done) {
  done(null, user)
})

//反序列化 在每次请求的时候在session中读取用户对象
passport.deserializeUser( function (user,done) {
  return done(null, user)
})

export default  passport