<template>
  <div class="container">
    <SearchBox />
    <button @click="page > 1 ? page-- : (page = 1)" class="btn">prev</button>
    <button @click="page < 500 ? page++ : (page = 500)" class="btn">
      next
    </button>
    {{ page }}
    <div class="showResult">
      <div v-if="loading">loading</div>
      <div v-else v-for="(film, index) in films" :key="index">
        <EachFilmCard :film="film" />
      </div>
    </div>
  </div>
</template>

<script>
import SearchBox from "../components/SearchBox.vue";
import axios from "axios";
import { reactive, ref } from "@vue/reactivity";
import EachFilmCard from "../components/EachFilmCard.vue";
import { onMounted, watch } from "@vue/runtime-core";
export default {
  components: { SearchBox, EachFilmCard },
  setup() {
    const films = ref([]);
    const page = ref(1);
    const loading = ref(true);
    function getFilms(page) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=f62f750b70a8ef11dad44670cfb6aa57&page=${page}`
        )
        .then(function (response) {
          loading.value = true;
          films.value = response.data.results;
          loading.value = false;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
    onMounted(()=>getFilms(page.value))
    watch(page, () => {
      getFilms(page.value);
    });
    // getFilms(page);
    return { films, loading, page };
  },
};
</script>

<style>
.container {
  width: 1024px;
  /* height: 1536px; */
  margin: auto;
}
.showResult {
  width: 1019px;
  /* height: 891px; */
  display: grid;
  grid-template-columns: repeat(3, 295px);
  margin-top: 119px;
}
.btn {
  color: #333;
  /* position:absolute;
  bottom: 0; */
  /* display: grid; */
  /* display: block; */
}
</style>