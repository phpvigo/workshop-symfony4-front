import axios from 'axios/index'
import {API_BASE, config as ApiConfig} from '../api'

export default (store) => {
  return {
    $store: store,
    endpointBase: API_BASE + '/tweets',
    list (page, search, sortBy, sortDesc) {

      const params = {
        page,
        content: search ? search : null,
      }

      console.log(sortBy)
      if (Array.isArray(sortBy) && sortBy[0]) {
        params[`order[${sortBy[0]}]`] = sortDesc[0] ? 'desc' : 'asc'
      }


      return axios(
        Object.assign(
          ApiConfig(this.$store),{
            method: 'get',
            url: `${this.endpointBase}`,
            params
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
    },
    getRandom (hashtag) {
      return axios(
        Object.assign(
          ApiConfig(this.$store),{
            method: 'get',
            url: `${this.endpointBase}/hashtag/${hashtag.id}/random-tweet`,
          }
        )
      )
    }
  }
}
