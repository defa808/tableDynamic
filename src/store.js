import Vue from 'vue';
import Vuex from 'vuex';
import data from './data';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data,
    curPage: 1,
    perPage: 5,
    searchText: '',
    sortKey: '',
    reverse:false,
  },
  mutations: {
    set: (state, { key, value }) => (state[key] = value)
  },
  actions: {},

  getters: {
    fields: state => Object.keys(state.data[0]),
    
    filteredData: state => {
      return state.data.filter(
        e =>
          Object.values(e)
            // .slice(1)
            .filter(
              x =>
                x
                  .toString()
                  .toLowerCase()
                  .indexOf(state.searchText.toString().toLowerCase()) > -1
            ).length > 0
      );
    },

    endCount: (state, getters) =>  state.curPage * state.perPage,
    startCount:(state, getters) => getters.endCount - state.perPage + 1,
   
    numPages: (state, getters) =>
      Math.ceil(getters.filteredData.length / state.perPage),

    rows: (state, getters) => {
      return getters.filteredData.slice(
        (state.curPage - 1) * state.perPage,
        state.curPage * state.perPage
      );
    }
  }
});
