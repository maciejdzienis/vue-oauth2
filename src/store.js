import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: null,
    user: null,
    authFailure: false,
  },
  mutations: {
    authUser(state, userData) {
      state.accessToken = userData.token;
      state.user = userData.user;
    },
    authFailure(state) {
      state.authFailure = true;
    },
    authSuccess(state) {
      state.authFailure = false;
    },
    clearAuthData(state) {
      state.accessToken = null;
      state.user = null;
    },
  },
  actions: {
    setLogoutTimer({ commit }, expirationTime) {
      setTimeout(() => {
        commit("clearAuthData");
      }, expirationTime);
    },
    login({ commit, dispatch }, authParams) {
      const config = {
        headers: {
          Authorization: "Basic YXBwbGljYXRpb246c2VjcmV0",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const params = new URLSearchParams();
      params.append("grant_type", "password");
      params.append("username", authParams.username);
      params.append("password", authParams.password);

      axios
        .post("/oauth/token", params, config)
        .then((res) => {
          let now = new Date().getTime();
          let accessExpiration = new Date(
            res.data.accessTokenExpiresAt
          ).getTime();
          let timeLeft = accessExpiration - now;
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("user", res.data.user.username);
          localStorage.setItem("accessExpiration", accessExpiration);
          commit("authUser", {
            token: res.data.accessToken,
            user: res.data.user.username,
          });
          commit("authSuccess");
          dispatch("setLogoutTimer", timeLeft);

          console.log("expiresAt:", accessExpiration);
          console.log("now:", now);

          router.replace("/dashboard");
        })
        .catch((error) => {
          console.log("login failed", error);
          commit("authFailure");
        });
    },
    tryAutoLogin({ commit, dispatch }) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const accessExpiration = localStorage.getItem("accessExpiration");
      const now = new Date().getTime();
      if (now >= accessExpiration) {
        dispatch("logout");
        return;
      }
      const user = localStorage.getItem("user");
      commit("authUser", {
        token: token,
        user: user,
      });
    },
    logout({ commit }) {
      commit("clearAuthData");
      localStorage.clear();
      router.replace("/signin");
    },
  },
  getters: {
    userInfo(state) {
      return state.user;
    },
    authStatus(state) {
      return state.authFailure;
    },
    isAuthenticated(state) {
      return state.accessToken !== null;
    },
  },
});
