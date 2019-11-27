import axios from 'axios/index'
import {config as ApiConfig, API_BASE} from '../api'

export default (store) => {
  return {
    $store: store,
    login(user, pass) {
      return axios({
        method: 'post',
        url: API_BASE + '/login_check',
        credentials: 'include',
        data: {
          'username': user,
          'password': pass
        }
      }).then(
        response => {
          this.$store.commit('login', response.data.token);
          return response
        }
      )
    },
    list (page) {
      return axios(
        Object.assign(
          ApiConfig(this.$store),{
            method: 'get',
            url: API_BASE + `/users`,
            params: {
              page
            }
          }
        )
      )
    },
    me () {
      return axios(
        Object.assign(
          ApiConfig(this.$store),{
            method: 'get',
            url: API_BASE + `/users/me`,
          }
        )
      )
    },
    get (id) {
      return axios(
        Object.assign(
          ApiConfig(this.$store),{
            method: 'get',
            url: API_BASE + `/users/${id}`,
          }
        )
      )
    },
    save(data) {
      return data.id ? this.update(data) : this.create(data)
    },
    create (data) {
      return axios(
        Object.assign(
          ApiConfig(this.$store),{
            method: 'post',
            url: API_BASE + `/users`,
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
            url: API_BASE + `/users/${data.id}`,
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
            url: API_BASE + `/users/${id}`,
          }
        )
      )
    },
    resetPassword(id, oldPassword, newPassword, retypeNewPassword) {
      console.log(oldPassword)
      return axios(
        Object.assign(
          ApiConfig(this.$store),{
            method: 'put',
            url: API_BASE + `/users/${id}/reset-password`,
            data: {
              oldPassword,
              newPassword,
              retypeNewPassword
            }
          }
        )
      )
    },
  }
}
