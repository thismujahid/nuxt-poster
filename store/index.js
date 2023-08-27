import Vuex from "vuex"
import Vue from "vue"
import Posts from "./Modules/Posts"
import Auth from "./Modules/Auth"
import app from '~/plugins/firebase.js';
import Database from "./Modules/Database";

Vue.use(app)
const createStore = () => {
    return new Vuex.Store({
        namespaced: true,
        modules: {
            Posts,
            Auth,
            Database
        },
        actions: {
            nuxtServerInit({ dispatch }) {
                return dispatch("initApp")
            },
            initApp({ dispatch }) {
                const posts = dispatch("Posts/load");
                return Promise.all([posts]);
            },
        }
    })
}

export default createStore