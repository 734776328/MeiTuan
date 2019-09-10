import mongoose from 'mongoose'
const Schema = mongoose.Schema
const hotCity = new Schema({
  province: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  id: {
    type: String,
    require: true
  }
},{
  versionKey: false
})

export default mongoose.model('hotCity',hotCity)