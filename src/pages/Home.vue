<template>
  <div class="container">
    <SearchBox @filterDate="filterDate" />
    <div class="showResult flex flex-row film-card justify-between flex-wrap">
      <div v-if="loading">loading</div>
      <div v-else v-for="(film, index) in films" :key="index">
        <EachFilmCard :film="film" />
      </div>
    </div>
      <button @click="page > 1 ? page-- : (page = 1)" class="bg-blue-500">
        prev
      </button>
      <button @click="page < 500 ? page++ : (page = 500)" class="btn">
        next
      </button>
      {{ page }}
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
        localStorage.setItem(
          "filterDate",
          `&release_date.gte=${date.value[0]
            .split(" ")
            .reverse()
            .join("-")}&release_date.lte=${date.value[1]
            .split(" ")
            .reverse()
            .join("-")}`
        );
        dateQuery.value = localStorage.getItem("filterDate");
        console.log(dateQuery.value);
      } else {
        localStorage.setItem("filterDate", "");
        dateQuery.value = localStorage.getItem("filterDate");
      }
    }
    onMounted(() => {
      dateQuery.value = localStorage.getItem("filterDate");
      page.value = localStorage.getItem("page");
      getFilms(page.value);
    });
    watch([page, dateQuery], (newValue, oldValue) => {
      getFilms(page.value);
      if (
        newValue[1] != oldValue[1] &&
        oldValue[1] != "" &&
        newValue[1] != ""
      ) {
        console.log(newValue[1], oldValue[1]);
        localStorage.setItem("page", 1);
        page.value=1;
      } else {
        localStorage.setItem("page", page.value != null ? page.value : 1);
      }
    });
    // getFilms(page);
    return { films, loading, page, filterDate };
  },
};
</script>

<style>
.container {
  width: 1024px;
  margin: auto;
}
.showResult {
  width: 1019px;
  margin-top: 119px;
}
.btn {
  color: #333;
}
</style>