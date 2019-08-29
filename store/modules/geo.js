//创建状态
const state = () => ({
  position: {}
})

//创建提交
const mutations = {
  setPosition(state, val) {
    state.position = val
  }
}

//创建异步获取数据方法
const actions = {
  setPosition: ({commit}, position) => {
    commit('setPosition', position)
  }
}

export default {namespaced: true, state, mutations, actions}