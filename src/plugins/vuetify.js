import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import es from 'vuetify/es5/locale/es'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#4d68f7'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  },
  lang: {
    locales: { es },
    current: 'es',
  },
})
