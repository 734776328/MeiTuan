import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../dbs/models/province'

let router = new Router({prefix: '/categroy'})

const sign = 'asdf'

export default router