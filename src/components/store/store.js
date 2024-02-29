import { createStore } from 'vuex';
import data from '@/assets/images.json';

export default createStore({
  state: {
    data: data
  },
  mutations: {
    setData(state, newData) {
      state.data = newData
    } 
  },
  actions: {

  },
  getters: {

  }
});