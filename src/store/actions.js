// root level actions
// encapsulate complex mutations

import * as types from './mutations-type.js'
import { myArray } from '@/common/js/myutils.js'
import { localSave, localDel, localClear, savePlay, saveFavorite, delFavorite } from '@/common/js/store.js'

function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

// select song to play
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
  // avoid random play when clicking playlist, songs get out of order
  if (state.mode === 2) {
    let randomList = myArray.shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, index)
}

// random play all button
export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_MODE, 2)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYLIST, myArray.shuffle(list))
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENT_INDEX, 0)
}

// add song to playlist
export const insertSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice(0)
  let sequenceList = state.sequenceList.slice(0)
  let currentIndex = state.currentIndex

  // record current song
  let currentSong = playlist[currentIndex]

  // check if song to be added is already in playlist
  let fpIndex = findIndex(playlist, song)

  // insert at current index
  currentIndex++
  playlist.splice(currentIndex, 0, song)

  // if song to be added is already in playlist, delete original song
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  // insert at position in sequenceList
  let currentSIndex = findIndex(sequenceList, currentSong) + 1

  // check if song to be added is already in sequenceList
  let fsIndex = findIndex(sequenceList, song)

  // insert at current index
  sequenceList.splice(currentSIndex, 0, song)

  // if song to be added is already in playlist, delete original song
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_FULL_SCREEN, true)
}

// delete song from playlist
export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice(0)
  let sequenceList = state.sequenceList.slice(0)
  let currentIndex = state.currentIndex

  // find song to delete
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)

  // position in sequenceList
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)

  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  let playingState = playlist.length > 0
  commit(types.SET_PLAYING_STATE, playingState)
}

/**
 * save search history
 * @param  {[type]} query          search keyword
 */
export const saveHistory = function ({commit}, query) {
  commit(types.SET_SEARCHHISTORY, localSave(query))
}

/**
 * delete single search history
 * @param  {[type]} query          search keyword
 */
export const delHistory = function ({commit}, query) {
  commit(types.SET_SEARCHHISTORY, localDel(query))
}

/**
 * delete all search history
 * @param  {[type]} query          search keyword
 */
export const clearHistory = function ({commit}) {
  commit(types.SET_SEARCHHISTORY, localClear())
}

// clear playlist
export const deleteSongList = function ({commit, state}, song) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}

// write current song to vuex recent plays playHistory
export const saveplayHistory = function ({commit}, song) {
  commit(types.SET_PLAYHISTORY, savePlay(song))
}

// my favorites
export const savefavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const delfavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, delFavorite(song))
}
