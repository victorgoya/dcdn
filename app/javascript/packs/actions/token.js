import { create } from "../http";

export function clearToken() {
  return { type: "CLEAR_TOKEN" };
}

export function createToken(values) {
  return (dispatch) => {
    create("/user_token", {
      auth: {
        email: values.email,
        password: values.password
      }
    })
    .then(res =>  dispatch({ type: "SET_CURRENT_TOKEN", accessToken: res.jwt }));
  }
}
