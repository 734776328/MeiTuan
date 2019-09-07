import mongoose from 'mongoose'
const Schema = new mongoose.Schema

const Order = new Schema({
  id: {
    type: String,
    require: true
  },
  user: {
    type: String,
    require: true
  },
  time: {
    type: String,
    require: true
  },
  //支付金额
  total: {
    type: Number,
    requier: true
  },
  imgs: {
    type: Array,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  // 标志 代付款 已付款 等状态
  status: {
    type: Number,
    require: true
  }
})

export default mongoose.model('Order',Order)