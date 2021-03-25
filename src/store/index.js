import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    favoriteNr: 0
  },
  mutations: {
    updateFavoriteNr (state) {
      axios
        .get('https://localhost:5001/api/Movie/GetNrOfFavoriteMovies')
        .then(result => {
          if (result.status === 200) {
            state.favoriteNr = result.data.nr
          } else state.favoriteNr = 0
        })
    }
  }
})
