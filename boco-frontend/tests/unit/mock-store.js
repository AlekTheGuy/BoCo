import { jest } from "@jest/globals";

// user = test testesen
const user = {
  state: {
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmaXJzdE5hbWUiOiJUZXN0IiwibGFzdE5hbWUiOiJUZXN0ZXNlbiIsImFjY291bnRJZCI6IjEiLCJleHAiOjE2NTE2NTQxNDUsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSJ9.LnOYs_9WLusp463bQo9aXPcNGI4ooz7uI3iiMrnSPTY",
  },

  mutations: {
    logout(state) {
      state.token = null;
    },
    saveToken(state, token) {
      state.token = token;
    },
  },
};

export const store = {
  state: {
    user,
  },
  modules: {
    user,
  },
  commit: jest.fn(),
};

export const $store = {
  state: {
    user,
  },
  modules: {
    user,
  },
  commit: jest.fn(),
};
