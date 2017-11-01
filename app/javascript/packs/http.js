import queryString from 'query-string';
import store from "./store";
import { setLoading, unsetLoading } from "./actions/loading";
import { clearToken } from "./actions/token";

function headers() {
  const base = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  const state = store.getState();
  if (state.currentToken) {
    base.Authorization = 'Bearer ' + state.currentToken;
  }

  return (base);
}

function handleError(response) {
  if (response.status === 401) {
    store.dispatch(clearToken());
  }
  return response;
}

function parseJSON(response) {
  if ((response.headers.get('content-type') || '').match('application/json')) {
    return response.json();
  }
  return null;
}

function fetchJSON(path, params) {
  store.dispatch(setLoading());
  const { endpoint } = store.getState().configuration;

  return (
    fetch(`${endpoint}${path}`, params)
    .then(res => {
      store.dispatch(unsetLoading());

      return (res);
    })
    .then(handleError)
    .then(parseJSON)
  );
}

export function create(path, record, query) {
  return fetchJSON(`${path}?${queryString.stringify(query)}`, {
    method: 'POST',
    body: JSON.stringify(record),
    mode: 'cors',
    headers: {
      ...headers()
    }
  });
}

export function update(path, record, query) {
  return fetchJSON(`${path}?${queryString.stringify(query)}`, {
    method: 'PUT',
    body: JSON.stringify(record),
    mode: 'cors',
    headers: {
      ...headers()
    }
  });
}

export function find(path, query = {}) {
  return fetchJSON(`${path}?${queryString.stringify(query)}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      ...headers()
    }
  });
}

export function destroy(path, query = {}) {
  return fetchJSON(`${path}?${queryString.stringify(query)}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      ...headers()
    }
  });
}
