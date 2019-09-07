import axios from 'axios'

const instance = axios.create({
  baseURL: `http://${process.env.HOST||'localhost'}:${process.env.PORT||5000}`,
  timeout: 5000,
  //设置公共头部
  headers: {
  }
})

export default instance