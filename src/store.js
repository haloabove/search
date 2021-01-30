import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { all, resolve } from 'core-js/fn/promise'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedWord: [],
    wordList: [],
    count: 0,
    perPage: 20,
    loading: false,
    selectedWord: null,
    userInput: '',
    currentPage: 1
  },
  getters: {
    getPerPage: state => {
      return state.perPage;
    },
    getUserInput: state => {
      return state.userInput;
    },
    getSelectedWord: state => {
      return state.selectedWord;
    },
    getBusy: state => {
      return state.loading
    },
    getWordList: state => {
      return state.wordList;
    },
    getAllWords: state => {
      return state.wordList;
    },
    getFilteredWords: state => {
      return state.wordList.filter(i => {
        return i.word.toLowerCase().indexOf(state.userInput.toLowerCase()) > -1
      })
    },
    getTotal: state => {
      return state.count;
    },
    getCurrentPage: state => {
      return state.currentPage;
    },
  },
  mutations: {
    clearInput(state) {
      state.userInput = '';
    },
    setWords(state, payload) {
      state.wordList = payload.map((word, index) => {
        return {
          id: index,
          word: word
        }
      });
    },
    setTotalItems(state, payload) {
      state.count = payload;
    },
    setLoadingStatus(state, payload) {
      state.loading = payload;
    },
    setInputToStore(state, payload) {
      state.userInput = payload;
    },
    setPage(state, payload) {
      state.currentPage = payload;
    },
  },
  actions: {
    clearUserInput({ commit }, payload) {
      commit('clearInput', payload)
    },
    setCurrentPage({ commit }, payload) {
      commit('setPage', payload)
    },
    setInput({ commit }, payload) {
      commit('setInputToStore', payload)
    },
    loadWordToStore({ commit }, payload) {
      commit('setWord', payload);
    },
    async getProductsAndCategories({ commit, state }, payload) {
      commit('setLoadingStatus', true);
      await axios.get(`https://gist.githubusercontent.com/adamc00/a45beb8a0cb55593220f749838c534d0/raw/fd11dcce5df4098839e19f21c50cc2363b9b7863/words.txt`)
        .then(response => {
          let list = response.data.split("\n");
          commit('setTotalItems', list.length);
          commit('setWords', list);
        }).then(response => {
          commit('setLoadingStatus', false);
        })
    },
  }
})
