<template>
  <div class="box-title">
    <router-link :to="{ name: 'home' }" class="back"> back</router-link>
    <div class="film-title">
      <h2>{{ film.title }}</h2>
      <h4>{{ film.tagline }}</h4>
    </div>
  </div>
  <div class="info-bax">
    <img :src="filmPoster" alt="" class="film-banner" />
    <div class="info-film">
      <div class="flex flex-row justify-between content-center key-val-box">
        <span class="key-info">Budget</span>
        <span class="value-info">${{ film.budget }}</span>
      </div>
      <div class="flex flex-row justify-between content-center key-val-box">
        <span class="key-info">Revenue</span>
        <span class="value-info">${{ film.revenue }}</span>
      </div>
      <div class="flex flex-row justify-between content-center key-val-box">
        <span class="key-info">Release Date</span>
        <span class="value-info">{{ film.release_date }}</span>
      </div>
      <div class="flex flex-row justify-between content-center key-val-box">
        <span class="key-info">Runtime</span>
        <span class="value-info"
          >{{ Math.floor(film.runtime / 60) }}h {{ film.runtime % 60 }}m</span
        >
      </div>
      <div class="flex flex-row justify-between content-center key-val-box">
        <span class="key-info">Score</span>
        <span class="value-info">${{ film.budget }}</span>
      </div>
      <div class="flex flex-row justify-between content-center key-val-box">
        <span class="key-info">Genres</span>
        <span class="value-info">{{ ganreString }}</span>
      </div>
      <div class="flex flex-row justify-between content-center key-val-box">
        <span class="key-info">IMDB Link</span>
        <a class="value-link" :href="imdbLink">{{
          film.imdb_id != null ? "link" : "No site"
        }}</a>
      </div>
      <div class="flex flex-row justify-between content-center key-val-box">
        <span class="key-info">Homepage Link</span>
        <a class="value-link" :href="film.homepage">{{
          film.homepage != "" ? "link" : "No site"
        }}</a>
      </div>
    </div>
  </div>
  <p class="overview">{{ film.overview }}</p>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const film = ref({});
    const loading = ref(true);
    const route = useRoute();
    const filmPoster = ref("");
    const ganreString = ref("");
    const imdbLink = ref("");
    let ganreList = [];
    function getFilms() {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=f62f750b70a8ef11dad44670cfb6aa57&language=en-US`
        )
        .then(function (response) {
          film.value = response.data;
          filmPoster.value = `https://image.tmdb.org/t/p/w500/${response.data.poster_path}`;
          response.data.genres.forEach((g) => ganreList.push(g.name));
          ganreString.value = ganreList.join(", ");
          imdbLink.value = `https://www.imdb.com/title/${response.data.imdb_id}/`;
          loading.value = false;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
    getFilms();
    return { film, loading, filmPoster, ganreString, imdbLink };
  },
};
</script>

<style scoped>
.back {
  width: 92px;
  height: 33px;
  background: #549df2;
  border-radius: 100px;
  margin-left: 35px;
  margin-top: 26px !important;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  padding: 7px 33px;
  color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
.box-title {
  width: 1024px;
  height: 85px;
  background: #e2e2e2;
  border-radius: 6px;
  margin: auto;
  margin-top: 117px;
  display: flex;
  flex-flow: row nowrap;
}
.film-title {
  display: flex;
  flex-flow: column nowrap;
  margin-left: 64px;
  margin-top: 18px;
}
.film-title h2 {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
}
.film-title h4 {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  margin-top: 6px;
}
.film-banner {
  width: 330px;
  height: 495px;
  border-radius: 12px;
}
.info-bax {
  width: 1024px;
  margin: auto;
  margin-top: 78px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
}
.info-film {
  width: 606px;
  height: 302px;
}
.key-val-box {
  margin-bottom: 18px;
}
.key-info {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #151515;
}
.value-info {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  text-align: right;
  color: #151515;
}
.value-link {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  text-align: right;
  text-decoration-line: underline;

  color: #318fe7;
}
.overview {
  width: 1017px;
  height: 101px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #1e1e1e;
  margin: auto;
  margin-top: 53px;
  margin-bottom: 100px;
}
</style>