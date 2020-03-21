import { ipcRenderer } from 'electron'

const state = {
  currencies: ipcRenderer.sendSync('currency-find')
}

const mutations = {
  SET_CURRENCIES (state, value) {
    state.currencies = value
  },
  ADD_CURRENCY (state, currency) {
    state.currencies.push(currency)
  },
  UPDATE_CURRENCY (state, { index, data }) {
    state.currencies[index] = data
  },
  REMOVE_CURRENCY (state, index) {
    if (index > -1) state.currencies.splice(index, 1)
  },
  CLEAR (state) {
    state.currencies = []
  }
}

const actions = {
  addCurrency ({ commit }, value) {
    let currency = ipcRenderer.sendSync('currency-insert', value)

    commit('ADD_CURRENCY', currency)
    return currency
  },
  updateCurrency ({ commit, state }, { id, data }) {
    let index = state.currencies.indexOf(item => item._id === id)

    if (index > -1) {
      let updated = ipcRenderer.sendSync('currency-update', { id, data })
      commit('UPDATE_CURRENCY', { index, data: updated })
      return updated
    }
  },
  deleteCurrency ({ commit, state }, id) {
    let index = state.currencies.indexOf(item => item._id === id)

    if (index > -1) {
      ipcRenderer.sendSync('currency-remove', {
        _id: id
      })

      commit('REMOVE_CURRENCY', id)
      return true
    }
  },
  getCurrency ({ state }, id) {
    return state.currencies.find(item => item._id === id)
  },
  __eraseAll ({ commit, state }) {
    ipcRenderer.sendSync('currency-erase')

    commit('CLEAR')
  }
}

export default {
  state,
  mutations,
  actions
}
