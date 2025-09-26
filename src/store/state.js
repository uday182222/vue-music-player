/**
 * Single state tree
 * vuex operation order: state.js -> mutations-type.js -> mutations.js -> getters.js
 */
import { getStorage, getPlayStorage, getFavorite } from '@/common/js/store.js'

const playMode = {
  sequence: 0, // sequential play
  loop: 1, // single loop
  random: 2 // random play
}

const state = {
  // singer information
  singer: {},
  // player playing state
  playing: false,
  // player expanded state
  fullScreen: false,
  // playing song list
  playlist: [],
  // sequential play list
  sequenceList: [],
  // play mode
  mode: playMode.sequence,
  // current playing song index
  currentIndex: -1,
  // recommend page song list
  songlist: {},
  // song ranking data
  rankList: {},
  // search results
  searchHistory: getStorage(),
  // play history (recent plays)
  playHistory: getPlayStorage(),
  // my favorites
  favoriteList: getFavorite()
}

export default state
