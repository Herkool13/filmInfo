<template>
  <router-link :to="{ name: 'filmInfo', params: { id: film.id } }">
    <div class="flex flex-row	film-card ">
      <img :src="filmPoster" alt="" srcset="" class="filmPoster" />
      <div class="card-info">
        <h3 class="card-title">{{ film.original_title }}</h3>
        <div>
          <div>
             <b-icon icon="calendar"></b-icon>
            <p>dd</p>
          </div>
        </div>
      </div>
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
    return { filmPoster };
  },
};
</script>

<style scoped>
.filmPoster {
  width: 128px;
  height: 189px;
  border-radius: 6px 0px 0px 6px;
  margin: auto 1px;
}
.film-card {
  width: 295px;
  height: 195px;
  background: #f1f1f1;
  border: 1px solid #c4c4c4;
  border-radius: 6px;
  margin-bottom: 35px;
  align-content: center;
  justify-content: start;
}
.card-title {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #000000; 
  margin-left: 11px;
}
</style>