import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Cart = new Schema({
  id: {
    type: String,
    require: true
  },
  //商品名称 单价 数量等信息
  detail: {
    type: Array,
    require: true
  },
  cartNo: {
    type: String,
    require: true
  },
  user: {
    type: String,
    require: true
  },
  time: {
    // mongodb创建时间类型时，默认有时区的概念 默认是美国时区 差8个小时 所以跟我们时间不一致
    // type: Date,
    type: String,
    require: true
  }
})

export default mongoose.model('Cart', Cart)