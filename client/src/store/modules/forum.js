import * as types from '../mutation-types'
import { http } from '../api'

// Initial state
const state = {
  posts: []
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

  CREATE_FORUM_POST: function ({ commit }, post) {
    return new Promise((resolve, reject) => {
      http.post('/posts', {
        title: post.title,
        content: post.content
      }).then(res => {
        console.log(res.data)
        resolve()
      }).catch(err => {
        if (err.response) {
          console.log(err.response.data)
        } else {
          console.error(err)
        }
        reject()
      })
    })
  }
}

// Mutations
const mutations = {
  [types.SET_POSTS_LIST] (state, { list }) {
    state.posts = list
  }
}

export default {
  state,
  actions,
  mutations
}