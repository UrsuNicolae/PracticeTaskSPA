<template>
  <div class="container">
    <div class="card mt-4">
      <div class="card-body">
        <h1 class="mt-1 mb-2 card-title">
          {{ movie.title }}
        </h1>
        <div class="row">
          <div class="col-3">
            <img class="img-fluid" :src="getPhotoUrl" alt="Movie Poster" />
            <p>Release: {{ movie.release_Date | formatDate }}</p>
            <div
              class="favorite"
              @click="setToFavorite()"
              :style="
                movie.isFavorite ? { display: 'none' } : { display: 'block' }
              "
            >
              <b-icon-heart></b-icon-heart>
            </div>
            <div
              :style="
                !movie.isFavorite ? { display: 'none' } : { display: 'block' }
              "
            >
              <p>Favorite movie</p>
            </div>
            <router-link :to="{ name: 'MainComponents', params: {} }"
              ><strong class=".text-warning"
                >Back to paginated list!</strong
              ></router-link
            >
          </div>
          <div class="col-9">
            <circle-spin
              v-bind:loading="isLoading"
              :style="isLoading == false ? { display: 'none' } : ''"
            ></circle-spin>
            <youtube :video-id="video.key" />
            <p>
              {{ movie.overview }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div></template
>

<script>
export default {
  name: 'MovieDetailsComponet',
  data () {
    return {
      id: Number,
      isLoading: true,
      url: 'https://localhost:5001/',
      movie: {
        poster_Path: '',
        title: '',
        overview: '',
        release_Date: '',
        isFavorite: false
      },
      video: {
        key: ''
      }
    }
  },
  computed: {
    getPhotoUrl () {
      if (this.movie.poster_Path === '') {
        return ''
      }
      return 'http://image.tmdb.org/t/p/w500' + this.movie.poster_Path
    }
  },
  methods: {
    setToFavorite () {
      this.axios
        .put(
          this.url +
            'api/Movie/' +
            'SetMovieToFavorite' +
            '?id=' +
            this.movie.id,
          { id: this.movie.id }
        )
        .then(response => {
          if (response.status === 200) {
            this.movie.isFavorite = true
            this.$store.commit('updateFavoriteNr')
          }
        })
    }
  },
  created () {
    this.axios
      .get(this.url + 'api/Movie/GetMovieById?id=' + this.$route.params.id)
      .then(response => {
        if (response.status === 200) {
          this.movie = response.data
          this.axios
            .get(
              this.url + 'api/Movie/GetMovieVideos?id=' + this.$route.params.id
            )
            .then(res => {
              if (res.status === 200) {
                this.$store.commit('updateFavoriteNr')
                this.isLoading = false
                this.video = res.data.results[0]
              }
            })
        }
      })
  },
  filters: {
    formatDate: function (value) {
      if (!value) return ''
      if (value === '') return value
      value = value.toString().split('T')
      return value[0]
    }
  }
}
</script>

<style scoped>
.favorite {
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  padding: 16px 32px;
}

.favorite:hover {
  cursor: pointer;
  transform: scale(1.03);
  transition-duration: 0.3s;
}
</style>
