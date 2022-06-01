import { jest } from "@jest/globals";

// route id param for pages that require routing
// id = 1, user = test testesen
export const route = {
  params: {
    id: 1,
  },
};

export const router = {
  push: jest.fn(),
};

export const $route = {
  params: {
    id: 1,
  },
};

export const $router = {
  push: jest.fn(),
};
