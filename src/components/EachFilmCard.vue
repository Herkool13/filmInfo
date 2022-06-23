<template>
  <router-link :to="{ name: 'filmInfo', params: { id: film.id } }">
    <div>
      <p>{{ film.original_title }}</p>
      <img :src="filmPoster" alt="" srcset="" class="filmPoster" />
    </div>
  </router-link>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
export default {
  props: ["film"],
  setup(props) {
    const filmPoster = ref("");
    filmPoster.value = `https://image.tmdb.org/t/p/w500${props.film.poster_path}`;
    watch(props, () => {
      filmPoster.value = `https://image.tmdb.org/t/p/w500${props.film.poster_path}`;
    });
    // console.log(`https://image.tmdb.org/t/p/w500${props.film.poster_path}`);
    // console.log(props);
    return { filmPoster };
  },
};
</script>

<style>
.filmPoster {
  width: 200px;
}
</style>