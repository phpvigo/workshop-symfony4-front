import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import vuetify from '@/plugins/vuetify'
import '@/plugins/vue-moment'
import Api from '@/services/api'
import VuetifyConfirm from './plugins/confirm'

Vue.use(Api, {store})

Vue.use(VuetifyConfirm, {
  vuetify,
  buttonTrueText: 'Aceptar',
  buttonFalseText: 'Cancelar',
  buttonFalseColor: 'primary',
  color: 'primary',
  icon: 'mdi-alert-octagon',
  title: 'Atención',
  width: 350,
  property: '$confirm'
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
