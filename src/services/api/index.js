import Api from './api'

export default {
  install(Vue, options) {
    Vue.prototype.$api = Api(options.store)
  }
}
