import axios from 'axios/index'
import {API_BASE, config as ApiConfig} from '../api'

export default (store) => {
  return {
    $store: store,
    endpointBase: API_BASE + '/hashtags',
    list (page, search) {
      return axios(
        Object.assign(
          ApiConfig(this.$store),{
            method: 'get',
            url: `${this.endpointBase}`,
            params: {
              page,
              name: search,
            }
          }
        )
      )
    },
    get (id) {
      return axios(
        Object.assign(
          ApiConfig(this.$store),{
            method: 'get',
            url: `${this.endpointBase}/${id}`,
          }
        )
      )
    },
    create (data) {
      return axios(
        Object.assign(
          ApiConfig(this.$store),{
            method: 'post',
            url: `${this.endpointBase}`,
            data
          }
        )
      )
    },
    update (data) {
      return axios(
        Object.assign(
          ApiConfig(this.$store),{
            method: 'put',
            url: `${this.endpointBase}/${data.id}`,
            data
          }
        )
      )
    },
    delete (id) {
      return axios(
        Object.assign(
          ApiConfig(this.$store),{
            method: 'delete',
            url: `${this.endpointBase}/${id}`
          }
        )
      )
    }
  }
}
