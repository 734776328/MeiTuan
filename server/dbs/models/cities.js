import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Cities = new Schema({
  id:{
    type: String,
    require: true
  },
  value: {
    type: Array,
    require: true
  }
},{versionKey: false})

export default mongoose.model('Cities',Cities)