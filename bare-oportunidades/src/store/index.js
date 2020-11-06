import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import usuario from "./modulo-usuario";
import vaga from "./modulo-vagas";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      usuario,
      vaga
    },
    plugins: [
      createPersistedState({
        storage: {
          getItem: key => localStorage.getItem(key),
          setItem: (key, value) => localStorage.setItem(key, value),
          removeItem: () => ""
        }
      })
    ],
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  return Store;
}
