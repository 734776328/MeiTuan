import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Province = new Schema({
  id: {
    type: String,
    require: ''
  },
  name: {
    type: String,
    require: true
  }
},{
  //不往数据里添加版本号属性 __v:0
  versionKey: false
})

export default mongoose.model('Province', Province)