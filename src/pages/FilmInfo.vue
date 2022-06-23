<template>
<router-link :to="{name:'home'}">back</router-link>
  <h1>info</h1>
  <p>{{film}}</p>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
setup() {
    const film = ref({});
    const loading=ref(true);
    const route=useRoute();
    function getFilms() {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${route.params.id}?api_key=f62f750b70a8ef11dad44670cfb6aa57&language=en-US`
        )
        .then(function (response) {
          film.value = response.data;
            loading.value=false;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
    getFilms();
    return { film,loading };
  },
}
</script>

<style>

</style>