import axios from 'axios'
import store from '../../store'

import apiUser from './modules/user'
import apiHashtag from './modules/hashtag'
import apiTweet from './modules/tweet'

export const API_BASE = process.env.VUE_APP_API_BASE;

export default function Api(store) {
  return {
    baseUrl: API_BASE,
    $store: store,
    user: apiUser(store),
    hashtag: apiHashtag(store),
    tweet: apiTweet(store)
  }
}

export function config(store) {
  return {
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${store.state.auth.token}`
    }
  }
}

axios.interceptors.request.use(
  function (config) {
    store.commit('loading', true)
    store.commit('error', false)
    return config
  },
  function (error) {
    store.commit('loading', false)
    return Promise.reject(error)
  }
);

axios.interceptors.response.use(
  function (response) {
    store.commit('loading', false)
    return response
  },
  function (error) {
    store.commit('loading', false)
    store.commit('error', `(${error.response.status}) ${error.response.statusText}`)
    return Promise.reject(error)
  }
);
