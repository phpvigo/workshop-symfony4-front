import jwtDecode from 'jwt-decode'

const state = {
  token: null,
  id: null,
  exp: null,
  iat: null,
  username: null,
  roles: null
};

function initialState () {
  return {
    token: null,
    id: null,
    exp: null,
    iat: null,
    username: null,
    roles: null
  }
}

const mutations = {
  login: (state, jwt) => {
    let payload = jwtDecode(jwt)
    state.id = payload.id
    state.exp = payload.exp
    state.username = payload.username
    state.iat = payload.iat
    state.roles = payload.roles
    state.token = jwt
  },
  logout: (state) => {
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
};

const actions = {};

const getters = {
  isAuthenticated: state => {
    return (state.token !== null) && (state.exp >= (new Date().getTime() / 1000))
  },
  isAdmin: state => {
    return (state.roles.indexOf('ROLE_ADMIN') > -1)
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
