import { getUser, register, login, logout } from "../../apis/auth"
import { changeUser } from "../../apis/user"

export const user = {
  state() {
    return {
      user: getUser() || {}
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async registerUser({ commit }, { email, username, password }) {
      const user = await register(email, username, password)
      commit("setUser", user)
    },
    async loginUser({ commit }, { email, password }) {
      const user = await login(email, password)
      commit("setUser", user)
    },
    async updateUser({ commit }, user) {
      const currentUser = getUser()
      console.log(currentUser)
      const updateUser = await changeUser(user)
      commit("setUser", updateUser)
    },
    async logoutUser({ commit }) {
      logout()
      commit("setUser", {})
    }
  }
}