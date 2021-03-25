<template>
  <div class="container">
    <circle-spin
      v-bind:loading="isLoading"
      :style="isLoading == false ? { display: 'none' } : ''"
    ></circle-spin>
    <div class="row">
      <div
        class="col-md-4"
        v-for="(movie, index) in response.results"
        v-bind:key="index"
      >
        <div class="movie-hover mb-4 box-shadow">
          <img
            :src="'http://image.tmdb.org/t/p/w500' + movie.poster_Path"
            alt="Avatar"
            class="image"
          />
          <div class="middle">
            <div class="text" @click="goToMovieDetails(movie.id)">
              <b-icon-eye></b-icon-eye>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <b-pagination
        v-model="currentPage"
        :total-rows="getResponse.total_Pages"
        :per-page="perPage"
        align="center"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponet',
  data () {
    return {
      url: 'https://localhost:5001/',
      response: {
        errors: [],
        page: 1,
        results: [],
        total_Pages: 1
      },
      perPage: 20,
      currentPage: 1,
      isLoading: true
    }
  },
  props: {
    params: String
  },
  created () {
    this.axios.get(this.url + 'api/Movie/' + this.params).then(response => {
      this.isLoading = false
      if (response.status === 200) this.response = response.data
    })
  },
  computed: {
    getResponse () {
      return this.response
    }
  },
  watch: {
    currentPage (newVal) {
      this.isLoading = true
      this.response.results = []
      this.axios
        .get(this.url + 'api/Movie/' + this.params + '?Page=' + newVal)
        .then(response => {
          this.isLoading = false
          if (response.status === 200) this.response = response.data
        })
    }
  },
  methods: {
    setToFavorite (id) {
      this.axios
        .put(this.url + 'api/Movie/' + 'SetMovieToFavorite', { id })
        .then(response => {
          console.log(response)
        })
    },
    goToMovieDetails (movieId) {
      this.$router.push({
        name: 'MovieDetailsComponet',
        params: { id: movieId }
      })
    }
  }
}
</script>

<style scoped>
.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: 0.5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.movie-hover:hover .image {
  opacity: 0.3;
  transform: scale(1.03);
  transition-duration: 0.3s;
}

.movie-hover:hover .middle {
  opacity: 1;
}

.text {
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  padding: 16px 32px;
  border-radius: 5px;
}

.text:hover {
  cursor: pointer;
  transform: scale(1.03);
  transition-duration: 0.3s;
}
</style>
