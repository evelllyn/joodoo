import { createPost, loadPosts, likePost, favorPost } from "../../apis/post"

export const post = {
  state() {
    return {
      list: [],
      searchResult: [],
      currentId: null
    }
  },
  mutations: {
    initializePosts(state, posts) {
      state.list = [...posts]
    },
    toggleLike(state, updatedPost) {
      const post = state.list.find(p => p.id === updatedPost.id);
      if (post) {
        post.likes = updatedPost.likes;
        post.likedByMe = updatedPost.likedByMe;
      }
    },
    toggleFavor(state, updatedPost) {
      const post = state.list.find(p => p.id === updatedPost.id);
      if (post) {
        post.favors = updatedPost.favors;
        post.favoredByMe = updatedPost.favoredByMe;
      }
    },
    setCurrentId(state, id) {
      state.currentId = id
    },
    increaseCommentCount(state, id) {
      const post = state.list.find((post) => post.id === id)
      post.comments++
    },
    setPostsSearchResult(state, posts) {
      state.searchResult = posts
    }
  },
  actions: {
    async uploadPost({ commit, dispatch }, { image, description }) {
      await createPost(image, description)
      dispatch("loadAllPosts")
      commit("changeShowPostUpload", false)
    },
    async loadAllPosts({ commit }) {
      const posts = await loadPosts()
      commit("initializePosts", posts)
    },
    async toggleLike({ commit}, id) {
      const updatedPost = await likePost(id)
      commit("toggleLike", updatedPost)
    },
    async toggleFavor({ commit}, id) {
      const updatedPost = await favorPost(id)
      commit("toggleFavor", updatedPost)
    },
    async showPostDetails({ commit, dispatch }, id) {
      commit("setCurrentId", id)
      dispatch("loadAllComments", id)
      commit("changeShowPostDetails", true)
    },
    async hidePostDetails({ commit }) {
      commit("setCurrentId", null)
      commit("changeShowPostDetails", false)
    },
    async searchPosts({ commit }, term) {
      const posts = await loadPosts(
        "filters[description][$containsi]=" + encodeURIComponent(term)
        // "filters[description][$contains]=" + term
      )
      commit("setPostsSearchResult", posts)
    }
  },
  getters: {
    postDetails(state) {
      return state.list.find((post) => post.id === state.currentId)
    }
  }
}