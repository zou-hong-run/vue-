import { getToken, setToken, removeToken } from "@/utils/auth";

// 存储用户令牌和角色信息
const state = {
  token: getToken(),
  roles: [],
  // 其他用户信息
};
// 放值方法
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};
const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username } = userInfo; // 后端发过来的token
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" || username === "jerry") {
          // 保存状态 保存在vuex中
          commit("SET_TOKEN", username);
          // 存cookie
          setToken(username);
          resolve();
        } else {
          reject("用户名或密码错误");
        }
      }, 1000);
    });
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const roles = state.token === "admin" ? ["admin"] : ["editor"];
        // 保存状态
        commit("SET_ROLES", roles);
        resolve({
          roles,
        });
      }, 1000);
    });
  },
  // remove token
  resetToken({ commit }) {
    return new Promise((resovle) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resovle();
    });
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
