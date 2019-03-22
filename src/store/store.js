import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [
      { id: 549, name: "1", created: 1548247219 },
      { id: 569, name: "22", created: 1553261906 },
      { id: 570, name: "333", created: 1553261943 },
      { id: 571, name: "4444", created: 1553261944 },
      { id: 572, name: "5555", created: 1553261945 }
    ]
  },
  actions: {
    GET_LIST(context, payload) {
      context.commit("SET_LIST", payload);
    },

    GET_LIST_ITEM_CREATED(context, payload) {
      context.commit("SET_LIST_ITEM_CREATED", payload);
    }
  },
  mutations: {
    SET_LIST(state, payload) {
      state.list = payload;
    },

    SET_LIST_ITEM_CREATED(state, payload) {
      state.list[payload.index].created = payload.created;
    }

  },

  getters: {
    list(state) {
      return state.list;
    }
  }
});
