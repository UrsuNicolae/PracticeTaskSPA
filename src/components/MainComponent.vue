<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Popular" active>
          <pagination-componet :params="'GetPaginatedPopularMovies'" />
        </b-tab>
        <b-tab title="Top Rated">
          <pagination-componet :params="'GetPaginatedTopRatedMovies'" />
        </b-tab>
        <b-tab disabled>
          <template #title>
            <div>
              <b-icon-heart variant="success"></b-icon-heart
              ><span class="fav">{{ favoriteNr }}</span>
            </div>
          </template>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import PaginationComponet from './PaginationComponet.vue'
export default {
  components: { PaginationComponet },
  name: 'MainComponent',
  data () {
    return {
      favoriteNr: 0
    }
  },
  computed: {
    getNrFavoriteMovies () {
      return this.$store.state.favoriteNr
    }
  },
  created () {
    this.$store.commit('updateFavoriteNr')
  },
  watch: {
    getNrFavoriteMovies (newVal) {
      this.favoriteNr = newVal
    }
  }
}
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.fav{
  position: relative;
  top: -10px;
}
</style>
