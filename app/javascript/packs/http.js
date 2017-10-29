import store from "./store";
import { setLoading, unsetLoading } from "./actions/loading";

export function post(path, payload) {
  store.dispatch(setLoading());

  const { endpoint } = store.getState().configuration;
  const promise =
    fetch(endpoint + path, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(res => {
      store.dispatch(unsetLoading());

      return (res);
    })
    .then(res => res.json())

  return (promise);
}

export function list(path) {
  store.dispatch(setLoading());

  const { endpoint } = store.getState().configuration;
  const promise =
    fetch(endpoint + path, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      store.dispatch(unsetLoading());

      return (res);
    })
    .then(res => res.json())

  return (promise);
}
