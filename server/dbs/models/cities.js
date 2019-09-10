import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Cities = new Schema({
  id:{
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  province: {
    type: String,
    require
  }
},{versionKey: false})

export default mongoose.model('Cities',Cities)