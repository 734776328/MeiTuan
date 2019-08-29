import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Poi = new Schema({
  name: {
    type: String
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  count: {
    type: String
  },
  areaCode: {
    type: String
  },
  tel: {
    type: String
  },
  //商圈
  area: {
    type: String
  },
  //地址
  addr: {
    type: String
  },
  //类型
  type: {
    type: String
  },
  module: {
    type: String
  },
  //经度
  longitude: {
    type: Number  
  },
  //维度
  latitude: {
    type: Number
  }
})

export default mongoose.model('Poi',Poi)