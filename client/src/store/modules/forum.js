import * as types from '../mutation-types'
import { http } from '@/api'

// Initial state
const state = {
  posts: [],
  currentPost: {}
}

// Actions
const actions = {
  LOAD_POSTS_LIST ({ commit }) {
    http.get('/posts').then(res => {
      commit(types.SET_POSTS_LIST, { list: res.data })
    }, err => {
      console.error(err)
    })
  },

  LOAD_FORUM_POST ({ commit }, postId) {
    return new Promise((resolve, reject) => {
      http.get('/posts/' + postId).then(res => {
        commit(types.SET_CURRENT_POST_DATA, { post: res.data })
        resolve()
      }, err => {
        console.error(err)
        reject(err)
      })
    })
  }
}

// Mutations
const mutations = {
  [types.SET_POSTS_LIST] (state, { list }) {
    state.posts = list
  },

  [types.SET_CURRENT_POST_DATA] (state, { post }) {
    state.currentPost = post
  }
}

export default {
  state,
  actions,
  mutations
}
