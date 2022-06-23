<template>
  <div class="container">
    <SearchBox @filterDate="filterDate" />
    <button @click="page > 1 ? page-- : (page = 1)" class="bg-blue-500">
      prev
    </button>
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
    const dateQuery = ref("");
    function getFilms(page) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=f62f750b70a8ef11dad44670cfb6aa57&page=${page}${dateQuery.value}`
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
    function filterDate(date) {
      if (date.value.length != 0) {
        dateQuery.value = `&release_date.gte=${date.value[0]
          .split(" ")
          .reverse()
          .join("-")}&release_date.lte=${date.value[1]
          .split(" ")
          .reverse()
          .join("-")}`;
        console.log(dateQuery.value);
      } else {
        console.log("no date");
      }
    }
    onMounted(() => getFilms(page.value));
    watch([page,dateQuery], () => {
      getFilms(page.value);
    });
    // getFilms(page);
    return { films, loading, page, filterDate };
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
}
</style>