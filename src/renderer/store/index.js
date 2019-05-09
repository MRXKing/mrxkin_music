import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

Vue.use(Vuex)

const state = {
  musicData:[],
  music:0
}

const mutations = {
  setMusicData(state,val){
    state.musicData = val
  },
  setMusic(state,val){
    state.music = val
  }
}

const actions = {

}


export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [
    createPersistedState()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
//process.env.NODE_ENV !== 'production'
