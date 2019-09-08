import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Menus = new Schema({
  menu: {
    type: Array
  }
})

export default mongoose.model('Menus',Menus)