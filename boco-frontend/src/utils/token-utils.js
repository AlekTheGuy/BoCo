import jwt_decode from "jwt-decode";
import store from "@/store";

export function tokenHeader() {
  let token = store.state.user.token;
  return { Authorization: "Bearer " + token };
}

export function parseCurrentUser() {
  let token = store.state.user.token;
  return jwt_decode(token);
}

export function parseUserFromToken(token) {
  return jwt_decode(token);
}
