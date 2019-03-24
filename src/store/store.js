import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: [],
    customOrderAdded: false
  },
  actions: {
    // context.commit("SET_LIST", payload);
    async GET_LIST(context, payload) {
      try {
        const url = "http://localhost:5000/";
        const request = new Request(url, {
          method: "GET",
          credentials: "same-origin"
        });

        const response = await fetch(request);
        const json = await response.json();

        context.commit("SET_LIST", json);
      } catch (error) {
        console.error(error);
      }
    },

    async GET_CUSTOM_ORDER(context, payload) {
      try {
        const url = "http://localhost:5000/custom-order";
        const request = new Request(url, {
          method: "GET",
          credentials: "same-origin"
        });

        const response = await fetch(request);
        const json = await response.json();

        context.commit("SET_CUSTOM_ORDER_ADDED", json);
      } catch (error) {
        console.error(error);
      }
    },

    async GET_CUSTOM_ORDER_NUMBER(context, payload) {
      console.log("PAYLOAD", payload);
      try {
        const url = "http://localhost:5000/update-custom-order";
        const request = new Request(url, {
          method: "POST",
          mode: "cors",
          credentials: "same-origin",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({payload}),
          });

        
        const response = await fetch(request);
        const json = await response.json();
        
        context.commit("SET_CUSTOM_ORDER_ADDED", json);
      } catch (error) {
        console.error(error);
      }
    },

    GET_LIST_ITEM_ORDER(context, payload) {
      context.commit("SET_LIST_ITEM_ORDER", payload);
    }
  },
  mutations: {
    SET_LIST(state, payload) {
      state.list = payload;
    },

    SET_CUSTOM_ORDER_ADDED(state, payload) {
      state.customOrderAdded = true;
    }
  },

  getters: {
    list(state) {
      return state.list;
    }
  }
});
